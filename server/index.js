const { MongoClient } = require("mongodb");

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");

require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

const url = process.env.MONGODB_URL;

const client = new MongoClient(url);

const dbName = "crudbase";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("cat");

  const lessCats = await collection.find().limit(20).toArray();
  const oneCat = await collection.find().limit(1).toArray();

  app.get("/", (req, res) => {
    res.send(lessCats);
  });

  app.get("/cat", (req, res) => {
    res.send(oneCat);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  return lessCats;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
