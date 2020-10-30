import React, { Component } from 'react';

class Check extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.log('check');
	}

	render() {
		return <div>check</div>;
	}
}

export default Check;
