<template>
	<div id='uploadUserImg'>
		<!-- action="http://192.168.1.8:8090/util/uploadImages" -->
		<div class='upload-img'>
			<el-upload
			  ref='upload'
			  class="avatar-uploader"
			  action=''
			  :auto-upload='false'
			  drag
			  :show-file-list="false"
			  :on-change="beforeAvatarUpload"
			  :on-success='handleSuccess'
			  :limit=1
			  >
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			
			<!-- <el-upload
				  class="avatar-uploader"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload> -->
			<div class="mid-line"></div>
			<div class='curImg'>
				<!-- <img :src="curUrl" alt="头像预览" v-if='curUrl' class='imgPre'> -->
				<img :src="'http://image.shr.com/'+curUrl" v-if='isOldImg' alt="用户头像" class='imgPre'>
				<img :src="newImg" v-else alt="用户头像" class='imgPre'>
				<p>{{rightSta}}</p>
			</div>
		</div>
		<p>请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p>
		<div class='upload-btom'>
			<el-button class='big-btn' @click='toChange'>更新</el-button>
		</div>
	</div>
</template>
<script>
	import {mapState,mapGetters} from 'vuex';
	export default{
		name:'uploadUserImg',
		data(){
			return{
				imageUrl: '',
				rightSta:'当前头像',
				isOldImg:true,
				newImg:'',
				uploadSta:false,
				curFile:'',
				param:'',
				isClear:true,//控制beforeAvatarUpload方法的执行，因为on-change添加文件、上传成功和上传失败时都会被调用
			}
		},
		computed:{
			...mapState({
				curUrl:state=>state.userMsg.userIcon
			})
		},
		methods:{
			//上传成功处理
			handleSuccess(res){
				var _this = this;
				//如果上传成功，提示，并修改当前头像
				if(res.status === 'success'){
					//获取到当前的用户信息，然后再修改
					var curMsg = this.$store.getters.userMsg;
					curMsg.userIcon = res.data.uri;
					this.$store.commit('setUserMsg',curMsg)
					this.$message.success('修改成功！')
				}else{
					this.$message.success('修改成功！')
				}
				this.$refs.upload.clearFiles();
				this.imageUrl = '';
				console.log(this.$refs.upload )
				this.isClear = false;
			},
			//确认更新头像
			toChange(){
				
				this.$axios.post('personal/changeBaseInfo',this.param).then(res =>{
					console.log(res);
					this.handleSuccess(res.data);
				})
			},
		    beforeAvatarUpload(file) {
		    	if(this.isClear){
		    		this.imageUrl = URL.createObjectURL(file.raw);
			        //选择图片成功，右边变成头像预览，头像地址和rightSta需要改变
			        if(this.imageUrl){
			        	this.isOldImg = false;
			        	this.newImg = this.imageUrl;
			        	this.rightSta = '预览头像'
			        }
			        //如果图片类型存在
			        if(file.type){
			        	var isImg = file.type === 'image/jpeg' ||  file.type === 'image/png' || file.type === 'image/jpg';
			        }else{
			        	//如果图片名后面有带图片类型的后缀
			        	var index = file.name.lastIndexOf('.');//查找最后一次出现的下标，找不到返回-1
			        	if(index != -1){
			        		const tempType = file.name.substr(index+1);//截取字符串，没有length参数会截取到字符串末尾
			        		var isImg = tempType === 'jpeg' ||  tempType === 'png' || tempType === 'jpg';
			        	}
			        }
			        const isLt2M = file.size / 1024 / 1024 < 2;
			        if (!isImg) {
			          this.$message.error('上传头像图片类型只能是jpeg,png,jpg!');
			        }
			        if (!isLt2M) {
			          this.$message.error('上传头像图片大小不能超过 2MB!');
			        }
			        //重新写一个表单上传的方法
	                this.param = new FormData();
	                this.param.append('file', file.raw, file.name);
	                this.param.append('id',this.$store.getters.userMsg.id);
			        return isLt2M && isImg ;
		    	}
		    	this.isClear = true;
		     
				
		    },		    
		}
	}
</script>
<style lang='scss'>
	#uploadUserImg{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
		p{
			color:#99a2aa;
			margin-top: 20px;
			text-align: center;
		}
		.upload-btom{
			margin-top: 20px;
		}
		.upload-img{
			display: flex;
			flex-direction:row;
			justify-content:center;
			align-items:center;
		}
		.curImg{
			.imgPre{
				width: 6.5rem;
		    	height: 6.5rem;
		    	border:1px dashed #c0ccda;
				border-radius: 50%;
			}
			
		}
		.mid-line{
			width: 1px;
			height: 148px;
			background: #228B22;
			margin:0 3rem;
		}
		.avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
		    border-color: #228B22;
		}
		.avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 148px;
		    height: 148px;
		    line-height: 148px;
		    text-align: center;
		}
		.avatar {
		    width: 148px;
		    height: 148px;
		    display: block;
		}
		.el-upload-dragger{
			width: 148px;
		    height: 148px;
		}
		.el-upload-dragger:hover {
		    border-color: #228B22;
		}
		.big-btn{
			width: 9rem;
			height: 40px;
			background-color: #228B22 ;
			border:1px solid #228B22 ;
			color:#Fff ;
		}
	}
</style>