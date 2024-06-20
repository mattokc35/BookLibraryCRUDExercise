import React from "react";
import { useParams } from "react-router-dom";
import useStore from "../store";
import { AuthorName, Genre } from "../types/Types";
import BookForm from "../components/BookForm";
import { Title } from "../components/styled/styledComponents";
import { Link } from "react-router-dom";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, updateBook, genres } = useStore();

  const book = books.find((b) => b.id === id);

  const handleSubmit = (formData: {
    title: string;
    author: AuthorName;
    year: number;
    genre: Genre[];
  }) => {
    if (id) {
      updateBook({ id, ...formData });
    } else {
      console.error("Cannot update book: id is undefined.");
    }
  };

  if (!book) {
    return (
      <>
        <div>No Book Found.</div>
        <Link to="/" aria-label="Go back home">
          Click here to go home
        </Link>
      </>
    );
  }

  return (
    <div>
      <Title>Edit Book</Title>
      <BookForm
        initialValues={{
          title: book.title,
          author: book.author,
          year: book.year.toString(),
          genre: book.genre,
        }}
        onSubmit={handleSubmit}
        submitButtonLabel="Update Book"
        genres={genres}
      />
    </div>
  );
};

export default EditBook;
