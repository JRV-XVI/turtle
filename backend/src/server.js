const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const path = require('path');
// Servir carpeta resources como estática para las imágenes locales
// Las imágenes están en el frontend/resources según indicaste
const resourcesPath = path.join(__dirname, '..', '..', 'frontend', 'resources');
app.use('/resources', express.static(resourcesPath));

// Datos estáticos de tortugas (imágenes de Commons / Wikipedia)
const turtles = [
  {
    id: 'lepido',
    commonName: 'Tortuga Golfina',
    scientific: 'Lepidochelys olivacea',
    status: 'Vulnerable',
    // imagen local esperada: resources/lepido.jpg
    image: 'http://localhost:3000/resources/lepido.jpg',
    description: 'La tortuga golfina anida en playas tropicales de México (p. ej. Oaxaca, Guerrero). Sus huevos son frecuentemente extraídos para consumo o venta, lo que ha generado presión sobre las poblaciones.'
  },
  {
    id: 'carey',
    commonName: 'Tortuga Carey',
    scientific: 'Eretmochelys imbricata',
    status: 'En peligro crítico',
    // imagen local esperada: resources/carey.jpg
    image: 'http://localhost:3000/resources/carey.jpg',
    description: 'La carey es famosa por su caparazón (conocido como "carey"), muy valorado en comercio ilegal para artesanías y joyería. Esto impulsó décadas de caza furtiva, y hoy continúa siendo una amenaza en ciertas áreas.'
  },
  {
    id: 'verde',
    commonName: 'Tortuga Verde',
    scientific: 'Chelonia mydas',
    status: 'En peligro',
    // imagen local esperada: resources/verde.jpg
    image: 'http://localhost:3000/resources/verde.jpg',
    description: 'La tortuga verde contribuye al mantenimiento de los pastos marinos. El saqueo de nidos y la pesca incidental la han afectado en varias costas mexicanas.'
  },
  {
    id: 'laud',
    commonName: 'Tortuga Laúd',
    scientific: 'Dermochelys coriacea',
    status: 'Vulnerable/En declive',
    // imagen local esperada: resources/laud.jpg
    image: 'http://localhost:3000/resources/laud.jpg',
    description: 'La tortuga laúd es la más grande de las tortugas marinas. Aunque la caza directa es menos frecuente debido a su tamaño y ciclo de vida, la especie sufre por enmalles y pérdida de hábitat. En México se registran arribadas y pasos migratorios relevantes.'
  },
  {
    id: 'caguama',
    commonName: 'Tortuga Caguama',
    scientific: 'Caretta caretta',
    status: 'Vulnerable',
    // imagen local esperada: resources/caguama.jpg
    image: 'http://localhost:3000/resources/caguama.jpg',
    description: 'La caguama anida en algunas playas del Pacífico mexicano y es afectada por la pesca incidental y en ocasiones por recolección ilegal de huevos.'
  },
  {
    id: 'kemps',
    commonName: "Tortuga Kemp's Ridley",
    scientific: 'Lepidochelys kempii',
    status: 'En peligro crítico',
    // imagen local esperada: resources/kemps.jpg
    image: 'http://localhost:3000/resources/kemps.jpg',
    description: 'Kemp\'s ridley tiene una de las poblaciones más amenazadas. Conocida por las arribadas en el Golfo de México, su conservación ha sido prioritaria en México y EE.UU.; la recolección de huevos y la pesca incidental fueron históricamente muy dañinas.'
  }
];

// Preguntas en memoria (cada pregunta puede referenciar una tortuga por turtleId)
let questions = [
  {
    id: 1,
    turtleId: 'lepido',
    question: "¿Qué práctica relacionada con las playas favorece la caza furtiva de tortugas?",
    options: [
      { text: "Recolección y venta de huevos", info: "Esta práctica incentiva la caza y el saqueo de nidos; directa causa de descenso poblacional." },
      { text: "Campañas de liberación de crías por ONG", info: "No aplica: las liberaciones ayudan a la conservación y no incentivan la caza furtiva." },
      { text: "Protección de nidos y vigilancia", info: "No aplica: la protección reduce la caza furtiva y aumenta supervivencia." },
      { text: "Educación ambiental en comunidades", info: "No aplica: reduce la caza furtiva informando a la población." }
    ],
    correct: 0
  },
  {
    id: 2,
    turtleId: 'carey',
    question: "¿Cuál es una causa que motiva la caza furtiva de tortuga carey en México?",
    options: [
      { text: "Comercialización ilegal del caparazón", info: "Correcto: la demanda de 'carey' impulsa la caza furtiva de adultos." },
      { text: "Protección legal estricta", info: "No aplica: la protección legal busca reducir la caza, no motivarla." },
      { text: "Investigaciones científicas reguladas", info: "No aplica: la ciencia regulada no implica caza furtiva." },
      { text: "Programas de turismo responsable", info: "No aplica: si bien el turismo mal gestionado puede afectar playas, el turismo responsable intenta conservar." }
    ],
    correct: 0
  },
  {
    id: 3,
    turtleId: 'verde',
    question: "¿Qué efecto tiene el saqueo de nidos sobre la tortuga verde?",
    options: [
      { text: "Disminuye la tasa de reclutamiento de crías", info: "Correcto: el saqueo de huevos reduce crías que llegan al mar y afectan la población futura." },
      { text: "Aumenta la supervivencia de corales", info: "No aplica: no existe relación directa; es una afirmación errónea." },
      { text: "Mejora la calidad del agua", info: "No aplica: el saqueo no mejora parámetros ambientales." },
      { text: "Favorece la reproducción a largo plazo", info: "No aplica: favorece lo contrario." }
    ],
    correct: 0
  }
];

// Endpoints
app.get('/api/turtles', (req, res) => {
  res.json(turtles);
});

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// Añadir pregunta (útil para editor en frontend)
app.post('/api/questions', (req, res) => {
  const q = req.body;
  if (!q || !q.question || !Array.isArray(q.options) || q.options.length < 2 || !q.turtleId) {
    return res.status(400).json({ error: 'Payload inválido; requiere question, options (array) y turtleId' });
  }
  q.id = Date.now();
  questions.push(q);
  res.status(201).json(q);
});

// Borrar preguntas (desarrollo)
app.delete('/api/questions', (req, res) => {
  questions = [];
  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend escuchando en http://localhost:${port}`));