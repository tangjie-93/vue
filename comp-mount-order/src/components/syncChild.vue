<template>
	<div>
		<slot />
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	created() {},
	mounted() {
		console.log('我是同步组件');
	},
};
</script>
<style lang='scss' scoped>
</style>