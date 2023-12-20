import MovieTileStyle from "./movie-tile.style.css";

import { Link, useSearchParams } from "@remix-run/react";
import PropTypes from "prop-types";

import EditMovie from "../edit-movie/edit-movie.component";
import DeleteMovie from "../delete-movie/delete-movie.component";

export default function MovieTile({
	movieId,
	imageUrl,
	movieName,
	releaseDate,
	genres,
	scrollUp,
}) {
	const [searchParams, setSearchParams] = useSearchParams();

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

		setSearchParams(queryParam);
	};

	return (
		<div className="movie-tile-poster">
			<img
				src={imageUrl}
				alt={movieName}
			/>
			<div className="movie-tile-info">
				<h2>{movieName}</h2>
				<p>
					<b>Release Year: </b> {releaseDate}
				</p>
				<p>
					<b>Genres: </b>
					{genres.join(", ")}
				</p>
				<div className="movie-tile-buttons">
					<Link
						className="movie-tile-view-details-link"
						to={{
							pathname: `/${movieId}`,
							search: `?${searchParams}`,
						}}
						onClick={scrollUp}
					>
						VIEW DETAIL
					</Link>
					<EditMovie movieId={movieId} />
					<DeleteMovie movieId={movieId} />
				</div>
			</div>
		</div>
	);
}

MovieTile.propTypes = {
	movieId: PropTypes.number.isRequired,
	imageUrl: PropTypes.string.isRequired,
	movieName: PropTypes.string.isRequired,
	releaseDate: PropTypes.string.isRequired,
	genres: PropTypes.array.isRequired,
};

export function links() {
	return [{ rel: "stylesheet", href: MovieTileStyle }];
}
