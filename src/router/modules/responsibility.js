import Check from '@/pages/responsibility/check/index.jsx';
import Customized from '@/pages/responsibility/customized/index.jsx';

const responsibilityRouter = {
	path: '/responsibility',
	name: 'responsibility',
	meta: {
		title: '责任清单',
		icon: 'xxx',
		limit: 'zrqd',
	},
	children: [
		{
			path: 'customized',
			name: 'customized',
			meta: {
				title: '责任清单定制',
				icon: '',
				limit: 'zrqd_zrqdzd',
			},
			component: Customized,
		},
		{
			path: '/check',
			name: 'check',
			meta: {
				title: '责任清单查看',
				icon: '',
				limit: 'zrqd_zrqdck',
			},
			component: Check,
		},
	],
};

export default responsibilityRouter;
