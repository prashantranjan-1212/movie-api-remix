import { Form, useNavigate } from "@remix-run/react";
import GenreSelectStyle from "./genre-select.style.css";

import PropTypes from "prop-types";

export default function GenreSelect({ genres, selectedGenre, onSelect }) {
	const navigate = useNavigate();
	return (
		<Form className="genre-button">
			{genres.map((genre, index) => {
				return (
					<button
						className="genre-selected-button"
						key={index}
						name="genre"
						value={genre}
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
		</Form>
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
