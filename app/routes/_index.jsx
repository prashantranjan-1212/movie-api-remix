import { APP_URL } from "../../const";
import IndexStyle from "../styles/index.css";

import AddMovie, {
	links as AddMovieStyle,
} from "../component/add-movie/add-movie.component";

import SearchForm, {
	links as SearchFormStyle,
} from "../component/search-form/search-form.component";
import GenreSelect, {
	links as GenreSelectStyle,
} from "../component/genre-select/genre-select.component";
import SortControl, {
	links as SortControlStyle,
} from "../component/sort-control/sort-control.component";
import MovieTile, {
	links as MovieTileStyle,
} from "../component/movie-tile/movie-tile.component";

import { Link, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";

export default function Index() {
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
		<div className="App">
			<div className="App-header">
				<div className="header-conatiner">
					<Link
						to="/"
						className="heading"
					>
						<b>netflix</b>roulette
					</Link>
					<div className="movie-control-button">
						<AddMovie />
					</div>
				</div>
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
			</div>
		</div>
	);
}

export function links() {
	return [
		{ rel: "stylesheet", href: IndexStyle },
		...AddMovieStyle(),
		...GenreSelectStyle(),
		...MovieTileStyle(),
		...SearchFormStyle(),
		...SortControlStyle(),
		,
	];
}

export async function loader({ request }) {
	const url = new URL(request.url);
	const movieSearched = url.searchParams.get("query");
	const genre = url.searchParams.get("genre");
	const sortBy = url.searchParams.get("sortBy");
	const updatedURL = await updateURL(movieSearched, genre, sortBy);

	const res = await fetch(updatedURL);

	if (!res.ok) {
		throw new Error("Failed to fetch ...");
	}

	const data = await res.json();
	return data.data;
}

async function updateURL(movieSearched, genre, sortBy) {
	let url;
	if (movieSearched === null && genre === null && sortBy === null) {
		url = `${APP_URL}/movies`;
	} else if (movieSearched !== null && genre === null && sortBy === null) {
		url = `${APP_URL}/movies?searchBy=title&search=${movieSearched}`;
	} else if (movieSearched === null && genre !== null && sortBy === null) {
		url = `${APP_URL}/movies?searchBy=genres&filter=${genre}`;
	} else if (movieSearched === null && genre === null && sortBy !== null) {
		url = `${APP_URL}/movies?sortOrder=asc&sortBy=${sortBy}`;
	} else if (movieSearched !== null && genre !== null && sortBy === null) {
		url = `${APP_URL}/movies?searchBy=title&search=${movieSearched}&filter=${genre}`;
	} else if (movieSearched !== null && genre === null && sortBy !== null) {
		url = `${APP_URL}/movies?searchBy=title&search=${movieSearched}&sortOrder=asc&sortBy=${sortBy}`;
	} else if (movieSearched === null && genre !== null && sortBy !== null) {
		url = `${APP_URL}/movies?sortOrder=asc&sortBy=${sortBy}&searchBy=genres&filter=${genre}`;
	} else {
		url = `${APP_URL}/movies?searchBy=title&search=${movieSearched}&sortOrder=asc&sortBy=${sortBy}&filter=${genre}`;
	}

	return url;
}
