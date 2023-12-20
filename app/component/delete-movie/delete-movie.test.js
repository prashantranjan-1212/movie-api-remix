import DeleteMovie from "./delete-movie.component";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";

test("renders Delete Movie component", () => {
  const { getByTestId } = render(<DeleteMovie />);

  const deleteMovieContainer = getByTestId("delete-movie-container");
  expect(deleteMovieContainer).toBeInTheDocument();

  const deleteButton = getByTestId("delete-movie-button");
  expect(deleteButton).toBeInTheDocument();

  fireEvent.click(deleteButton);

  const dialogContainer = getByTestId("dialog-container");
  expect(dialogContainer).toBeInTheDocument();

  const dialogTitle = getByTestId("dialog-title");
  expect(dialogTitle).toBeInTheDocument();

  const dialogChilden = getByTestId("dialog-children");
  expect(dialogChilden).toBeInTheDocument();

  const deletMovieConfirmText = getByTestId("delete-movie-confirm-text");
  expect(deletMovieConfirmText).toBeInTheDocument();
  expect(deletMovieConfirmText).toHaveTextContent(
    "Are you sure you want to delete this movie?"
  );

  const deletMovieConfirmButton = getByTestId("delete-movie-confirm-button");
  expect(deletMovieConfirmButton).toBeInTheDocument();

  fireEvent.click(deletMovieConfirmButton);
  waitFor(() => {
    expect(screen.queryByTestId("dialog-container")).toBeNull();
  });
});
