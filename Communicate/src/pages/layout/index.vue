<template>
	<div class="container">
		<div class="leftContent">
			<leftView/>
		</div>

		<div class="rightContent">
			<transition leave-active-class="bounceOutLeft" enter-active-class="bounceInRight">
			<keep-alive><router-view class="animated"></router-view></keep-alive>
		</transition>
		</div>

	</div>
</template>

<script>
	import leftView from '@/pages/leftContent'
	export default {
		name: "layout",
		data(){
			return {
				list:[]
			}
		},
		components: {
          leftView
		},
		computed:{
			 key() {
		      return this.$route.fullPath
		    }
		}

	}
</script>

<style type="text/css" scoped="scoped">
	.container {
		position: absolute;
		display: table;
		top: 60px;
		width: 100%;
		height: calc(100% - 93px);
	}
	
	.leftContent {
		display: table-cell;
		width: 15%;
		border: 1px solid lightgray;
		height: 100%;
		overflow-y: auto;
		background: #001A35;
	}
	
	.rightContent {
		display: table-cell;
		width: 85%;
		border: 1px solid lightgray;
		border-left: none;
		height: 100%;
	}

</style>