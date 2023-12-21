import { Form } from "@remix-run/react";
import SortControlStyle from "./sort-control.style.css";

import PropTypes from "prop-types";

export default function SortControl({
	sortBy,
	releaseDate,
	title,
	onSortControl,
}) {
	return (
		<Form className="sort-control">
			<button
				className="sort-control-button"
				type="hidden"
			>
				SORT BY :{" "}
			</button>
			<select
				className="sort-control-option"
				name="sortBy"
				onChange={(event) => onSortControl(event.target.value)}
				defaultValue={sortBy !== null ? sortBy : releaseDate}
			>
				<option value={title}>TITLE</option>
				<option value={releaseDate}>RELEASE DATE</option>
			</select>
		</Form>
	);
}

SortControl.propTypes = {
	sortBy: PropTypes.string,
	title: PropTypes.string.isRequired,
	releaseDate: PropTypes.string.isRequired,
	onSortControl: PropTypes.func,
};

export function links() {
	return [{ rel: "stylesheet", href: SortControlStyle }];
}
