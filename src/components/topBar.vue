<template>
	<div id='topBar'>
		<el-row>
			<span @click='tologOut'>登出</span>
		</el-row>
	</div>
</template>
<script>
	export default{
		name:'topBar',
		methods:{
			tologOut(){
				this.$axios.post('/logout').then(response => {
					console.log(response);
					if(response.data.status === 'success'){
						this.$router.push('/');
						sessionStorage.removeItem('token');
					}
				})

			}
		}
	}
</script>
<style lang='scss' scoped="scoped">
	#topBar{
		width: 100%;
		height: 50px;
		background-color: #ffffff;
		box-shadow: 0px 1px 1px 0px 
		#e5e5e5;
	}
</style>