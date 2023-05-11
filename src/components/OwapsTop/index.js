import React from "react";
import { Row, Col } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import Header from "../TopHeader";
import Sidebar from "./SideBar";
import "./style.css";
import DetailView from "./Detailview";

class OwapsTop extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: true,
			title: "Owaps Top-10 Dashboard",
			detailsShow: false,
			summaryValue: "",
		};
	}

	getDetails = (val) => {
		var selectedValue = "";
		fetch(`${process.env.PUBLIC_URL}/assets/owaps.json`)
			.then((res) => res.json())
			.then((data) => {
				data.forEach(function (item, key) {
					if (item["risks"] === val) {
						selectedValue = item;
					}
				});
				this.setState({
					detailsShow: true,
					summaryValue: selectedValue,
				});
			})
			.catch((err) => console.error(err));
	};

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const { error, isLoaded, summaryValue, detailsShow } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return (
				<Row>
					<Col md={12}>
						<Header title={this.state.title} />
						<Paper className="x_panel"></Paper>
					</Col>
				</Row>
			);
		} else {
			return (
				<Row>
					<Col md={12}>
						<Header title={this.state.title} />
						<div className="main-section">
							<div className="sidebar">
								<Sidebar getDetails={this.getDetails} />
							</div>
							<div className="body-container">
								<DetailView details={detailsShow} summary={summaryValue} />
							</div>
						</div>
					</Col>
				</Row>
			);
		}
	}
}

export default OwapsTop;
