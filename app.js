require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json()); // Parse JSON bodies

let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build CRUD API", completed: false },
  { id: 3, task: "Watch a movie", completed: true },
];

// GET All – Read
app.get("/todos", (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});
// GET active todo lists
app.get("/todos/active", (req, res) => {
  const activeTodos = todos.filter((t) => !t.completed);
  res.send(activeTodos);
});

//GET completed todo lists
app.get("/todos/completed", (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.json(completed); // Custom Read!
});

//GET A Single Todo
app.get("/todos/:id", (req, res) => {
  p - [];
  const Id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === Id);
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.status(200).json(todo);
});

// POST New – Create
app.post("/todos", (req, res) => {
  const { task, completed } = req.body;
  if (!task || !completed === undefined)
    return res.status(400).json({ message: "Missing fields" });
  const newTodo = { id: todos.length + 1, task, completed }; // Auto-ID
  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
});

// PATCH Update – Partial
app.patch("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  Object.assign(todo, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(todo);
});

// DELETE Remove
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: "Not found" });
  res.status(204).send(); //Silent success
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server error!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
