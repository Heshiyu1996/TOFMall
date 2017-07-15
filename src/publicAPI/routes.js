import App from './../App'

export default [
	{//开放式创新首页
		path: '/',
		name: 'app',
		component: App,
	},

	{//重定向到首页
		path: '*',
		redirect: '/Error404'
	},

]
