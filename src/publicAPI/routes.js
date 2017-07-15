import App from './../App'
import Login from './../components/User/login'
import LoginBox from './../components/User/comsforUser/loginbox'
import Registerbox from './../components/User/comsforUser/registerbox'
import UpdateUserInfoBox from './../components/Center/comsforCenter/UpdateUserInfoBox'
import GetUserinfobox from './../components/Center/comsforCenter/Getuserinfobox'
import ChangePassword from './../components/Center/comsforCenter/ChangePassword'

import byCategory from './../components/Search/byCategory'
import byType from './../components/Search/byType'



export default [
	{
		path: '/',
		name: 'app',
		component: App,
			children:[
			 	]
	},

			{
				path:'/byType',
				component:byType,
				meta: {
					keepAlive: true
				},
			},

			{
				path:'/byCategory',
				component:byCategory,
				meta: {
					keepAlive: true
				},
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
	{//重定向到首页
		path: '*', redirect: '/'
	},
]
