const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

// Omogući CORS za komunikaciju s frontendom
app.use(cors());

// Spajanje na bazu podataka
const connection = mysql.createConnection({
  host: "student.veleri.hr",
  user: "dhaskic",
  password: "11",
  database: "dhaskic",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

// Ruta za dohvat svih knjiga
app.get("/api/knjige", (request, response) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

// Ruta za dohvat jedne knjige po ID-u
app.get("/api/knjige/:id", (request, response) => {
  const id = request.params.id;
  connection.query("SELECT * FROM knjiga WHERE id = ?", id, (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

// Ruta za rezervaciju knjige
app.post("/api/rezerv_knjige", (request, response) => {
  const data = request.body;
  const rezervacija = [[data.datum, data.id_knjiga, data.id_korisnik]];

  connection.query(
    "INSERT INTO rezervacija (datum_rez, knjiga, korisnik) VALUES ?",
    [rezervacija],
    (error, results) => {
      if (error) throw error;
      response.send(results);
    }
  );
});

// Ruta za prijavu
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Molimo unesite korisničko ime i lozinku." });
  }

  // Provjera u tablici Administrator
  const adminQuery = `
    SELECT * FROM korisnici
    WHERE email = ?
      AND lozinka = ?
  `;

  connection.query(adminQuery, [username, password], (adminError, adminResults) => {
    if (adminError) {
      console.error("Greška pri provjeri administratora:", adminError);
      return res.status(500).json({ message: "Greška na serveru." });
    }

    if (adminResults.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Prijava uspješna!",
        user: { username, role: "admin" },
      });
    }

    // Provjera u tablici Korisnik
    const userQuery = `
      SELECT * FROM korisnik
      WHERE korime = ?
        AND lozinka = ?
    `;

    connection.query(userQuery, [username, password], (userError, userResults) => {
      if (userError) {
        console.error("Greška pri provjeri korisnika:", userError);
        return res.status(500).json({ message: "Greška na serveru." });
      }

      if (userResults.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Neispravno korisničko ime ili lozinka.",
        });
      }

      // Uspješna prijava korisnika
      res.status(200).json({
        success: true,
        message: "Prijava uspješna!",
        user: { username, role: "user" },
      });
    });
  });
});

// Pokretanje servera
app.listen(port, () => {
  console.log("Server running at port: " + port);
});