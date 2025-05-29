import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer() //this is a hook, goes before the return, after the start of the component name

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div>
					{/* //condition? do this: if not do this */}
					{store.token !== null? "You are logged in": "You are NOT logged in"}
					
				</div>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};