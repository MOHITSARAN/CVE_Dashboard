import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

export const GetReferencesURL = (props) => {
	let url = [];
	if (props.item) {
		url = (
			<ul>
				{props.item["references"].map((item, i) => (
					<a
						key={i}
						href={item}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: "blue" }}
					>
						{item}
						<br />
					</a>
				))}
			</ul>
		);
		return url;
	}
};

export const GetVulnerableProduct = (props) => {
	let product = [];
	if (props.item) {
		product = (
			<ul>
				{props.item["vulnerable_product"].map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>
		);
		return product;
	}
};

export const GetScoreColor = (props) => {
	if (props.item > "8") {
		return <span className="red"> {props.item} </span>;
	} else if (props.item > "6" && props.item < "8") {
		return <span className="orange">{props.item} </span>;
	} else if (props.item >= "4" && props.item <= "6") {
		return <span className="yellow">{props.item} </span>;
	} else if (props.item > "1" && props.item < "3") {
		return <span className="green">{props.item}</span>;
	} else {
		return <span>N/A</span>;
	}
};

const DetailModalView = (props) => {
	var item_obj = "None";

	var references_arr = "None";
	var vulnerable_product_arr = "None";

	var authentication = "None";
	var complexity = "None";
	var vector = "None";

	var availability = "None";
	var confidentiality = "None";
	var integrity = "None";

	var score = "None";

	if (props.show === true) {
		item_obj = props.detailsviewlist;
		authentication = item_obj.access.authentication;
		complexity = item_obj.access.complexity;
		vector = item_obj.access.vector;

		availability = item_obj.impact.availability;
		confidentiality = item_obj.impact.confidentiality;
		integrity = item_obj.impact.integrity;

		references_arr = <GetReferencesURL item={item_obj} />;
		vulnerable_product_arr = <GetVulnerableProduct item={item_obj} />;
		score = <GetScoreColor item={item_obj.cvss} />;
	}

	return (
		<Modal
			{...props}
			size="xl"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<h4>
						{item_obj["id"]} | {score}
					</h4>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table striped bordered hover>
					<thead>
						<tr style={{ backgroundColor: "#3f51b5", color: "white" }}>
							<td colSpan="2" style={{ textAlign: "center" }}>
								{" "}
								Additional CVE Details{" "}
							</td>
						</tr>
						<tr>
							<td>References</td>
							<td>{references_arr}</td>
						</tr>
						<tr>
							<td>Vulnerable Product</td>
							<td
								style={{
									overflowY: "scroll",
									maxHeight: "140px",
									display: "block",
								}}
							>
								{" "}
								{vulnerable_product_arr}{" "}
							</td>
						</tr>
						<tr>
							<td>Access</td>
							<td>
								<Table>
									<thead>
										<tr>
											<td>Vector</td>
											<td>Complexity</td>
											<td>Authentication</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{authentication}</td>
											<td>{complexity}</td>
											<td>{vector}</td>
										</tr>
									</tbody>
								</Table>
							</td>
						</tr>
						<tr>
							<td>Impact</td>
							<td>
								<Table>
									<thead>
										<tr>
											<td>Confidentiality</td>
											<td>Integrity</td>
											<td>Availability</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{confidentiality}</td>
											<td>{integrity}</td>
											<td>{availability}</td>
										</tr>
									</tbody>
								</Table>
							</td>
						</tr>
					</thead>
				</Table>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DetailModalView;
