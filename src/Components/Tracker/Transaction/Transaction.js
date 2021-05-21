import React from "react";

const Transaction = (props) => {
	return (
		<li className="list-group-item">
			<div className="row">
				<div className="col-8"> {props.name}</div>
				<div className="col-4">
					{props.type === "deposit" ? (
						<span style={{ color: "green" }}> + {props.price} </span>
					) : (
						<span style={{ color: "red" }}> - {props.price}</span>
					)}
				</div>
			</div>
		</li>
	);
};

export default Transaction;
