import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, KEY_LENGTH).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password, hash) {
  if (!hash) {
    return false;
  }
  const [salt, key] = hash.split(':');
  if (!salt || !key) {
    return false;
  }
  const derived = scryptSync(password, salt, KEY_LENGTH).toString('hex');
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedBuffer = Buffer.from(derived, 'hex');
  if (keyBuffer.length !== derivedBuffer.length) {
    return false;
  }
  return timingSafeEqual(keyBuffer, derivedBuffer);
}

export function generateRandomToken(bytes = 64) {
  return randomBytes(bytes).toString('base64url');
}

export function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}
