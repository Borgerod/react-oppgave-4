import React, { Component } from "react";

export class Divider extends Component {
	static propTypes = {};

	render() {
		return (
			<hr className="border-t w-full border-divider" aria-hidden="true" />
		);
	}
}

export default Divider;
