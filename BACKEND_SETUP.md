# Backend de reservas

Este proyecto no debe exponer claves en el navegador.

## Produccion recomendada

- Deploy: Vercel.
- Base de datos: Supabase.
- Admin: `/admin/`.
- Reservas publicas: `/reservas/` guarda en `/api/reservations`.

GitHub Pages no es suficiente para la version final porque no ejecuta `/api`. Para una landing simple serviria, pero para reservas/admin se necesita Vercel o un servidor equivalente.

## Supabase

1. Crear un proyecto en Supabase.
2. Abrir SQL Editor.
3. Ejecutar el contenido de `supabase/schema.sql`.
4. Copiar:
   - Project URL.
   - Service role key.

La `service role key` va solo en Vercel como variable de entorno. Nunca va en HTML, CSS o JS publico.

## Variables en Vercel

Configurar estas variables:

```text
OWNER_ADMIN_USER=owner
OWNER_ADMIN_PASSWORD=una-clave-fuerte
OWNER_ADMIN_NAME=Nombre del dueno
ADMIN_USER=owner
ADMIN_PASSWORD=una-clave-fuerte
ADMIN_SESSION_SECRET=un-secreto-largo-random
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

`OWNER_ADMIN_USER` y `OWNER_ADMIN_PASSWORD` son el acceso principal. Ese usuario no vive en la base de datos y no se puede borrar desde `/admin/`. Para cambiarlo hay que cambiar las variables privadas del servidor.

## Flujo

- El huesped llena `/reservas/`.
- La reserva se guarda en Supabase con estado `Pendiente`.
- El hotel entra a `/admin/`.
- El admin ve calendario, confirma, cancela, edita o agrega reservas manuales de WhatsApp/email.
- Cada reserva puede guardar moneda, costo total, anticipo y estado de pago.
- El admin con acceso completo puede editar el catalogo del hotel: tipos de habitacion, desayunos/comidas, servicios y costos/notas de precio.
- El dueno principal puede crear usuarios secundarios con acceso completo o limitado.
- Acceso completo: puede gestionar reservas y exportar.
- Acceso limitado: puede trabajar reservas, pero no borrar reservas, exportar CSV ni administrar usuarios.

## Local

El servidor local de este proyecto (`node .local-server.cjs`) tambien atiende `/api` y usa `.env.local`.

La base local vive en `.local-data/` y no se sube al deploy. Ahi se guardan reservas, usuarios secundarios y catalogo editable cuando trabajas sin Supabase.

## Nota de seguridad

En produccion no se usa `.local-data/`. Si faltan `SUPABASE_URL` o `SUPABASE_SERVICE_ROLE_KEY`, la API devuelve error para evitar guardar reservas en almacenamiento temporal.
