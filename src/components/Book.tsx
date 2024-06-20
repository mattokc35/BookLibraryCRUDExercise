import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book as BookType } from "../types/Types";
import DeletePopUp from "./DeletePopUp";
import {
  BookCard,
  BookTitle,
  Button,
  ButtonContainer,
} from "./styled/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface BookProps {
  book: BookType;
  onDelete: (id: string) => void;
}

const Book: React.FC<BookProps> = ({ book, onDelete }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setPopupOpen(true);
  };

  const handleDeleteRequest = async (): Promise<boolean> => {
    try {
      await onDelete(book.id);
      return true;
    } catch (error) {
      console.error("Error adding book:", error);
      return false;
    }
  };

  const handleCancel = () => {
    setPopupOpen(false);
  };

  return (
    <article aria-labelledby={`book-title-${book.title}`}>
      <BookCard>
        {isPopupOpen ? (
          <>
            <DeletePopUp
              isOpen={isPopupOpen}
              onClose={handleCancel}
              onDelete={handleDeleteRequest}
              title={`Delete "${book.title}"`}
            />
          </>
        ) : (
          <>
            <BookTitle>{book.title}</BookTitle>
            <section>
              <p>
                <strong>Author:</strong>{" "}
                {book.author.firstName + " " + book.author.lastName}
              </p>
              <p>
                <strong>Year Published:</strong> {book.year}
              </p>
              <p>
                <strong>Genre:</strong>{" "}
                {book.genre.map((g, index) => (
                  <span key={g.value}>
                    {g.label}
                    {index !== book.genre.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </section>
            <ButtonContainer>
              <Button
                onClick={() => navigate(`/edit/${book.id}`)}
                aria-label={"Edit this book: " + book.title}
              >
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                Edit
              </Button>
              <Button
                onClick={handleDeleteClick}
                aria-label={"Delete this book: " + book.title}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ marginRight: "5px" }}
                />
                Delete
              </Button>
            </ButtonContainer>
          </>
        )}
      </BookCard>
    </article>
  );
};

export default Book;
