import express from "express";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

// Mock Database

const users = [];

// Adding users
router.post("/", (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`${user.first_name} has been added to the Database`);
});

// Getting the list of users from the mock database
router.get("/", (req, res) => {
  res.send(users);
});

// finding a specific user through id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});

// deleting a user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`${id} deleted successfully from database`);
});

// modifying users
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;
  const user = users.find((user) => user.id === id);

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;

  res.send(`User with the ${id} has been updated`);
});

export default router;
