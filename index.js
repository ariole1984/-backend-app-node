import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("backend-app-node");
const students = database.collection("students");

client.connect();
console.log("Mongo connected");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(4040, () => console.log("api listening on port 4040"));

app.get("/", async (req, res) => {
  const allStudents = await students.find().toArray();
  res.send(allStudents);
});

app.post("/", async (req, res) => {
  await students.insertOne(req.body);
  res.send("Item was added to Mongo");
});

app.delete("/", async (req, res) => {
  await students.findOneAndDelete(req.query);
  res.send("Item deleted");
});

app.put('/', (req, res) => {
  req.body
  students.findOneAndUpdate(req.query, {$set: req.body })
});

// POST
// DELETE
// PUT
