import styled from "styled-components";

export const BookCard = styled.div`
  border: 15px solid #aedbf2;
  border-radius: 50px;
  padding: 30px;
  margin-bottom: 16px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  width: 250px;
  max-height: 250px;
  max-width: 250px;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

export const BookTitle = styled.h3`
  margin-bottom: 2px;
  font-style: italic;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const Button = styled.button`
  background-color: #f5f5f5;
  color: #black;
  padding: 7px 20px;
  border-radius: 40px;
  border: 5px solid #aedbf2;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: #aedbf2;
    font-weight: 900;
    font-size: 87%;
    background-color: #black;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

export const FixedTopMenuBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #aedbf2;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 900px) {
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.15), 0 0 7px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 20px 20px;
  }
`;

export const FilterOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  input {
    border-radius: 10px;
    width: 16%;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    .dropdown {
      width: 80%;
    }
    input {
      width: 78%;
    }
    label {
      width: 100%;
      text-align: center;
    }
  }
`;

export const BookGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

export const FormContainer = styled.div`
  margin: auto;
  padding: 40px;
  width: 40%;
  border: 15px solid #aedbf2;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  .dropdown {
    width: 92%;
  }
  @media (max-width: 900px) {
    width: 90%;
    border: none;
    .dropdown {
      width: 94%;
    }
    border-radius: none;
    box-shadow: none;
    padding: 20px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 20px;
  }

  input {
    width: 90%;
    padding: 5px;
    font-size: 25px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  @media (max-width: 900px) {
    margin-bottom: 40px;
    label {
      font-size: 18px;
      text-align: auto;
    }

    input {
      font-size: 16px;
    }
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

export const DeleteTitle = styled.h3`
  text-align: center;
`;

export const PopupContainer = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  z-index: 1001;
`;

export const PaginationButton = styled.button<{ currentPage: boolean }>`
  font-weight: ${(props) => (props.currentPage ? "bold" : "normal")};
  text-decoration: none;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.currentPage ? "#aedbf2" : "white")};
  color: ${(props) => (props.currentPage ? "black" : "#black")};
`;

export const PaginationContainer = styled.div`
  position: relative;
  bottom: 20px;
  left: 50%;
  margin-top: 10px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.85em;
  margin-top: 0.25rem;
`;
