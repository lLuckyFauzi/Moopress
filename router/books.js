const express = require("express");
const router = express.Router();
const BooksController = require("../controllers/books");

router.get("/books", BooksController.getAllBook);
router.get("/books/:id", BooksController.getOneBook);
router.post("/books", BooksController.createBook);
router.patch("/books/:id", BooksController.updateBook);
router.delete("/books/:id", BooksController.deleteBook);

module.exports = router;
