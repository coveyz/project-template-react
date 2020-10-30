import React, { useState, useEffect } from 'react';
import './svgicon.scss';
// import task from '../../icons/svg/task.svg'

const SvgIcon = (props) => {
	const { iconClass, className } = props;

	return (
		<svg className="svg-icon">
			<use
				xlinkHref={'#icon-' + iconClass}
				aria-hidden="true"
				className={className ? `svg-icon${className}` : 'svg-icon'}
				style={{ mask: `url(${iconClass}) no-repeat 50% 50%`, 'WebkitMask': `url(${iconClass}) no-repeat 50% 50%` }}
			/>
		</svg>
	);
};

export default SvgIcon;

