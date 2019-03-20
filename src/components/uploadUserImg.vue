<template>
	<div id='uploadUserImg'>
		<div class='upload-img'>
			<!-- <el-upload
			  class="avatar-uploader"
			  action="http://192.168.1.24:8090/util/uploadImages"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload> -->
			<el-upload
				  class="avatar-uploader"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>

			</el-upload>
			<div class="mid-line"></div>
			<div class='curImg'>
				<img :src="curUrl" alt="头像预览" v-if='curUrl' class='imgPre'>
				<p>{{rightSta}}</p>
			</div>
		</div>
		<p>请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p>
		<div class='upload-btom'>
			<el-button class='big-btn'>更新</el-button>
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
        		
			}
		},
		computed:{
			...mapState({
				curUrl:state=>state.userMsg.userIcon
			})
		},
		methods:{
			
			handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		        //选择图片成功，右边变成头像预览，头像地址和rightSta需要改变
		        if(imageUrl){
		        	this.curUrl = imageUrl;
		        	this.rightSta = '预览头像'
		        }
		    },
		    beforeAvatarUpload(file) {
		        // const isJPG = file.type === 'image/jpeg'||'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        // if (!isJPG) {
		        //   this.$message.error('上传头像图片只能是 JPG 格式!');
		        // }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		         return isLt2M;
		        return isJPG && isLt2M;
		    }
		    
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
		.big-btn{
			width: 9rem;
			height: 40px;
			background-color: #228B22 ;
			border:1px solid #228B22 ;
			color:#Fff ;
		}
	}
</style>