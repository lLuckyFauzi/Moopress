require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const BooksRouter = require("./router/books");

app.use(express.json());
app.use(BooksRouter);
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
