import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "@remix-run/react";

import MovieListStyle from "./MovieList.style.css";

import SearchForm from "../search-form/search-form.component";
import GenreSelect from "../genre-select/genre-select.component";
import SortControl from "../sort-control/sort-control.component";
import MovieTile from "../movie-tile/movie-tile.component";

export default function MovieList() {
	const [movieList, setMovieList] = useState([]);
	const genres = ["action", "adventure", "comedy", "crime", "family"];

	const [searchParams, setSearchParams] = useSearchParams();
	const movieSearched = searchParams.get("query");
	const genre = searchParams.get("genre");
	const sortBy = searchParams.get("sortBy");

	useEffect(() => {
		const url = getUrl();
		console.log(url);
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("failed to fetch.....");
				}
				return response.json();
			})
			.then((data) => {
				setMovieList(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [movieSearched, sortBy, genre]);

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

	const getUrl = () => {
		let url;
		if (movieSearched === null && genre === null && sortBy === null) {
			url = `http://localhost:4000/movies`;
		} else if (
			movieSearched !== null &&
			genre === null &&
			sortBy === null
		) {
			url = `http://localhost:4000/movies?searchBy=title&search=${movieSearched}`;
		} else if (
			movieSearched === null &&
			genre !== null &&
			sortBy === null
		) {
			url = `http://localhost:4000/movies?searchBy=genres&filter=${genre}`;
		} else if (
			movieSearched === null &&
			genre === null &&
			sortBy !== null
		) {
			url = `http://localhost:4000/movies?sortOrder=asc&sortBy=${sortBy}`;
		} else if (
			movieSearched !== null &&
			genre !== null &&
			sortBy === null
		) {
			url = `http://localhost:4000/movies?searchBy=title&search=${movieSearched}&filter=${genre}`;
		} else if (
			movieSearched !== null &&
			genre === null &&
			sortBy !== null
		) {
			url = `http://localhost:4000/movies?searchBy=title&search=${movieSearched}&sortOrder=asc&sortBy=${sortBy}`;
		} else if (
			movieSearched === null &&
			genre !== null &&
			sortBy !== null
		) {
			url = `http://localhost:4000/movies?sortOrder=asc&sortBy=${sortBy}&searchBy=genres&filter=${genre}`;
		} else {
			url = `http://localhost:4000/movies?searchBy=title&search=${movieSearched}&sortOrder=asc&sortBy=${sortBy}&filter=${genre}`;
		}

		return url;
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
				{movieList.map((movie) => {
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
				})}
			</div>
		</>
	);
}

export function links() {
	return [{ rel: "stylesheet", href: MovieListStyle }];
}
