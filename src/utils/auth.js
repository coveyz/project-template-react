import Cookies from 'js-cookie';

const TokenKey = `Party-Building-Token`;
const UserinfoKey = "Party-building-Info";

// 获取 token
export const getToken = () => {
	return Cookies.get(TokenKey);
};
// 设置 Token
export const setToken = (token) => {
	return Cookies.set(TokenKey, token);
};

// 移除 Token
export const removeToken = () => {
	return Cookies.remove(TokenKey);
};


// 获取 用户信息
export const getUserInfo = () => {
  return Cookies.get(UserinfoKey);
};
// 设置 用户信息
export const setUserInfo = token => {
  return Cookies.set(UserinfoKey, token);
};

// 移除 用户信息
export const removeUserInfo = () => {
  return Cookies.remove(UserinfoKey);
};
