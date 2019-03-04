<template>
	<div id='slider'  >
		<div class='slider-bg' id='sliderbox'  @mouseenter='toShow' @mouseleave='toHidden'>
		<!-- <div class='slider-bg' id='sliderbox'  @mouseenter='toShow'> -->
			<div class='slider-btn drag' v-drag ='cutFlag' ref='sliderBtn'></div>
			<div id='dragdistance' class='distance'></div>
			<div class='imgBox' ref='slider'>
				<img :src='"data:image/jpeg;base64,"+baseImg' alt="底图" class='baseImg'>
				<img :src='"data:image/jpeg;base64,"+cutImg' alt="滑块" id='cut' ref='cutImg'>
				<div class='resultTip'>
					<p class='checkTip'>{{checkedTips}}</p>
					<i class='iconfont el-icon-refresh reloadBtn' @click='toReloadPicture'></i>
				</div>
				
			</div>
			<span v-if='cutFlag'>按住左边滑块，拖动完成上方拼图</span>
		</div>
		
	</div>
</template>
<script>
	export default{
		name:'sliderValid',
		data(){
			return{
				isShowTips:true,
				baseImg:'',//底图
				cutImg:'',//图片滑块
				isShowImg:false,//默认不显示，鼠标滑过显示
				// cutImgY:0,
				cutFlag:true,
				uuid:'',//接口返回的截图图片id?
				checkedTips:'',
			}
		},
		props:{
			logMsg:Object,
		},
		directives:{
			drag(el,binding,vnode){
				//pageX和pageY是鼠标指针距离页面的左上角距离，不会随滚动条改变而改变
				//clientX和clientY是鼠标指针距离可视窗口（不包括上面的地址栏和滚动条的距离），会随着滚动条滚动而改变
				// offsetTOP:当前拖拽元素自身的高度
				el.onmousedown = function(e){
					// binding.value(false);
					vnode.context.cutFlag = false;
					// console.log('binding.value',binding.value);
					var cutImg = document.getElementById('cut');
					//只允许向X轴方向拉
                    var disx = e.pageX - el.offsetLeft;
                    // console.log('disx',disx,'e.pageX',e.pageX,'el.offsetLeft',el.offsetLeft);
                    document.onmousemove = function (e){
                    	var left = e.pageX - disx;
                    	if(left <= 0){
                    		 el.style.left = 0 +'px';
                    		 cutImg.style.left = 10 + 'px'
                    		 // document.getElementById('dragdistance').style.width = 0 +'px';
                    		  // binding.value(true);//如果滑块在最左边，出现滑动提示
                    	}else if(left >= (document.getElementById('sliderbox').offsetWidth - el.offsetWidth)){
                    		el.style.left = (document.getElementById('sliderbox').offsetWidth - el.offsetWidth - 13) + 'px';
                    			cutImg.style.left = (document.getElementById('sliderbox').offsetWidth - el.offsetWidth - 23) + 'px';
                    		// document.getElementById('dragdistance').style.width = el.style.left + 28 + 'px';
                    	}else{
                    		el.style.left = left + 'px';
                    		cutImg.style.left = left  + 'px'
                    		// document.getElementById('dragdistance').style.width = left + 23 + 'px';
                    	}
                        // console.log('e.pageX',e.pageX,'el.style.left',el.style.left)
                    };
                    
                    // console.log(binding.value());
                     // 为了防止 火狐浏览器 拖拽阴影问题
                    document.onmouseup = function(){
                        document.onmousemove = document.onmouseup = null;
                        vnode.context.cutFlag = true;
                    }
                }

			}
		},
		mounted(){
			this.toGetPicture();
		},
		watch:{
			cutFlag(value){
				console.log(value);
				if(value){
					// this.isShowTips = value;
					this.toCheck();
				}
			}
		},
		methods:{
			//图片拖动位置校验请求接口
			toCheck(){
				var _this = this;
				var tempx = document.getElementById('cut').style.left;
				tempx = tempx.replace('px','');
				tempx = tempx - 10;
				this.$axios.post('user/userLogin',{'moveEnd_X':tempx,'uuid':this.uuid,'username':this.logMsg.phone,'password':this.logMsg.password},{'xhrFields' : {withCredentials: true},crossDomain: true})
							.then(response =>{
								console.log(response);
								this.checkedTips = response.data.date;
									setTimeout(function () {
							          _this.checkedTips = ''
							        }, 1500);
								if(response.data.status === 'success'){
									// this.$refs.sliderBtn.style.left = 0 + 'px';
									this.$refs.slider.style.display = 'none';
									//保存token
									sessionStorage.setItem('token',response.data.data.token);
							        //验证成功，传值给父组件
									if(this.logMsg.phone != '' && this.logMsg.password !=''){
										this.$emit('tologinFlag',{flag:true});
										
									}else{
										this.$emit('tologinFlag',{flag:false});
									}

								}else{
									this.$emit('tologinFlag',{flag:false,data:response.data.data.errMsg});
									// 重新加载
									this.toReloadPicture();
								}
						        
								
							})
			},
			//清空当前，重新请求图片
			toReloadPicture(){
				//图片和滑块都回到最左边
				document.getElementById('cut').style.left = 10 + 'px';
				this.$refs.sliderBtn.style.left = 0 + 'px';
				this.toGetPicture();
			},
			//显示图片
			toShow(){
				this.$refs.slider.style.display = 'block';
			},
			//隐藏图片
			toHidden(){
				this.$refs.slider.style.display = 'none';
			},
			//请求图片
			toGetPicture(){
				let _this = this;
				this.$axios.get('user/loginImageUpload')
                    .then(response =>{
	                  	var temp = response.data.data;
	                  	 console.log(response.data);
	                  	 this.baseImg = temp.YYPng_base64;
	                  	 this.cutImg = temp.cutImage_base64;
	                  	 this.uuid = temp.uuid;
	                  	 if(_this.$refs.cutImg.style){
	                  	 	_this.$refs.cutImg.style.top = temp.cutImageY + 10 + 'px';
	                  	 }
                    })	
			},
			toshowTip(val){
				console.log(val);
				this.isShowTips = !val;
			}
		}
	}
