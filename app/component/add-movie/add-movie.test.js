import AddMovie from "./add-movie.component";
import { fireEvent, render, waitFor } from "@testing-library/react";

test("renders Add Movie component", () => {
  const { getByTestId } = render(<AddMovie />);

  const addMovieContainer = getByTestId("add-movie-container");
  expect(addMovieContainer).toBeInTheDocument();

  const addMovieButton = getByTestId("add-movie-button");
  expect(addMovieButton).toBeInTheDocument();

  fireEvent.click(addMovieButton);

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

  fireEvent.click(addMovieButton);
  const dialogButton = getByTestId("dialog-button");
  expect(dialogButton).toBeInTheDocument();

  fireEvent.click(dialogButton);
  waitFor(() => {
    expect(screen.queryByTestId("dialog-container")).toBeNull();
  });
});
