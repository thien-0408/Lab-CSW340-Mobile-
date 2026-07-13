const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456@",
    database: "nodejs_demo",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database", err);
        return;
    }
    console.log("Connected to the MySQL database");
});

//1. Create (POST)
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";

    db.query(sql, [name, email], (err, result) => {
        if (err) {
            res.status(500).json({
                message: "Error creating user",
                error: err,
            });
        } else {
            res.status(201).json({
                message: "User created",
                userId: result.insertId,
            });
        }
    });
});

//2.Get all users (GET)

app.get("/api/users", (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error fetching users",
                error: err,
            });
        } else {
            res.json(results);
        }
    });
});

//3.Get a user (GET)
app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [userId], (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error fetching user",
                error: err,
            });
        } else if (results.length === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json(results[0]);
        }
    });
});

//4. Update (PUT)
app.put("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";

    db.query(sql, [name, email, userId], (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error updating user",
                error: err,
            });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json({ message: "User updated" });
        }
    });
});

//5. Delete (DELETE)
app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [userId], (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error deleting user",
                error: err,
            });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json({ message: "User deleted" });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
