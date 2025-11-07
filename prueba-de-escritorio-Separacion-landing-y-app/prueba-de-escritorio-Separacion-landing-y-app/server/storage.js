import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { hashPassword } from './security.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function ensureFile(filePath, fallback) {
  try {
    await access(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(filePath, JSON.stringify(fallback, null, 2));
    } else {
      throw error;
    }
  }
}

async function loadJson(filePath, fallback) {
  await ensureDir();
  await ensureFile(filePath, fallback);
  const raw = await readFile(filePath, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] No se pudo parsear ${filePath}. Se restaurará el archivo.`);
    await writeFile(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

async function saveJson(filePath, data) {
  await ensureDir();
  await writeFile(filePath, JSON.stringify(data, null, 2));
}

let usersCache = null;
let sessionsCache = null;

export async function loadUsers() {
  if (!usersCache) {
    usersCache = await loadJson(USERS_FILE, []);
  }
  return usersCache;
}

export async function saveUsers(users) {
  usersCache = users;
  await saveJson(USERS_FILE, users);
}

export async function loadSessions() {
  if (!sessionsCache) {
    sessionsCache = await loadJson(SESSIONS_FILE, []);
  }
  return sessionsCache;
}

export async function saveSessions(sessions) {
  sessionsCache = sessions;
  await saveJson(SESSIONS_FILE, sessions);
}

export async function seedDefaultUsers() {
  const users = await loadUsers();
  if (!users.some((user) => user.email === 'prueba@usuario.com')) {
    users.push({
      id: randomUUID(),
      email: 'prueba@usuario.com',
      name: 'Cliente de Prueba',
      role: 'cliente',
      passwordHash: await hashPassword('1234'),
    });
  }

  if (!users.some((user) => user.email === 'local@comercio.com')) {
    users.push({
      id: randomUUID(),
      email: 'local@comercio.com',
      name: 'Comercio de Prueba',
      role: 'local',
      passwordHash: await hashPassword('1234'),
    });
  }

  await saveUsers(users);
}

export async function findUserByEmail(email) {
  const users = await loadUsers();
  return users.find((user) => user.email.toLowerCase() === String(email).toLowerCase()) || null;
}

export async function findUserById(id) {
  const users = await loadUsers();
  return users.find((user) => user.id === id) || null;
}

export async function createSession(session) {
  const sessions = await loadSessions();
  sessions.push(session);
  await saveSessions(sessions);
}

export async function updateSession(sessionId, updater) {
  const sessions = await loadSessions();
  const index = sessions.findIndex((session) => session.id === sessionId);
  if (index === -1) {
    return null;
  }
  const updated = { ...sessions[index], ...updater };
  sessions[index] = updated;
  await saveSessions(sessions);
  return updated;
}

export async function removeSession(sessionId) {
  const sessions = await loadSessions();
  const filtered = sessions.filter((session) => session.id !== sessionId);
  await saveSessions(filtered);
}

export async function findSessionByHash(hash) {
  const sessions = await loadSessions();
  return sessions.find((session) => session.refreshTokenHash === hash && !session.revokedAt) || null;
}

export async function clearExpiredSessions(now = Date.now()) {
  const sessions = await loadSessions();
  const filtered = sessions.filter((session) => {
    const expires = Date.parse(session.expiresAt);
    return Number.isFinite(expires) && expires > now && !session.revokedAt;
  });
  if (filtered.length !== sessions.length) {
    await saveSessions(filtered);
  }
}
