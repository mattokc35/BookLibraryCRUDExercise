import React from "react";
import useStore from "../store";
import BookForm from "../components/BookForm";
import { AuthorName, Genre } from "../types/Types";
import { FormTitle } from "../components/styled/styledComponents";

const AddBook: React.FC = () => {
  const addBook = useStore((state) => state.addBook);
  const { genres } = useStore();

  const handleSubmit = async (formData: {
    title: string;
    author: AuthorName;
    year: number;
    genre: Genre[];
  }): Promise<boolean> => {
    try {
      await addBook(formData);
      return true;
    } catch (error) {
      console.error("Error adding book:", error);
      return false;
    }
  };

  return (
    <div>
      <FormTitle>Add New Book</FormTitle>
      <BookForm
        onSubmit={handleSubmit}
        submitButtonLabel="Add Book"
        genres={genres}
      />
    </div>
  );
};

export default AddBook;
