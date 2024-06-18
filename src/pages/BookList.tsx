import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  BookGridContainer,
  Title,
  PaginationButton,
  PaginationContainer,
  ButtonContainer,
  FilterOptionsContainer,
  FixedTopMenuBar,
} from "../components/styled/styledComponents";
import { Genre } from "../types/Types";
import useStore from "../store";
import Book from "../components/Book";
import { booksPerPageOptions, sortOptions } from "../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BookList: React.FC = () => {
  const { books, fetchBooks, deleteBook, fetchGenres, genres } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(12);
  const [filteredBooks, setFilteredBooks] = useState([...books].reverse());
  const [usePagination, setUsePagination] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    | "titleAsc"
    | "titleDesc"
    | "authorAsc"
    | "authorDesc"
    | "publishYearOldToNew"
    | "publishYearNewToOld"
    | ""
  >("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>();
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
    } else if (sortBy === "publishYearOldToNew") {
      sortedBooks.sort((a, b) => a.year - b.year);
    } else if (sortBy === "publishYearNewToOld") {
      sortedBooks.sort((a, b) => b.year - a.year);
    }
    setFilteredBooks(sortedBooks);
  }, [sortBy]);

  // Genre filter useEffect
  useEffect(() => {
    console.log("select genre use effect");
    if (selectedGenres && selectedGenres.length > 0) {
      const genreFilteredBooks = books.filter((book) =>
        selectedGenres.some((genre) =>
          book.genre.some((bookGenre) => bookGenre.value === genre.value)
        )
      );
      setFilteredBooks(genreFilteredBooks);
    } else {
      setFilteredBooks([...books].reverse());
    }
  }, [selectedGenres, books]);

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

  const handleGenreChange = (selectedOptions: any) => {
    setSelectedGenres(selectedOptions || []);
  };

  return (
    <>
      <FixedTopMenuBar>
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
        <FilterOptionsContainer>
          {usePagination && (
            <>
              <label htmlFor="booksPerPage">Books per page: </label>
              <Select
                id="booksPerPage"
                value={booksPerPageOptions.find(
                  (option) => option.value === booksPerPage
                )}
                onChange={handleBooksPerPageChange}
                options={booksPerPageOptions}
              />
            </>
          )}
          <label htmlFor="search">Search for Title or Author:</label>
          <input
            type="text"
            id="search"
            style={{ height: "2rem", width: "9.5rem" }}
            value={searchQuery}
            placeholder="Search for Title or Author"
            onChange={handleSearchChange}
          />

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
            placeholder="Select option..."
          />

          <label htmlFor="filterGenres">Filter By Genres: </label>
          <Select
            id="filterGenres"
            isMulti
            options={genres.map((g) => ({ value: g.value, label: g.label }))}
            value={selectedGenres}
            onChange={handleGenreChange}
            placeholder="Select Genres"
          />
        </FilterOptionsContainer>
      </FixedTopMenuBar>
      <BookGridContainer>
        {filteredBooks.length > 0 ? (
          currentBooks.map((book) => (
            <Book key={book.id} book={book} onDelete={deleteBook} />
          ))
        ) : (
          <h2>No Books Found!</h2>
        )}
      </BookGridContainer>

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
