import Vuex from 'vuex'
import Vue from 'vue'
import tagsView from './modules/tagView'
import tagsPage from './modules/tabPage'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{

	},
	modules:{
		tagsView:tagsView,
		tagsPage:tagsPage
	},
	mutations:{
		
	}
})