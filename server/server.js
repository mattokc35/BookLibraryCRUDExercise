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
app.get("/books", (req, res) => {
  try {
    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the books", error });
  }
});

app.post("/books", (req, res) => {
  try {
    const newBook = { ...req.body, id: shortid.generate() };
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the book", error });
  }
});

app.put("/books/:id", (req, res) => {
  try {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the book", error });
  }
});

app.delete("/books/:id", (req, res) => {
  try {
    const bookId = req.params.id;
    books = books.filter((book) => book.id !== bookId);
    res.json({ message: `Book with ID ${bookId} has been deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the book", error });
  }
});

//genres endpoint
app.get("/genres", (req, res) => {
  try {
    res.json(bookGenres);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the genres", error });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
