import PropTypes from "prop-types";
import React, { Component } from "react";
import Divider from "./divider";

export class Filter extends Component {
	static propTypes = {};

	render() {
		return (
			<div>
				<h2>Filter</h2>
				<Divider />
			</div>
		);
	}
}

export default Filter;
