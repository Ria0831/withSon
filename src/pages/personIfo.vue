<template>
	<div id='personIfo'>
		<div class='ifo-top'>
			<div class='top-left'>
				<!-- <img :src="'http://image.shr.com/'+userMsg.userIcon" alt="用户头像" class='user-img'> -->
				<!-- 本地用 -->
				<img :src="userMsg.userIcon" alt="用户头像" class='user-img'> -->
				<div class='changImg' @click='toChangeImg'>更换头像</div>
			</div>
			

			<div class='userIfo'>
				<p class='ifo-name'>{{userMsg.userName}}</p>
				<p>ID:{{userMsg.id}}</p>
			</div>
			<div class='top-right'>
				<ul>
					<li :class='{"active":isCurItem == 1}' @click='toPersonItem(1)'>账号绑定</li>
					<li :class='{"active":isCurItem == 2}' @click='toPersonItem(2)'>个人信息</li>
					<li :class='{"active":isCurItem == 3}' @click='toPersonItem(3)'>其他</li>
					<li :class='{"active":isCurItem == 4}' @click='toPersonItem(4)'>其他</li>
				</ul>
			</div>
			
			
		</div>
		<div class='ifo-main'>
			<component
				:is="curPages"
		        ref="component">
			</component>
			
		</div>
	</div>
</template>
<script>
	import {mapState,mapGetters} from 'vuex';
	import uploadUserImg from '../components/uploadUserImg.vue'
	import account from '../components/account.vue'
	import ifoDetail from '../components/ifoDetail.vue'
	export default {
		name:'personIfo',
	    data() {
	      return {
	        imageUrl: '',
	        curPages:'account',
	        isCurItem:1,//默认显示第一个菜单
	      };
	    },
	    components:{
			uploadUserImg,account,ifoDetail
		},
	    computed:{
			...mapGetters(['userMsg']),

		},
	    methods: {
	    	//个人信息页菜单切换
	    	toPersonItem(item){
	    		//样式改变
	    		this.isCurItem = item;
	    		//根据选择传不同的componentName到curPages
	    		switch(item){
	    			case 1: this.curPages = 'account';break;
	    			case 2: this.curPages = 'ifoDetail';break;
	    		}
	    	},
	    	//更改用户头像
	    	toChangeImg(){
	    		this.curPages = 'uploadUserImg'
	    	},
		}  
  }
</script>
<style lang='scss'>
	#personIfo{
		width: 100%;
		height: 100%;
		.ifo-top{
			display: flex;
			flex-direction:row;
			box-sizing:border-box;
			height: 8.5rem;
			background: #f8fafc;
			align-items:center;
			padding: 0.5rem 2rem;
			cursor: pointer;
			.top-left{
				position: relative;
				border-radius: 50%;
		   		border:2px solid #d9dde1;
		   		overflow: hidden;
		   		width: 6.5rem;
    			height: 6.5rem;
				.user-img{
					width: 6.5rem;
					height: 6.5rem;
				}
				.changImg{
					position: absolute;
				    bottom: -30px;
				    left: 0px;
				    background: rgba(0, 0, 0, 0.6);
				    color: #fff;
				    width: 6.5rem;
				    text-align: center;
				    height: 2rem;
				    vertical-align: top;
					transition: bottom .3s;
				}
			}
			.top-left:hover .changImg{
			    bottom: 0px;
			}
			.userIfo{
				width: 10rem;
				text-align: center;
				margin-left:1rem;
				.ifo-name{
					font-size: 1.2rem;
					overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
			}
			.top-right{
				margin-left: 6rem;
				ul{
					display: flex;
					li{
						width: 4rem;
						text-align: center;
						padding:1rem;
						border-radius: 4px;
					}
					.active{
						background-color: #228B22;
						color:#fff;
					}

				}
			}
		}
		.ifo-main{
			height: calc(100% - 8.5rem);
		}
	}
	
</style>