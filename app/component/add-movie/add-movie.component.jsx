import AddMovieStyle from "./add-movie.style.css";

import { Link } from "@remix-run/react";

export default function AddMovie() {
	return (
		<div
			className="add-movie-container"
			data-testid="add-movie-container"
		>
			<Link
				className="add-movie-button"
				data-testid="add-movie-button"
				to={{ pathname: "/new" }}
			>
				ADD MOVIE
			</Link>
		</div>
	);
}

export function links() {
	return [{ rel: "stylesheet", href: AddMovieStyle }];
}
