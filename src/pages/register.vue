<template>
	<div id='register'>
		<div class='register-bg'></div>
		<div class='register-main'>
			<div class='main-box'>
				<div class='main-top'>
					<p class='top-left' >注册</p>
				</div>
				<div class='main-content'>
					<div v-if='isPhoneRe'>
						<div class='register-input'>
							<el-input placeholder='账号' style='width: 100%;' v-model='username' @blur='checkCodeRepeat(1,username)'></el-input>
							<p class='register-tips'>{{usernameTips}}</p>
						</div>
						<div class='register-input'>
							<el-input placeholder='密码（6-16个字符组成，区分大小写）' style='width: 100%;' v-model='temppassword' type='password' @blur='toCheackPassword(password)'></el-input>
							<div class='register-tips'>
								<span>{{passwordTips}}</span>
								<el-progress :percentage="flagProgress" status="success" v-if='passwordTips === "安全系数"'></el-progress>
								<span v-if='passwordTips'>{{tipsFlag}}</span>
							</div>
						</div>
						<div class='register-input'>
							<el-input placeholder='填写常用手机号' style='width: 100%;' v-model='phone' @blur='checkCodeRepeat(2,phone)'></el-input>
							<p class='register-tips'>{{phoneTips}}</p>
						</div>
						<div class='register-input'>
							<el-input placeholder='请输入短信验证码' v-model='dynamicWord'></el-input>
							<el-button class='getMsgBtn' @click='toGetCheckWord(phone)' :disabled='MsgBtnDisable' >{{getConfimTips}}</el-button>
							<p class='register-tips'>{{cheackpasswordTips}}</p>
						</div>
						<div class='toEmail' @click='toEmail'>用邮箱注册></div>
					</div>
					<div v-else>
						<div class='register-input'>
							<el-input placeholder='账号' style='width: 100%;' v-model='username' @blur='checkCodeRepeat(1,username)'></el-input>
							<p class='register-tips'>{{usernameTips}}</p>
						</div>
						<div class='register-input'>
							<el-input placeholder='密码（6-16个字符组成，区分大小写）' style='width: 100%;' v-model='temppassword' type='password'></el-input>
							<div class='register-tips'>
								<span>{{passwordTips}}</span>
								<el-progress :percentage="flagProgress" status="success" v-if='passwordTips === "安全系数"'></el-progress>
								<span v-if='passwordTips'>{{tipsFlag}}</span>
							</div>
						</div>
						<div class='register-input'>
							<el-input placeholder='填写常用邮箱' style='width: 100%;' v-model='myEmail' autocomplete='on' @blur='checkCodeRepeat(3,myEmail)'></el-input>
							<p class='register-tips'>{{emailTips}}</p>
						</div>
						<div class='register-input'>
							<el-input placeholder='请输入邮件验证码' v-model='dynamicWord'></el-input>
							<el-button class='getMsgBtn' @click='toGetEmailCode(myEmail)' :disabled='MsgBtnDisable' >{{getConfimTips}}</el-button>
							<p class='register-tips'>{{cheackpasswordTips}}</p>
						</div>
						<div class='toEmail' @click='toEmail'>用手机号注册></div>
					</div>
					
				</div>
				
				<div class='main-btom'>
					<el-button class='register-btn' @click='toRegister'>注册</el-button>
					<span class='loginBtn' @click='toLogin'>已有账号，直接登录></span>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import sliderValide from '@/components/slider.vue'

	export default{
		name:'register',
		components:{
			sliderValide
		},
		data(){
			return{
				currentLoginType:'账号登陆',
				anotherLoginType:'手机快捷登陆',
				temppassword:'',
				phone:'',
				username:'',
				phoneTips:'',
				myEmail:'',
				passwordTips:'',
				usernameTips:'',
				cheackpasswordTips:'',
				emailTips:'',
				dynamicWord:'',//动态密码
				getConfimTips:'点击获取',
				MsgBtnDisable:false,
				tipsFlag:'',
				flagProgress:0,
				checked:false,
				isPhoneRe:true,
				registerType:'用邮箱注册',
				isAvaliable:true,//是否被占用标志
			}
		},
		watch:{
			username(val){
				if(val != ''){
					this.usernameTips = '';
				}
			},
			phone(curval,oldval){
				if(curval != oldval){
					this.phoneTips = '';
					this.dynamicWord = '';
				}
			},
			password(val){
				if(val !=''){
					this.passwordTips = '';
				}
			},
			myEmail(curval,oldval){
				if(curval != oldval){
					this.dynamicWord = '';
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
			//校验是否被占用
			checkCodeRepeat(sta,msg){
				var flag = this.toCheackMsgType(sta,msg);
				if(flag){
					this.$axios.post('/user/checkCodeRepeat',{status:sta, fillmsg:msg})
					.then(response =>{
						console.log(response);
						if(response.status === 200){
							var tempdata = response.data;
							if(tempdata.status === 'fail'){
								this.isAvaliable = false;
								switch(tempdata.data.errCode){
									case 20009 :{
		                  	 			this.usernameTips = response.data.data.errMsg;
		                  	 			break;
		                  	 		};
		                  	 		case 20010 :{
		                  	 			this.emailTips = response.data.data.errMsg;
		                  	 			break;
		                  	 		};
		                  	 		case 20011 :{
		                  	 			this.phoneTips = response.data.data.errMsg;
		                  	 			break;
		                  	 		};
								}
							}else{
								this.isAvaliable = true;
							}
						}
					})
				}
				
			},
			//对当前输入信息的格式校验
			toCheackMsgType(sta,msg){
            	var flag = true;
				switch(sta){
					case 1:{
						var regName = /^[A-Za-z0-9]+$/;
		        		if(this.username == ''){
		        			this.usernameTips = '请告诉我你的账号吧';
		        			flag = false;
		        		}else if( !regName.test(msg)){
		        			this.usernameTips = '账号只能由数字或大小写字母组成哦';
		        			flag = false;
		        		};
		        		break;
					};
					case 2:{
						var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
						if(this.phone == ''){
							this.phoneTips = '请输入手机号';
							flag = false;
						}else if(!reg.test(msg)){
							this.phoneTips = '请输入正确的手机号码哟';
							flag = false;
						};
						break;
					};
					case 3:{
						var reg= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
						if(msg == ''){
							this.emailTips = '请输入邮箱号';
							flag = false;
						}else if(!reg.test(msg)){
							this.emailTips = '邮箱格式不正确';
							flag = false;
						}
						break;
					}
				};
				return flag;

			},
			//获取邮箱验证码
			toGetEmailCode(val){
				//没有被占用才能调用
				if(this.isAvaliable){
					this.$axios.post('/user/getEmailCode',{email:val})
							.then(response =>{
								console.log(response);
							})
				}
			},
			//邮箱注册
			toEmail(){
				this.isPhoneRe = !this.isPhoneRe;
			},
			//去登陆页面
			toLogin(){
				this.$router.push('/');
			},
			//倒计时60s
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
			toGetCheckWord(phone){
				var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if(phone === ''){
					this.phoneTips = '手机号不能为空';
				}else if(!reg.test(phone)){
					this.phoneTips = '请输入正确的手机号码哟'
				}else{
					this.getotp()
				}
			},
			//获取校验码接口请求
			getotp(){
				if(this.isAvaliable){
					this.MsgBtnDisable = true;
					this.$axios.post('user/getMessageCode',{telephone:this.phone})
					.then(response =>{
						console.log(response);
						if(response.data.data === 'success'){
							this.timeCount1s(10);
						}else{
							this.cheackpasswordTips = response.data.data.errMsg;
						}
					})
				}
				
			},
			//密码复杂度校验
			toCheackPassword(val){
				var reg1 = /([0-9 | a-z | A-Z]+)/;//纯数字或纯字母，低
				var reg2 = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}');//字母和数字，中
				var reg3 =  new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,30}');//同时包含大小写字母和数字、特殊符号，高
				var falg = '';
				//如果为空不显示校验结果
				if(val === ''){
					this.passwordTips = '';
					this.flagProgress = 0;
					this.tipsFlag = '';
				}else{
					if(reg1.test(val)){
						falg = '低';
						this.flagProgress = 35;
					}
					if(reg2.test(val)){
						falg = '中';
						this.flagProgress = 65;
					}
					if(reg3.test(val)){
						falg = '高';
						this.flagProgress = 100;
					}
					this.passwordTips = '安全系数';
					this.tipsFlag = falg;
				}				
			},

			//注册
            toRegister(){
            	var _this = this;
            	var flag = true;
            	//判断当前是手机注册还是邮箱注册
				var tempParams = {'usercode':this.username,'password':this.password,'otpCode':this.dynamicWord};
				if(this.isPhoneRe){
					if(this.phone == ''){
						this.phoneTips = '请输入手机号';
						flag = false;
					}else{
						tempParams.telephone = this.phone;
					}
				}else{
					if(this.myEmail == ''){
						this.emailTips = '请输入邮箱号';
						flag = false;
					}else{
						tempParams.email = this.myEmail;
					}
				}
				tempParams.status = this.isPhoneRe ? 0 : 1;
				if(this.dynamicWord == ''){
					this.cheackpasswordTips = '请输入验证码';
					flag = false;
				}else{
					this.cheackpasswordTips = '';
				}
				//全部信息都填写并且没有被占用
            	if(flag && this.isAvaliable){
            		this.$axios.post('/user/register',tempParams)
	                  .then(response =>{
	                  	 console.log(response.data);
	                  	 if(response.data.status === 'success'){
	                  	 	var qs = require('qs');
	                  	 	var temp = this.phone === '' ? this.myEmail : this.phone;
	                  	 	console.log(temp);
	                  	 	_this.$axios.post('/user/shiroLogin',qs.stringify({'username':temp,'password':this.password}),{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
	                  	 		.then(response =>{
	                  	 			console.log(response);
	                  	 			if(response.data.status === 'success'){
	                  	 				this.$message.success('注册成功');
	                  	 				this.$router.push('/home');
	                  	 			}else{
	                  	 				this.$message.error(response.data.data);
	                  	 			}
	                  	 		})
	                  	 	
	                  	 }else{
	                  	 	switch(response.data.data.errCode){
	                  	 		case 20009 :{
	                  	 			this.usernameTips = response.data.data.errMsg;
	                  	 			break;
	                  	 		};
	                  	 		case 20010 :{
	                  	 			this.emailTips = response.data.data.errMsg;
	                  	 			break;
	                  	 		};
	                  	 		case 20011 :{
	                  	 			this.phoneTips = response.data.data.errMsg;
	                  	 			break;
	                  	 		};
	                  	 	}
	                  	 }
	                  })
	            }
            	
        
	            
            	
            }
		}
	}
</script>
<style lang='scss'>
	#register{
		width: 100%;
		height: 100%;
		position: relative;
		.register-bg{
			height: 100%;
			background:url('../../static/img/login-bg.jpg') no-repeat center center;
			background-size: cover;
			background-attachment: fixed;
		}
		.register-main{
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
				height:363px; 
				position: relative;
				background: #fff;
				border-radius: 4px;
				padding:27px 28px;

				.main-top{
					display: flex;
					flex-direction:row;
					justify-content:center;
					align-items:flex-end;
					font-size: 20px;
				    color:#228B22;
					
				}
				.main-content{
					margin-top: 25px;
					.el-input__inner{
						padding:0 15px 0 28px;
						height: 35px;
						line-height: 35px;
						font-size: 11px;
					}
					.register-input{
						display: flex;
						position: relative;
						
						.register-icon{
							z-index: 2;
							line-height: 40px;
							position: absolute;
							left:8px;
						}
						.register-tips{
							position:absolute;
							left: 9px;
    						bottom: -21px;
    						color:#f66495;
    						font-size:10px;
    						display: flex;
    						width: 100%;
    						align-items: center;
    						justify-content: flex-start;
    						.el-progress{
    							width: 66%;
    							margin-left: 10px;
    						}
    						.el-progress__text i{
    							font-size: 11px;
    						}
						}
					}
					.register-input:nth-child(1){
						margin-bottom: 25px;
						position: relative;
					}
					.register-input:nth-child(2){
						margin-bottom: 25px;
						position: relative;
					}
					.register-input:nth-child(3){
						margin-bottom: 25px;
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
						height: 35px;
					}
				}
				.toEmail{
					float: right;
				    margin-top: 10px;
				    font-size: 10px;
				    color: #228B22;
				}
				.main-btom{
					position: absolute;
				    left: 28px;
				    bottom: 27px;
				    width: calc(100% - 56px);
					.register-btn{
						width: 100%;
						height: 40px;
						background-color: #228B22;
						border:1px solid #228B22;
						color:#Fff;
					}
					.loginBtn{
						float: right;
    					font-size: 10px;
    					color:#f66495;
					}
					.btom-btom{
						margin-top: 15px;
						line-height: 30px;
						display: flex;
						align-items:center;
						label{
							font-size:10px;
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