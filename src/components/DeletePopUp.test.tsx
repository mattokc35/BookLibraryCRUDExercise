import { render, fireEvent, screen } from "@testing-library/react";
import DeletePopUp from "./DeletePopUp";
import "@testing-library/jest-dom";

describe("DeletePopUp Component", () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();
  const title = "Test Book";

  beforeEach(() => {
    onCloseMock.mockClear();
    onConfirmMock.mockClear();
  });

  it("renders with correct title and content when isOpen is true", () => {
    render(
      <DeletePopUp
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        title={title}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete this book\?/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <DeletePopUp
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        title={title}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when Confirm button is clicked", () => {
    render(
      <DeletePopUp
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        title={title}
      />
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
