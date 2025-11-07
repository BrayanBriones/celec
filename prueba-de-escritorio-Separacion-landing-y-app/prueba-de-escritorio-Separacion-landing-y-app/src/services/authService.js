const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message ?? 'Ocurrió un error inesperado';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export async function loginRequest({ email, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

export async function logoutRequest() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
}

export async function sessionRequest() {
  const response = await fetch(`${API_URL}/auth/session`, {
    method: 'GET',
    credentials: 'include',
  });
  if (response.status === 401) {
    throw new Error('No autorizado');
  }
  return handleResponse(response);
}

export async function refreshRequest() {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
}
