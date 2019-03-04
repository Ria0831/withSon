<template>
	<el-row id='home' ref='home'>
		<el-col :span='4'  >
			<side-menu></side-menu>
		</el-col>
		<el-col :span='20' style='{background:blue;}'>
			<el-row>
				<top-bar></top-bar>
			</el-row>
			<el-row>
				<!-- <el-button @click='goOut'>登出</el-button> -->
				<div class='main-content'>
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
	export default{
		name:'home',
		components:{
			sideMenu,topBar
		},
		mounted(){
			this.try();
		},
		methods:{
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
		color: #fff;
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