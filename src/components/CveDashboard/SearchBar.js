import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import "./style.css";

const SearchBar = (props) => {
	const options = [
		{ value: "cveid", label: "CVE Id" },
		{ value: "vendor", label: "Vendor" },
	];

	return (
		<Row>
			<Col xs={3}>
				<Select
					className="md-form form-sm form-2 pl-0"
					options={options}
					defaultValue={{ label: "CVE Id", value: "cveid" }}
					onChange={(e) => props.optionValue(e.value)}
				/>
			</Col>
			<Col xs={9}>
				<div className="input-group md-form form-sm form-2 pl-0">
					<input
						className="form-control my-0 py-1 red-border"
						type="text"
						onChange={(e) => props.searchValue(e.target.value)}
						placeholder="Search..."
						aria-label="Search"
					/>
					<Button
						size="md"
						className="search-botton"
						variant="primary"
						onClick={props.onSearch}
					>
						Search
					</Button>
				</div>
			</Col>
		</Row>
	);
};

export default SearchBar;
