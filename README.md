# Guardianes de Tortugas — Proyecto (Frontend + Backend)

Descripción breve
- Página educativa para concientizar sobre la caza furtiva de tortugas marinas en México. Muestra tarjetas informativas por especie con imágenes y fichas descriptivas; tiene un video de fondo para dar estilo visual.

Requisitos
- Node.js (v16+ recomendado)
- npm

Estructura del proyecto
- frontend/ — app Vue 3 + Vite (interfaz)
- frontend/resources/ — imágenes y video (ej.: lepido.jpg, carey.jpg, verde.jpg, laud.jpg, caguama.jpg, kemps.jpg, prieta.jpg, ocean.mp4)
- backend/ — server Express que expone la API y sirve `/resources`
- backend/src/server.js — datos de tortugas y rutas API

Instalación y ejecución (desarrollo)

1) Backend
```bash
cd /home/shadow/Documents/tec/5-semester/world-web/turtle/backend
npm install
npm run dev
```
- El backend corre en `http://localhost:3000`.
- Endpoint disponible:
  - `GET /api/turtles` — devuelve la lista de tortugas con campos `id`, `commonName`, `scientific`, `status`, `image`, `description`.
- Archivos estáticos (imágenes y video) disponibles en:
  - `http://localhost:3000/resources/<archivo>`

2) Frontend
```bash
cd /home/shadow/Documents/tec/5-semester/world-web/turtle/frontend
npm install
npm run dev
```
- Vite sirve el frontend (por defecto `http://localhost:5173`).
- Si faltan dependencias de Vue/Vite ejecuta:
  ```bash
  npm install -D @vitejs/plugin-vue
  npm install vue@3
  ```

Assets (imágenes y video)
- Coloca las imágenes y el video en `frontend/resources/`.
- Nombres esperados (ajustables en `backend/src/server.js`):
  - lepido.jpg, carey.jpg, verde.jpg, laud.jpg, caguama.jpg, kemps.jpg, prieta.jpg, ocean.mp4
- Prueba directa: `http://localhost:3000/resources/ocean.mp4` o `http://localhost:3000/resources/lepido.jpg`

Notas y solución de problemas
- Este README refleja el estado actual: la API expone únicamente `/api/turtles` y los recursos estáticos. Ya no se usan endpoints de preguntas.
- El video de fondo debe estar `muted` y `playsinline` para permitir autoplay en la mayoría de navegadores; si no se reproduce, interactuar con la página (click) suele permitirlo.
- Si alguna imagen no carga, verifica el nombre exacto (sensible a mayúsculas/minúsculas) y la extensión (.jpg/.png) y que el backend esté corriendo.

Fuentes y referencias
- https://www.expertoanimal.com/tortugas-de-agua/tortuga-golfina.html#anchor_5
- https://tortugalandia.com/tortugas-marinas/tortuga-golfina/
- https://es.wikipedia.org/wiki/Lepidochelys_olivacea
- https://awsassets.panda.org/downloads/tortuga_carey_1.pdf
- https://www.depeces.com/la-situacion-de-la-tortuga-verde-en-mexico-amenazas-anidacion-y-conservacion.html
- https://es.wikipedia.org/wiki/Chelonia_mydas#Importancia_para_los_humanos
- https://www.gob.mx/conanp/prensa/exitosa-temporada-de-anidacion-de-tortuga-laud-en-el-santuario-barra-de-la-cruz-playa-grande-oaxaca
- https://es.wikipedia.org/wiki/Dermochelys_coriacea
- https://www.gob.mx/conanp/acciones-y-programas/tortuga-caguama-caretta-caretta
- https://es.wikipedia.org/wiki/Caretta_caretta
- https://www.gob.mx/semarnat/articulos/tortuga-lora-la-mas-pequena-de-los-quelonios-marinos
- https://es.wikipedia.org/wiki/Lepidochelys_kempii
- https://es.wikipedia.org/wiki/Chelonia_agassizii
- https://www.gob.mx/profepa/articulos/proteccion-de-las-tortugas-marinas-en-mexico?idiom=es
- https://tortugalandia.com/tortugas-marinas/tortuga-prieta/#El_Futuro_de_la_Tortuga_Prieta:_Perspectivas_y_Proyectos

Contacto / Desarrollo
- Proyecto creado como prototipo educativo. Si necesitas que agregue más endpoints, persistencia en BD o un editor de contenidos, indícalo y lo integro.