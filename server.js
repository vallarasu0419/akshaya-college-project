const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors"); // ✅ import cors

const app = express();

// ✅ enable CORS for all routes
app.use(cors());

app.use(express.json());
// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "college_placement",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

// API - All students
// Get all students
app.get("/api/students", (req, res) => {
  db.query("SELECT id, name, photo FROM students", (err, results) => {
    if (err) {
      console.error("❌ SQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("✅ Students fetched:", results);
    res.json(results);
  });
});

// API - Single student
app.get("/api/students/:id", (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT id, name, photo, email, company, role, ctc, skills FROM students WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", err });
    if (results.length === 0)
      return res.status(404).json({ error: "Student not found" });
    res.json(results[0]);
  });
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Serve student details page (same HTML, JS will fetch data)
app.get("/student/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public/student.html"));
});

// ✅ FIX: Run on port 8080 (to match your intention)
app.listen(8080, () =>
  console.log("🚀 Server running on http://localhost:8080")
);
