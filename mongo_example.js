"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweets";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  db.collection("tweets").find({}, (err, result) => {
    if (err) throw err;

    console.log("for each item yielded by the cursor: ");
    results.each((err, item) => console.log(" ", item));

    db.close();
  });
});
