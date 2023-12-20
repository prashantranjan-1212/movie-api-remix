import GenreSelectStyle from "./genre-select.style.css";

import PropTypes from "prop-types";

export default function GenreSelect({ genres, selectedGenre, onSelect }) {
	return (
		<div className="genre-button">
			{genres.map((genre, index) => {
				return (
					<button
						className="genre-selected-button"
						key={index}
						data-testid={genre}
						onClick={() => onSelect(genre)}
						style={{
							backgroundColor:
								genre === selectedGenre
									? "DodgerBlue"
									: "rgb(39, 37, 37)",
						}}
					>
						{genre.toUpperCase()}
					</button>
				);
			})}
		</div>
	);
}

GenreSelect.propTypes = {
	genres: PropTypes.array.isRequired,
	selectedGenre: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
};

export function links() {
	return [{ rel: "stylesheet", href: GenreSelectStyle }];
}
