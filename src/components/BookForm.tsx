import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  FormContainer,
  FormGroup,
  Button,
  ErrorMessage,
  ButtonContainer,
} from "./styled/styledComponents";
import { Genre } from "../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

interface BookFormProps {
  initialValues?: {
    title: string;
    author: string;
    year: string;
    genre: Genre[];
  };
  onSubmit: (formData: {
    title: string;
    author: string;
    year: number;
    genre: Genre[];
  }) => void;
  submitButtonLabel: string;
  genres: Genre[];
}

const BookForm: React.FC<BookFormProps> = ({
  initialValues = {
    title: "",
    author: "",
    year: "",
    genre: [],
  },
  onSubmit,
  submitButtonLabel,
  genres,
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [author, setAuthor] = useState(initialValues.author);
  const [year, setYear] = useState(initialValues.year);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    initialValues.genre
  );

  //validation error states
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [yearError, setYearError] = useState("");
  const [genreError, setGenreError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(initialValues.title);
    setAuthor(initialValues.author);
    setYear(initialValues.year);
    setSelectedGenres(initialValues.genre);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //validate title length
    if (title.length > 50) {
      setTitleError("Title cannot exceed 50 characters");
      return;
    } else {
      setTitleError("");
    }

    //validate author name length
    if (author.length > 30) {
      setAuthorError("Author name cannot exceed 30 characters");
      return;
    } else {
      setAuthorError("");
    }

    //validate year
    const parsedYear = parseInt(year, 10);
    if (parsedYear > 2024 || parsedYear < 0) {
      setYearError(
        "Year must be greater than or equal to 0 and less than or equal 2024"
      );
      return;
    } else {
      setYearError("");
    }

    //validate genres
    if (selectedGenres.length > 5) {
      setGenreError("Select up to 5 genres");
      return;
    } else {
      setGenreError("");
    }

    //if no validation errors, submit the form
    onSubmit({
      title,
      author,
      year: parsedYear,
      genre: selectedGenres,
    });

    //reset form fields after submission
    setTitle("");
    setAuthor("");
    setYear("");
    setSelectedGenres([]);

    //navigate to home page after submission
    navigate("/");
  };

  const handleGenreChange = (selectedOptions: any) => {
    setSelectedGenres(selectedOptions);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          {authorError && <ErrorMessage>{authorError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="year">Year Published:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          {yearError && <ErrorMessage>{yearError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="genre">Genre:</label>
          <Select
            id="genre"
            isMulti
            options={genres.map((g) => ({ value: g.value, label: g.label }))}
            value={selectedGenres}
            onChange={handleGenreChange}
            required
          />
          {genreError && <ErrorMessage>{genreError}</ErrorMessage>}
        </FormGroup>
        <ButtonContainer>
          <Button type="submit">
            <FontAwesomeIcon
              icon={faFloppyDisk}
              style={{ marginRight: "5px" }}
            />
            {submitButtonLabel}
          </Button>
          <Button onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faBan} style={{ marginRight: "5px" }} />
            Cancel
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default BookForm;
