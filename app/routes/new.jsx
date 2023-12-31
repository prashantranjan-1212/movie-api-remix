import { redirect } from "@remix-run/node";
import Dialog, {
	links as DialogStyle,
} from "../component/dialog/dialog.component";
import MovieForm, {
	links as MovieFormStyle,
} from "../component/movie-form/movie-form.component";

export default function AddNewMovie() {
	const [openDialog, setDialogOpen] = useState(true);

	const closeDialog = () => {
		console.log("Add button dialog close");
		setDialogOpen(false);
	};

	return (
		<>
			{openDialog && (
				<Dialog
					title={"ADD MOVIE"}
					handleCloseButton={closeDialog}
				>
					<MovieForm />
				</Dialog>
			)}
		</>
	);
}

export function links() {
	return [...DialogStyle(), ...MovieFormStyle()];
}

export async function action({ request }) {
	const formData = await request.formData();
	console.log(formData);

	return redirect("/");
}
