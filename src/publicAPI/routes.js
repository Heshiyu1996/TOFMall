import App from './../App'
import Login from './../components/User/login'
import LoginBox from './../components/User/comsforUser/loginbox'
import Registerbox from './../components/User/comsforUser/registerbox'
import UpdateUserinfobox from './../components/Center/comsforCenter/updateuserinfobox'



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
	},
	{
		path: '/loginbox',
		name: 'loginbox',
		component: LoginBox,
	},
	{
		path: '/registerbox',
		name: 'registerbox',
		component: Registerbox,
	},
	{
		path: '/UpdateUserinfobox',
		name: 'UpdateUserinfobox',
		component: UpdateUserinfobox,
	},
]
