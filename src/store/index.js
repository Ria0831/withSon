import Vuex from 'vuex'
import Vue from 'vue'
import tagsView from './modules/tagView'
import tagsPage from './modules/tabPage'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		userMsg:{
			'userName':'',
			'userIcon':'',
			'token':'',
			'role':'',
			'userCode':'',
			'id':0
		}
		

	},
	getters:{
		userMsg:state => state.userMsg
	},
	modules:{
		tagsView:tagsView,
		tagsPage:tagsPage
	},
	mutations:{
		setUserMsg(state,{userName,userIcon,token,role,userCode,id}){
			var param = state.userMsg;
			param.userName = userName
			param.userIcon = userIcon
			param.token = token
			param.role = role
			param.userCode = userCode
			param.id = id
		}
	}
})