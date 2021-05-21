import Login from "./Forms/Login";
import Register from "./Forms/Register";

import auth from "../config/firebase";
import Tracker from "./Tracker/Tracker";
import { Component } from "react";
import Spinner from "../assets/loader.gif";

export default class Main extends Component {
	state = {
		user: 1,
		loading: true,
	};

	componentDidMount() {
		this.authListener();
	}

	authListener() {
		auth.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			} else {
				this.setState({ user: null });
			}
		});
	}

	formSwitcher = (action) => {
		this.setState({ formSwitcher: action === "register" ? true : false });
	};

	render() {
		const form = !this.state.formSwitcher ? <Login /> : <Register />;
		if (this.state.user === 1) {
			return (
				<div className="container">
					<div className="Spinner">
						<img src={Spinner} alt="Spinner" className="ImgSpinner" />
					</div>
				</div>
			);
		}

		return (
			<>
				{!this.state.user ? (
					<div>
						<div className="text-center mt-3">
							<h1>Expense Tracker</h1>
						</div>
						{form}
						{!this.state.formSwitcher ? (
							<span className=" container d-flex justify-content-center bg-white col-6 card-body mt-4 rounded">
								Not registered?{" "}
								<button
									onClick={() =>
										this.formSwitcher(
											!this.state.formSwitcher ? "register" : "login"
										)
									}
									className="btn btn-info ms-3"
								>
									Create an account
								</button>
							</span>
						) : (
							<span className=" container d-flex justify-content-center bg-white col-6 card-body mt-4 rounded">
								Have an account already?{" "}
								<button
									onClick={() =>
										this.formSwitcher(
											!this.state.formSwitcher ? "register" : "login"
										)
									}
									className="btn btn-info ms-3"
								>
									Sign in here
								</button>
							</span>
						)}
					</div>
				) : (
					<Tracker />
				)}
			</>
		);
	}
}
