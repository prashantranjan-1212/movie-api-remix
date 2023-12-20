import DeleteMovieStyle from "./delete-movie.style.css";

import { Link } from "@remix-run/react";

export default function DeleteMovie({ movieId }) {
	return (
		<>
			<Link
				className="delete-movie-button"
				data-testid="delete-movie-button"
				to={{ pathname: `/${movieId}/delete` }}
			>
				DELETE MOVIE
			</Link>
		</>
	);
}

export function links() {
	return [{ rel: "stylesheet", href: DeleteMovieStyle }];
}
