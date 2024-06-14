import { Book, Genre } from "../types/Types";

//these should probably be an environment variables
const API_URL = "http://localhost:5001/books";
const GENRES_URL = "http://localhost:5001/genres";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const fetchBooks = async (): Promise<Book[]> => {
  return request<Book[]>(API_URL);
};

export const addBook = async (book: Omit<Book, "id">): Promise<Book> => {
  return request<Book>(API_URL, {
    method: "POST",
    body: JSON.stringify(book),
  });
};

export const updateBook = async (book: Book): Promise<void> => {
  await request<void>(`${API_URL}/${book.id}`, {
    method: "PUT",
    body: JSON.stringify(book),
  });
};

export const deleteBook = async (id: string): Promise<void> => {
  await request<void>(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const fetchGenres = async (): Promise<Genre[]> => {
  return request<Genre[]>(GENRES_URL);
};
