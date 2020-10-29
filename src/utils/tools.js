import { notification } from 'antd';

/**
 * eg: 标题
 * @param {string} pageTitle
 */
export const getPageTitle = (pageTitle) => {
	const title = 'template';
	if (pageTitle) return pageTitle;
	return title;
};

/**
 * eg: 成功信息 提示
 * @param {string} msg
 */
export const successNotification = (msg) => {
	notification['success']({
		message: '消息提示',
		description: msg,
	});
};

/**
 * eg: 报错信息 提示
 * @param {string} msg
 */
export const errorNotification = (msg) => {
	notification['error']({
		message: '消息提示',
		description: msg,
	});
};
