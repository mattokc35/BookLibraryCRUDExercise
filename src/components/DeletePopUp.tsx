import React from "react";
import {
  DeleteTitle,
  Button,
  ButtonContainer,
  PopupContainer,
} from "./styled/styledComponents";

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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </ButtonContainer>
    </PopupContainer>
  );
};

export default DeletePopUp;
