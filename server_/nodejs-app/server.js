const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { processFormData } = require('./auswertung'); // Importiere die Auswertungsfunktion

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(cors({
  origin: 'http://localhost:3000', // Erlaube Anfragen von http://localhost:3000
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(bodyParser.json());


app.post('/api/submit', (req, res) => {
  const formData = req.body;
  //console.log('Server: Received form data:', formData); // Gibt die empfangenen Daten in der Konsole aus
  // Verarbeite die Formulardaten mit der Auswertungsfunktion
  const results = processFormData(formData);
  console.log('Server: Processed results:', results); // Gibt die verarbeiteten Daten in der Konsole aus

  res.json(results); // Sende die verarbeiteten Ergebnisse zurück
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log('Hello World');
});

const session = require('express-session');

/*app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Für Produktionsumgebungen auf true setzen
}));*/

app.use('/api', require('./authRoutes'));
