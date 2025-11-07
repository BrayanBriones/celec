import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { loadEnv } from './env.js';
import {
  seedDefaultUsers,
  findUserByEmail,
  findUserById,
  createSession,
  findSessionByHash,
  removeSession,
  clearExpiredSessions,
} from './storage.js';
import {
  verifyPassword,
  generateRandomToken,
  hashToken,
} from './security.js';
import { createAccessToken } from './tokens.js';

await loadEnv();
await seedDefaultUsers();
await clearExpiredSessions();

const PORT = Number.parseInt(process.env.PORT ?? '4000', 10);
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:5173';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? 'dev-access-secret';
const ACCESS_TOKEN_TTL_MINUTES = Number.parseInt(process.env.ACCESS_TOKEN_TTL_MINUTES ?? '20', 10);
const REFRESH_TOKEN_TTL_DAYS = Number.parseInt(process.env.REFRESH_TOKEN_TTL_DAYS ?? '14', 10);

const ACCESS_TOKEN_TTL_SECONDS = Math.max(ACCESS_TOKEN_TTL_MINUTES * 60, 60);
const REFRESH_TOKEN_TTL_MS = Math.max(REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000);
const REFRESH_COOKIE = 'refreshToken';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Vary', 'Origin');
}

function parseCookies(req) {
  const header = req.headers?.cookie;
  if (!header) {
    return {};
  }
  return header.split(';').reduce((cookies, part) => {
    const [key, ...rest] = part.split('=');
    if (!key) {
      return cookies;
    }
    const value = rest.join('=').trim();
    cookies[key.trim()] = decodeURIComponent(value);
    return cookies;
  }, {});
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (!chunks.length) {
    return {};
  }
  const raw = Buffer.concat(chunks).toString('utf-8');
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw Object.assign(new Error('JSON inválido'), { statusCode: 400 });
  }
}

function jsonResponse(res, statusCode, payload, cookies = []) {
  if (cookies.length > 0) {
    res.setHeader('Set-Cookie', cookies);
  }
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function errorResponse(res, statusCode, message) {
  jsonResponse(res, statusCode, { message });
}

function notFound(res) {
  errorResponse(res, 404, 'Recurso no encontrado');
}

function unauthorized(res, message = 'Credenciales inválidas') {
  errorResponse(res, 401, message);
}

function createRefreshCookie(token, expiresAt) {
  const secure = (process.env.NODE_ENV ?? '').toLowerCase() === 'production';
  const maxAgeSeconds = Math.max(Math.floor((Date.parse(expiresAt) - Date.now()) / 1000), 0);
  const attributes = [
    `${REFRESH_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
  ];
  if (secure) {
    attributes.push('Secure');
  }
  return attributes.join('; ');
}

function clearRefreshCookie() {
  const attributes = [
    `${REFRESH_COOKIE}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
  ];
  const secure = (process.env.NODE_ENV ?? '').toLowerCase() === 'production';
  if (secure) {
    attributes.push('Secure');
  }
  return attributes.join('; ');
}

function buildUserPayload(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    type: user.role,
  };
}

async function createRefreshSession(userId) {
  const refreshToken = generateRandomToken(48);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS).toISOString();
  const session = {
    id: randomUUID(),
    userId,
    refreshTokenHash: hashToken(refreshToken),
    createdAt: new Date().toISOString(),
    expiresAt,
    revokedAt: null,
  };
  await createSession(session);
  return { refreshToken, session };
}

async function getSessionFromRequest(req) {
  const cookies = parseCookies(req);
  const token = cookies[REFRESH_COOKIE];
  if (!token) {
    return null;
  }
  const session = await findSessionByHash(hashToken(token));
  if (!session) {
    return null;
  }
  const expires = Date.parse(session.expiresAt);
  if (!Number.isFinite(expires) || expires <= Date.now()) {
    await removeSession(session.id);
    return null;
  }
  const user = await findUserById(session.userId);
  if (!user) {
    await removeSession(session.id);
    return null;
  }
  return { token, session, user };
}

