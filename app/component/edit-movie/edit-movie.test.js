import EditMovie from "./edit-movie.component";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";

test("renders Edit Movie component", () => {
  const { getByTestId } = render(<EditMovie />);

  const addMovieContainer = getByTestId("edit-movie-container");
  expect(addMovieContainer).toBeInTheDocument();

  const editMovieButton = getByTestId("edit-movie-button");
  expect(editMovieButton).toBeInTheDocument();

  fireEvent.click(editMovieButton);

  const dialogContainer = getByTestId("dialog-container");
  expect(dialogContainer).toBeInTheDocument();

  const dialogTitle = getByTestId("dialog-title");
  expect(dialogTitle).toBeInTheDocument();

  const dialogChilden = getByTestId("dialog-children");
  expect(dialogChilden).toBeInTheDocument();

  const movieFormContainer = getByTestId("movie-form-container");
  expect(movieFormContainer).toBeInTheDocument();

  const movieFormSubmit = getByTestId("movie-form-submit");
  expect(movieFormSubmit).toBeInTheDocument();

  fireEvent.click(movieFormSubmit);
  waitFor(() => {
    expect(screen.queryByTestId("dialog-container")).toBeNull();
  });

  fireEvent.click(editMovieButton);
  const dialogButton = getByTestId("dialog-button");
  expect(dialogButton).toBeInTheDocument();

  fireEvent.click(dialogButton);
  waitFor(() => {
    expect(screen.queryByTestId("dialog-container")).toBeNull();
  });
});
