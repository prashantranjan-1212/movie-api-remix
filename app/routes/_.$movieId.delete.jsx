import { Link, useLoaderData } from "@remix-run/react";
import { APP_URL } from "../../const";

import Dialog, {
	links as DialogStyle,
} from "../component/dialog/dialog.component";
import { useState } from "react";

export default function DeleteMovie() {
	const movie = useLoaderData();
	const [openDialog, setDialogOpen] = useState(true);

	const handleDeleteMovie = () => {
		console.log("Deleting Movie...");
		setDialogOpen(false);
	};

	const closeDialog = () => {
		console.log("Delete button dialog close");
		setDialogOpen(false);
	};

	return (
		<>
			{openDialog && (
				<Dialog
					title={"DELETE MOVIE"}
					handleCloseButton={closeDialog}
				>
					<p data-testid="delete-movie-confirm-text">
						<em>
							<b>Are you sure you want to delete</b>
							<p>
								<b>{movie.title}</b>
							</p>
						</em>
					</p>
					<Link
						className="delete-movie-confirm-button"
						data-testid="delete-movie-confirm-button"
						onClick={handleDeleteMovie}
						to={{ pathname: "/" }}
					>
						CONFIRM
					</Link>
				</Dialog>
			)}
		</>
	);
}

export async function loader({ params }) {
	const movieId = params.movieId;
	const URL = `${APP_URL}/movies/${movieId}`;
	console.log(URL);
	const res = await fetch(URL);

	if (!res.ok) {
		throw new Error("Failed to fetch ...");
	}

	const data = await res.json();
	return data;
}

export function links() {
	return [...DialogStyle()];
}
