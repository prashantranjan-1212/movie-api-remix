import EditMovieStyle from "./edit-movie.style.css";

import { Link } from "@remix-run/react";

export default function EditMovie({ movieId }) {
	return (
		<>
			<Link
				className="edit-movie-button"
				data-testid="edit-movie-button"
				to={{ pathname: `/${movieId}/edit` }}
			>
				EDIT MOVIE
			</Link>
		</>
	);
}

export function links() {
	return [{ rel: "stylesheet", href: EditMovieStyle }];
}
