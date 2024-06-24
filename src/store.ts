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
  serverError: boolean;
  fetchBooks: () => void;
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  fetchGenres: () => void;
}

const useStore = create<StoreState>((set) => ({
  books: [],
  genres: [],
  serverError: false,
  fetchBooks: async () => {
    try {
      const books = await fetchBooks();
      set({ books });
    } catch (error) {
      set((state) => ({ ...state, serverError: true }));
      console.error("Failed to fetch books:", error);
    }
  },
  addBook: async (book) => {
    try {
      const newBook = await addBook(book);
      set((state) => ({ books: [...state.books, newBook] }));
    } catch (error) {
      set((state) => ({ ...state, serverError: true }));
      console.error("Failed to add book:", error);
      throw error;
    }
  },
  updateBook: async (book) => {
    try {
      await updateBook(book);
      set((state) => ({
        books: state.books.map((b) => (b.id === book.id ? book : b)),
      }));
    } catch (error) {
      set((state) => ({ ...state, serverError: true }));
      console.error("Failed to update book:", error);
      throw error;
    }
  },
  deleteBook: async (id: string) => {
    try {
      await deleteBook(id);
      set((state) => ({
        books: state.books.filter((book) => book.id !== id),
      }));
    } catch (error) {
      set((state) => ({ ...state, serverError: true }));
      console.error("Failed to delete book:", error);
      throw error;
    }
  },
  fetchGenres: async () => {
    try {
      const genres = await fetchGenres();
      set({ genres });
    } catch (error) {
      set((state) => ({ ...state, serverError: true }));
      console.error("Failed to fetch genres:", error);
    }
  },
}));

export default useStore;
