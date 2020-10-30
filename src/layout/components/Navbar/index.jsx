import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import logoPage from '@/assets/images/navbar/logo.png';
import { Home } from '@/components';

const Navbar = () => {
	return (
		<div className="navbar-frame">
			<div className="navbar-logo">
				<div className="">
					<img src={logoPage} alt="" />
					<span className="project-title">日常管理监督平台</span>
				</div>
			</div>
			<div className="navbar-option">
				<div className="navbar-option-item">
					<Home />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
