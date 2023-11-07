const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const db = new sqlite3.Database("./tasks.db");

app.use(express.json());
app.use(cors());

// Create a table to store tasks if it doesn't exist
db.run(
  "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT)",
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

// API endpoint to get tasks
app.get("/api/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});

// API endpoint to create a new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).send("Title is required");
  }

  db.run("INSERT INTO tasks (title) VALUES (?)", [title], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send("Task created successfully");
    }
  });
});

// API endpoint to delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM tasks WHERE id = ?", id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send("Task deleted successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
