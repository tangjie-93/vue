<template>
	<div ref="echart" style="width:300px;height:400px">

	</div>
</template>

<script>
import echarts from 'echarts';
export default {
	data() {
		return {};
	},
	props: {
		index: Number,
	},
	methods: {},
	mounted() {
		console.log('我是同步组件中的slot组件');
		const instance = echarts.init(this.$refs.echart);
		instance.setOption({
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line',
				},
			],
		});
	},
};
</script>
<style lang='scss' scoped>
</style>