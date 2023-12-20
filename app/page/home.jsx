import HomeStyle from "./home.css";

import { Link, Outlet } from "@remix-run/react";

import AddMovie, {
	links as AddMovieStyle,
} from "../component/add-movie/add-movie.component";

import MovieList, {
	links as MovieListStyle,
} from "../component/movie-list/MovieList.component";

export default function Home() {
	return (
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
			<Outlet />
			<MovieList />
		</div>
	);
}

export function links() {
	return [
		{ rel: "stylesheet", href: HomeStyle },
		...AddMovieStyle(),
		...MovieListStyle(),
	];
}
