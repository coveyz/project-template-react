import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Permission from '@/permission';
import Layout from '@/layout/index.jsx';
import Login from '@/pages/login/index.jsx';
import responsibilityRoutes from './modules/responsibility';

class Router extends Component {
	constructor(props) {
		super(props);
		this.state = {
			constantRoutes: [
				{
					path: '/login',
					component: Login,
					hidden: true,
				},
				{
					path: '/',
					exact: true,
					component: Layout,
					hidden: true,
				},
			],
			asyncRoutes: [responsibilityRoutes],
		};
	}

	render() {
		const { constantRoutes, asyncRoutes } = this.state;
		return (
			<div style={{ height: '100%' }}>
				<BrowserRouter>
					<Switch>
						<Route path="/login" component={Login} />
						<Permission path="/" component={Layout}>
							{{
								constantRoutes: constantRoutes,
								asyncRoutes: asyncRoutes,
							}}
						</Permission>

						<Route render={() => <div>404</div>} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(Router);
