import { db } from "./dbConnection.js";

db.query(`INSERT INTO games (name, rating, agerating) VALUES ($1, $2, $3)`, [
  "God of war",
  "10",
  "16",
]);
db.query(`INSERT INTO games (name, rating, agerating) VALUES ($1, $2, $3)`, [
  "Half-life",
  "9",
  "12",
]);
db.query(`INSERT INTO games (name, rating, agerating) VALUES ($1, $2, $3)`, [
  "Dying light",
  "9",
  "16",
]);
