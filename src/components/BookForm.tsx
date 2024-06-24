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
import { AuthorName, Genre } from "../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import SubmissionStatus from "./SubmissionStatus";

interface BookFormProps {
  initialValues?: {
    title: string;
    author: AuthorName;
    year: string;
    genre: Genre[];
  };
  onSubmit: (formData: {
    title: string;
    author: AuthorName;
    year: number;
    genre: Genre[];
  }) => Promise<boolean>;
  submitButtonLabel: string;
  genres: Genre[];
}

const BookForm: React.FC<BookFormProps> = ({
  initialValues = {
    title: "",
    author: { firstName: "", lastName: "" },
    year: "",
    genre: [],
  },
  onSubmit,
  submitButtonLabel,
  genres,
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [author, setAuthor] = useState<AuthorName>(initialValues.author);
  const [year, setYear] = useState(initialValues.year);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    initialValues.genre
  );

  //validation error states
  const [titleError, setTitleError] = useState("");
  const [authorLastNameError, setAuthorLastNameError] = useState("");
  const [authorFirstNameError, setAuthorFirstNameError] = useState("");
  const [yearError, setYearError] = useState("");
  const [genreError, setGenreError] = useState("");

  //submission status
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "Submitting..." | "Success" | "Error"
  >("idle");

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(initialValues.title);
    setAuthor(initialValues.author);
    setYear(initialValues.year);
    setSelectedGenres(initialValues.genre);
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (title.length > 50) {
      setTitleError("Title cannot exceed 50 characters.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (author.firstName.length > 30) {
      setAuthorFirstNameError("First name cannot exceed 30 characters.");
      isValid = false;
    } else {
      setAuthorFirstNameError("");
    }

    if (author.lastName.length > 30) {
      setAuthorLastNameError("Last name cannot exceed 30 characters.");
      isValid = false;
    } else {
      setAuthorLastNameError("");
    }

    const parsedYear = parseInt(year, 10);
    if (parsedYear > 2024 || parsedYear < 0) {
      setYearError("Year must be >= 0 and <= 2024");
      isValid = false;
    } else {
      setYearError("");
    }

    if (selectedGenres.length > 5) {
      setGenreError("Select up to 5 genres");
      isValid = false;
    } else {
      setGenreError("");
    }

    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [title, author, year, selectedGenres]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmissionStatus("Error");
      return;
    }
    const parsedYear = parseInt(year, 10);
    setSubmissionStatus("Submitting...");

    //if no validation errors, try to submit the form
    try {
      const isSuccess = await onSubmit({
        title,
        author,
        year: parsedYear,
        genre: selectedGenres,
      });

      if (isSuccess) {
        console.log("is Success ", isSuccess);
        //reset form fields after successful submission
        setTitle("");
        setAuthor({ firstName: "", lastName: "" });
        setYear("");
        setSelectedGenres([]);
        setSubmissionStatus("Success");
        //navigate to home page after 1.5 seconds
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setSubmissionStatus("Error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("Error");
    }
  };

  const handleGenreChange = (selectedOptions: any) => {
    setSelectedGenres(selectedOptions);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {titleError && <ErrorMessage role="alert">{titleError}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={author.firstName}
          onChange={(e) => setAuthor({ ...author, firstName: e.target.value })}
          required
        />
        {authorFirstNameError && (
          <ErrorMessage role="alert">{authorFirstNameError}</ErrorMessage>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={author.lastName}
          onChange={(e) => setAuthor({ ...author, lastName: e.target.value })}
          required
        />
        {authorLastNameError && (
          <ErrorMessage role="alert">{authorLastNameError}</ErrorMessage>
        )}
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
        {yearError && <ErrorMessage role="alert">{yearError}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <label htmlFor="genre">Genre:</label>
        <Select
          id="genre"
          className="dropdown"
          isMulti
          options={genres.map((g) => ({ value: g.value, label: g.label }))}
          value={selectedGenres}
          onChange={handleGenreChange}
          required
        />
        {genreError && <ErrorMessage role="alert">{genreError}</ErrorMessage>}
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" aria-label={submitButtonLabel}>
          <FontAwesomeIcon icon={faFloppyDisk} style={{ marginRight: "5px" }} />
          {submitButtonLabel}
        </Button>
        <Button
          onClick={() => navigate("/")}
          aria-label="Cancel and go back to home"
        >
          <FontAwesomeIcon icon={faBan} style={{ marginRight: "5px" }} />
          Cancel
        </Button>
      </ButtonContainer>
      <div style={{ textAlign: "center" }}>
        <SubmissionStatus status={submissionStatus} />
      </div>
    </FormContainer>
  );
};

export default BookForm;
