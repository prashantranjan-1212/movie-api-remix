import { useLoaderData, useSearchParams } from "@remix-run/react";
import MovieListStyle from "./MovieList.style.css";

import SearchForm, {
	links as SearchFormStyle,
} from "../search-form/search-form.component";
import GenreSelect, {
	links as GenreSelectStyle,
} from "../genre-select/genre-select.component";
import SortControl, {
	links as SortControlStyle,
} from "../sort-control/sort-control.component";
import MovieTile, {
	links as MovieTileStyle,
} from "../movie-tile/movie-tile.component";

export default function MovieList() {
	const genres = ["action", "adventure", "comedy", "crime", "family"];

	const movieList = useLoaderData();
	const [searchParams, setSearchParams] = useSearchParams();

	const movieSearched = searchParams.get("query");
	const genre = searchParams.get("genre");
	const sortBy = searchParams.get("sortBy");

	const sortHandler = (value) => {
		const queryParam = removeNullQueryValue();
		queryParam.set("sortBy", value);
		setSearchParams(queryParam);
	};

	const genreHandler = (value) => {
		const queryParam = removeNullQueryValue();
		queryParam.set("genre", value);
		setSearchParams(queryParam);
	};

	const movieSearchHandler = (value) => {
		const queryParam = removeNullQueryValue();
		queryParam.set("query", value);
		setSearchParams(queryParam);
	};

	const scrollHandler = () => {
		window.scrollTo({
			top: 10,
			left: 0,
			behavior: "auto",
		});
	};

	const removeNullQueryValue = () => {
		const array = [];
		const queryParam = new URLSearchParams(searchParams);

		for (const name of queryParam.keys()) {
			const value = queryParam.get(name);
			if (value === "" || value === null) {
				array.push(name);
			}
		}

		array.forEach((val) => {
			queryParam.delete(val);
		});

		return queryParam;
	};

	return (
		<>
			<SearchForm
				searchValue={movieSearched}
				searchHandler={movieSearchHandler}
			/>
			<div id="movie-portal" />
			<div className="genre-and-sort-control">
				<GenreSelect
					genres={genres}
					selectedGenre={genre}
					onSelect={genreHandler}
				/>
				<SortControl
					sortBy={sortBy}
					releaseDate={"release_date"}
					title={"title"}
					onSortControl={sortHandler}
				/>
			</div>

			<div className="movie-tile-conatiner">
				{movieList != null
					? movieList.map((movie) => {
							return (
								<MovieTile
									key={movie.id}
									movieId={movie.id}
									imageUrl={movie.poster_path}
									movieName={movie.title}
									releaseDate={movie.release_date}
									genres={movie.genres}
									scrollUp={scrollHandler}
								/>
							);
					  })
					: ""}
			</div>
		</>
	);
}

export function links() {
	return [
		{ rel: "stylesheet", href: MovieListStyle },
		...GenreSelectStyle(),
		...MovieTileStyle(),
		...SearchFormStyle(),
		...SortControlStyle(),
	];
}
