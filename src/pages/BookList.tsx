import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  BookGridContainer,
  BookListContainer,
  Title,
  PaginationButton,
  PaginationContainer,
  ButtonContainer,
} from "../components/styled/styledComponents";
import useStore from "../store";
import Book from "../components/Book";
import { booksPerPageOptions, sortOptions } from "../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BookList: React.FC = () => {
  const { books, fetchBooks, deleteBook, fetchGenres } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(12);
  const [filteredBooks, setFilteredBooks] = useState([...books].reverse());
  const [usePagination, setUsePagination] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "titleAsc" | "titleDesc" | "authorAsc" | "authorDesc" | ""
  >("");
  const navigate = useNavigate();

  //fetch books and genres
  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, []);

  //search query useEffect
  useEffect(() => {
    setFilteredBooks(
      [...books]
        .reverse()
        .filter(
          (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [books, searchQuery]);

  //alphsorting useEffect
  useEffect(() => {
    const sortedBooks = [...filteredBooks];
    if (sortBy === "titleAsc") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "titleDesc") {
      sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "authorAsc") {
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === "authorDesc") {
      sortedBooks.sort((a, b) => b.author.localeCompare(a.author));
    }
    setFilteredBooks(sortedBooks);
  }, [sortBy]);

  //pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = usePagination
    ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
    : filteredBooks;

  const handleBooksPerPageChange = (selectedOption: any) => {
    setBooksPerPage(Number(selectedOption.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (selectedOption: any) => {
    if (selectedOption) {
      setSortBy(selectedOption.value);
    } else {
      setSortBy("");
    }
  };

  return (
    <>
      <BookListContainer>
        <Title>Book Collection</Title>
        <ButtonContainer>
          <Button onClick={() => navigate("/add")}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
            Add New Book
          </Button>
          <Button onClick={() => setUsePagination(!usePagination)}>
            {usePagination ? "Disable Pagination" : "Enable Pagination"}
          </Button>
        </ButtonContainer>
        {usePagination && (
          <ButtonContainer>
            <label htmlFor="booksPerPage">Books per page: </label>
            <Select
              id="booksPerPage"
              value={booksPerPageOptions.find(
                (option) => option.value === booksPerPage
              )}
              onChange={handleBooksPerPageChange}
              options={booksPerPageOptions}
            />
          </ButtonContainer>
        )}
        <ButtonContainer>
          <label htmlFor="search">Search For Title or Author: </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </ButtonContainer>
        <ButtonContainer>
          <label htmlFor="sort">Sort by: </label>
          <Select
            id="sort"
            value={
              sortBy
                ? sortOptions.find((option) => option.value === sortBy)
                : null
            }
            onChange={handleSortChange}
            options={sortOptions}
            isClearable={true}
            placeholder="Select sorting option..."
          />
        </ButtonContainer>
        <BookGridContainer>
          {currentBooks.map((book) => (
            <Book key={book.id} book={book} onDelete={deleteBook} />
          ))}
        </BookGridContainer>
      </BookListContainer>
      {usePagination && (
        <PaginationContainer>
          {Array.from({
            length: Math.ceil(filteredBooks.length / booksPerPage),
          }).map((_, index) => (
            <PaginationButton
              key={index}
              currentPage={currentPage === index + 1}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </PaginationButton>
          ))}
        </PaginationContainer>
      )}
    </>
  );
};

export default BookList;
