import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onFinish = async (values) => {
		const { login } = this.props;
		login(values);
	};

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	render() {
		return (
			<>
				<div className="login-container">
					<Form
						className="login-form"
						name="basic"
						initialValues={{ remember: true }}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
					>
						<Form.Item name="userName" rules={[{ required: true, message: '请输入用户名!' }]} validateTrigger="onBlur">
							<Input prefix={<UserOutlined />} />
						</Form.Item>

						<Form.Item
							name="password"
							rules={[
								{
									validator(rule, value) {
										if (!value) {
											return Promise.reject('请输入密码');
										} else if (value.length < 6) {
											return Promise.reject('密码长度 不得小于6');
										} else {
											return Promise.resolve();
										}
									},
								},
							]}
							validateTrigger="onBlur"
						>
							<Input.Password prefix={<LockOutlined />} />
						</Form.Item>

						<Form.Item>
							<Button type="primary" danger htmlType="submit" style={{ width: '100%' }}>
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
	login: (userInfo) => {
		return {
			type: 'login',
			value: userInfo,
			callback: (res) => {
				console.log('login-callback', res);
			},
		};
	},
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
