import Check from '@/pages/responsibility/check';
import Customized from '@/pages/responsibility/customized';

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
			component: Check,
		},
		{
			path: 'check',
			name: 'check',
			meta: {
				title: '责任清单查看',
				icon: '',
				limit: 'zrqd_zrqdck',
			},
			component: Customized,
		},
	],
};

export default responsibilityRouter;
