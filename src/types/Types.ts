export interface Book {
  id: string;
  title: string;
  author: AuthorName;
  year: number;
  genre: Genre[];
}

export interface Genre {
  value: string;
  label: string;
}

export interface AuthorName {
  firstName: string;
  lastName: string;
}
