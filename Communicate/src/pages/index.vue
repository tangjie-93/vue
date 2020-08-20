<template>
	<div>
		<headers/>
		<keep-alive><router-view></router-view></keep-alive>	
		<footers/>
	</div>
</template>

<script>
	import headers from "@/components/header"
	import footers from "@/components/footers"
	export default{
		data(){
			return{
				
			}
		},
		components:{
			headers,
			footers
		},computed:{
			 key() {
		      return this.$route.fullPath
		    }
		}
	}
</script>

<style>
</style>