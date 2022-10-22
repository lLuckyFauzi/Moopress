const mongoose = require("mongoose");
const Book = require("../models/BookModel");

module.exports = {
  getAllBook: async (req, res) => {
    try {
      const page = req.query.p;
      const dataPerPage = 5;
      const book = await Book.find({})
        .sort({ author: 1 })
        .skip(page * dataPerPage)
        .limit(dataPerPage);
      res.status(201).json(book);
    } catch (err) {
      res.status(422).json({ message: "Error!" });
    }
  },
  getOneBook: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Book not found!" });
      }

      const book = await Book.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found!" });
      }

      res.status(200).json({ book: book });
    } catch (error) {
      res.status(422).json({ message: error });
    }
  },
  createBook: async (req, res) => {
    try {
      const { title, author, pages, rating, genres } = req.body;
      const book = await Book.create({ title, author, pages, rating, genres });
      res.status(201).json({
        message: "Book created!",
        book: book,
      });
    } catch (error) {
      res.status(422).json({ message: error });
    }
  },
  updateBook: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Book not found!" });
      }

      const book = await Book.findByIdAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );

      if (!book) {
        return res.status(404).json({ message: "Book not found!" });
      }

      res.status(200).json({
        message: "Update Success!",
        book: book,
      });
    } catch (error) {
      res.status(422).json({ message: error });
    }
  },
  deleteBook: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Book not found!" });
      }
      const book = await Book.findByIdAndDelete({ _id: id });

      if (!book) {
        return res.status(404).json({ error: "Book not found!" });
      }

      res.stauts(200).json({ message: "Book deleted" });
    } catch (error) {
      res.status(422).json({ message: error });
    }
  },
};
