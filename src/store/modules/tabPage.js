const tagsPage ={
	state:{
		thumbnail:[]
	},
	getters:{
		thumbnail:state =>state.thumbnail
	},
	mutations:{
		//保存缩略图
		add_thumbnail(state,obj){
			if(state.thumbnail.length==0){
				state.thumbnail.push(obj)
			}else{
				var tabs = state.thumbnail;
				//findIndex为ture时返回索引值，如果没有符合元素返回-1
				var temp = tabs.findIndex( value =>value.name == obj.name)
				//如果没有重复，直接放入
				if(temp === -1){
					state.thumbnail.push(obj)
				}else{
					//如果重复，新的替换旧的
					state.thumbnail[temp] = obj
				}
			}
			
		},
		//删除缩略图
		remove_thumbnail(state,index){
			var tabs = state.thumbnail;
			//根据索引值删除
			state.thumbnail.splice(index,1);
		}
		
	},

}

export default tagsPage