import { Component } from "react";

import auth from "../../config/firebase";

class Register extends Component {
	state = {
		email: "",
		password: "",
		displayName: "",
		fireErrors: "",
	};

	register = (e) => {
		e.preventDefault();
		auth
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((user) => {
				var currentUser = auth.auth().currentUser;
				currentUser.updateProfile({
					displayName: this.state.displayName,
				});
			})
			.catch((error) => {
				this.setState({ fireErrors: error.message });
			});
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		let errorNotification = this.state.fireErrors ? (
			<div className="Error"> {this.state.fireErrors} </div>
		) : null;

		return (
			<div>
				<div className="container d-flex justify-content-center ">
					<div className="card col-6 mt-5 ">
						<div className="card-header text-center">
							<h3>Sign Up</h3>
						</div>
						<div className="card-body">
							{this.state.fireErrors ? (
								<ul className="list-group list-group-flush mb-2">
									<li className="list-group-item text-center error">
										{errorNotification}
									</li>
								</ul>
							) : null}
							<form>
								<div className="input-group mb-3">
									<span className="input-group-text">Name</span>
									<input
										type="text"
										className="form-control"
										value={this.state.displayName}
										onChange={this.handleChange}
										name="displayName"
									></input>
								</div>
								<div className="input-group mb-3">
									<span className="input-group-text">Email</span>
									<input
										type="text"
										className="form-control"
										value={this.state.email}
										onChange={this.handleChange}
										name="email"
									></input>
								</div>
								<div className="input-group mb-3">
									<span className="input-group-text">Password</span>
									<input
										type="password"
										className="form-control"
										value={this.state.password}
										onChange={this.handleChange}
										name="password"
									></input>
								</div>
								<button className="btn bg-info" onClick={this.register}>
									Sign Up
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
