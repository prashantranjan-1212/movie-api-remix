import { fireEvent, render } from "@testing-library/react";
import GenreSelect from "./genre-select.component";

test("renders GenreSelect component with all props", () => {
  const genres = [
    "Comedy",
    "Sci-fi",
    "Fantasy",
    "Thriller",
    "Action",
    "Documentary",
  ];

  const { getByTestId } = render(
    <GenreSelect genres={genres} selectedGenre="" onSelect={() => {}} />
  );

  genres.forEach((genre) => {
    const genreButton = getByTestId(genre);
    expect(genreButton).toBeInTheDocument();
  });
});

test("Highlight slected genre button", () => {
  const genres = [
    "Comedy",
    "Sci-fi",
    "Fantasy",
    "Thriller",
    "Action",
    "Documentary",
  ];
  const selectedGenre = "Documentary";

  const { getByTestId } = render(
    <GenreSelect
      genres={genres}
      selectedGenre={selectedGenre}
      onSelect={() => {}}
    />
  );

  const genreButton = getByTestId(selectedGenre);
  expect(genreButton).toHaveStyle("background-color: DodgerBlue");
});

test("test onselect callback function", () => {
  const genres = [
    "Comedy",
    "Sci-fi",
    "Fantasy",
    "Thriller",
    "Action",
    "Documentary",
  ];
  const selectedGenre = "Action";
  const onSelect = jest.fn();

  const { getByTestId } = render(
    <GenreSelect
      genres={genres}
      selectedGenre={selectedGenre}
      onSelect={onSelect}
    />
  );

  const genreButton = getByTestId(selectedGenre);
  fireEvent.click(genreButton);

  expect(genreButton).toHaveStyle("background-color: DodgerBlue");
  expect(onSelect).toHaveBeenCalledWith(selectedGenre);
});
