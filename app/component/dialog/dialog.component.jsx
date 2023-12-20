import DialogStyle from "./dialog.style.css";

import { Portal } from "react-portal";
import PropTypes from "prop-types";
import { Link } from "@remix-run/react";

export default function Dialog({ title, children, handleCloseButton }) {
	return (
		<Portal
			node={document && document.getElementById("movie-portal")}
			data-testid="dialog-portal"
		>
			<div
				className="dialog-conatiner"
				data-testid="dialog-container"
			>
				<div className="dialog-header">
					<p
						className="dialog-title"
						data-testid="dialog-title"
					>
						{title}
					</p>
					<Link
						className="dialog-button"
						data-testid="dialog-button"
						onClick={handleCloseButton}
						to={{ pathname: "/" }}
					>
						X
					</Link>
				</div>
				<div
					className="dialog-children"
					data-testid="dialog-children"
				>
					{children}
				</div>
			</div>
		</Portal>
	);
}

Dialog.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	handleCloseButton: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
	title: "Dialog Title",
	children: null,
	handleCloseButton: () => {},
};

export function links() {
	return [{ rel: "stylesheet", href: DialogStyle }];
}
