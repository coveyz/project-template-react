import { login, getPermissionTabs } from '@/api/user';
import { getToken, setToken, removeToken, getUserInfo, setUserInfo } from '@/utils/auth';

const userState = {
	token: '',
	year: '',
	permission: [], // 权限表
};

/**
 * eg: 登录接口
 * @param {*} state
 * @param {*} userInfo
 */
const handleLoginOption = (state, userInfo) => {
	return new Promise((resolve) => {
		const requestData = userInfo;
		login(requestData).then((res) => {
			let { token, userId, dept, zw, phone, userName, personName, deptId, deptName, deptLevel, roleSetName, gbType, year } = res.data.data;
			if (!year || year === '') {
				year = new Date().getFullYear(); // 在初始化登录后台没有传给年的时候.这里默认为当前年
			}
			setToken(token);
			const data = { token: token, year: year };
			// 设置用户信息
			const userInfo = JSON.stringify({
				userId,
				userName,
				dept,
				zw,
				phone,
				personName,
				deptId,
				deptName,
				deptLevel,
				roleSetName,
				gbType,
				year,
			}); // 用户信息
			setUserInfo(userInfo);
			resolve(data);
		});
	});
};

const UserModule = (state = { ...userState }, { type, value, callback }) => {
	switch (type) {
		case 'login':
			handleLoginOption(state, value).then((res) => {
				callback(res);
				return res;
      });
      return state
		case 'permission':
			return { ...state, permission: value ? value : [] };
		default:
			return state;
	}
};

export default UserModule;
