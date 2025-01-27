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

// Ruta za dohvat broja knjiga
app.get("/api/knjige/count", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM knjige";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju broja knjiga:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Ruta za dohvat broja rezervacija
app.get("/api/rezervacija/count", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM rezervacija";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju broja rezervacija:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Ruta za dohvat broja korisnika
app.get("/api/korisnici/count", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM korisnici";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju broja korisnika:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Ruta za dohvat broja aktivnih rezervacija
app.get("/api/rezervacija/aktivne", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM rezervacija WHERE status = 'aktivna'";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju broja aktivnih rezervacija:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Ruta za pretraživanje popisa korisnika
app.get("/api/korisnici", (req, res) => {
  const { search } = req.query;
  let query = "SELECT * FROM korisnici";

  if (search) {
    query += ` WHERE username LIKE '%${search}%' OR email LIKE '%${search}%' OR uloga LIKE '%${search}%'`;
  }

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju korisnika:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta za dohvat pojedinačnog korisnika po ID-u
app.get("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM korisnici WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju korisnika:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Korisnik nije pronađen." });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Ruta za brisanje korisnika po ID-u
app.delete("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM korisnici WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Greška pri brisanju korisnika:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Korisnik nije pronađen." });
    } else {
      res.status(200).json({ message: "Korisnik uspješno obrisan." });
    }
  });
});

// Ruta za ažuriranje korisnika po ID-u
app.put("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, uloga } = req.body;

  if (!username || !email || !uloga) {
    return res.status(400).json({ message: "Molimo unesite sve potrebne podatke." });
  }

  const query = "UPDATE korisnici SET username = ?, email = ?, uloga = ? WHERE id = ?";

  connection.query(query, [username, email, uloga, id], (error, results) => {
    if (error) {
      console.error("Greška pri ažuriranju korisnika:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Korisnik nije pronađen." });
    } else {
      res.status(200).json({ message: "Korisnik uspješno ažuriran." });
    }
  });
});

// Ruta za dohvat svih knjiga
app.get("/api/knjige", (req, res) => {
  const query = "SELECT id, naslov FROM knjige"; // Dohvati samo ID i naslov knjige
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju knjiga:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta za dohvat pojedinačne knjige po ID-u
app.get("/api/knjige/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM knjige WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju knjige:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Knjiga nije pronađena." });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Ruta za brisanje knjige po ID-u
app.delete("/api/knjige/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM knjige WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Greška pri brisanju knjige:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Knjiga nije pronađena." });
    } else {
      res.status(200).json({ message: "Knjiga uspješno obrisana." });
    }
  });
});

// Ruta za ažuriranje knjige po ID-u
app.put("/api/knjige/:id", (req, res) => {
  const { id } = req.params;
  const { naslov, autor, zanr, godina_izdanja, opis } = req.body;

  if (!naslov || !autor || !zanr || !godina_izdanja || !opis) {
    return res.status(400).json({ message: "Molimo unesite sve potrebne podatke." });
  }

  const query = "UPDATE knjige SET naslov = ?, autor = ?, zanr = ?, godina_izdanja = ?, opis = ? WHERE id = ?";

  connection.query(query, [naslov, autor, zanr, godina_izdanja, opis, id], (error, results) => {
    if (error) {
      console.error("Greška pri ažuriranju knjige:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Knjiga nije pronađena." });
    } else {
      res.status(200).json({ message: "Knjiga uspješno ažurirana." });
    }
  });
});

// Ruta za dohvat svih rezervacija
app.get("/api/rezervacija", (req, res) => {
  const query = `
  SELECT r.id, r.korisnik, r.knjiga, r.datum_rez AS datum_rezervacije, k.username 
  FROM rezervacija r
  JOIN korisnici k ON r.korisnik = k.id`;
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju rezervacija:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta za dodavanje rezervacije
app.post("/api/rezervacija", (req, res) => {
  const { korisnik_id, knjiga_id, datum_rezervacije } = req.body;

  if (!korisnik_id || !knjiga_id || !datum_rezervacije) {
    return res.status(400).json({ message: "Molimo unesite sve potrebne podatke." });
  }

  const query = "INSERT INTO rezervacija (korisnik, knjiga, datum_rez) VALUES (?, ?, ?)";
  connection.query(query, [korisnik_id, knjiga_id, datum_rezervacije], (error, results) => {
    if (error) {
      console.error("Greška pri dodavanju rezervacije:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});

// Ruta za brisanje rezervacije
app.delete("/api/rezervacija/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM rezervacija WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Greška pri brisanju rezervacije:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Rezervacija nije pronađena." });
    } else {
      res.status(200).json({ message: "Rezervacija uspješno obrisana." });
    }
  });
});

// Ruta za pretraživanje knjiga po početnom slovu
app.get("/api/knjige/search", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ message: "Molimo unesite upit za pretraživanje." });
  }

  const searchQuery = `
    SELECT * FROM knjige
    WHERE naslov LIKE ?
    LIMIT 10
  `;

  connection.query(searchQuery, [`${query}%`], (error, results) => {
    if (error) {
      console.error("Greška pri pretraživanju knjiga:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta za unos knjiga
app.post("/api/knjige", (req, res) => {
  const { title, author, genre, year, description } = req.body;

  if (!title || !author || !genre || !year || !description) {
    return res
      .status(400)
      .json({ message: "Molimo unesite sve potrebne podatke." });
  }

  const book = [[title, author, genre, year, description]];

  connection.query(
    "INSERT INTO knjige (naslov, autor, zanr, godina_izdanja, opis) VALUES ?",
    [book],
    (error, results) => {
      if (error) {
        console.error("Greška pri unosu knjige:", error);
        res.status(500).json({ message: "Greška na serveru." });
      } else {
        res.status(200).json({ message: "Knjiga uspješno dodana!" });
      }
    }
  );
});

// Ruta za prijavu
app.post("/api/login", (req, res) => {
  const { email, lozinka } = req.body;

  if (!email || !lozinka) {
    return res
      .status(400)
      .json({ message: "Molimo unesite email i lozinku." });
  }

  // Provjera za admina (dhaskic)
  if (email === "dhaskic@veleri.hr" && lozinka === "11") {
    return res.status(200).json({
      success: true,
      message: "Prijava uspješna!",
      user: { id: 1, username: "dhaskic", role: "admin" },
    });
  }

  // Provjera za obične korisnike
  const loginQuery = `
    SELECT id, email, uloga FROM korisnici
    WHERE email = ?
      AND lozinka = ?
  `;

  connection.query(loginQuery, [email, lozinka], (error, results) => {
    if (error) {
      console.error("Greška pri prijavi:", error);
      return res.status(500).json({ message: "Greška na serveru." });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Neispravan email ili lozinka.",
      });
    }

    // Uspješna prijava korisnika
    res.status(200).json({
      success: true,
      message: "Prijava uspješna!",
      user: { id: results[0].id, username: email, role: results[0].uloga },
    });
  });
});

// Ruta za dohvat svih korisnika
app.get("/api/korisnici", (req, res) => {
  const query = "SELECT id, username FROM korisnici"; // Dohvati samo ID i korisničko ime
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju korisnika:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(200).json(results);
    }
  });
});

// Pokretanje servera
app.listen(port, () => {
  console.log("Server running at port: " + port);
});