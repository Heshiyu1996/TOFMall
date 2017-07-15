import App from './../App'
import Login from './../components/User/login'
import LoginBox from './../components/User/comsforUser/loginbox'
import Registerbox from './../components/User/comsforUser/registerbox'
import UpdateUserInfoBox from './../components/Center/comsforCenter/UpdateUserInfoBox'
import GetUserinfobox from './../components/Center/comsforCenter/Getuserinfobox'
import ChangePassword from './../components/Center/comsforCenter/ChangePassword'



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
		path: '/getUserinfobox',
		name: 'getUserinfobox',
		component: GetUserinfobox,
	},
	{
		path: '/updateuserinfobox',
		name: 'updateuserinfobox',
		component: UpdateUserInfoBox,
	},
	{
		path: '/ChangePassword',
		name: 'ChangePassword',
		component: ChangePassword,
	},
]
