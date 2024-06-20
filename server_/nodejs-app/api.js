//downloads
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//App erstellen
const app = express();
//Port festlegen


const port = 3020;


// Middleware für die Verarbeitung von JSON-Daten
app.use(bodyParser.json());

// MySQL-Verbindung konfigurieren
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Semantec'
});


//Routen
// Route: Alle Einträge löschen
app.delete('/api/eintraege', (req, res) => {
  connection.query('DELETE FROM Angebot', (err, results) => {
    if (err) {
      console.error('Fehler beim Löschen der Daten:', err);
      res.status(500).send('Serverfehler');
      return;
    }
    res.send('Alle Einträge gelöscht');
  });
});

// Route: Alle Einträge anzeigen
app.get('/api/eintraege', (req, res) => {
  connection.query('SELECT * FROM Angebot', (err, results) => {
    if (err) {
      console.error('Fehler beim Abrufen der Daten:', err);
      res.status(500).send('Serverfehler');
      return;
    }
    res.json(results);
  });
});

// Route: Neuen Eintrag hinzufügen
app.post('/api/eintraege', (req, res) => {
  const { name, beschreibung } = req.body;
  connection.query('INSERT INTO Angebot(name, beschreibung) VALUES (?, ?)', [name, beschreibung], (err, results) => {
    if (err) {
      console.error('Fehler beim Hinzufügen des Eintrags:', err);
      res.status(500).send('Serverfehler');
      return;
    }
    res.send('Eintrag hinzugefügt');
  });
});

// Route: Neuen Eintrag hinzufügen
app.post('/api/eintraege', (req, res) => {
  const { name, beschreibung } = req.body;
  connection.query('INSERT INTO Antwort(name, beschreibung) VALUES (?, ?)', [name, beschreibung], (err, results) => {
    if (err) {
      console.error('Fehler beim Hinzufügen des Eintrags:', err);
      res.status(500).send('Serverfehler');
      return;
    }
    res.send('Eintrag hinzugefügt');
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server gestartet auf Port ${port}`);
}); 

