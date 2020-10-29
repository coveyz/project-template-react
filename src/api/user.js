import http from '@/utils/request';
// 登录
export const login = (requestData) => {
	return http({
		method: 'POST',
		data: { data: requestData },
		url: `/api/auth/login`,
	});
};

// 获取权限
export const getPermissionTabs = (requestData) => {
	return http({
		method: 'POST',
		data: { data: requestData },
		url: `/api/menu/listAuthMenu`,
	});
};
