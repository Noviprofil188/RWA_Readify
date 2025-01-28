const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const session = require("express-session");

const app = express();
const port = 3000;


// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

// Omogući CORS za komunikaciju s frontendom
app.use(cors());

// Konfiguracija sesije
app.use(
  session({
    secret: "tajniKljucZaSesiju", // Tajni ključ za potpisivanje sesije
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Postavite na true ako koristite HTTPS
  })
);

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

// Middleware za provjeru je li korisnik admin
const checkAdminRole = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    next(); // Ako je korisnik admin, nastavi s izvršavanjem
  } else {
    res.status(403).json({ message: "Nemate ovlasti za ovu akciju." });
  }
};

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

// Ruta za registraciju korisnika
app.post("/api/korisnici", (req, res) => {
  const { ime, prezime, username, email, lozinka } = req.body;

  if (!ime || !prezime || !username || !email || !lozinka) {
    return res.status(400).json({ message: "Molimo unesite sve potrebne podatke." });
  }

  const query = "INSERT INTO korisnici (ime, prezime, username, email, lozinka, uloga) VALUES (?, ?, ?, ?, ?, 'korisnik')";

  connection.query(query, [ime, prezime, username, email, lozinka], (error, results) => {
    if (error) {
      console.error("Greška pri registraciji korisnika:", error);
      res.status(500).json({ message: "Greška na serveru." });
    } else {
      res.status(201).json({ message: "Korisnik uspješno registriran.", id: results.insertId });
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

// Ruta za dohvat svih rezervacija s korisničkim imenima
app.get("/api/rezervacija", (req, res) => {
  const query = `
      SELECT r.id, r.datum_rez, r.korisnik, r.knjiga, r.status, 
             k.username AS korisnik_username
      FROM rezervacija r
      JOIN korisnici k ON r.korisnik = k.id;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška prilikom dohvata rezervacija:", error);
      return res.status(500).send("Greška u bazi podataka");
    }
    res.json(results); // Vratite rezultate u JSON formatu
  });
});

// Ruta za dodavanje rezervacije
app.post("/api/rezervacija", (req, res) => {
  const { korisnik, knjiga, datum_rez } = req.body; // Koristite korisnik (ID) umjesto username

  if (!korisnik || !knjiga || !datum_rez) {
    return res.status(400).json({ message: "Molimo unesite sve potrebne podatke." });
  }

  // Dohvatite korisnički ID na osnovu korisničkog ID-a
  const userQuery = "SELECT id FROM korisnici WHERE id = ?";
  connection.query(userQuery, [korisnik], (error, userResults) => {
    if (error) {
      console.error("Greška pri dohvaćanju korisničkog ID-a:", error);
      return res.status(500).json({ message: "Greška na serveru." });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    const userId = userResults[0].id;

    // Zatim dodajte rezervaciju koristeći korisnički ID
    const query = "INSERT INTO rezervacija (korisnik, knjiga, datum_rez) VALUES (?, ?, ?)";
    connection.query(query, [userId, knjiga, datum_rez], (error, results) => {
      if (error) {
        console.error("Greška pri dodavanju rezervacije:", error);
        return res.status(500).json({ message: "Greška na serveru." });
      } else {
        return res.status(201).json({ id: results.insertId, korisnik: userId, knjiga, datum_rez });
      }
    });
  });
});

// Ruta za brisanje korisnika po ID-u (s provjerom sesije)
app.delete("/api/korisnici/:id", checkAdminRole, (req, res) => {
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
  const { naslov, autor, zarn, godina_izdanja, } = req.body;

  if (!naslov || !autor || !zarn || !godina_izdanja) {
    return res
      .status(400)
      .json({ message: "Molimo unesite sve potrebne podatke." });
  }

  const book = [[naslov, autor, zarn, godina_izdanja]];

  connection.query(
    "INSERT INTO knjige (naslov, autor, zanr, godina_izdanja) VALUES ?",
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
    return res.status(400).json({ message: "Molimo unesite email i lozinku." });
  }

  // Provjera za admina (dhaskic)
  if (email === "dhaskic@veleri.hr" && lozinka === "11") {
    req.session.user = { id: 1, username: "dhaskic", role: "admin" }; // Postavi sesiju
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
    req.session.user = { id: results[0].id, username: email, role: results[0].uloga }; // Postavi sesiju
    res.status(200).json({
      success: true,
      message: "Prijava uspješna!",
      user: { id: results[0].id, username: email, role: results[0].uloga },
    });
  });
});

// Ruta za odjavu
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Greška pri odjavi:", err);
      return res.status(500).json({ message: "Greška pri odjavi." });
    }
    res.status(200).json({ message: "Odjava uspješna." });
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
