# SGV · Hub del proyecto

Página de presentación del Sistema de Gestión de Vacunas para el vacunatorio del CAPS San José Obrero de Hurlingham, Buenos Aires. Trabajo integrador del Equipo N.° 01 de 7.° Informática, Instituto Leonardo Murialdo, ciclo lectivo 2026.

## Publicar en Railway

1. En Railway, seleccionar **New Project → Deploy from GitHub repo**.
2. Elegir **aaloiamircovich/Linktree**, rama **main**, directorio raíz del repositorio.
3. Railway detecta el `Dockerfile` y ejecuta el servidor. No requiere base de datos, dependencias npm ni variables secretas.
4. Una vez desplegado, abrir **Settings → Networking → Generate Domain** para obtener la URL pública.

El servidor escucha en `0.0.0.0` y usa la variable `PORT` que asigna Railway. El chequeo de salud consulta `/`. Este repositorio publica el hub y su documentación; el sistema SGV conserva su dirección externa original.

Documentación: https://docs.railway.com/guides/dockerfiles

## Ejecutar localmente

Requiere Node.js 22 o superior:

```sh
npm start
```

Abrir http://localhost:3000. No es necesario ejecutar `npm install`.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Hub de enlaces del proyecto |
| `/docs/` | Documentación técnica |
| `/manual/` | Manual de usuario con capturas |
| `/faq/` | Preguntas frecuentes |
| `/landing/` | Presentación pública y equipo |
| `/quick-start/` | Guía de inicio rápido |

Las páginas y sus imágenes están en `public/`. `server.mjs` sirve únicamente esa carpeta. Se mantiene el diseño del ZIP original; se habilitó el enlace a la landing y se corrigieron los enlaces de navegación de la documentación para apuntar al sitio publicado.

Los vínculos al sistema SGV, al repositorio del sistema, al cronograma de Google Sheets y a la presentación de Claude siguen siendo externos. Su disponibilidad y sus permisos dependen de cada servicio. Las fuentes se cargan desde Google Fonts.

## Equipo N.° 01

- Aloia Touzon, Morella — Project Manager · UX/UI Designer
- Aloia Mircovich, Agustín — Desarrollador Front End / Back End
- Cosimi, Tomás — Desarrollador Back End
- Dellepiane, Felipe — Desarrollador Front End · Administrador de Base de Datos
