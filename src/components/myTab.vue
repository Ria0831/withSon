<template>
	<div class='my-tab'>
		<div class='tab-top'>
			<ul>
				<li><i class="icon iconfont icon-shitu icon-my-shitu" @click='toTagManage'></i> </li>
				<li v-for='(item,index) in tabsList' @click='toggleTabs(item,index)' :class='{"isActive":tabValue === item.content}'>
					<span >{{item.name}}</span>
					<span  class='closeBtn' :class="{ 'hidenBtn':tabValue != item.content }" @click.stop='toRemove(item)'><i class='icon iconfont icon-guanbi'></i></span>
				</li>
			</ul>
		</div>
		<div class='tab-content'  ref='tabContent'>
			<!-- 指定截图区域 -->
			<div class='content' id="capture">
				<component
		            :is="tabValue"
		            ref="component"
		        ></component>
			</div>
		</div>
		
	</div>
</template>
<script>
	import trya from  '../pages/try.vue';
	import tryAgain from '../pages/tryAgain.vue'
	import personIfo from '../pages/personIfo.vue'
	import {mapState,mapGetters} from 'vuex';
	import html2canvas from 'html2canvas'

	export default{
		name:'myTab',
		data(){
			return{
				currentTab:'',
			}
		},
		components:{
			trya,tryAgain,personIfo
		},
		watch:{
			tabValue(oldval,newval){
				if(oldval != newval){
					this.capture();
				}
			}
		},
		computed:{
			...mapGetters(['tabsList','tabValue']),

		},
		mounted(){

		},
		methods:{
			//跳转到标签管理页面
			toTagManage(){
				this.$router.push('/tagManage')
			},
			//标签页截图
			capture(){
				if(this.$refs.tabContent.offsetWidth){
					var tabWidth = this.$refs.tabContent.offsetWidth;
				}else{
					var tabWidth  = 300;
				}
				
				var imgWidth = (tabWidth - 80) / 3;//压缩的图片宽度计算
				var imgHeight= 200;//压缩图片的高度固定为200px
				//tabValue是content，所以要根据content拿到tabsList的名字
				var tempIndex = this.tabsList.findIndex( value =>value.content == this.tabValue)
				if(tempIndex != -1){
					var currentName = this.tabsList[tempIndex].name
					html2canvas(document.querySelector("#capture"),{width:imgWidth,height:200}).then(canvas => {
						
						var imgSrc = canvas.toDataURL("image/png");
	                    this.$store.commit('add_thumbnail',{canvas:imgSrc,name:currentName})
	                });
				}
				
			},
			//切换tab标签页
			toggleTabs(item,index){
				this.$store.commit('changeTabValue',item);
			},
			//删除指定标签页
			toRemove(item){
				var _this = this;
				//删除tagView
				this.$store.commit('remove_tabs',item);
				this.$nextTick(()=>{
					//删除缩略图
					var tabs = _this.$store.getters.thumbnail;
					var val = tabs.findIndex( value =>value.name == item.name)
					_this.$store.commit('remove_thumbnail',val);
				})
				
			}
		}
	}
</script>
<style lang='scss'>
	.my-tab{
		height: 100%;
		
		.tab-top{
			width: 100%;
			border-bottom: 1px solid #e4e7ed;
			ul{
				display: flex;
				flex-direction:row;
				border: 1px solid #e4e7ed;
			    border-bottom: none;
			    border-radius: 4px 4px 0 0;
			    margin-bottom: -1px;
			     .icon-my-shitu{color:#37CC86;}
				li{
					box-sizing: border-box;
					height: 35px;
					line-height: 35px;
					font-size: 14px;
    				font-weight: 500;
					padding:0 20px;
					transition: #228B22 .3s cubic-bezier(.645,.045,.355,1),0 20px .3s cubic-bezier(.645,.045,.355,1);
				    transition-property: #228B22,0 20px ;
				    transition-duration: 0.3s, 0.3s;
				    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);
				    transition-delay: 0s, 0s;
				    border-bottom: 1px solid transparent;
				    border-right: 1px solid #e4e7ed;
				    cursor:pointer;
				}
				li:first-child{
					border-left:none;
				}
				.hidenBtn{
					display: none;
				}
				li:hover .closeBtn{
					display: inline-block;
				}

			}

			.isActive{
				border-bottom-color: #fff;
				color:#228B22;
			}
		}
		.tab-content{
			height: calc(100% - 35px);
			.content{
				height: 100%;
			}
		}
	}
</style>