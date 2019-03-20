<template>
	<el-row id='home' ref='home'>
		<el-col :span='isFold == true ? 4 : 2'  >
			<side-menu :foldStat='isFold'></side-menu>
		</el-col>
		<el-col :span='isFold == true ? 20 : 22' style='{background:blue;}'>
			<el-row>
				<top-bar v-on:toFold='toFoldMenu'></top-bar>
			</el-row>
			<el-row style='height: calc(100% - 52px)'>
				<div class='main-content'>
				    <my-tab></my-tab>
					<!-- 模板渲染入口 -->
					<transition name='move' mode='out-in'>
						<router-view></router-view>
					</transition>
				</div>
			</el-row>
		</el-col>
	</el-row>
</template>
<script>
	import sideMenu from '../components/menu.vue'
	import topBar from '../components/topBar.vue'
	import myTab from '../components/myTab.vue'
	export default{
		name:'home',
		components:{
			sideMenu,topBar,myTab
		},
		data(){
			return{
				isFold:false,
			}
		},
		mounted(){
			this.try();
		},
		methods:{
			//折叠菜单栏
			toFoldMenu(val){
				this.isFold = val;
			},
			try(){
				this.$axios.get('/user/userList',{headers:{
             	 	'token': sessionStorage.getItem('token')
	                }})
					.then(response =>{
					console.log(response);
				})
			},
			goOut(){
				this.$axios.post('/logout')
					.then(response =>{
					console.log(response);
				})
			}
		}
	}
</script>
<style lang='scss'>
	#home{
		width: 100%;
		height: 100%;
		
		display: flex;
		flex-direction:colomn;
		.main{
			width: 90%;
			.main-content{
				height: calc(100% - 50px);
				background:black;
			}
		}

	}
</style>