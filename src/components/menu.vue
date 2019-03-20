<template>
	<div class='sideMenu'>
		<el-row class='menu-top'>
			<img src="../../static/img/wigui01.png" alt="logo">
			<span class='top-title' v-if='foldStat == true'>鳖总来玩鸭</span>
		</el-row>
		<el-row>
			<el-menu
				router
			    default-active="2"
			    class="el-menu-vertical-demo"
			    background-color="#545c64"
			    text-color="#fff"
			    active-text-color="#37CC86"
			    :style="{height:clientHight+'px'}">
		        <el-submenu index="1">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>导航一</span>
			        </template>
			        <el-menu-item-group>
			          <template slot="title">分组一</template>
			          <el-menu-item index='/home' @click.self='$store.commit("add_tabs",{name:"trya",content:"trya",flag:0,pathUrl:"/try"})'>选项1</el-menu-item>
			          <el-menu-item  index='/home' @click.self='$store.commit("add_tabs",{name:"tryAgain",content:"tryAgain",flag:1,pathUrl:"/tryAgain"})'>选项2</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group title="分组2">
			          <el-menu-item index="1-3">选项3</el-menu-item>
			        </el-menu-item-group>
			        <el-submenu index="1-4">
			          <template slot="title">选项4</template>
			          <el-menu-item index="1-4-1">选项1</el-menu-item>
			        </el-submenu>
			      </el-submenu>
			      <el-menu-item index="2">
			        <i class="el-icon-menu"></i>
			        <span slot="title">导航二</span>
			      </el-menu-item>
			      <el-menu-item index="/try">
			        <i class="el-icon-setting"></i>
			        <span slot="title">导航四</span>
		        </el-menu-item>
		    </el-menu>
	    </el-row>
	</div>
</template>
<script>
	export default{
		name:'sideMenu',
		props:{
			foldStat:Boolean,
		},
		data(){
			return {
				clientHight:'',
			}
		},
		mounted(){
			this.clientHight = `${document.documentElement.clientHeight - 50}`;
			const that = this;
			window.onresize = function temp(){
				that.clientHight = `${document.documentElement.clientHeight-50}`;
			}
		},
		methods:{

		},
	}
</script>
<style lang='scss'>
	.sideMenu{
		.el-submenu .el-menu-item{
			min-width: 0;
		}
		.menu-top{
			height: 50px;
			background: #545c64;
			display: flex;
			justify-content:center;
			align-items:center;
    		width: calc(100% - 1px);
    		img{
    			width: 35px;
				height: 35px;
				border:1px solid #FFB90F;
    			background-color: #FFB90F;
    			border-radius: 50%;
    		}
    		.top-title{
    			color:#37CC86;
    			font-size: 18px;
    			margin-left: 10px;
    		}
		}
		
	}
</style>