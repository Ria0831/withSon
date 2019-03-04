<template>
	<div id='login'>
		<div class='login-bg'></div>
		<div class='login-main'>
			<div class='main-box'>
				<div class='main-top'>
					<p class='top-left' >{{currentLoginType}}</p>
					<span class='top-right' @click='changeType'>
						<a>{{anotherLoginType}}</a>
						<i class='el-icon-arrow-right'></i>
					</span>
				</div>
				<div class='main-content'>
					<div v-if='currentLoginType == "账号登陆"'>
						<div class='login-input'>
							<i class='iconfont icon-yonghu login-icon'></i>
							<el-input placeholder='用户名' style='width: 100%;'></el-input>
						</div>
						<div class='login-input'>
							<i class='iconfont icon-mima login-icon'></i>
							<el-input placeholder='密码' style='width: 100%;'></el-input>
						</div>
						<slider-valide class='slidervalide'></slider-valide>
					</div>
					<div v-else>
						<div class='login-input'>
							<i class='iconfont icon-shoujihao login-icon'></i>
							<el-input placeholder='手机号' style='width: 100%;'></el-input>
						</div>
						<div class='login-input'>
							<i class='iconfont icon-mima login-icon'></i>
							<el-input placeholder='动态密码'></el-input>
							<el-button class='getMsgBtn'>获取动态密码</el-button>
						</div>
						
					</div>
				</div>
				<div class='main-btom'>
					<el-button class='login-btn' @click='toLogin'>登陆</el-button>
					<div class='btom-btom'>
						<label for="">其他方式:</label>
						<svg class='icon type-icon' aria-hidden='true'>
							<use xlink:href='#icon-qq-'></use>
						</svg>
						<svg class='icon type-icon' aria-hidden='true'>
							<use xlink:href='#icon-weixin'></use>
						</svg>
						<svg class='icon type-icon' aria-hidden='true'>
							<use xlink:href='#icon-weibo'></use>
						</svg>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import sliderValide from '@/components/slider.vue'

	export default{
		name:'login',
		components:{
			sliderValide
		},
		data(){
			return{
				currentLoginType:'账号登陆',
				anotherLoginType:'手机快捷登陆',
			}
		},
		methods:{
			changeType(){
				let temp = this.currentLoginType;
				this.currentLoginType = this.anotherLoginType;
				this.anotherLoginType = temp;
			},
            toLogin(){
            	this.$axios.post('http://192.168.1.5:8090/user/shiroLogin',{'username':15597704622,'password':123456})
                         .then(response =>{
                         	 console.log(response.data)
                         })
            }
		}
	}
</script>
<style lang='scss'>
	#login{
		width: 100%;
		height: 100%;
		position: relative;
		.login-bg{
			height: 100%;
			background:url('../../static/img/login-bg.jpg') no-repeat center center;
			background-size: cover;
			background-attachment: fixed;
		}
		.login-main{
			width: 100%;
			height: 100%;
			background: rgba(1,1,1,0.8);
			position: absolute;
			left:0;
			top:0;
			display: flex;
			justify-content:center;
			align-items:center;
			.main-box{
				width: 35%;
				min-width: 300px;
				max-width: 350px;
				height:323px; 
				position: relative;
				background: #fff;
				border-radius: 4px;
				padding:27px 28px;

				.main-top{
					display: flex;
					flex-direction:row;
					justify-content:space-between;
					align-items:flex-end;
					.top-left{
						font-size: 20px;
						color:#228B22;
					}
					.top-right{
						display: flex;
						flex-direction:row;
						align-items:center;
						a:visited{
							color:#000;
						}
						a:hover{
							color:#228B22;
						}

					}
				}
				.main-content{
					margin-top: 25px;
					.el-input__inner{
						padding:0 15px 0 28px;
					}
					.login-input{
						display: flex;
						.login-icon{
							z-index: 2;
							line-height: 40px;
							position: absolute;
							left:8px;
						}
					}
					.login-input:nth-child(1){
						margin-bottom: 25px;
						position: relative;
					}
					.login-input:nth-child(2){
						margin-bottom: 35px;
						position: relative;
					}
					.slidervalide{
						height: 30px;
						margin-top: 10px;
					}
					.getMsgBtn{
						padding:12px 7px;
						font-size: 12px;
						margin-left: 10px;
						color:#228B22;
						border:1px solid #228B22;
					}
				}
				.main-btom{
					position: absolute;
				    left: 28px;
				    bottom: 27px;
				    width: calc(100% - 56px);
					.login-btn{
						width: 100%;
						height: 40px;
						background-color: #228B22;
						border:1px solid #228B22;
						color:#Fff;
					}
					.btom-btom{
						margin-top: 15px;
						line-height: 30px;
						display: flex;
						align-items:center;
						.type-icon{
							width: 22px;
							height: 22px;
							margin-left: 8px;
						}
						svg{
							cursor:pointer;
						}
					}
				}
				
			}
		}
	}
</style>