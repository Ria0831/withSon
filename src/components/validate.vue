<template>
	<div id='validate'>
		<el-input v-omdel='inputValue' :placeholder='text' @focus='changeSta' @input.native='updateValue'></el-input>
	</div>
</template>
<script>
	export default{
		name:'validate',
		props:['value','text','type','max','rules'],
		data(){
			return{
				inputValue:this.value
			}
		},
		watch:{
			inpuvalue(val,oldval){
				if(!val){
					this.$emit('input', '')
			        this.$emit('change', '')
			        return;
				}
				//只能输入汉字
				if(this.type === 'chiness'){
					let re = /[\u4E00-\u9FA5]/g;
			        if (re.test(val)){
			          this.inputvalue = oldval;
			          return;
			        }
				}
				//只能输入数字
				if(this.type==='number'){
			        let r = /^[0-9]*[0-9][0-9]*$/ ;
			        if (!r.test(val)){
			            this.inputvalue = oldval;
			            return;
			        }
			        //手机号码校验
			        
		        }
		        //只能是小数
		        if(this.type==='float'){
		          let numval = Number(val);
		          if(Number.isNaN(numval)){
		            if(Number.isNaN(oldval)){
		              this.inputvalue = null;
		            }else{
		              this.inputvalue = oldval;
		            }
		          }
        		}
        		this.$emit('input', this.inputvalue)
        		this.$emit('change', this.inputvalue)
				
			}
		}
	}
</script>
<style lang='scss'>
	
</style>