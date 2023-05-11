import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CveDashboard from "./CveDashboard";
import OwapsTop from "./OwapsTop";

const Routers = () => (
	<Switch>
		<Route path="/" component={CveDashboard} />
		<Route path="/owaps_top" component={OwapsTop} />
	</Switch>
);

export default Routers;
