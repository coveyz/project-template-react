import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import NProgress from 'nprogress'; // progress bar
// import 'nprogress/nprogress.css'; // progress bar style
import { getUserInfo } from '@/utils/auth';
// import { getPageTitle, errorNotification } from '@/utils/tools';
import { getToken } from '@/utils/auth';
import { getPermissionTabs } from '@/api/user';

class Permission extends Component {
	constructor(props) {
		super(props);
		this.state = {
			whiteList: ['/login'],
			permission: [],
			list: [],
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
	 * eg: 配置路由
	 * @param {*} permissionTabs
	 */
	configureRoutes = (permissionTabs) => {
		const { constantRoutes, asyncRoutes } = this.props.children;

		let accessRoutes = this.filterAsyncRoutes(asyncRoutes, permissionTabs);
		let totalRoutes = constantRoutes.concat(accessRoutes);

		return <>{this.generateRoutes(totalRoutes)}</>;
	};

	/**
	 * eg: 生成路由
	 * @param {*} routes
	 */
	generateRoutes = (routes) => {
		const copyRoutes = routes.map((item) => item);
		const res = [];
		copyRoutes.forEach((item) => {
			const tmp = { ...item };
			if (tmp.children) {
				for (let index = 0; index < tmp.children.length; index++) {
					const element = tmp.children[index];
					res.push(element);
				}
			}
			res.push(tmp);
		});

		return (
			<>
				{res.map((item, index) => {
					return <Route exact key={index} path={item.path} component={item.component ? item.component : null} name={item.name} />;
				})}
			</>
		);
	};

	render() {
		const { whiteList } = this.state;
		const { path, location, user, permission } = this.props;
		const { pathname } = location;
		if (getToken()) {
			const curPermissionTabs = user['permission'];

			if (curPermissionTabs && curPermissionTabs.length > 0) {
				// console.log('现在有权限表', curPermissionTabs);
				return this.configureRoutes(curPermissionTabs);
			} else {
				// console.log('现在没有权限表', curPermissionTabs);
				this.getPermissionTabsOption().then((result) => {
					permission(result);
					return this.configureRoutes(result);
				});
			}

			return curPermissionTabs && curPermissionTabs.length > 0 ? this.configureRoutes(curPermissionTabs) : null;
		} else {
			console.log('no - token', pathname);
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
