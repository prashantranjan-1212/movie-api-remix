export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	console.log(data);
	return redirect("/");
}

export async function loader({ request }) {
	const url = new URL(request.url);
	const movieSearched = url.searchParams.get("query");
	const genre = url.searchParams.get("genre");
	const sortBy = url.searchParams.get("sortBy");
	const updatedURL = await updateURL(movieSearched, genre, sortBy);

	const res = await fetch(updatedURL);

	if (!res.ok) {
		throw new Error("Failed to fetch ...");
	}

	const data = await res.json();
	return data.data;
}

async function updateURL(movieSearched, genre, sortBy) {
	let url;
	if (movieSearched === null && genre === null && sortBy === null) {
		url = `${APP_URL}/movies`;
	} else if (movieSearched !== null && genre === null && sortBy === null) {
		url = `${APP_URL}/movies?searchBy=title&search=${movieSearched}`;
	} else if (movieSearched === null && genre !== null && sortBy === null) {
		url = `${APP_URL}/movies?searchBy=genres&filter=${genre}`;
	} else if (movieSearched === null && genre === null && sortBy !== null) {
		url = `${APP_URL}/movies?sortOrder=asc&sortBy=${sortBy}`;
	} else if (movieSearched !== null && genre !== null && sortBy === null) {
		url = `${APP_URL}/movies?searchBy=title&search=${movieSearched}&filter=${genre}`;
	} else if (movieSearched !== null && genre === null && sortBy !== null) {
		url = `${APP_URL}/movies?searchBy=title&search=${movieSearched}&sortOrder=asc&sortBy=${sortBy}`;
	} else if (movieSearched === null && genre !== null && sortBy !== null) {
		url = `${APP_URL}/movies?sortOrder=asc&sortBy=${sortBy}&searchBy=genres&filter=${genre}`;
	} else {
		url = `${APP_URL}/movies?searchBy=title&search=${movieSearched}&sortOrder=asc&sortBy=${sortBy}&filter=${genre}`;
	}

	return url;
}
