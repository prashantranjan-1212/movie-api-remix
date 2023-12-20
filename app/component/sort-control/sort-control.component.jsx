import SortControlStyle from "./sort-control.style.css";

import PropTypes from "prop-types";

export default function SortControl({
	sortBy,
	releaseDate,
	title,
	onSortControl,
}) {
	return (
		<div className="sort-control">
			<label className="sort-control-label">SORT BY : </label>
			<select
				className="sort-control-option"
				onChange={(event) => onSortControl(event.target.value)}
				defaultValue={sortBy !== null ? sortBy : releaseDate}
			>
				<option value={title}>TITLE</option>
				<option value={releaseDate}>RELEASE DATE</option>
			</select>
		</div>
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
