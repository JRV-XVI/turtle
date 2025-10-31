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
    description: 'La tortuga verde es esencial para conservar los pastos marinos y mantener el equilibrio costero. En México, su población ha disminuido por la pesca incidental, el saqueo de nidos y la contaminación en zonas de anidación clave como Veracruz, Campeche y Yucatán.'
  },
  {
    id: 'laud',
    commonName: 'Tortuga Laúd',
    scientific: 'Dermochelys coriacea',
    status: 'Peligro crítico/En declive',
    // imagen local esperada: resources/laud.jpg
    image: 'http://localhost:3000/resources/laud.jpg',
    description: 'La tortuga laúd, la más grande del mundo, enfrenta una disminución crítica de su población en México debido al saqueo de huevos y la pesca incidental. En Oaxaca, la temporada 2024-2025 logró proteger 227 nidos y liberar más de 8 000 crías gracias al trabajo conjunto entre comunidades, autoridades y voluntarios, fortaleciendo su conservación.'
  },
  {
    id: 'caguama',
    commonName: 'Tortuga Caguama',
    scientific: 'Caretta caretta',
    status: 'Peligro de extinción',
    // imagen local esperada: resources/caguama.jpg
    image: 'http://localhost:3000/resources/caguama.jpg',
    description: 'La tortuga caguama (Caretta caretta), conocida como tortuga amarilla, está en peligro de extinción en México. Habita costas como las de Quintana Roo y es vital para el equilibrio marino. Su población ha disminuido por la caza furtiva, el comercio ilegal y la captura incidental en pesquerías.'
  },
  {
    id: 'kemps',
    commonName: "Tortuga Lora",
    scientific: 'Lepidochelys kempii',
    status: 'Peligro de extinción',
    // imagen local esperada: resources/kemps.jpg
    image: 'http://localhost:3000/resources/kemps.jpg',
    description: 'La tortuga Lora (Lepidochelys kempii) es la más pequeña de las tortugas marinas y la única endémica del Golfo de México. Anida principalmente en Playa Rancho Nuevo, Tamaulipas. Está en peligro de extinción debido a la caza furtiva y la pérdida de hábitat, aunque programas comunitarios han logrado proteger sus nidos.'
  },
  {
    id: 'prieta',
    commonName: "Tortuga Prieta",
    scientific: 'Chelonia agassizii',
    status: 'Peligro de extinción',
    // imagen local esperada: resources/kemps.jpg
    image: 'http://localhost:3000/resources/prieta.jpg',
    description: 'La tortuga prieta (Chelonia agassizii) habita en el Pacífico mexicano, con playas clave en Colola y Maruata, Michoacán. Su población está amenazada por la caza furtiva, redes de pesca y daño a su hábitat. Desde 1982, proyectos comunitarios de conservación buscan protegerla y favorecer su recuperación.'
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend escuchando en http://localhost:${port}`));