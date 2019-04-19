//电话号码校验
function isPhone(val){
	var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if(val == ''){
		return '请输入手机号';
	}else if(!reg.test(val)){
		return '请输入正确的手机号码哟';
	}else{
		return true
	}
}
//邮箱校验
function isEmail(val){
	var tips = '';
	var reg= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
	if(val == '' || val === undefined){
		return '请输入邮箱号';
	}else if(!reg.test(val)){
		return '邮箱格式不正确';
	}else{
		return true;
	}
}
//账号校验
function isAccount(val){
	var regName = /^[A-Za-z0-9]+$/;
	if(val == ''){
		return '请告诉我你的账号吧';
	}else if( !regName.test(val)){
		return '账号只能由数字或大小写字母组成哦'
	}else{
		return true
	}
}
//密码复杂度校验
function checkPassword(val){
	if(val=='' || val==undefined){
		return '密码不能为空'
	}else{
		var reg1 = /([0-9 | a-z | A-Z]+)/;//纯数字或纯字母，低
		var reg2 = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}');//字母和数字，中
		var reg3 =  new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,30}');//同时包含大小写字母和数字、特殊符号，高
		var falg = '';//文字提示
		var flagProgress = 0;//程度进度条
		//如果为空不显示校验结果
		if(val === ''){
			passwordTips = '';
			flagProgress = 0;
			flag = '';
		}else{
			if(reg1.test(val)){
				falg = '低';
				flagProgress = 35;
			}
			if(reg2.test(val)){
				falg = '中';
				flagProgress = 65;
			}
			if(reg3.test(val)){
				falg = '高';
				flagProgress = 100;
			}
			
		}
		return [falg,flagProgress]
	}
	
}
//两次输入是否一致
function checkIsEquel(val1,val2){
	if(val1 != val2 && val1!='' && val2!=''){
		return '两次输入不一致，检查一下哦'
	}else{
		return true
	}
	
	
}
//暴露方法
export default{
	isPhone,isEmail,isAccount,checkPassword,checkIsEquel
}