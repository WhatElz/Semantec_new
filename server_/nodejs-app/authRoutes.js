const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require('./db');

// POST Route für den Login
router.post("/login", (req, res) => {
  const { email, password, isAdmin } = req.body; // Hier wird ein neues Feld isAdmin erwartet

  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const user = results[0];
        try {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            let role = 'user'; // Standardmäßig ist der Benutzer ein normaler Benutzer
            if (isAdmin) {
              role = 'admin'; // Wenn isAdmin true ist, wird der Benutzer als Admin betrachtet
            }
            const token = jwt.sign({ id: user.id, email: user.email, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
            res.send({ auth: true, token });
          } else {
            res.status(401).send({ auth: false, message: 'Invalid email or password.' });
          }
        } catch (error) {
          console.error("Error comparing passwords:", error);
          res.status(500).send('Internal Server Error');
        }
      } else {
        res.status(401).send({ auth: false, message: 'User not found.' });
      }
    }
  });
});

// GET Route zum Überprüfen des Tokens
router.get('/verifyToken', (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).send({ loggedIn: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ loggedIn: false });
    }
    res.send({ loggedIn: true, user: decoded });
  });
});

module.exports = router;
