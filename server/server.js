const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const shortid = require("shortid");
let { bookGenres, books } = require("./data");

const app = express();

//this should probably be environment variable
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

//CRUD
app.get("/books", (req, res) => res.json(books));

app.post("/books", (req, res) => {
  const newBook = { ...req.body, id: shortid.generate() };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    //remove the book from its current position
    books.splice(index, 1);

    //add the updated book to the end of the array
    books.push({ ...updatedBook, id: bookId });

    res.json({ ...updatedBook, id: bookId });
  } else {
    res.status(404).json({ message: `Book with ID ${bookId} not found` });
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  books = books.filter((book) => book.id !== bookId);
  res.json({ message: `Book with ID ${bookId} has been deleted` });
});

//genres endpoint
app.get("/genres", (req, res) => {
  res.json(bookGenres);
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
