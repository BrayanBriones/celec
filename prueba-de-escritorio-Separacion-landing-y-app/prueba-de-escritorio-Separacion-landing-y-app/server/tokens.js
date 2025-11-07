import { createHmac } from 'node:crypto';

function base64UrlEncode(input) {
  return Buffer.from(JSON.stringify(input)).toString('base64url');
}

function sign(data, secret) {
  return createHmac('sha256', secret).update(data).digest('base64url');
}

export function createAccessToken(user, { secret, expiresInSeconds }) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp,
    iat: Math.floor(Date.now() / 1000),
  };

  const headerSegment = base64UrlEncode(header);
  const payloadSegment = base64UrlEncode(payload);
  const data = `${headerSegment}.${payloadSegment}`;
  const signature = sign(data, secret);
  return {
    token: `${data}.${signature}`,
    expiresAt: new Date(exp * 1000).toISOString(),
  };
}

export function verifyToken(token, secret) {
  if (!token) {
    return null;
  }
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }
  const [headerSegment, payloadSegment, signature] = parts;
  const data = `${headerSegment}.${payloadSegment}`;
  const expected = sign(data, secret);
  if (expected !== signature) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(payloadSegment, 'base64url').toString('utf-8'));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
