import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const ENV_PATH = path.join(ROOT_DIR, '.env');

function parseLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return null;
  }
  const eqIndex = trimmed.indexOf('=');
  if (eqIndex === -1) {
    return null;
  }
  const key = trimmed.slice(0, eqIndex).trim();
  const value = trimmed.slice(eqIndex + 1).trim();
  if (!key) {
    return null;
  }
  return { key, value: value.replace(/^"|"$/g, '') };
}

export async function loadEnv() {
  try {
    const contents = await readFile(ENV_PATH, 'utf-8');
    contents.split(/\r?\n/).forEach((line) => {
      const parsed = parseLine(line);
      if (parsed && !(parsed.key in process.env)) {
        process.env[parsed.key] = parsed.value;
      }
    });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('[env] No se pudo cargar el archivo .env:', error.message);
    }
  }
}

export const projectRoot = ROOT_DIR;
