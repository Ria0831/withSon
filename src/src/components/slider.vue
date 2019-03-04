<template>
	<div id='slider'>
		<div class='slider-bg' id='sliderbox'>
			<div class='slider-btn drag' v-drag ='toshow'></div>
			<div id='dragdistance' class='distance'></div>
			<!-- <img src="../../static/img/wugui.png" alt=""> -->
			<span v-if='isShowTips'>按住左边滑块，拖动完成上方拼图</span>
			<i class=''></i>

		</div>
		
	</div>
</template>
<script>
	export default{
		name:'sliderValid',
		data(){
			return{
				isShowTips:true
			}
		},

		directives:{
			drag(el,binding){
				//pageX和pageY是鼠标指针距离页面的左上角距离，不会随滚动条改变而改变
				//clientX和clientY是鼠标指针距离可视窗口（不包括上面的地址栏和滚动条的距离），会随着滚动条滚动而改变
				// offsetTOP:当前拖拽元素自身的高度
				el.onmousedown = function(e){
					binding.value(false);
					// console.log('binding.value',binding.value);
					//只允许向X轴方向拉
                    var disx = e.pageX - el.offsetLeft;
                    // console.log('disx',disx,'e.pageX',e.pageX,'el.offsetLeft',el.offsetLeft);
                    document.onmousemove = function (e){
                    	var left = e.pageX - disx;
                    	if(left <= 0){
                    		 el.style.left = 0 +'px';
                    		 // document.getElementById('dragdistance').style.width = 0 +'px';
                    		  binding.value(true);//如果滑块在最左边，出现滑动提示
                    	}else if(left >= (document.getElementById('sliderbox').offsetWidth - el.offsetWidth)){
                    		el.style.left = (document.getElementById('sliderbox').offsetWidth - el.offsetWidth) + 'px';
                    		// document.getElementById('dragdistance').style.width = el.style.left + 28 + 'px';
                    	}else{
                    		el.style.left = left + 'px';
                    		// document.getElementById('dragdistance').style.width = left + 23 + 'px';
                    	}
                        // console.log('e.pageX',e.pageX,'el.style.left',el.style.left)
                    }
                     // 为了防止 火狐浏览器 拖拽阴影问题
                    document.onmouseup = function(){
                        document.onmousemove = document.onmouseup = null;
                       
                    }
                }
			}
		},
		methods:{
			toshow(val){
				this.isShowTips = val;
			}
		}
	}
</script>
<style lang='scss'>
	#slider{
		width: 100%;
		height: 30px;
		.slider-bg{
			width: 80%;
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
		}

		
	}
	
</style>