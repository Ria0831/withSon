<template>
	<div id='login'>
		<div class='login-bg'></div>
		<div class='login-main'>
			<div class='main-box' v-if='isLogin' :class="[currentLoginType == '账号登陆' ? 'height323' : 'height250']">
				<div class='main-top'>
					<p class='top-left' >{{currentLoginType}}</p>
					<span class='top-right' @click='changeType'>
						<a>{{anotherLoginType}}</a>
						<i class='el-icon-arrow-right'></i>
					</span>
				</div>
				<div class='main-content'>
					<div v-if='currentLoginType == "账号登陆"' >
						<div class='login-input'>
							<i class='iconfont icon-yonghu login-icon'></i>
							<el-input placeholder='用户名' style='width: 100%;' v-model='phone'></el-input>
							<p class='login-tips'>{{phoneTips}}</p>
						</div>
						<div class='login-input'>
							<i class='iconfont icon-mima login-icon'></i>
							<el-input type='password' placeholder='密码' style='width: 100%;' v-model='temppassword'></el-input>
							<p class='login-tips'>{{passwordTips}}</p>
						</div>
						<slider-valide class='slidervalide' @tologinFlag='toLogin' :logMsg='{phone,password}'></slider-valide>
					</div>
					<div v-else>
						<div class='login-input'>
							<i class='iconfont icon-shoujihao login-icon'></i>
							<el-input placeholder='手机号' style='width: 100%;' v-model='phone'></el-input>
							<p class='login-tips'>{{phoneTips}}</p>
						</div>
						<div class='login-input'>
							<i class='iconfont icon-mima login-icon'></i>
							<el-input placeholder='动态密码'></el-input>
							<el-button class='getMsgBtn' @click='toGetCheckWord' :disabled='MsgBtnDisable' v-model='dynamicWord'>{{getConfimTips}}</el-button>
							<p class='login-tips'>{{passwordTips}}</p>
						</div>
						
					</div>
				</div>
				<div class='main-btom'>
					<div class='btom-btn'>
						<el-button class='login-btn' @click='toLogin'>登陆</el-button>
						<el-button class='register-btn' @click='toRegister'>注册</el-button>
					</div>
					
					<span class='registerBtn' @click='fogivePassword'>？忘记密码</span>
					<div class='btom-btom'>
						<label>其他方式:</label>
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
			<div class='main-box' v-else :class="[isfindByEmail? 'height200' : 'height250']">
				<div class='main-top'>
					<p class='top-left'>忘记密码</p>
				</div>
				<div class='main-content'>
					<div class='login-input' v-if='isfindByEmail == true' >
						<el-input placeholder='请输入绑定的邮箱号' v-model='emailByForgive'></el-input>
						<p class='login-tips'>{{emailTips}}</p>
					</div>
					<div  v-if='isfindByEmail == false'>
						<div class='login-input'>
							<i class='iconfont icon-shoujihao login-icon'></i>
							<el-input placeholder='请输入绑定的手机号' v-model='phoneByForgive'></el-input>
							<p class='login-tips'>{{fogivephoneTips}}</p>
						</div>
						<div class='login-input'>
							<i class='iconfont icon-mima login-icon'></i>
							<el-input placeholder='动态密码' v-model='dynamicWordByFogive'></el-input>
							<el-button class='getMsgBtn' @click='toGetCheckWord("forget")' :disabled='MsgBtnDisable' >{{getConfimTips}}</el-button>
							<p class='login-tips'>{{fogivephonewordTips}}</p>
						</div>
						
					</div>
				</div>
				<div class='main-btom'>
					<div class='btom-btn'>
						<el-button class='login-btn' @click='tofindPassword'>确定</el-button>
					</div>
					<span class='registerBtn leftSpan' @click='tologinPage'><返回登陆</span>
					<span class='registerBtn' @click='findByPhone(isfindByEmail)'>？{{findAnotherWay}}</span>
					
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
				temppassword:'',
				phone:'',
				phoneTips:'',
				passwordTips:'',
				dynamicWord:'',//动态密码
				getConfimTips:'获取动态密码',
				MsgBtnDisable:false,
				isLogin:true,
				emailByForgive:'',//忘记的邮箱号
				phoneByForgive:'',
				emailTips:'',//忘记密码里的邮箱提示
				fogivephoneTips:'',
				isfindByEmail:true,
				findAnotherWay:'手机找回',
				dynamicWordByFogive:'',
				fogivephonewordTips:'',//手机号找回密码的错误提示
			}
		},
		watch:{
			phone(val){
				if(val != ''){
					this.phoneTips = '';
				}
			},
			password(val){
				if(val !=''){
					this.passwordTips = ''
				}
				
			},
			emailByForgive(val){
				if(val != ''){
					this.emailTips = '';
				}
			}
		},
		computed:{
			password:function(){
				return this.$md5(this.temppassword);
			}
		},
		methods:{
			//找回密码
			tofindPassword(){
				if(this.isfindByEmail){
					//如果是通过邮箱找回
					var reg= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
					if(this.emailByForgive === '' || this.emailByForgive === undefined){
						this.emailTips ='邮箱地址不能为空哦'
					}else if(!reg.test(this.emailByForgive)){
						this.emailTips ='邮箱格式不对哦'
					}else{
						this.emailTips = '';
						this.$axios.post('/user/mailPasswordReminderSend',{emailAdd:this.emailByForgive})
						.then(response =>{
							console.log(response);
							if(response.data.status === 'success'){
								this.emailTips = response.data.data;
							}else{
								this.emailTips = response.data.data.errMsg;
							}
						})
					}
				}else{
					//通过手机号找回
					console.log(this.dynamicWordByFogive)
					this.$axios.post('user/telephoneCodeCheck',{'telephone':this.phoneByForgive,'otpCode':this.dynamicWordByFogive}).then(response =>{
							console.log(response);
							if(response.data.status === 'success'){
								this.$router.push({path:'/resetPassword',query:{flag:"byPhone",'num':this.phoneByForgive}});
								sessionStorage.setItem('otpCode',this.dynamicWordByFogive);
							}else{
								this.fogivephonewordTips = response.data.data.errMsg;
							}
					})
				}
				
				
			},
			//通过手机找回密码
			findByPhone(val){
				this.isfindByEmail = !val;
				this.findAnotherWay = this.isfindByEmail === false ?  '邮箱找回' : '手机找回'
			},
			//从忘记密码页转到登陆页
			tologinPage(){
				this.isLogin = true;
			},
			//忘记密码
			fogivePassword(){
				this.isLogin = false;
			},
			//跳转到注册页面
			toRegister(){
				this.$router.push('/register');
			},
			//倒计时1s
			timeCount1s(times){
				var _this = this;
				if(times >= 1){
					times -= 1;
					this.getConfimTips = times + 's后重新获取';
					setTimeout(function(){
						_this.timeCount1s(times)
					},1000)
				}else{
					this.getConfimTips = '重新获取验证码';
					this.MsgBtnDisable = false;
				}
			},
			//获取动态校验码
			toGetCheckWord(type){
				this.timeCount1s(10);
				this.MsgBtnDisable = true;
				var methods = type == 'forget' ? '/user/telephonePasswordReminderSend' :'';
				this.$axios.post(methods,{'telephone':this.phoneByForgive})
					.then(response =>{
						console.log(response)
						if(response.data.status === 'success'){
							this.fogivephonewordTips = response.data.data;

						}else{
							this.fogivephonewordTips = response.data.data.errMsg;
						}
					})
			},
			//登陆方式切换
			changeType(){
				let temp = this.currentLoginType;
				this.currentLoginType = this.anotherLoginType;
				this.anotherLoginType = temp;
				this.passwordTips = '';
				this.phoneTips = '';

			},
			//登陆
            toLogin(val){
            	console.log(this.password);
            	var qs = require('qs');

        		if(this.phone == ''){
        			this.phoneTips = '请输入注册时用的邮箱或者手机号呀'
        		}
        		if(this.password ==''){
        			this.passwordTips = '喵，你没输入密码么？'
        		}
        		if(val.flag === false){
        			this.passwordTips = val.data;
        		}
        		if(val.flag === undefined || val.flag === ''){
        			this.passwordTips = '需要滑动验证哦'
        		}
            	if(this.phone != '' && this.password != '' && val.flag ){
              	 	this.$router.push('/home');
	            }
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
			background:url('../../static/img/JJ18.png') no-repeat center center;
			background-size: cover;
			background-attachment: fixed;
		}
		.login-main{
			width: 100%;
			height: 100%;
			background: rgba(1,1,1,0.5);
			position: absolute;
			left:0;
			top:0;
			display: flex;
			justify-content:flex-end;
			align-items:center;
			.height200{height: 200px !important};
			.height250{height: 250px !important};
			.height323{height: 323px !important};
			.main-box{
				width: 35%;
				min-width: 300px;
				max-width: 350px;
				height:323px; 
				position: relative;
				background:transparent;
				border-radius: 4px;
				padding:27px 28px;
				margin-right: 4rem;
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
						color: #ccc;
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
						.login-tips{
							position:absolute;
							left: 9px;
    						bottom: -21px;
    						color:#f66495;
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
				    .btom-btn{
				    	display: flex;
				    	.login-btn{
							width: 100%;
							height: 40px;
							background-color: #228B22;
							border:1px solid #228B22;
							color:#Fff;
						}
						.register-btn{
							width: 100%;
							height: 40px;
							background-color: #fff;
							border:1px solid #228B22;
							color:#228B22;
						}
				    }
					
					.registerBtn{
						float: right;
    					font-size: 10px;
    					color:#f66495;
    					margin-top: 10px;
    					cursor: pointer;
					}
					.leftSpan{
						float:left;
					}
					.btom-btom{
						margin-top: 15px;
						line-height: 30px;
						display: flex;
						align-items:center;
						label{
							font-size:10px;
							color: #ccc;
						}
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