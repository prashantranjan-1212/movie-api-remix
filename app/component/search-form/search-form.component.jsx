import PropTypes from "prop-types";
import SearchFormStyle from "./search-form.style.css";

import { useState } from "react";
import { Form } from "@remix-run/react";

export default function SearchForm({ searchValue, searchHandler }) {
	const [searchedValue, setSearchedValue] = useState(searchValue);

	return (
		<Form className="search-form">
			<input
				data-testid="search-input"
				className="search-box"
				name="query"
				type="search"
				value={searchedValue !== null ? searchedValue : ""}
				onChange={(event) =>
					setSearchedValue(event.target.value.toLowerCase())
				}
			></input>
			<button
				type="submit"
				data-testid="search-button"
				className="search-button"
			>
				SEARCH
			</button>
		</Form>
	);
}

SearchForm.propTypes = {
	searchValue: PropTypes.string,
	searchHandler: PropTypes.func.isRequired,
};

export function links() {
	return [{ rel: "stylesheet", href: SearchFormStyle }];
}

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	console.log(data);
	return redirect("/");
}
