import React from "react";
import { Table } from "react-bootstrap";
import {
	GetReferencesURL,
	GetVulnerableProduct,
	GetScoreColor,
} from "./DetailsModal";

const DetailSearchResult = (props) => {
	var item_obj = "None";
	var id = "None";
	var summary = "None";
	var solutions = "None";
	var cvss = "None";
	var published = "None";
	var modified = "None";

	var references_arr = "None";
	var vulnerable_product_arr = "None";

	var authentication = "None";
	var complexity = "None";
	var vector = "None";

	var availability = "None";
	var confidentiality = "None";
	var integrity = "None";

	if (props.search === true) {
		item_obj = props.detailsview;
		id = item_obj.id;
		summary = item_obj.summary;
		solutions = item_obj?.capec[0]?.solutions;
		cvss = <GetScoreColor item={item_obj.cvss} />;
		published = item_obj.Published;
		modified = item_obj.Modified;

		authentication = item_obj.access.authentication;
		complexity = item_obj.access.complexity;
		vector = item_obj.access.vector;

		availability = item_obj.impact.availability;
		confidentiality = item_obj.impact.confidentiality;
		integrity = item_obj.impact.integrity;

		references_arr = <GetReferencesURL item={item_obj} />;
		vulnerable_product_arr = <GetVulnerableProduct item={item_obj} />;
	}

	return (
		<Table striped bordered hover>
			<thead>
				<tr style={{ backgroundColor: "#3f51b5", color: "white" }}>
					<td colSpan="2" style={{ textAlign: "center" }}>
						{" "}
						{id}{" "}
					</td>
				</tr>
				<tr>
					<td>Summary</td>
					<td>{summary}</td>
				</tr>
				<tr>
					<td>Solutions</td>
					<td>{solutions}</td>
				</tr>
				<tr>
					<td>Details</td>
					<td>
						<Table>
							<thead>
								<tr>
									<td>CVSS</td>
									<td>Published</td>
									<td>Modified</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{cvss}</td>
									<td>{published}</td>
									<td>{modified}</td>
								</tr>
							</tbody>
						</Table>
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
	);
};

export default DetailSearchResult;
