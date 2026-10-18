# Sitio web Stonward Dynamics

Sitio estático, sin compilación, listo para GitHub Pages.

## Páginas
- `index.html`: portada (Software, Máquinas, Investigación, Repositorio, MIA × Hyde.corp, Contacto).
- `solidmaker.html`: manual de usuario de SolidMaker, videos y casos paso a paso.
- `maquina.html?m=<id>`: ficha de cada máquina con visor 3D, driver y lista de materiales (se genera del paquete .zip).

## Agregar una máquina
1. Copia su paquete `.zip` (el mismo que instala SolidMaker) en `descargas/maquinas/`.
2. Pon una imagen 1280×800 en `img/`.
3. Copia un bloque en `data/maquinas.js` y cambia id, nombre, imagen, paquete, datos y driver.

## Agregar un artículo al repositorio
Copia un bloque en `data/articulos.js` (titulo, autores, año, area, enlace, nota).

## Datos de contacto por completar
En `index.html` busca `por definir` y `contacto@stonward.example` y reemplázalos por teléfono, WhatsApp, dirección y correo reales.

## Videos
En `solidmaker.html`, sección Videos, cambia cada recuadro por el `<iframe>` de YouTube cuando estén listos.

## Publicar en GitHub Pages
1. Sube todo el contenido de esta carpeta a la raíz del repositorio.
2. En GitHub: Settings > Pages > Source: "Deploy from a branch", rama `main`, carpeta `/ (root)`.
3. El sitio queda en `https://<usuario>.github.io/<repositorio>/`.

## Probar en tu PC
En esta carpeta: `python -m http.server 8000` y abre http://localhost:8000
