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
import {
  faPlus,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

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
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);
  const navigate = useNavigate();

  //Fetch books and genres on component mount
  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, []);

  //Filtering and sorting logic
  useEffect(() => {
    let updatedBooks = [...books].reverse();

    //Apply search query
    if (searchQuery) {
      updatedBooks = updatedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.lastName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          book.author.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    //Apply genre filter
    if (selectedGenres && selectedGenres.length > 0) {
      updatedBooks = updatedBooks.filter((book) =>
        selectedGenres.some((genre) =>
          book.genre.some((bookGenre) => bookGenre.value === genre.value)
        )
      );
    }

    //Apply sorting
    if (sortBy === "titleAsc") {
      updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "titleDesc") {
      updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "authorAsc") {
      updatedBooks.sort((a, b) =>
        a.author.lastName.localeCompare(b.author.lastName)
      );
    } else if (sortBy === "authorDesc") {
      updatedBooks.sort((a, b) =>
        b.author.lastName.localeCompare(a.author.lastName)
      );
    } else if (sortBy === "publishYearOldToNew") {
      updatedBooks.sort((a, b) => a.year - b.year);
    } else if (sortBy === "publishYearNewToOld") {
      updatedBooks.sort((a, b) => b.year - a.year);
    }

    setFilteredBooks(updatedBooks);
  }, [books, searchQuery, selectedGenres, sortBy]);

  //Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = usePagination
    ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
    : filteredBooks;

  //Handle change functions
  const handleBooksPerPageChange = (selectedOption: any) => {
    setBooksPerPage(Number(selectedOption.value));
    setCurrentPage(1);
  };

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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleMenuBar = () => {
    setIsMenuBarOpen(!isMenuBarOpen);
  };

  return (
    <>
      <FixedTopMenuBar>
        <Title>Book Collection</Title>
        {isMenuBarOpen && (
          <>
            <ButtonContainer>
              <Button
                onClick={() => navigate("/add")}
                aria-label="Add New Book"
              >
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                Add New Book
              </Button>
              <Button
                onClick={() => setUsePagination(!usePagination)}
                aria-label={
                  usePagination ? "Disable Pagination" : "Enable Pagination"
                }
              >
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
                    aria-label="Books per page selection"
                  />
                </>
              )}
              <label htmlFor="search">Search for Title or Author:</label>
              <input
                type="text"
                id="search"
                style={{ height: "2rem" }}
                value={searchQuery}
                placeholder="Search for Title or Author"
                onChange={handleSearchChange}
                aria-label="Search for Title or Author"
              />

              <label htmlFor="sort">Sort by: </label>
              <Select
                className="dropdown"
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
                aria-label="Sort by selection"
              />

              <label htmlFor="filterGenres">Filter By Genres: </label>
              <Select
                id="filterGenres"
                isMulti
                className="dropdown"
                options={genres.map((g) => ({
                  value: g.value,
                  label: g.label,
                }))}
                value={selectedGenres}
                onChange={handleGenreChange}
                placeholder="Select Genres"
                aria-label="Filter by Genres"
              />
            </FilterOptionsContainer>
          </>
        )}
        <FontAwesomeIcon
          icon={isMenuBarOpen ? faChevronUp : faChevronDown}
          onClick={toggleMenuBar}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          aria-label={isMenuBarOpen ? "Collapse menu bar" : "Expand menu bar"}
        />
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
              aria-label={`Go to page ${index + 1}`}
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
