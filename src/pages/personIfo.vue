<template>
	<div id='personIfo'>
		<div class='ifo-top'>
			<div class='top-left'>
				<img :src="'http://image.shr.com/'+userMsg.userIcon" alt="用户头像" class='user-img'>
				<div class='changImg' @click='toChangeImg'>更换头像</div>
			</div>
			

			<div class='userIfo'>
				<p class='ifo-name'>{{userMsg.userName}}</p>
				<p>ID:{{userMsg.id}}</p>
			</div>
			
			
			
		</div>
		<div class='ifo-main'>
			<component
				:is="curPages"
		        ref="component">
			</component>
			<el-upload
			  class="avatar-uploader"
			  action="http://192.168.1.24:8090/util/uploadImages"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
	</div>
</template>
<script>
	import {mapState,mapGetters} from 'vuex';
	import upUserImg from '../components/uploadUserImg.vue'
	export default {
		name:'personIfo',
	    data() {
	      return {
	        imageUrl: '',
	        curPages:'',
	      };
	    },
	    components:{
			upUserImg
		},
	    computed:{
			...mapGetters(['userMsg']),

		},
	    methods: {
	    	//更改用户头像
	    	toChangeImg(){
	    		this.curPages = 'uploadUserImg'
	    	},
		    handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
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
	#personIfo{
		width: 100%;
		height: 100%;
		.ifo-top{
			display: flex;
			flex-direction:row;
			height: 8.5rem;
			background: #f8fafc;
			align-items:center;
			padding: 1rem 2rem;
			.top-left{
				position: relative;
				border-radius: 50%;
		   		border:2px solid #d9dde1;
		   		overflow: hidden;
				.user-img{
					width: 7.5rem;
					height: 7.5rem;
				}
				.changImg{
					position: absolute;
				    bottom: -30px;
				    left: 6px;
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
				width: 6rem;
				text-align: center;
				.ifo-name{
					font-size: 1.6rem;
					overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
			}
		}
		
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>