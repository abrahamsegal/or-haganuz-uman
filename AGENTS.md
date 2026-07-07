# AGENTS.md — Hotel Or HaGanuz Uman

Este proyecto corresponde únicamente al sitio web del **Hotel Or HaGanuz Uman**.

Es una landing page / sitio web público para presentar el hotel de forma profesional, clara y confiable, fuera de Hostinger, editable desde VS Code y preparado para publicarse en GitHub Pages o Vercel.

---

## Identidad del proyecto

- Nombre del sitio: Hotel Or HaGanuz Uman
- Nombre comercial: Or HaGanuz
- Dominio final: orhaganuzuman.com
- Ubicación: Bilansky 2, Uman
- Tipo de sitio: sitio oficial / landing page de hotel
- Público principal: visitantes judíos/kosher que viajan a Uman
- Estilo general: hotel kosher, elegante, limpio, cálido, serio y profesional

---

## Objetivo principal

- Reconstruir y mantener el sitio fuera de Hostinger.
- Dejar el sitio listo para publicarse en GitHub Pages o Vercel.
- Presentar el hotel de manera profesional y confiable.
- Mejorar diseño, velocidad, estructura y experiencia móvil.
- Facilitar futuras ediciones desde VS Code / Codex.
- Mantener el sitio simple, rápido y fácil de modificar.

---

## Reglas obligatorias del workspace

Este proyecto puede estar abierto en un workspace junto con otros proyectos.

Reglas estrictas:

- Trabajar únicamente dentro de la carpeta `hotel-uman`.
- No editar archivos dentro de `rimseg` ni dentro de otros proyectos del workspace.
- No mover, borrar ni modificar carpetas de otros proyectos.
- Si hay varias carpetas abiertas en VS Code, asumir que solo `hotel-uman` pertenece a este proyecto.
- Antes de cambios grandes, explicar qué archivos de `hotel-uman` se van a modificar.
- No hacer cambios globales del workspace sin permiso.
- No cambiar configuración de dominio, DNS, GitHub Pages, Vercel, hosting o GitHub sin permiso explícito.
- No incluir claves, tokens, contraseñas ni datos privados.
- No hacer `git add .`, commit o push desde la carpeta general del workspace.
- Para publicar o guardar cambios con Git, entrar primero a la carpeta del proyecto:
  `cd C:\IA\hotel-uman`

---

## Idiomas

- Idioma principal: español o hebreo, según la versión que se esté trabajando.
- El sitio puede incluir español, hebreo e inglés si ayuda a los visitantes.
- Si se trabaja en hebreo, cuidar dirección RTL cuando aplique.
- Mantener textos claros, profesionales y fáciles de entender.
- No mezclar idiomas de forma desordenada.

---

## Contenido requerido

El sitio debe incluir, como mínimo:

- Nombre del hotel
- Ubicación: Bilansky 2, Uman
- Botón visible de WhatsApp / reservas
- Teléfono
- Email
- Sección de inicio
- Sección de habitaciones
- Sección de servicios
- Sección de ubicación
- Sección de contacto
- Llamadas a la acción claras:
  - Reservar
  - Contactar por WhatsApp
  - Ver habitaciones
  - Ver ubicación

---

## Secciones recomendadas

La página principal debe sentirse como un sitio oficial de hotel, no solo como formulario.

Debe incluir:

1. Header
   - Logo / nombre del hotel
   - Menú claro
   - Botón de reserva o WhatsApp

2. Hero principal
   - Imagen fuerte del hotel o de Uman
   - Nombre claro del hotel
   - Frase principal
   - Botón de acción inmediata

3. Sobre el hotel
   - Explicación breve y confiable
   - Qué ofrece el hotel
   - Por qué hospedarse ahí

4. Habitaciones
   - Tipos de habitaciones
   - Fotos
   - Beneficios principales

5. Servicios
   - Kosher
   - Ubicación
   - Comodidad
   - Atención
   - Otros servicios reales del hotel

6. Galería
   - Fotos del hotel
   - Diseño limpio y elegante

7. Ubicación
   - Dirección
   - Referencia en Uman
   - Espacio para mapa

8. Contacto / Reservas
   - WhatsApp visible
   - Teléfono
   - Email
   - Formulario si aplica

9. Footer
   - Nombre del hotel
   - Datos de contacto
   - Links importantes

---

## Diseño visual

El diseño debe ser:

- Responsive para celular, tablet y escritorio.
- Profesional de hotelería.
- Limpio, cálido, elegante y fácil de leer.
- Con buena jerarquía visual.
- Con contraste suficiente.
- Con botones claros.
- Con buena experiencia móvil.
- Rápido al cargar.

Estilo sugerido:

- Tonos beige, crema, blanco, dorado suave, café claro o colores cálidos.
- Look de hotel kosher/luxury.
- No usar colores agresivos.
- No usar diseño infantil.
- No hacer diseño genérico sin personalidad.
- Mantener una estética seria y confiable.

---

## Implementación

- Sitio estático sin dependencias innecesarias.
- Usar HTML, CSS y JavaScript simple salvo que el proyecto ya tenga otra estructura.
- Mantener rutas relativas compatibles con GitHub Pages y Vercel.
- Código semántico, ordenado y fácil de modificar.
- Cuidar velocidad de carga.
- Optimizar imágenes cuando sea posible.
- No agregar librerías pesadas sin permiso.

Estructura esperada:

- `index.html`
- `assets/css/`
- `assets/js/`
- `assets/img/`

Si el proyecto ya tiene otra estructura, revisarla primero y no reorganizar todo sin explicar.

---

## Imágenes y recursos

- Usar recursos visuales dentro de `assets/`.
- Mantener imágenes del hotel organizadas.
- No borrar imágenes existentes sin confirmar.
- Si faltan imágenes reales, usar placeholders claros y fáciles de reemplazar.
- No usar imágenes externas con copyright dudoso.
- Cuidar que las imágenes no hagan lenta la página.

---

## Forma de trabajo

Antes de hacer cambios importantes:

1. Revisar la estructura existente.
2. Leer este archivo.
3. Identificar qué archivos se van a tocar.
4. Explicar en español sencillo el plan de cambio.
5. Esperar autorización si el cambio es grande.

Después de hacer cambios:

- Explicar qué se cambió.
- Mencionar archivos modificados.
- Indicar cómo probarlo localmente.
- Indicar si hace falta hacer commit/push.

---

## Pruebas

Antes de considerar terminado un cambio, revisar:

- Que la página abra correctamente.
- Que se vea bien en celular.
- Que los links del menú funcionen.
- Que los botones de WhatsApp/contacto funcionen.
- Que no haya errores visibles en consola.
- Que no se haya roto ninguna sección existente.

---

## Publicación

El sitio puede publicarse en:

- GitHub Pages
- Vercel

No cambiar la configuración de publicación sin permiso.

Para usar Git correctamente, trabajar desde la carpeta del proyecto:

```bash
cd C:\IA\hotel-uman
git status
```

## Prioridad máxima

El objetivo principal es que Hotel Or HaGanuz Uman tenga un sitio web profesional, confiable, rápido, responsive y fácil de editar, sin depender del Website Builder de Hostinger.
