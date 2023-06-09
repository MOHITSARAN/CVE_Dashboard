import React from "react";
import Paper from "@material-ui/core/Paper";
import { MDBDataTable } from "mdbreact";
import { Button, Row, Col } from "react-bootstrap";
import TableLoader from "../ContentLoader";
import Header from "../TopHeader";
import DetailSearchResult from "../DetailSearchResult";
import DetailModalView from "../DetailSearchResult/DetailsModal";
import getData from "../Utils/fetch-data";
import SearchBar from "./SearchBar";

class CveDashboard extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			title: "Common Vulnerabilities and Exposures Dashboard",
			items: [],
			searchResult: [],
			search: false,
			searchValue: "None",
			optionValue: "None",
			detailsView: false,
			modalShow: false,
		};
	}

	handleModalShowHide(item) {
		this.setState({ modalShow: !this.state.modalShow, detailsView: item });
	}

	getDate(item) {
		let date = new Date(item);
		return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
	}

	setOptionValue = (val) => {
		this.setState({
			optionValue: val,
		});
	};

	setSearchValue = (val) => {
		this.setState({
			searchValue: val,
		});
	};

	searchHandler(item) {
		this._isMounted = true;
		let cve_id = this.state.searchValue;
		if (cve_id !== "") {
			this.setState({ isLoaded: false });
			getData("https://cve.circl.lu/api/cve/" + cve_id).then(
				(result) => {
					if (result != null && this._isMounted === true) {
						this.setState({
							isLoaded: true,
							search: true,
							searchResult: result,
						});
					} else {
						alert("Enter correct CVE Id!");
						this.setState({
							isLoaded: true,
						});
					}
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
		} else {
			this.setState({ search: false, isLoaded: false });
			this.componentDidMount();
		}
	}

	componentDidMount() {
		this._isMounted = true;
		getData("https://cve.circl.lu/api/last/30").then(
			(result) => {
				let rows = [];
				result.forEach((item) =>
					rows.push({
						id: item.id,
						summary: item.summary,
						cvss: item.cvss,
						published: this.getDate(item.Published),
						action: (
							<Button
								size="sm"
								id={item.id}
								variant="primary"
								onClick={() => this.handleModalShowHide(item)}
							>
								Show Details
							</Button>
						),
					})
				);

				if (this._isMounted) {
					this.setState({
						isLoaded: true,
						items: {
							columns: [
								{
									label: "CVE_ID",
									field: "id",
									sort: "asc",
									width: 950,
								},
								{
									label: "Summary",
									field: "summary",
									sort: "asc",
									width: 150,
								},
								{
									label: "Score",
									field: "cvss",
									sort: "asc",
									width: 150,
								},
								{
									label: "Published",
									field: "published",
									sort: "asc",
									width: 150,
								},
								{
									label: "Details",
									field: "action",
									sort: "asc",
									width: 150,
								},
							],
							rows: rows,
						},
					});
				}
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error,
				});
			}
		);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const {
			error,
			isLoaded,
			search,
			items,
			modalShow,
			searchResult,
			detailsView,
		} = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return (
				<Row>
					<Col xs={12}>
						<Header title={this.state.title} />
						<Paper style={{ padding: "10px", marginBottom: "10px" }}>
							<SearchBar
								searchValue={this.setSearchValue}
								optionValue={this.setOptionValue}
								onSearch={() => this.searchHandler()}
							/>
						</Paper>
						<Paper className="x_panel">
							<TableLoader />
						</Paper>
					</Col>
				</Row>
			);
		} else if (search) {
			return (
				<Row>
					<Col xs={12}>
						<Header title={this.state.title} />
						<Paper style={{ padding: "10px", marginBottom: "10px" }}>
							<SearchBar
								searchValue={this.setSearchValue}
								optionValue={this.setOptionValue}
								onSearch={() => this.searchHandler()}
							/>
						</Paper>
						<Paper className="x_panel">
							<DetailSearchResult detailsview={searchResult} search={search} />
						</Paper>
					</Col>
				</Row>
			);
		} else {
			return (
				<Row>
					<Col xs={12}>
						<Header title={this.state.title} />
						<Paper style={{ padding: "10px", marginBottom: "10px" }}>
							<SearchBar
								searchValue={this.setSearchValue}
								optionValue={this.setOptionValue}
								onSearch={() => this.searchHandler()}
							/>
						</Paper>
						<Paper className="x_panel">
							<MDBDataTable
								data={items}
								order={["cvss", "desc"]}
								entriesOptions={[5, 20, 25]}
								entries={20}
								small
							/>
							<DetailModalView
								show={modalShow}
								detailsviewlist={detailsView}
								onHide={() => this.handleModalShowHide()}
							/>
						</Paper>
					</Col>
				</Row>
			);
		}
	}
}

export default CveDashboard;
