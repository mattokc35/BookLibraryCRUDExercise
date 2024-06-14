export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: Genre[];
}

export interface Genre {
  value: string;
  label: string;
}
