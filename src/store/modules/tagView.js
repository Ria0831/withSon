const tagsView ={
	state:{
		tabsList:[],
		tabValue:0,
	},
	getters:{
		tabsList:state=>state.tabsList,
		tabValue:state=>state.tabValue,
	},

	mutations:{
		add_tabs(state,obj){
			console.log(state,obj)
			var flag = true;
			var tabs = state.tabsList;
			//查看是否已经打开过
			var temp = tabs.filter(item => item.flag === obj.flag)
			console.log(temp)
			//如果未曾打开过，放入数组
			if(temp.length === 0){
				state.tabsList.push(obj);
			}
			state.tabValue = obj.name
			
		},
		//删除选项卡
		remove_tabs(state,obj){
			console.log(state,obj);
			let tabs = state.tabsList;
			let activeName = state.tabValue;
			//如果是当前活动页删除，选中下一个
			if(activeName === obj.content){
				tabs.forEach((tab,index) =>{
					if(tab.name === obj.name){
						let nextTab = tabs[index + 1] || tabs[index -1];
						if(nextTab){
							activeName = nextTab.content
						}
					}
				})
			}
			state.tabValue = activeName;
			state.tabsList = tabs.filter(tab => tab.flag !== obj.flag);
			//如果全部删除了，content变为空
			if(state.tabsList.length === 0){
				state.tabValue = ''
			}
		},
		//缩略图删除当前tab
		thum_remove_tabs(state,obj){
			let tabs = state.tabsList;
			let activeName = state.tabValue;
			//根据obj.name找到对应标签页的content
			var curIndex =  tabs.findIndex( value =>value.name == obj.name);
			var curConent = tabs[curIndex].content
			//如果删除的是当前活动页，默认选中下一个页面
			if(activeName === curConent){
				let nextTab = tabs[curIndex + 1] || tabs[curIndex -1];
				if(nextTab){
					activeName = nextTab.content
				}
			}
			state.tabValue = activeName;
			state.tabsList = tabs.filter(tab => tab.name !== obj.name);
			//如果全部删除了，content变为空
			if(state.tabsList.length === 0){
				state.tabValue = ''
			}
		},
		//改变当前打开的tab页值
		changeTabValue(state,val){
			state.tabValue = val.content;
		}
	},

}

export default tagsView