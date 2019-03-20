<template>
	<div id='tagManage'>
		<div class='manage-main'>
			<!-- <div class='main-top'> -->
				<i class='icon iconfont icon-home-copy myicon-home' @click='tohome'></i>
			<!-- </div> -->
			<div class='main-tab'>
				<div v-for='(item,index) in thumbnail'  class='tab-item'>
					<h1 class='tab-title'>{{item.name}}</h1>
					<i class='el-icon-circle-close tab-close' @click='toCloseTab(item,index)'></i>
					
					<img :class="setClassName(index)" class='item-content' @click='toTab(item)'></img>

				</div>	
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState,mapGetters} from 'vuex';
	import html2canvas from 'html2canvas'
	export default{
		data(){
			return{

			}
		},
		computed:{
			...mapGetters(['thumbnail'])
		},
		mounted(){
			this.getCanvasDom()
		
		},
		watch:{
			thumbnail(oldval,newval){
				// if(oldval!= newval){
					this.getCanvasDom()
				// }
			}
		},
		methods:{
			//跳转到指定tab页面
			toTab(item){
				//回到home页面，设置tabView的tabValue为选中值
				var tabs = this.$store.getters.tabsList;
				var index = tabs.findIndex( value =>value.name == item.name)
				var curContent = tabs[index];
				this.$store.commit('changeTabValue',curContent);
				this.$router.push('/home')
			},
			//关闭指定tab页
			toCloseTab(item,index){
				//当前缩略图删除，并改变tabView的tabsList和tabValue
				this.$store.commit('remove_thumbnail',index);
				this.$store.commit('thum_remove_tabs',item);

			},
			//跳转到home页面
			tohome(){
				this.$router.push('/home')
			},
			getCanvasDom(){
				var temp = this.$store.getters.thumbnail;
				temp.forEach((item,index) =>{
					document.querySelector(".tabs"+index).src = item.canvas;
				})
				 
			},
			//动态设置class名
			setClassName(index){
				return 'tabs'+index
			}
		}
	}
</script>
<style lang='scss'>
	#tagManage{
		width: 100%;
		height: 100%;
		background: url('../../static/img/JJ18.png') no-repeat center center;
		position: relative;
		.manage-main{
			width: calc(100% - 6rem);
    		height: calc(100% - 2rem);
			position: absolute;
			top:0;
			left:0;
			background: rgba(0,0,0,0.6);
			padding: 1rem 3rem;
			.myicon-home{
				font-size: 28px;
				color:#228B22;
				border:1px solid #228B22;
				text-align: center;
				border-radius: 50%;
				padding:5px;
			}
			
			.main-tab{
				display: flex;
				flex-direction:row;
				justify-center:center;
				margin-top: 30px;
				
			}
			.tab-item{
				width: calc(100% / 3);
				position: relative;
				.tab-close{
					position: absolute;
					top:5px;
					right: 0;
					font-size: 18px;
    				color: #e3e3e3;
    				display: none;
    				
				}
    			.tab-title{
					color:#fff;
					margin-bottom: 10px;
				}  
				.item-content{
					overflow: hidden;
					height: 200px !important;
					width: 100%;
				}
			}
			.tab-item:hover {
				transition: all .3s ease-in-out;
				transform:scale(1.1);
			}
			.tab-item:hover .tab-close{
				display: inline-block;
			}
			.tab-item:nth-child(3n + 2){
				margin:0 1.5rem;
			}
		}
	}
</style>