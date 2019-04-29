<template>
	<div id='uploadUserImg'>
		<!-- action="http://192.168.1.8:8090/util/uploadImages" -->
		<div class='upload-img'>
			<div class='preImg'>
				<vue-cropper
				    	ref='cropper'
				    	:guides="true"
				    	:view-mode=2
				        :auto-crop-area="0.5"
				        :min-container-width=250
				        :min-container-height=180
				        :autoCrop=true
				        :background=true
				        :img="imageUrl"
				        alt="图片预览"

				        v-if="imageUrl"
				        class="avatar"></vue-cropper> 
				  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
				  <div v-else class='uploadarea'>
				  	<i  class="el-icon-plus avatar-uploader-icon "></i>
				  	<input type="file" class='up_input' @change='toChooseImg($event)' accept="image/jpeg,image/jpg,image/png">
				  </div>
				  <div class='handleImg'>
				  	<div class='handBtn'>
				  		<i class="iconfont icon-xuanzhuan icon-my-xuanzhuan" @click='rotateLeft'></i>
				  		<span>左旋转</span>
				  	</div>
				  	<div class='handBtn'>
				  		<i class='iconfont icon-youxuanzhuan icon-my-xuanzhuan' @click='rotateRight'></i>
				  		<span>右旋转</span>
				  	</div>
				  	<div class='handBtn'>
				  		<i class="iconfont icon-zhongxinfenxi" ></i>
				  		<input type="file" class='up_input' @change='toChooseImg($event)' accept="image/jpeg,image/jpg,image/png">
				  		<span>重选</span>
				  	</div>
				  	<div class='handBtn'>
				  		<i class='iconfont icon-queren1' @click='toPreview'></i>
				  		<span>确认</span>
				  	</div>
				  </div>
			</div>  
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
			<el-button class='big-btn' @click='toSubmit' :disabled='canUpgrad'>更新</el-button>
		</div>
	</div>
</template>
<script>
	import {mapState,mapGetters} from 'vuex';
	import { VueCropper }  from 'vue-cropper'
	export default{
		name:'uploadUserImg',
		components:{
			VueCropper
		},
		data(){
			return{
				imageUrl: '',
				rightSta:'当前头像',
				isOldImg:true,
				newImg:'',
				uploadSta:false,
				curFile:'',
				param:'',
				canUpgrad:true,
				isClear:true,//控制beforeAvatarUpload方法的执行，因为on-change添加文件、上传成功和上传失败时都会被调用
			}
		},
		computed:{
			...mapState({
				curUrl:state=>state.userMsg.userIcon
			})
		},
		methods:{
			//确认更新
			toSubmit(){
				console.log(this.curFile);
				

				var newFile = this.dataURLtoFile(this.newImg,this.curFile.name)
				console.log(newFile)
				this.param = new FormData();
				this.param.append('userPreIcon',this.curUrl);
                this.param.append('file', newFile);
                this.param.append('id',this.$store.getters.userMsg.id);
                console.log(this.param);
                this.$axios.post('personal/changeBaseInfo',this.param).then(res =>{
					console.log(res);
					this.handleSuccess(res.data);
				})
				
				
			},
			//base64转文件
			dataURLtoFile(dataurl, filename) {//将base64转换为文件
			    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			    while(n--){
			        u8arr[n] = bstr.charCodeAt(n);
			    }
			    return new File([u8arr], filename, {type:mime});
			},
			//修剪完成，去预览
			toPreview(){
				this.canUpgrad = false;
				this.$refs.cropper.getCropData((data) =>{
					this.isOldImg = false;
			        this.newImg = data;
			        this.rightSta = '预览头像'
				})
			},
			//左旋转
			rotateLeft(){
				this.$refs.cropper.rotateLeft();
			},
			//右旋转
			rotateRight(){
				this.$refs.cropper.rotateRight();
			},
			//打开文件选择
			toChooseImg(e){
				//获取到当前选择的图片
				var file = e.target.files[0];
				this.curFile = file;
				var check = this.checkImgType(file.type,file.size,file.name)
				console.log(check)
				if(file && check){
					let reader = new FileReader();
					let that = this;
					//图片转为base64
                	reader.readAsDataURL(file)
                	reader.onload= function(e){
                    	// 这里的this 指向reader
                    	that.imageUrl = this.result
                	}
				}
			},
			//图片格式校验
			checkImgType(fileType,fileSize,fileName){
				if(fileType){
		        	var isImg = fileType === 'image/jpeg' ||  fileType === 'image/png' || fileType === 'image/jpg';
		        }else{
		        	//如果图片名后面有带图片类型的后缀
		        	var index = fileName.lastIndexOf('.');//查找最后一次出现的下标，找不到返回-1
		        	if(index != -1){
		        		const tempType = fileName.substr(index+1);//截取字符串，没有length参数会截取到字符串末尾
		        		var isImg = tempType === 'jpeg' ||  tempType === 'png' || tempType === 'jpg';
		        	}
		        }
		        const isLt2M = fileSize / 1024 / 1024 < 2;
		        if (!isImg) {
		          this.$message.error('上传头像图片类型只能是jpeg,png,jpg!');
		        }else{
		        	if (!isLt2M) {
			          this.$message.error('上传头像图片大小不能超过 2MB!');
			        }
		        }
		        return isImg&&isLt2M
			},
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
					//失败，预览头像还是显示原先的头像，左边选择框清空
					this.isOldImg = true;
					this.$message.error(res.data)
				}
				// this.$refs.upload.clearFiles();
				this.imageUrl = '';
				// console.log(this.$refs.upload )
				this.isClear = false;
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
		.preImg{
			display: flex;
			flex-direction: column;
			position: relative;
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
			height: 280px;
			background: #228B22;
			margin:0 3rem;
		}

		.avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		}
		.avatar-uploader .el-upload:hover {
		    border-color: #228B22;
		}
		.avatar-uploader-icon {
		    font-size: 36px;
		    color: #8c939d;
		    display: flex;
		    justify-content: center;
    		align-items: center;
		    width: 100%;
		    height: 100%;
		    text-align: center;
		    z-index: 1;
		}
		.avatar {
		    width: 200px;
		    height: 200px;
		    display: block;
		}
		
		.big-btn{
			width: 9rem;
			height: 40px;
			background-color: #228B22 ;
			border:1px solid #228B22 ;
			color:#Fff ;
		}
		.handleImg{
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			.handBtn{
				display: flex;
				flex-direction:column;
				position: relative;
				span{
					margin-top: 10px;
					color:#333;
				}
			}
		}
		.icon-my-xuanzhuan{
			font-size: 30px;
		}
		.uploadarea:hover{
			border-color: #228B22;
		}
		.uploadarea{
			width: 200px;
			height: 200px;
			position: relative;
			border: 1px dashed #d9d9d9;
    		border-radius: 6px;
    		box-sizing: border-box;
			
		}
		.up_input{
				position: absolute;
				top:0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index:9;
				opacity: 0;
			}
		
	}
</style>