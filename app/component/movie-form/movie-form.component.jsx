import MovieFormStyle from "./movie-form.style.css";

import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function MovieForm({ movieInfo, submit }) {
	const form = useForm();
	const { register, control, handleSubmit, formState } = form;
	const { errors } = formState;

	const title = movieInfo !== null ? movieInfo.title : "";
	const release_date = movieInfo !== null ? movieInfo.release_date : "";
	const poster_path = movieInfo !== null ? movieInfo.poster_path : "";
	const vote_average = movieInfo !== null ? movieInfo.vote_average : "";
	const genres = movieInfo !== null ? movieInfo.genres : "";
	const runtime = movieInfo !== null ? movieInfo.runtime : "";
	const overview = movieInfo !== null ? movieInfo.overview : "";

	const handleMovieSubmit = (data) => {
		console.log("Data Submitted", data);
		submit(data);
	};

	return (
		<div
			className="movie-form-container"
			data-testid="movie-form-container"
		>
			<form onSubmit={handleSubmit(handleMovieSubmit)}>
				<div className="form-controls">
					<label
						htmlFor="title"
						data-testid="title-label"
					>
						TITLE
					</label>
					<input
						data-testid="title-input"
						type="text"
						id="title"
						defaultValue={title}
						placeholder="Movie Title"
						{...register("title", {
							required: {
								value: true,
								message: "Title is a required feild",
							},
						})}
					></input>
					<p className="form-error-message">
						{errors.title?.message}
					</p>
				</div>
				<div className="form-controls">
					<label
						htmlFor="release_date"
						data-testid="release-date-label"
					>
						RELEASE DATE
					</label>
					<input
						data-testid="release-date-input"
						type="date"
						defaultValue={release_date}
						id="release_date"
						{...register("release_date", {
							required: {
								value: true,
								message: "Realease Date is a required feild",
							},
							valueAsDate: {
								valueAsDate: true,
								message: "Realease Date must be a date",
							},
						})}
					></input>
					<p className="form-error-message">
						{errors.release_date?.message}
					</p>
				</div>
				<div className="form-controls">
					<label
						htmlFor="poster_path"
						data-testid="movie-url-label"
					>
						MOVIE URL
					</label>
					<input
						data-testid="movie-url-input"
						type="url"
						id="poster_path"
						defaultValue={poster_path}
						{...register("poster_path", {
							required: {
								value: true,
								message: "Movie URL is a required feild",
							},
						})}
					></input>
					<p className="form-error-message">
						{errors.poster_path?.message}
					</p>
				</div>
				<div className="form-controls">
					<label
						htmlFor="vote_average"
						data-testid="rating-label"
					>
						RATING
					</label>
					<input
						data-testid="rating-input"
						type="number"
						id="vote_average"
						defaultValue={vote_average}
						min="0"
						max="10"
						step={1}
						{...register("vote_average", {
							required: {
								value: true,
								message: "Rating is a required feild",
							},
						})}
					></input>
					<p className="form-error-message">
						{errors.vote_average?.message}
					</p>
				</div>
				<div className="form-controls">
					<label
						htmlFor="genres"
						data-testid="genre-label"
					>
						GENRE
					</label>
					<select
						data-testid="genre-select"
						id="genres"
						defaultValue={genres}
						multiple={true}
						{...register("genres", {
							required: {
								value: true,
								message: "Genre is a required feild",
							},
						})}
					>
						<option value="Comedy">Comedy</option>
						<option value="Fantasy">Fantasy</option>
						<option value="Thriller">Thriller</option>
						<option value="Action">Action</option>
						<option value="Documentary">Documentary</option>
						<option value="Adventure">Adventure</option>
						<option value="Sci-Fi">Sci-Fi</option>
					</select>
					<p className="form-error-message">
						{errors.genres?.message}
					</p>
				</div>
				<div className="form-controls">
					<label
						htmlFor="runtime"
						data-testid="runtime-label"
					>
						RUNTIME
					</label>
					<input
						data-testid="runtime-input"
						type="number"
						id="runtime"
						defaultValue={runtime}
						{...register("runtime", {
							required: {
								value: true,
								message: "Runtime is a required feild",
							},
						})}
					></input>
					<p className="form-error-message">
						{errors.runtime?.message}
					</p>
				</div>
				<div className="form-controls">
					<label
						htmlFor="overview"
						data-testid="overview-label"
					>
						OVERVIEW
					</label>
					<textarea
						data-testid="overview-textarea"
						id="overview"
						defaultValue={overview}
						{...register("overview", {
							required: {
								value: true,
								message: "Overview is a required feild",
							},
						})}
					/>
					<p className="form-error-message">
						{errors.overview?.message}
					</p>
				</div>
				<div className="form-controls">
					<button
						className="form-submit-button"
						type="submit"
						value="Submit"
						data-testid="movie-form-submit"
					>
						SUBMIT
					</button>
				</div>
			</form>
			<DevTool control={control} />
		</div>
	);
}

MovieForm.propTypes = {
	movieInfo: PropTypes.object,
	onSubmit: PropTypes.func.isRequired,
};

MovieForm.defaultProps = {
	movieInfo: {},
	onSubmit: () => {},
};

export function links() {
	return [{ rel: "stylesheet", href: MovieFormStyle }];
}
