# KIOSKU BITES

Este proyecto incluye la aplicación frontend creada con Vite/React y un servidor HTTP ligero en `server/` que expone los endpoints de autenticación basados en tokens.

## Requisitos

- Node.js 18 o superior

## Scripts disponibles

- `npm run dev`: levanta el frontend en modo desarrollo.
- `npm run build`: genera la versión de producción del frontend.
- `npm run preview`: sirve la build generada.
- `npm run server`: inicia el servidor de autenticación en el puerto configurado (por defecto 4000).

## Variables de entorno

Copia el archivo `.env.example` a `.env` y ajusta los valores según tu entorno.

- `PORT`: puerto del servidor de autenticación.
- `CLIENT_URL`: origen permitido para las peticiones del frontend.
- `ACCESS_TOKEN_SECRET`: secreto para firmar los access tokens.
- `REFRESH_TOKEN_SECRET`: reservado para futuros usos (usa un valor seguro).
- `ACCESS_TOKEN_TTL_MINUTES`: minutos de validez del access token.
- `REFRESH_TOKEN_TTL_DAYS`: días de validez del refresh token.

## Endpoints principales

| Método | Endpoint         | Descripción                                         |
| ------ | ---------------- | --------------------------------------------------- |
| POST   | `/auth/login`    | Valida credenciales y devuelve access/refresh token |
| GET    | `/auth/session`  | Restaura la sesión usando el refresh token (cookie) |
| POST   | `/auth/refresh`  | Rota el refresh token y entrega un nuevo access     |
| POST   | `/auth/logout`   | Revoca la sesión activa                             |

Los refresh tokens se devuelven en una cookie `HttpOnly` (y en el payload de la respuesta para compatibilidad), mientras que el access token se maneja desde el contexto de autenticación del frontend.
