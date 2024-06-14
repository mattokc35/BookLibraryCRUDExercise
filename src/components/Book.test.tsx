import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Book from "./Book";
import { Book as BookType } from "../types/Types";

//mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Book Component", () => {
  const mockBook: BookType = {
    id: "1",
    title: "Test Book",
    author: "Test Author",
    year: 2023,
    genre: [
      { value: "fiction", label: "Fiction" },
      { value: "adventure", label: "Adventure" },
    ],
  };

  const onDeleteMock = jest.fn();

  beforeEach(() => {
    onDeleteMock.mockClear();
    mockNavigate.mockClear();
  });

  it("renders book details correctly", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} onDelete={onDeleteMock} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(mockBook.author)).toBeInTheDocument();
    expect(screen.getByText(mockBook.year)).toBeInTheDocument();
    expect(screen.getByText(mockBook.genre[1].label)).toBeInTheDocument();
  });

  it("calls navigate to edit page when Edit button is clicked", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} onDelete={onDeleteMock} />
      </MemoryRouter>
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/edit/${mockBook.id}`);
  });

  it("opens delete popup when Delete button is clicked", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} onDelete={onDeleteMock} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.getByText(`Delete "${mockBook.title}"`)).toBeInTheDocument();
  });

  it("calls onDelete function when delete is confirmed", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} onDelete={onDeleteMock} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(onDeleteMock).toHaveBeenCalledWith(mockBook.id);
  });

  it("cancels delete operation when cancel button is clicked", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} onDelete={onDeleteMock} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(
      screen.queryByText(`Delete "${mockBook.title}"`)
    ).not.toBeInTheDocument();
  });
});
