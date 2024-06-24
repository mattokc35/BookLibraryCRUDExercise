import React from "react";
import { useParams } from "react-router-dom";
import useStore from "../store";
import { AuthorName, Genre } from "../types/Types";
import BookForm from "../components/BookForm";
import { FormTitle } from "../components/styled/styledComponents";
import { Link } from "react-router-dom";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, updateBook, genres } = useStore();

  const book = books.find((b) => b.id === id);

  const handleSubmit = async (formData: {
    title: string;
    author: AuthorName;
    year: number;
    genre: Genre[];
  }): Promise<boolean> => {
    if (id) {
      try {
        await updateBook({ id, ...formData });
        return true;
      } catch (error) {
        return false;
      }
    } else {
      console.error("Cannot update book: id is undefined.");
      return false;
    }
  };

  if (!book) {
    return (
      <>
        <h2 role="alert">No Book Found.</h2>
        <Link to="/" aria-label="Go back home">
          Click here to go home
        </Link>
      </>
    );
  }

  return (
    <>
      <FormTitle>Edit Book</FormTitle>
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
    </>
  );
};

export default EditBook;
