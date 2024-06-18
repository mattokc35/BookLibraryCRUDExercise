import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
  fetchGenres,
} from "./networkRequests";
import { Book, Genre } from "../types/Types";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const API_URL = "http://localhost:5001/books";

describe("API Functions", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("fetchBooks", () => {
    it("fetches books successfully", async () => {
      const mockBooks: Book[] = [
        {
          id: "1",
          title: "Book 1",
          author: { firstName: "Author", lastName: "1" },
          year: 2020,
          genre: [],
        },
        {
          id: "2",
          title: "Book 2",
          author: { firstName: "Author", lastName: "2" },
          year: 2021,
          genre: [],
        },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockBooks,
      });

      const books = await fetchBooks();
      expect(books).toEqual(mockBooks);
    });

    it("throws an error when fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(fetchBooks()).rejects.toThrow("Network response was not ok");
    });
  });

  describe("addBook", () => {
    it("adds a book successfully", async () => {
      const newBook: Omit<Book, "id"> = {
        title: "New Book",
        author: { firstName: "New", lastName: "Author" },
        year: 2022,
        genre: [],
      };
      const returnedBook: Book = { ...newBook, id: "3" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => returnedBook,
      });

      const addedBook = await addBook(newBook);
      expect(addedBook).toEqual(returnedBook);
      expect(mockFetch).toHaveBeenCalledWith(API_URL, {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: { "Content-Type": "application/json" },
      });
    });

    it("throws an error when adding book fails", async () => {
      const newBook: Omit<Book, "id"> = {
        title: "New Book",
        author: { firstName: "New", lastName: "Author" },
        year: 2022,
        genre: [],
      };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(addBook(newBook)).rejects.toThrow(
        "Network response was not ok"
      );
      expect(mockFetch).toHaveBeenCalledWith(API_URL, {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: { "Content-Type": "application/json" },
      });
    });
  });

  describe("updateBook", () => {
    it("updates a book successfully", async () => {
      const updatedBook: Book = {
        id: "1",
        title: "Updated Book",
        author: { firstName: "Updated", lastName: "Author" },
        year: 2023,
        genre: [],
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => undefined,
      });

      await updateBook(updatedBook);
      expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/${updatedBook.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedBook),
        headers: { "Content-Type": "application/json" },
      });
    });

    it("throws an error when updating book fails", async () => {
      const updatedBook: Book = {
        id: "1",
        title: "Updated Book",
        author: { firstName: "Updated", lastName: "Author" },
        year: 2023,
        genre: [],
      };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
      });

      await expect(updateBook(updatedBook)).rejects.toThrow(
        "Network response was not ok"
      );
      expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/${updatedBook.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedBook),
        headers: { "Content-Type": "application/json" },
      });
    });
  });

  describe("deleteBook", () => {
    it("deletes a book successfully", async () => {
      const bookId = "1";
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => undefined,
      });

      await deleteBook(bookId);
    });

    it("throws an error when deleting book fails", async () => {
      const bookId = "1";
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: "Forbidden",
      });

      await expect(deleteBook(bookId)).rejects.toThrow(
        "Network response was not ok"
      );
    });
  });

  describe("fetchGenres", () => {
    it("fetches genres successfully", async () => {
      const mockGenres: Genre[] = [
        { value: "fiction", label: "Fiction" },
        { value: "adventure", label: "Adventure" },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGenres,
      });

      const genres = await fetchGenres();
      expect(genres).toEqual(mockGenres);
    });

    it("throws an error when fetch genres fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(fetchGenres()).rejects.toThrow(
        "Network response was not ok"
      );
    });
  });
});
