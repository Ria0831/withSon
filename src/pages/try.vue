<template>
	<div id="app1">
		<div v-drag class="drag"></div>
		<div v-drag class="drag"></div>
	</div>
</template>
<script>
	export default{
		name:'try',
		 // 自定义指令
        directives:{
            drag(el,bindings){
                el.onmousedown = function(e){
                    var disx = e.pageX - el.offsetLeft;
                    // var disy = e.pageY - el.offsetTop;
                    document.onmousemove = function (e){
                        el.style.left = e.pageX - disx+'px';
                        // el.style.top = e.pageY - disx+'px';
                    }
                    document.onmouseup = function(){
                        document.onmousemove = document.onmouseup = null;
                    }
                }
            }
        }
	}
	
</script>
<style>
	.drag{
            width: 100px;
            height: 100px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: red;
}
</style>