import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'login',
			component: () =>
				import('@/pages/login/index')
		},
		{
			path: "/index",
			name: "index",
			component: () =>
				import('@/pages/index'),
			redirect: "/patrol",
			children: [{
					path: '/patrol',
					name: 'patrol',
					redirect:"/patrol/index",
					component: () =>
						import('@/pages/layout/index'),
					children: [
					{
							path: 'index',
							name: 'index',
							component: () =>
								import('@/pages/firstPage/index')
						},
						{
							path: 'realMonitor',
							name: 'realMonitor',
							component: () =>
								import('@/pages/realMonitor/index')
						},
						{
							path: 'sosManage',
							name: 'sosManage',
							component: () =>
								import('@/pages/sosManage/index')
						},
						{
							path: 'patrolManage',
							name: 'patrolManage',
							component: () =>
								import('@/pages/patrolManage/index')
						}
					]
				},
				{
					path: '/realMonitor',
					name: 'realMonitor1',
					component: () =>
						import('@/pages/realMonitor/index')
				},
				{
					path: '/sosManage',
					name: 'sosManage1',
					component: () =>
						import('@/pages/sosManage/index')
				},
				{
					path: '/patrolManage',
					name: 'patrolManage1',
					component: () =>
						import('@/pages/patrolManage/index')
				}
			]
		},
		{
			path: '/404',
			component: () =>
				import('@/pages/errorPage/404'),
		},
		{
			path: '/401',
			component: () =>
				import('@/pages/errorPage/401'),		},
		{
			path: '*',
			redirect: '/404'
		}

	]
})