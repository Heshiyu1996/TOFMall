import App from './../App'
import Login from './../components/User/login'
export default [
	{
		path: '/',
		name: 'app',
		component: App,
	},

	{
		path: '/login',
		name: 'login',
		component: Login,
	}
]
