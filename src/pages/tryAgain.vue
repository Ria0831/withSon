<template>
  <div class="RTF">
 	<!-- 你不需要担心一个页面中过多vue-ueditor-wrap组件会导致混乱,或者重复引用JS(打开控制台瞄一眼),每个组件都保证拥有一个独立的UEditor实例,你可以尝试把数字改成99(根据自己电脑自行斟酌),但依然稳定可用 -->
    <vue-ueditor-wrap ref="ueditor" v-model="msg" :destroy="false" ></vue-ueditor-wrap>
  </div>
</template>
<script>

// 1、引入VueUeditorWrap组件

import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module



export default {
    name: 'HelloWorld',
  // 2、注册组件
    components: {
        VueUeditorWrap
    },
    data () {
    return {
      // 3、v-model绑定数据
      msg: '',
      // 4、根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
      config: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        // initialFrameHeight: 240,
        // // 初始容器宽度
        // initialFrameWidth: '60%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        // serverUrl: 'http://35.201.165.105:8000/controller.php'

        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2

        // UEDITOR_HOME_URL: '/static/UEditor/'

        // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3

        // headers: {

        //   access_token: '37e7c9e3fda54cca94b8c88a4b5ddbf3'

        // }

      }

    }

  },

 

}

</script>



<style>
	.RTF{
		width: 100%;
		/* height: calc(100% -); */
	}
	.preview{
	min-height: 150px;
	}

</style>