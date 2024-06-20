import React, { useState } from "react";
import {
  DeleteTitle,
  Button,
  ButtonContainer,
  PopupContainer,
} from "./styled/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import SubmissionStatus from "./SubmissionStatus";

interface DeletePopUp {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<boolean>;
  title: string;
}

const DeletePopUp: React.FC<DeletePopUp> = ({
  isOpen,
  onClose,
  onDelete,
  title,
}) => {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "Deleting..." | "Delete Success" | "Delete Failed"
  >("idle");

  const handleConfirmDelete = async (): Promise<void> => {
    try {
      setSubmissionStatus("Deleting..."); // Set status to Deleting...
      const isSuccess = await onDelete();
      if (isSuccess) {
        setSubmissionStatus("Delete Success"); // Set status to Delete Success
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setSubmissionStatus("Delete Failed"); // Set status to Delete Failed if onConfirm returns false
      }
    } catch (error) {
      setSubmissionStatus("Delete Failed"); // Set status to Delete Failed on exception
      console.error("Error deleting book:", error);
    }
  };
  return (
    <PopupContainer isOpen={isOpen}>
      <DeleteTitle>{title}</DeleteTitle>
      <div style={{ marginBottom: "20px" }}>
        Are you sure you want to delete this book?
      </div>
      <SubmissionStatus status={submissionStatus} />
      <ButtonContainer>
        <Button onClick={onClose} aria-label="Cancel Deletion">
          <FontAwesomeIcon icon={faBan} style={{ marginRight: "5px" }} />
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} aria-label="Confirm Deletion">
          <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
          Confirm
        </Button>
      </ButtonContainer>
    </PopupContainer>
  );
};

export default DeletePopUp;
