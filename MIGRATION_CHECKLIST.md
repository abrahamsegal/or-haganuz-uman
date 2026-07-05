# Migracion Or Haganuz Uman

## Antes de tocar DNS

- Deploy en Vercel funcionando.
- Proyecto Supabase creado.
- `supabase/schema.sql` ejecutado.
- Variables configuradas en Vercel:
  - `ADMIN_USER`
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Probar `/reservas/` y confirmar que aparece en `/admin/`.
- Probar `/admin/` desde celular y escritorio.
- Probar WhatsApp y email.
- Confirmar que el sitio actual de Hostinger sigue activo como respaldo.

## DNS en Hostinger cuando el deploy este aprobado

Opcion recomendada para Vercel:

```text
Tipo: A
Nombre/Host: @
Valor: 76.76.21.21
TTL: Auto o 3600
```

```text
Tipo: CNAME
Nombre/Host: www
Valor: el valor exacto que muestre Vercel, por ejemplo cname.vercel-dns-0.com
TTL: Auto o 3600
```

Antes de guardar, eliminar o reemplazar registros A/CNAME antiguos que apunten a Hostinger para `@` y `www`.

## Despues del cambio DNS

- Esperar propagacion.
- Revisar `https://orhaganuzuman.com`.
- Revisar `https://www.orhaganuzuman.com`.
- Revisar SSL en Vercel.
- Probar reserva real.
- Probar login admin.
- Mantener Hostinger una semana como respaldo.
- Borrar Hostinger solo despues de confirmar que no falta nada.
