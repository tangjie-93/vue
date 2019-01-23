<template>
	<div id="app">
		<transition leave-active-class="bounceOutLeft" enter-active-class="bounceInRight">
			<router-view class="animated"></router-view>
		</transition>
	</div>
</template>

<script>
	import Headers from "./components/header"
	import footers from "./components/footers"

	export default {
		name: 'App',
		components: {
			Headers,
			footers
		}
	}
</script>

<style>
	body {
		padding: 0;
		margin: 0;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}	
	
</style>