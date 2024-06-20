import React from "react";

interface SubmissionStatusProps {
  status:
    | "idle"
    | "Submitting..."
    | "Success"
    | "Error"
    | "Deleting..."
    | "Delete Success"
    | "Delete Failed";
}

const SubmissionStatus: React.FC<SubmissionStatusProps> = ({ status }) => {
  let message = "";
  let color = "";

  switch (status) {
    case "Success":
      message = "Form submitted successfully. Redirecting back to home page...";
      color = "green";
      break;
    case "Error":
      message = "Error submitting form. Please try again.";
      color = "red";
      break;
    case "Submitting...":
      message = "Submitting...";
      color = "blue";
      break;
    case "Deleting...":
      message = "Deleting...";
      color = "blue";
      break;
    case "Delete Success":
      message = "Book deleted successfully.";
      color = "green";
      break;
    case "Delete Failed":
      message = "Error deleting book. Please try again.";
      color = "red";
      break;
    default:
      return null;
  }

  return (
    <p role="alert" style={{ color }}>
      {message}
    </p>
  );
};

export default SubmissionStatus;
