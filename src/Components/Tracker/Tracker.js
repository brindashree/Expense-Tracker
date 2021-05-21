import React, { Component } from "react";

import auth from "../../config/firebase";
import Transaction from "./Transaction/Transaction";

class Tracker extends Component {
	state = {
		transactions: [],
		date: {},
		money: 0,
		transactionName: "",
		transactionType: "",
		price: "",
		currentUid: auth.auth().currentUser.uid,
	};

	logout = () => {
		auth.auth().signOut();
	};

	handleChange = (input) => (e) => {
		this.setState({
			[input]: e.target.value !== "0" ? e.target.value : "",
		});
	};

	addNewTransaction = () => {
		const { transactionName, transactionType, price, currentUid, money } =
			this.state;
		if (transactionName && transactionType && price) {
			const BackUpState = this.state.transactions;
			BackUpState.push({
				id: BackUpState.length + 1,
				name: transactionName,
				type: transactionType,
				price: price,
				user_id: currentUid,
			});
			auth
				.database()
				.ref("Transactions/" + currentUid)
				.push({
					id: BackUpState.length,
					name: transactionName,
					type: transactionType,
					price: price,
					user_id: currentUid,
				})
				.then((data) => {
					console.log("success callback");
					this.setState({
						transactions: BackUpState,
						money:
							transactionType === "deposit"
								? money + parseFloat(price)
								: money - parseFloat(price),
						transactionName: "",
						transactionType: "",
						price: "",
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	componentWillMount() {
		const { currentUid, money } = this.state;
		let totalMoney = money;
		const BackUpState = this.state.transactions;
		auth
			.database()
			.ref("Transactions/" + currentUid)
			.once("value", (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					totalMoney =
						childSnapshot.val().type === "deposit"
							? parseFloat(childSnapshot.val().price) + totalMoney
							: totalMoney - parseFloat(childSnapshot.val().price);

					BackUpState.push({
						id: childSnapshot.val().id,
						name: childSnapshot.val().name,
						type: childSnapshot.val().type,
						price: childSnapshot.val().price,
						user_id: childSnapshot.val().user_id,
					});
				});

				this.setState({
					transactions: BackUpState,
					money: totalMoney,
				});
			});
	}

	render() {
		var currentUser = auth.auth().currentUser;
		return (
			<div>
				<div className="d-flex justify-content-end">
					<span className="mx-3 mt-3 fs-3">{currentUser.displayName}</span>
					<button className="mx-3 mt-3 btn btn-info" onClick={this.logout}>
						Sign Out
					</button>
				</div>
				<div className="d-flex justify-content-center mt-4">
					<h2 className="money">
						Total Money : Rs
						<span className="btn btn-warning text-black ms-3 fs-4">
							{" "}
							{this.state.money}
						</span>
					</h2>
				</div>
				<div className="container-fluid newTransaction mt-5">
					<div className="row">
						<div className="col-1"></div>
						<div className="col-3">
							<div className="card">
								<div className="card-body">
									<form action="">
										<div className="input-group mb-3">
											<span className="input-group-text">@</span>
											<input
												type="text"
												className="form-control"
												placeholder="Transaction name"
												value={this.state.transactionName}
												onChange={this.handleChange("transactionName")}
											></input>
										</div>
										<div>
											<div>
												<select
													name="type"
													className="form-select "
													value={this.state.transactionType}
													onChange={this.handleChange("transactionType")}
												>
													<option value="0">Type</option>
													<option value="expense">Expense</option>
													<option value="deposit">Deposit</option>
												</select>
											</div>
											<div className="mt-3">
												<input
													type="number"
													className="form-control"
													placeholder="price"
													value={this.state.price}
													onChange={this.handleChange("price")}
												></input>
											</div>
										</div>
									</form>
									<div className="d-flex justify-content-center mt-3">
										<button
											className="btn btn-success "
											onClick={() => this.addNewTransaction()}
										>
											Add Transaction
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-1"></div>
						<div className="col-6">
							<div className="card">
								<div className="card-header text-center">
									Transaction History
								</div>

								<ul className="list-group list-group-flush">
									{Object.keys(this.state.transactions).map((id) => (
										<Transaction
											key={id}
											type={this.state.transactions[id].type}
											name={this.state.transactions[id].name}
											price={this.state.transactions[id].price}
										/>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Tracker;
