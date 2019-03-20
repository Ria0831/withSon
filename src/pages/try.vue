<template>
	<div id="try">
		<div id="capture" style="padding: 10px; background: #f5da55">
            <h4 style="color: #000; ">Hello world!</h4>
        </div>
        <div id='whya'></div>
	</div>
</template>
<script>
    import html2canvas from 'html2canvas'
	export default{
		name:'trya',
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
        },
        mounted(){
            // this.why();
        },
        methods:{
            why(){
                html2canvas(document.querySelector("#capture")).then(canvas => {
                    console.log(canvas)
                    document.querySelector("#whya").appendChild(canvas)
                });
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