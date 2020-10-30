import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { SvgIcon } from '@/components';

const Home = () => {
	const jumpHomeOption = () => {
		console.log('回首页');
	};

	return (
		<Tooltip placement="top" title="首页">
			<div className="" onClick={jumpHomeOption}>
				<SvgIcon iconClass="home" />
			</div>
		</Tooltip>
	);
};

export default Home;
