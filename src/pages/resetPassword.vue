<template>
	<div id='resetPassword'>
		<div class='bg'></div>
		<div class='reset-main'>
			<div class='reset-box'>
				<div class='reset-input'>
					<label>{{resetType}}</label>
					<el-input :disabled='true' v-model='email'></el-input>
				</div>
				<div class='reset-input'>
					<label for="newPassword">新密码</label>
					<el-input id='newPassword' placeholder='新密码，6-16个字符，区分大小写' v-model='tempnewPassword' type='password'></el-input>
					<p class='reset-tips'>{{newPasswordTips}}</p>
				</div>
				
				<div class='reset-input'>
					<label for="confirmPassword">确认密码</label>
					<el-input id='confirmPassword' placeholder='请确认输入的新密码' v-model='tempconfirmPassword' type='password'></el-input>
					<p class='reset-tips'>{{confirmTips}}</p>
				</div>
				<el-button class='reset-btn' @click='resetSure' :disabled='linkIsAvalible'>确定</el-button>
			</div>
		</div>
		
		
	</div>
</template>
<script>
	import validate from '../components/validateMethods.js'

	export default{
		name:'resetPassword',
		data(){
			return{
				newPasswordTips:'',
				confirmTips:'',
				emailAddr:'',
				tempnewPassword:'',
				tempconfirmPassword:'',
				sid:'',
				email:"",
				linkIsAvalible:true,
				resetType:'邮箱',
				isByEmail:true,
			}
		},
		beforeRouteEnter(to,from,next){
			next(vm=>{
				console.log(vm.$route.query)
				if(vm.$route.query.flag == 'byPhone'){
					vm.resetType = '手机号';
					vm.isByEmail = false;
					vm.email = vm.$route.query.num;
				}
			})
		},
		mounted(){
			if(!this.isByEmail){
				this.getParams();
			}else{
				this.linkIsAvalible = false;
			}
			
		},
		watch:{
			confirmPassword(val,oldval){
				if(val === '' || val === undefined || val === null){
					this.confirmTips = '';
				}
				if(val != oldval){
					this.confirmTips = '';
				}
			},
		},
		computed:{
			newPassword:function(){
				return this.$md5(this.tempnewPassword);
			},
			confirmPassword:function(){
				return this.$md5(this.tempconfirmPassword);
			},
		},
		methods:{
			//校验链接是否可用
			cheackIsAvalible(){
				this.$axios.post('/user/mailURLMsgCheck',{sid:this.sid,email:this.email})
					.then(response =>{
						console.log(response);
						if(response.data.status === 'success'){
							this.linkIsAvalible = false;
						}else{
							this.$message.error(response.data.data.errMsg);
						}
					})
			},
			//获取url的参数
			getParams(){
				var href = window.location.href;
				//判断是否有参数
				if(href.indexOf('?') != -1){
					var strs = href.split('?')[1];
					console.log(strs);
					var strs1 = strs.split('=')[1];
					this.sid = strs1.split('%24email%3D')[0];
					this.email = strs1.split('%24email%3D')[1];
					this.email = this.email.replace('%40','@');
				}
				if(this.email && this.sid){
					this.cheackIsAvalible();
				}
				
			},
			
			//确定修改密码
			resetSure(){
				//两次密码校验是否一致
				let cheackResult = validate.checkIsEquel(this.newPassword,this.confirmPassword)
				if(cheackResult != true){
					this.confirmTips = cheackResult
				}else{
					if(this.isByEmail){
						this.$axios.post('/user/mailUpdatePassword',{sid:this.sid,email:this.email,password:this.confirmPassword})
							.then(response =>{
								console.log(response);
								if(response.data.status === 'success'){
									this.$message.success(response.data.data);
									this.$router.push('/');
								}else{
									this.$message.error(response.data.data.errMsg);
								}
						})
					}else{
						var otpcode = sessionStorage.getItem('otpCode');
						this.$axios.post('/user/telephonePasswordReminderCheck',{'telephone':this.email,'otpCode':otpcode,'password':this.confirmPassword})
							.then(response=>{
								console.log(response);
								if(response.data.status === 'success'){
									this.$message.success(response.data.data);
									this.$router.push('/');
								}else{
									this.$message.error(response.data.data);
								}
							})
					}
				}
				
				
			}
		}
	}
</script>
<style lang='scss'>
	#resetPassword{
		height: 100%;
		.bg{
			height: 100%;
			background:url('../../static/img/JJ18.png') no-repeat center center;
			background-size: cover;
			background-attachment: fixed;
		}
		.reset-main{
			width: 100%;
			height: 100%;
			background: rgba(1,1,1,0.5);
			position: absolute;
			left:0;
			top:0;
			display: flex;
			justify-content:center;
			align-items:center;
			.reset-box{
				width: 35%;
				min-width: 300px;
				max-width: 350px;
				height:223px; 
				position: relative;
				border-radius: 4px;
				padding:27px 28px;
				background: #fff;
				border:1px solid #e3e3e3;
				.reset-input{
					display: flex;
					align-items: center;
					position: relative;
					margin-bottom: 25px;
					label{
						width: 20%;
					}
					.reset-tips{
						position:absolute;
						left: 9px;
						bottom: -21px;
						color:#f66495;
					}

				}
				
			}
			.reset-btn{
				width: 100%;
				height: 40px;
				background-color: #228B22;
				border:1px solid #228B22;
				color:#Fff;
			}
		}
		
	}
</style>