async function handleLogin(req, res) {
  const body = await readJsonBody(req);
  const email = String(body.email ?? '').trim();
  const password = String(body.password ?? '');
  if (!email || !password) {
    return errorResponse(res, 400, 'Correo y contraseña son obligatorios');
  }
  const user = await findUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return unauthorized(res, 'Credenciales incorrectas');
  }
  await clearExpiredSessions();
  const { token: accessToken, expiresAt: accessExpiresAt } = createAccessToken(user, {
    secret: ACCESS_TOKEN_SECRET,
    expiresInSeconds: ACCESS_TOKEN_TTL_SECONDS,
  });
  const { refreshToken, session } = await createRefreshSession(user.id);
  const cookies = [createRefreshCookie(refreshToken, session.expiresAt)];
  jsonResponse(res, 200, {
    user: buildUserPayload(user),
    accessToken,
    accessTokenExpiresAt: accessExpiresAt,
    refreshToken,
    refreshTokenExpiresAt: session.expiresAt,
  }, cookies);
}

async function handleSession(req, res) {
  await clearExpiredSessions();
  const current = await getSessionFromRequest(req);
  if (!current) {
    return unauthorized(res, 'No hay una sesión activa');
  }
  const { user, token, session } = current;
  const { token: accessToken, expiresAt } = createAccessToken(user, {
    secret: ACCESS_TOKEN_SECRET,
    expiresInSeconds: ACCESS_TOKEN_TTL_SECONDS,
  });
  const cookies = [createRefreshCookie(token, session.expiresAt)];
  jsonResponse(res, 200, {
    user: buildUserPayload(user),
    accessToken,
    accessTokenExpiresAt: expiresAt,
  }, cookies);
}

async function handleRefresh(req, res) {
  await clearExpiredSessions();
  const current = await getSessionFromRequest(req);
  if (!current) {
    return unauthorized(res, 'El refresh token no es válido');
  }
  const { session, user } = current;
  await removeSession(session.id);
  const { refreshToken, session: newSession } = await createRefreshSession(user.id);
  const { token: accessToken, expiresAt } = createAccessToken(user, {
    secret: ACCESS_TOKEN_SECRET,
    expiresInSeconds: ACCESS_TOKEN_TTL_SECONDS,
  });
  const cookies = [createRefreshCookie(refreshToken, newSession.expiresAt)];
  jsonResponse(res, 200, {
    user: buildUserPayload(user),
    accessToken,
    accessTokenExpiresAt: expiresAt,
    refreshToken,
    refreshTokenExpiresAt: newSession.expiresAt,
  }, cookies);
}

async function handleLogout(req, res) {
  await clearExpiredSessions();
  const current = await getSessionFromRequest(req);
  if (current) {
    await removeSession(current.session.id);
  }
  jsonResponse(res, 200, { message: 'Sesión cerrada correctamente' }, [clearRefreshCookie()]);
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const url = new URL(req.url ?? '', `http://${req.headers.host}`);
    if (url.pathname === '/auth/login' && req.method === 'POST') {
      await handleLogin(req, res);
      return;
    }
    if (url.pathname === '/auth/session' && req.method === 'GET') {
      await handleSession(req, res);
      return;
    }
    if (url.pathname === '/auth/refresh' && req.method === 'POST') {
      await handleRefresh(req, res);
      return;
    }
    if (url.pathname === '/auth/logout' && req.method === 'POST') {
      await handleLogout(req, res);
      return;
    }
    if (url.pathname === '/health' && req.method === 'GET') {
      jsonResponse(res, 200, { status: 'ok' });
      return;
    }

    notFound(res);
  } catch (error) {
    console.error('[server] Error no controlado:', error);
    const status = Number.isInteger(error.statusCode) ? error.statusCode : 500;
    errorResponse(res, status, 'Error interno del servidor');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
