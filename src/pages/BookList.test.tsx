import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import BookList from "./BookList";
import useStore from "../store";

jest.mock("../store", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

const mockBooks = [
  {
    id: "1",
    title: "Test Book 1",
    author: "Author 1",
    year: 2015,
    genre: [
      { value: "fiction", label: "Fiction" },
      { value: "adventure", label: "Adventure" },
    ],
  },
  {
    id: "2",
    title: "Test Book 2",
    author: "Author 2",
    year: 2016,
    genre: [
      { value: "non-fiction", label: "Non-Fiction" },
      { value: "history", label: "History" },
    ],
  },
];

mockUseStore.mockReturnValue({
  books: mockBooks,
  fetchBooks: jest.fn(),
  deleteBook: jest.fn(),
  fetchGenres: jest.fn(),
});

const renderComponent = () =>
  render(
    <BrowserRouter>
      <BookList />
    </BrowserRouter>
  );

describe("BookList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders book list correctly", () => {
    renderComponent();

    expect(screen.getByText("Book Collection")).toBeInTheDocument();
    expect(screen.getByText("Test Book 1")).toBeInTheDocument();
    expect(screen.getByText("Test Book 2")).toBeInTheDocument();
  });

  it("navigates to add new book page when Add New Book button is clicked", () => {
    renderComponent();
    const addButton = screen.getByText("Add New Book");
    fireEvent.click(addButton);

    expect(window.location.pathname).toBe("/add");
  });

  it("toggles pagination on and off", () => {
    renderComponent();

    const toggleButton = screen.getByText("Disable Pagination");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Enable Pagination")).toBeInTheDocument();
  });

  it("searches for books by title or author", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("Search For Title or Author:"), {
      target: { value: "Test Book 1" },
    });

    expect(screen.getByText("Test Book 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Book 2")).not.toBeInTheDocument();
  });
});
