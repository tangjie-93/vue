<template>
	<div class="foot">
		<span>版权所有：广州中海达卫星导航技术股份有限公司&nbsp; <a href="http://www.miitbeian.gov.cn/" tppabs="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备05013166号</a></span>
	</div>
</template>

<script>
	export default{
		name:"footers",
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	.foot{
		position: absolute;
		bottom: 0;
		text-align: center;
	    width: 100%;
	    font-size: 14px;
	}
	.foot a{
		color: #535353;
    	height: 33px;
    	line-height: 33px;
	}
</style>