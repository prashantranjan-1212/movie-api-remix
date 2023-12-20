import IndexStyle from "../styles/index.css";
import Home from "../page/home";

export default function Index() {
	return (
		<div className="App">
			<div className="App-header">
				<Home />
			</div>
		</div>
	);
}

export function links() {
	return [{ rel: "stylesheet", href: IndexStyle }];
}
