import { create } from "zustand";
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
  fetchGenres,
} from "./network/networkRequests";
import { Book, Genre } from "./types/Types";

interface StoreState {
  books: Book[];
  genres: Genre[];
  fetchBooks: () => void;
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  fetchGenres: () => void;
}

const useStore = create<StoreState>((set) => ({
  books: [],
  genres: [],
  fetchBooks: async () => {
    try {
      const books = await fetchBooks();
      set({ books });
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  },
  addBook: async (book) => {
    try {
      const newBook = await addBook(book);
      set((state) => ({ books: [...state.books, newBook] }));
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  },
  updateBook: async (book) => {
    try {
      await updateBook(book);
      set((state) => ({
        books: state.books.map((b) => (b.id === book.id ? book : b)),
      }));
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  },
  deleteBook: async (id: string) => {
    try {
      await deleteBook(id);
      set((state) => ({
        books: state.books.filter((book) => book.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  },
  fetchGenres: async () => {
    try {
      const genres = await fetchGenres();
      set({ genres });
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  },
}));

export default useStore;
