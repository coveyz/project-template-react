import React, { Component } from 'react';
import { connect } from 'react-redux';


class index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
        12121212
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(index);