</script>
<style lang='scss'>
	#slider{
		width: 100%;
		height: 30px;
		.slider-bg{
			width: 69%;
			height: 100%;
			background-color: #e3e3e3;
			border-radius: 18px;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;
			.slider-btn{
				width: 30px;
				height: 30px;
				position: absolute;
	            top: 0;
	            left: 0;
				background: url('../../static/img/wugui0.png') no-repeat;
				background-position:0px 0px;
    			background-size: 94%;
    			border:1px solid #FFB90F;
    			background-color: #FFB90F;
    			border-radius: 50%;
    			z-index: 2;
			}
			span{
				margin-left: 37px;
				font-size: 10px;
			}
			.distance{
				// width: 80%;
				height: 100%;
				position: absolute;
				left:0;
				top:0;
				background-color: #228B22;
				border-radius: 18px;

			}
			.imgBox{
				// width: 100%;
			    box-sizing: border-box;
			    height: 156px;
			    z-index: 3;
			    position: absolute;
			    left: 0px;
			    top: -156px;
			    background: #e3e3e3;
			    padding: 10px;
			    border-radius: 8px;
			    display:none;
				.baseImg{
	
				}
				#cut{
					position:absolute;
					left:10px;
					top:0;
				}
				.resultTip{
					display:flex;
					flex-direction: row;
				    justify-content: flex-end;
				    align-items: center;
					.checkTip{
						position:absolute;
						left:10px;
						bottom:0;
						font-size:10px;
						color:#f66495;
					}
					.reloadBtn{
						position: absolute;
					    right: 10px;
					    bottom: 1px;
					}
				}
				

			}
		}

		
	}
	
</style>