import { useLoaderData } from "@remix-run/react";
import { APP_URL } from "../../const";

import Dialog, {
	links as DialogStyle,
} from "../component/dialog/dialog.component";
import MovieForm, {
	links as MovieFormStyle,
} from "../component/movie-form/movie-form.component";

export default function EditMovie() {
	const movie = useLoaderData();
	const [openDialog, setDialogOpen] = useState(true);

	const closeDialog = () => {
		console.log("Add button dialog close");
		setDialogOpen(false);
	};

	return (
		<>
			{" "}
			{console.log(movie)}
			{openDialog && (
				<Dialog
					title={"EDIT MOVIE"}
					handleCloseButton={closeDialog}
				>
					<MovieForm movieInfo={movie}></MovieForm>
				</Dialog>
			)}
		</>
	);
}

export async function loader({ params }) {
	const movieId = params.movieId;
	const URL = `${APP_URL}/movies/${movieId}`;
	console.log("Movie Edit");
	console.log(URL);
	const res = await fetch(URL);

	if (!res.ok) {
		throw new Error("Failed to fetch ...");
	}

	const data = await res.json();
	return data;
}

export function links() {
	return [...DialogStyle(), ...MovieFormStyle()];
}

export async function action({ request }) {
	const formData = await request.formData();
	console.log(formData);

	return redirect("/");
}
