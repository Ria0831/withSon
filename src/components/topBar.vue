<template>
	<div id='topBar' class='clearfloat'>
		<div class='top-left' >
			<i class='icon iconfont icon-zhankaishouqi-copy-copy icon-my-shouqi' @click='toFold(isFold)'></i>
		</div>
		<div class='top-right'>
			<div class='user-name'>你好，{{userMsg.userName}}</div>
			<el-dropdown trigger="click" @command='handleCommand'>
		      <span class="el-dropdown-link">
		      	<img :src="'http://image.shr.com/'+userMsg.userIcon" alt="用户头像" class='user-img'>
		        <i class="el-icon-arrow-down el-icon--right"></i>
		      </span>
		      <el-dropdown-menu slot="dropdown">
		        <el-dropdown-item command='logout'>登出</el-dropdown-item>
		        <el-dropdown-item command='toPersonIfo'>个人设置</el-dropdown-item>
		      </el-dropdown-menu>
		    </el-dropdown>
		</div>
			
		
	</div>
</template>
<script>
	import {mapState,mapGetters} from 'vuex';
	export default{
		name:'topBar',
		data(){
			return{
				userName:'小鳖鳖',
				isFold:false,
			}
		},
		computed:{
			...mapState({
				userMsg:state=>state.userMsg
			})
		},
		methods:{
			//折叠菜单按钮
			toFold(val){
				this.isFold = !val;
				this.$emit('toFold',this.isFold);
			},
			//下拉事件的点击方法
			handleCommand(val){
				// if(val == 'logout'){
				// 	this.tologOut()
				// }
				switch(val){
					case 'logout':this.tologOut();break;
					case  'toPersonIfo':this.toPersonIfo();break;
				}
			},
			//登出方法
			tologOut(){
				this.$axios.post('/logout').then(response => {
					console.log(response);
					if(response.data.status === 'success'){
						this.$router.push('/');
						sessionStorage.removeItem('token');
					}
				})

			},
			//去个人设置页面
			toPersonIfo(){
				this.$store.commit("add_tabs",{name:"个人设置",content:"personIfo",flag:2,pathUrl:"/personIfo"})
			}
		}
	}
</script>
<style lang='scss'>
	.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
			background-color:rgba(102,205,0,0.4);
			color:#fff;
		}
	/*清除浮动代码*/
   .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
   .clearfloat{zoom:1}
	#topBar{
		height: 50px;
		line-height: 50px;
		background-color: #ffffff;
		box-shadow: 0px 1px 1px 0px #e5e5e5;
		padding:0 16px;
		.top-left{
			float: left;
		}
		.top-right{
			
			float:right;
			display: flex;
			align-items:center;
			.user-img{
    			width: 35px;
				height: 35px;
    			border-radius: 50%;
    			margin-left:10px;
    			vertical-align: middle;
			}
		}
		.icon-my-shouqi{color:#008F53;font-size: 23px;}
		
	}
</style>