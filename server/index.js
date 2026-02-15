const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sekolah", // ganti sesuai DB kamu
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

app.get("/siswa", (req, res) => {
  db.query("SELECT * FROM siswa", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

app.post("/siswa", (req, res) => {
  const { nama, npm } = req.body;

  db.query(
    "INSERT INTO siswa (nama, npm) VALUES (?, ?)",
    [nama, npm],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "success" });
    },
  );
});

app.delete("/siswa/:npm", (req, res) => {
  db.query("DELETE FROM siswa WHERE npm=?", [req.params.npm], (err) => {
    if (err) return res.json(err);
    res.json({ message: "deleted" });
  });
});

app.put("/siswa/:npm", (req, res) => {
  const { nama } = req.body;

  db.query(
    "UPDATE siswa SET nama=? WHERE npm=?",
    [nama, req.params.npm],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "updated" });
    },
  );
});

app.listen(5000, () => {
  console.log("Server jalan di http://localhost:5000 🚀");
});
