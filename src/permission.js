import React, { Component } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import NProgress from 'nprogress'; // progress bar
// import 'nprogress/nprogress.css'; // progress bar style
import { getUserInfo } from '@/utils/auth';
// import { getPageTitle, errorNotification } from '@/utils/tools';
import { getToken } from '@/utils/auth';
import { getPermissionTabs } from '@/api/user';

import Login from '@/pages/login';
import Check from '@/pages/responsibility/check';
import Customized from '@/pages/responsibility/customized';

class Permission extends Component {
	constructor(props) {
		super(props);
		this.state = {
			whiteList: ['/login'],
			permission: [],
		};
	}

	/**
	 * eg: 获取权限列表
	 */
	getPermissionTabsOption = () => {
		return new Promise((resolve) => {
			const { userId } = JSON.parse(getUserInfo());
			getPermissionTabs(userId).then((res) => {
				const { menuCodeList } = res.data.data;
				resolve(menuCodeList);
			});
		});
	};

	/**
	 * 使用 limit 判断当前路由用户 是不是 有权限
	 * @param {*} route
	 * @param {*} permissionTabs
	 */
	hasPermission = (route, permissionTabs) => {
		if (route.meta && route.meta.limit) {
			return permissionTabs.indexOf(route.meta.limit) > -1;
		} else {
			return true;
		}
	};

	/**
	 * 过滤 异步路由
	 * @param {*} routes
	 * @param {*} permissionTabs
	 */
	filterAsyncRoutes = (routes, permissionTabs) => {
		const res = [];
		routes.forEach((route) => {
			const tmp = { ...route };
			if (this.hasPermission(tmp, permissionTabs)) {
				if (tmp.children) {
					tmp.children = this.filterAsyncRoutes(tmp.children, permissionTabs);
				}
				res.push(tmp);
			}
		});
		return res;
	};

  /**
   * 生成路由 
   * @param {*} permissionTabs 
   */
	generateRoutes = (permissionTabs) => {
		console.log('++', this.props);
		const { constantRoutes, asyncRoutes } = this.props.children;

		let accessRoutes = this.filterAsyncRoutes(asyncRoutes, permissionTabs);
		let totalRoutes = constantRoutes.connect(accessRoutes);

		return (
			<>
				<Route path="/customized" component={Customized} />
				<Route path="/check" component={Check} />
				<Route path="/login" component={Login} />
				{/* <Route exact path={path} component={component} /> */}
			</>
		);
	};

	render() {
		const { whiteList } = this.state;
		const { path, component, children, location, user, permission } = this.props;
		const { pathname } = location;
		if (getToken()) {
			const curPermissionTabs = user['permission'];

			if (curPermissionTabs && curPermissionTabs.length > 0) {
				console.log('现在有权限表', curPermissionTabs);
				return this.generateRoutes(path, component);
			} else {
				console.log('现在没有权限表', curPermissionTabs);
				this.getPermissionTabsOption().then((result) => {
					permission(result);
					return this.generateRoutes(result);
				});
			}

			return this.generateRoutes(path, component);
		} else {
			console.log('no - token');
			return (
				<Redirect
					to={{
						pathname: '/login',
						state: { redirect: whiteList.includes(pathname) ? path : '' },
					}}
				/>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = {
	permission: (tab) => {
		return {
			type: 'permission',
			value: tab,
		};
	},
};

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
