import Vuex from 'vuex'
import Vue from 'vue'
import tagsView from './modules/tagView'
import tagsPage from './modules/tabPage'
import VuexPersistence from 'vuex-persist'  //vuex持久化插件

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default new Vuex.Store({
	state:{
		userMsg:{
			'userName':'鳖鳖小朋友的家长',
			'userIcon':'../../static/img/userImg.jpg',
			'token':'',
			'role':'',
			'userCode':'',
			'id':0,
			email:'',
			telephone:'',
		}
		

	},
	getters:{
		userMsg:state => state.userMsg
	},
	modules:{
		tagsView:tagsView,
		tagsPage:tagsPage
	},
	plugins: [vuexLocal.plugin],
	mutations:{
		setUserMsg(state,{userName,userIcon,token,role,userCode,id,email,telephone}){
			var param = state.userMsg;
			param.userName = userName
			param.userIcon = userIcon
			param.token = token
			param.role = role
			param.userCode = userCode
			param.id = id
			param.email = email
			param.telephone = telephone
		}
	}
})