import React, { Component } from 'react';
import { connect } from 'react-redux';
import './layout.scss';
import { Navbar } from './components';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="layout-container">
				<div className="layout-container-frame">
					<div className="layout-header">
						<Navbar />
					</div>
				</div>
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
