import axios from 'axios';
import { getToken } from '@/utils/auth';
import { errorNotification } from '@/utils/tools';

const http = axios.create({
	timeout: 5000,
});

http.interceptors.request.use(
	(config) => {
		if (getToken('Party-Building-Token')) {
			config.headers['Authorization'] = getToken('Party-Building-Token');
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(response) => {
		const contentType = response.headers['content-type'];

		/**
		 *  为了 解决导出文件 报错 信息显示
		 *  1.判断当前 response.type ?=== 'arraybuffer'
		 *  1.1 如果等于
		 *  1.1.1 转换成对象 抛出错误
		 *  1.2 如果不等于
		 *  1.2.1 说明当前是 普通的请求 按照正常 报错流程走!
		 */

		if (contentType === 'application/json') {
			if (response.config.responseType === 'arraybuffer') {
				const enc = new TextDecoder('utf-8');
				const res = JSON.parse(enc.decode(new Uint8Array(response.data))); //转化成json对象
				const { code, msg } = res.header;
				if (code !== '200') {
					errorNotification(msg);
					return Promise.reject(new Error(msg || 'Error'));
				}
			} else {
				const { header } = response.data;
				const { code, msg } = header;
				if (code !== '200') {
					errorNotification(msg);
					return Promise.reject(msg || 'Error');
				}
			}
		}
		return response;
	},
	(error) => {
		const { header } = error.response.data;
		const { msg } = header;
		errorNotification(msg);
		return Promise.reject(error);
	}
);

export default http;
