# Contexto activo - Hotel Or Haganuz Uman

## Objetivo

Migrar `orhaganuzuman.com` a un sitio editable con Codex y publicable en Vercel, sin tocar Hostinger ni DNS hasta aprobacion final.

## Estado actual

- Sitio local corriendo en `http://127.0.0.1:8000/`.
- Home: `index.html`.
- Galeria: `imagenes/index.html`.
- Contacto: `contactanos/index.html`.
- Reservas: `reservas/index.html`.
- Administracion temporal: `admin/index.html`.
- API Vercel: `api/login.js`, `api/logout.js`, `api/session.js`, `api/reservations.js`, `api/reservations/[id].js`, `api/_lib.js`.
- Base de datos: `supabase/schema.sql`.
- Variables ejemplo: `.env.example`.
- Deploy preparado: `package.json`, `vercel.json`, `.gitignore`, `.vercelignore`, `MIGRATION_CHECKLIST.md`.
- CSS principal: `assets/css/styles.css`.
- JS principal: `assets/js/main.js`.
- JS administrativo: `assets/js/admin.js`.
- Fotos reales descargadas en `assets/img/gallery/`.
- Logo limpio creado en `assets/img/or-haganuz-logo-clean.png`.

## Decisiones

- Idiomas: HE / ES / EN con selector.
- WhatsApp flotante debe ser redondo, solo icono, sin texto.
- No usar TikTok ni X.
- Mantener Facebook e Instagram solo como canales secundarios.
- Galeria organizada por categorias/folders: Habitaciones, Fachada, Comedor, Mikve.
- Estilo buscado: hotel premium/luxury, fotos grandes, texto sobre imagen, menos tarjetas genericas.
- Reservas: formulario con calendario que intenta guardar la solicitud directo en `/api/reservations`; WhatsApp/email quedan como respaldo.
- Para reservar se deben aceptar terminos; el hotel se reserva el derecho de cancelar, modificar o rechazar cualquier solicitud o reserva hasta confirmacion escrita.
- Admin: login por `/api/login`, sesion en cookie HttpOnly y plataforma modular tipo hotel PMS con Resumen, Reservas, Calendario, Habitaciones, Huespedes y Operacion.
- El admin permite alta/edicion/eliminacion de reservas, registro manual de reservas recibidas por WhatsApp/email, filtros, exportacion CSV, calendario y tableros operativos.
- No hay claves en el frontend. La clave admin y Supabase se configuran solo como variables de entorno en Vercel.
- GitHub Pages no es suficiente para produccion porque el admin/reservas usan `/api`; Vercel es la ruta recomendada.

## Pendientes

- Pulir visualmente home y galeria hasta que el dueno apruebe.
- Revisar logo en navegador y ajustar si queda fondo/linea blanca.
- Revisar portada, espaciados, mobile y botones.
- Crear Supabase y Vercel, configurar variables, probar reserva real y admin en URL temporal.
- Despues del deploy aprobado, indicar/aplicar DNS exacto para Hostinger.

## No cambiar

- No borrar ni modificar sitio actual en Hostinger.
- No usar accesos sensibles todavia.
- No cambiar DNS todavia.
- No eliminar informacion publica actual: WhatsApp `+972586404027`, email `orhaganuz13@gmail.com`, ubicacion `Bilansky 2, Uman`.
- No exponer contrasenas, tokens ni claves de Supabase en archivos publicos.

## Proximo paso

Proximo paso tecnico: crear proyecto Supabase, ejecutar `supabase/schema.sql`, crear deploy en Vercel, configurar variables de entorno y probar reservas reales antes de cambiar DNS.
