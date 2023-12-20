import MovieForm from "./movie-form.component";
import { fireEvent, render } from "@testing-library/react";

test("renders Movie Form component", () => {
	const onSubmit = jest.fn();
	const movieInfo = {
		title: "Jawan",
		releaseDate: "2023-02-26",
		movieUrl: "https://google.com/movie",
		rating: 8,
		genre: "Action",
		runtime: "120",
		overview: "A Master Peice",
	};

	const { getByTestId } = render(
		<MovieForm
			movieInfo={movieInfo}
			onSubmit={onSubmit}
		/>
	);

	const movieFormConatiner = getByTestId("movie-form-container");
	expect(movieFormConatiner).toBeInTheDocument();

	const titleLable = getByTestId("title-label");
	expect(titleLable).toHaveTextContent("TITLE");

	const titleInput = getByTestId("title-input");
	expect(titleInput).toHaveValue("Jawan");

	const releaseDateLabel = getByTestId("release-date-label");
	expect(releaseDateLabel).toHaveTextContent("RELEASE DATE");

	const releaseDateInput = getByTestId("release-date-input");
	expect(releaseDateInput).toHaveValue("2023-02-26");

	const movieUrlLabel = getByTestId("movie-url-label");
	expect(movieUrlLabel).toHaveTextContent("MOVIE URL");

	const movieUrlInput = getByTestId("movie-url-input");
	expect(movieUrlInput).toHaveValue("https://google.com/movie");

	const ratingLabel = getByTestId("rating-label");
	expect(ratingLabel).toHaveTextContent("RATING");

	const ratingInput = getByTestId("rating-input");
	expect(ratingInput).toHaveValue(8);

	const genreLabel = getByTestId("genre-label");
	expect(genreLabel).toHaveTextContent("GENRE");

	const genreSelect = getByTestId("genre-select");
	expect(genreSelect).toHaveValue("Action");

	const runtimeLabel = getByTestId("runtime-label");
	expect(runtimeLabel).toHaveTextContent("RUNTIME");

	const runtimeInput = getByTestId("runtime-input");
	expect(runtimeInput).toHaveValue("120");

	const overviewLabel = getByTestId("overview-label");
	expect(overviewLabel).toHaveTextContent("OVERVIEW");

	const overviewTextArea = getByTestId("overview-textarea");
	expect(overviewTextArea).toHaveValue("A Master Peice");

	const movieFormSubmit = getByTestId("movie-form-submit");
	expect(movieFormSubmit).toBeInTheDocument();
});

test("Test Movie Form submit", () => {
	const onSubmit = jest.fn();
	const movieInfo = {
		title: "Jawan",
		releaseDate: "2023-02-26",
		movieUrl: "https://google.com/movie",
		rating: 8,
		genre: "Action",
		runtime: "120",
		overview: "A Master Peice",
	};

	const { getByTestId } = render(
		<MovieForm
			movieInfo={movieInfo}
			onSubmit={onSubmit}
		/>
	);

	const movieFormConatiner = getByTestId("movie-form-container");
	expect(movieFormConatiner).toBeInTheDocument();

	const movieFormSubmit = getByTestId("movie-form-submit");
	expect(movieFormSubmit).toBeInTheDocument();

	fireEvent.click(movieFormSubmit);
	expect(onSubmit).toHaveBeenCalledWith({
		title: "Jawan",
		releaseDate: "2023-02-26",
		movieUrl: "https://google.com/movie",
		rating: "8",
		genre: "Action",
		runtime: "120",
		overview: "A Master Peice",
	});
});

test("Test Form Data/Value Change", () => {
	const onSubmit = jest.fn();
	const movieInfo = {
		title: "Jawan",
		releaseDate: "2023-02-26",
		movieUrl: "https://google.com/movie",
		rating: 8,
		genre: "Action",
		runtime: "120",
		overview: "A Master Peice",
	};

	const { getByTestId } = render(
		<MovieForm
			movieInfo={movieInfo}
			onSubmit={onSubmit}
		/>
	);

	const movieFormConatiner = getByTestId("movie-form-container");
	expect(movieFormConatiner).toBeInTheDocument();

	const movieFormSubmit = getByTestId("movie-form-submit");
	expect(movieFormSubmit).toBeInTheDocument();

	const titleInput = getByTestId("title-input");
	fireEvent.change(titleInput, { target: { value: "Hero" } });

	const releaseDateInput = getByTestId("release-date-input");
	fireEvent.change(releaseDateInput, { target: { value: "2015-02-26" } });

	const movieUrlInput = getByTestId("movie-url-input");
	fireEvent.change(movieUrlInput, {
		target: { value: "https://google.com/movie/video.mp4" },
	});

	const ratingInput = getByTestId("rating-input");
	fireEvent.change(ratingInput, { target: { value: 5 } });

	const genreSelect = getByTestId("genre-select");
	fireEvent.change(genreSelect, { target: { value: "Comedy" } });

	const runtimeInput = getByTestId("runtime-input");
	fireEvent.change(runtimeInput, { target: { value: "90" } });

	const overviewTextArea = getByTestId("overview-textarea");
	fireEvent.change(overviewTextArea, {
		target: { value: "A truly shitty movie of the  century" },
	});

	fireEvent.click(movieFormSubmit);
	expect(onSubmit).toHaveBeenCalledWith({
		title: "Hero",
		releaseDate: "2015-02-26",
		movieUrl: "https://google.com/movie/video.mp4",
		rating: "5",
		genre: "Comedy",
		runtime: "90",
		overview: "A truly shitty movie of the  century",
	});
});

test("Test for Valid Rating Value", () => {
	const onSubmit = jest.fn();
	const movieInfo = {
		title: "Jawan",
		releaseDate: "2023-02-26",
		movieUrl: "https://google.com/movie",
		rating: 8,
		genre: "Action",
		runtime: "120",
		overview: "A Master Peice",
	};

	const { getByTestId } = render(
		<MovieForm
			movieInfo={movieInfo}
			onSubmit={onSubmit}
		/>
	);

	const movieFormConatiner = getByTestId("movie-form-container");
	expect(movieFormConatiner).toBeInTheDocument();
	const movieFormSubmit = getByTestId("movie-form-submit");
	expect(movieFormSubmit).toBeInTheDocument();

	const ratingInput = getByTestId("rating-input");
	fireEvent.change(ratingInput, { target: { value: -1 } });

	fireEvent.click(movieFormSubmit);
	expect(onSubmit).not.toHaveBeenCalledWith();

	fireEvent.change(ratingInput, { target: { value: 11 } });

	fireEvent.click(movieFormSubmit);
	expect(onSubmit).not.toHaveBeenCalledWith();
});
