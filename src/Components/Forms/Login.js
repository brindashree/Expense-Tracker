import { Component } from "react";

import auth from "../../config/firebase";

class Login extends Component {
	state = {
		email: "",
		password: "",
		fireErrors: "",
	};

	login = (e) => {
		e.preventDefault();
		auth
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
				this.setState({ fireErrors: error.message });
			});
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		let errorNotification = this.state.fireErrors ? (
			<div> {this.state.fireErrors} </div>
		) : null;

		return (
			<div>
				<div className="container d-flex justify-content-center ">
					<div className="card col-6 mt-5 ">
						<div className="card-header text-center">
							<h3>Login</h3>
						</div>
						<div className="card-body">
							{this.state.fireErrors ? (
								<ul className="list-group list-group-flush mb-2">
									<li className="list-group-item text-center error">
										{this.state.fireErrors}
									</li>
								</ul>
							) : null}
							<form>
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
								<button className="btn bg-info" onClick={this.login}>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
