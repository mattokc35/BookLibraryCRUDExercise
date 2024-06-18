import { render, screen } from "@testing-library/react";
import BookForm from "./BookForm";
import "@testing-library/jest-dom";
import { Genre } from "../types/Types";
import { MemoryRouter } from "react-router-dom";

const genres: Genre[] = [
  { value: "fiction", label: "Fiction" },
  { value: "fantasy", label: "Fantasy" },
];

const initialValues = {
  title: "Sample Book Title",
  author: { firstName: "John", lastName: "Doe" },
  year: "2022",
  genre: [genres[0]],
};

test("renders BookForm component with initial values", () => {
  render(
    <MemoryRouter>
      <BookForm
        initialValues={initialValues}
        onSubmit={jest.fn()}
        submitButtonLabel="Submit"
        genres={genres}
      />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText("Title:");
  expect(titleInput).toBeInTheDocument();
  expect(titleInput).toHaveValue("Sample Book Title");

  const authorInput = screen.getByLabelText("Author:");
  expect(authorInput).toBeInTheDocument();
  expect(authorInput).toHaveValue("John Doe");

  const yearInput = screen.getByLabelText("Year Published:");
  expect(yearInput).toBeInTheDocument();
  expect(yearInput).toHaveValue(2022);

  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeInTheDocument();
});
test("renders BookForm component without initial values", () => {
  render(
    <MemoryRouter>
      <BookForm
        onSubmit={jest.fn()}
        submitButtonLabel="Submit"
        genres={genres}
      />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText("Title:");
  expect(titleInput).toBeInTheDocument();
  expect(titleInput).toHaveValue("");

  const authorInput = screen.getByLabelText("Author:");
  expect(authorInput).toBeInTheDocument();
  expect(authorInput).toHaveValue("");

  const yearInput = screen.getByLabelText("Year Published:");
  expect(yearInput).toBeInTheDocument();
  expect(yearInput).toHaveValue(null);

  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeInTheDocument();
});
