import React from "react";
import {
  DeleteTitle,
  Button,
  ButtonContainer,
  PopupContainer,
} from "./styled/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";

interface DeletePopUp {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const DeletePopUp: React.FC<DeletePopUp> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}) => {
  return (
    <PopupContainer isOpen={isOpen}>
      <DeleteTitle>{title}</DeleteTitle>
      <div style={{ marginBottom: "20px" }}>
        Are you sure you want to delete this book?
      </div>
      <ButtonContainer>
        <Button onClick={onClose} aria-label="Cancel Deletion">
          <FontAwesomeIcon icon={faBan} style={{ marginRight: "5px" }} />
          Cancel
        </Button>
        <Button onClick={onConfirm} aria-label="Confirm Deletion">
          <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
          Confirm
        </Button>
      </ButtonContainer>
    </PopupContainer>
  );
};

export default DeletePopUp;
