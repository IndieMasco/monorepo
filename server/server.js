//import express and cors
import express from "express"; //ES6 syntax
import cors from "cors";
import { db } from "./dbConnection.js"; //import the pool

//initialiase express
const app = express();
//use express and cors
app.use(cors());
app.use(express.json()); //use JSON to manipulate data

//set up a port
const PORT = 8080;
app.listen(PORT, function () {
  console.info(` Server is running in port ${PORT}`);
});

//set up a root route
//TODO: Read data in this route
app.get("/", function (req, res) {
  res.json({ message: "Welcome to the server. GET comfy" });
});

// ========================================================

// TODO: I want to READ all the data from the staff table
// http://localhost:8080/staff --> endpoint, params
app.get("/staff", async function (req, res) {
  //we need to query our database here
  const query = await db.query(`SELECT * FROM staff;`);
  console.log(query);
  //parse data into JSON and wrangle data
  res.json(query.rows);
});

// TODO: I want to READ all the names from the staff table

app.get("/staff-names", async function (req, res) {
  const query = await db.query(`SELECT name FROM staff;`);
  res.json(query.rows);
});

// ========================================================

// app.get("/games", async function (req, res) {
//   const query = await db.query(`SELECT * FROM games;`);
//   res.json(query.rows);
// });

//========================================================

// TODO: READ all staff data in the database with name "Manny"
app.get("/staff-manny", async (_, res) => {
  //query the database
  const query = await db.query(
    `SELECT name, location, age, role FROM staff WHERE name = $1`,
    [
      //do not add values directly here, this is for demo purposes
      "Manny",
    ]
  );
  res.json(query.rows);
});

// TODO: Create (POST) new data in the staabase
app.post("/add-staff", (req, res) => {
  // An element to store the data coming from the client
  const newStaff = req.body;
  // Database query
  // In our SQL queries, we can have a placeholder (parameter) that we will replace with the actual values when the client sends them
  const query = db.query(
    `INSERT INTO staff (name, location, age, role) VALUES ($1, $2, $3, $4)`,
    [
      newStaff.formValues.name,
      newStaff.formValues.location,
      newStaff.formValues.age,
      newStaff.formValues.role,
    ]
  );
  res.json("Data sent", query);
});

//========================================================

// TODO: Workshop - Querying a database from an Express endpoint

app.get("/games", async function (request, response) {
  const games = await db.query("SELECT * FROM games");
  response.json(games.rows);
});

//========================================================
