import { Outlet, useLoaderData } from "@remix-run/react";
import { APP_URL } from "../../const";

import MovieDetails, {
	links as MovieDetailsStyle,
} from "../component/movie-details/movie-details.component";

export default function Movie() {
	const movie = useLoaderData();
	return (
		<>
			<MovieDetails
				id={movie.id}
				imageUrl={movie.poster_path}
				movieName={movie.title}
				releaseDate={movie.release_date}
				rating={movie.vote_average}
				duration={movie.runtime}
				description={movie.overview}
			/>
		</>
	);
}

export async function loader({ params }) {
	const movieId = params.movieId;
	const URL = `${APP_URL}/movies/${movieId}`;

	const res = await fetch(URL);

	if (!res.ok) {
		throw new Error("Failed to fetch ...");
	}

	const data = await res.json();
	return data;
}

export function links() {
	return [...MovieDetailsStyle()];
}
