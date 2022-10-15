const express = require("express");
const { ObjectId } = require("mongodb");
const port = 4000;
const { connectToDb, getDb } = require("./helper/connection/db");
const app = express();

let db;

app.use(express.json());

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App is running on port: ${port}`);
    });
    db = getDb();
  }
});

app.get("/books", (req, res) => {
  let page = req.query.p || 0;
  const bookPerPage = 2;
  let books = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * bookPerPage)
    .limit(bookPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json({ doc });
      })
      .catch((err) => {
        res.status(500).json({ err: "Could not fetch" });
      });
  } else {
    res.status(500).json({ err: "Doc id is not valid" });
  }
});

app.post("/books", (req, res) => {
  const body = req.body;

  db.collection("books")
    .insertOne(body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create document!" });
    });
});

app.delete("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        res.status(500).json({ err: "Could not delete document!" });
      });
  } else {
    res.status(500).json({ err: "Doc id is not valid" });
  }
});

app.patch("/books/:id", (req, res) => {
  try {
    const body = req.body;

    if (ObjectId.isValid(req.params.id)) {
      db.collection("books")
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: body })
        .then((result) => {
          res.status(200).json({ result });
        })
        .catch((err) => {
          res.status(500).json({ err: "Could not update document!" });
        });
    } else {
      res.status(500).json({ err: "Doc id is not valid" });
    }
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});
