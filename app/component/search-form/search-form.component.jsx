import PropTypes from "prop-types";
import SearchFormStyle from "./search-form.style.css";

import { useState } from "react";

export default function SearchForm({ searchValue, searchHandler }) {
	const [searchedValue, setSearchedValue] = useState(searchValue);

	return (
		<div className="search-form">
			<input
				data-testid="search-input"
				className="search-box"
				type="search"
				value={searchedValue !== null ? searchedValue : ""}
				onChange={(event) =>
					setSearchedValue(event.target.value.toLowerCase())
				}
			></input>
			<button
				data-testid="search-button"
				className="search-button"
				onClick={() => searchHandler(searchedValue)}
			>
				SEARCH
			</button>
		</div>
	);
}

SearchForm.propTypes = {
	searchValue: PropTypes.string,
	searchHandler: PropTypes.func.isRequired,
};

export function links() {
	return [{ rel: "stylesheet", href: SearchFormStyle }];
}
