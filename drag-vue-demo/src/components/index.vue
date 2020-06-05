<template>
	<div id="app">
		<div id="content">
			<grid-layout
				:layout.sync="layout"
				:row-height="rowHeight"
				:is-draggable="draggable"
				:is-resizable="resizable"
				:is-mirrored="mirrored"
				:prevent-collision="preventCollision"
				:vertical-compact="true"
				:use-css-transforms="true"
				:responsive="responsive"
				@layout-mounted="layoutMountedEvent"
			>
				<grid-item
					v-for="item in layout"
					:key="item.i"
					:static="item.static"
					:x="item.x"
					:y="item.y"
					:w="item.w"
					:h="item.h"
					:i="item.i"
					:isDraggable="item.draggable"
					class="grid-item"
					:index="item.i"
					@resized="resized">
					<div class="operate-btn">
						<button
							type="ios-trash-outline"
							class="remove"
							title="删除"
							@click="removeItem(item)"
						>删除</button>
					</div>
					<div slot='title' class="title"  @mouseover="item.draggable=true" @mouseout="item.draggable=false">测试</div> 
					<CardRender :item="item"/>
				</grid-item>
			</grid-layout>
		</div>
	</div>
</template>

<script>
import GridItem from './drag/GridItem.vue';
import GridLayout from './drag/GridLayout.vue';
import Chart from './charts/index.vue';
import { setColumnsAndRows, createMetricData } from '@/libs/helper';
import { BarChart, LineChart, PieChart, CustomTable } from '@/libs/chartHelper'
import evenBus from '../libs/evenBus';
// console.log(Worker)
export default {
	name: 'app',
	components: {
		GridLayout,
		GridItem,
		CardRender: () => import('./CardRender')
	},
	data () {
		return {
			layout: [],
			draggable: true,
			resizable: true,
			mirrored: false,
			responsive: true,
			preventCollision: false,
			rowHeight: 20,
			index: 0,
			metricData: [],
			io: null,
			contentHeight: undefined,
			worker: null
		};
	},
	beforeDestroy () {
		this.io && this.io.disconnect();
	},
	created () {
		// this.restoreData()
		evenBus.$on('gridItemAllMounted', () => {
			this.startObserver()
		})
		// this.createWorker()
	},
	methods: {
		removeItem (cardItem) {
			const index = this.layout.indexOf(cardItem);
			this.layout.splice(index, 1);
			this.$store.commit('removeChartInstance', index);
		},
		editItem (index) {
			this.$emit('handleEdit', this.layout[index]);
		},
		resized (i) {
			i > -1 && this.$store.dispatch('resizeChart', i);
		},
		restoreData () {
			// 初始化state
			this.$store.commit('restoreCardState');
			// 清空所有可见的图
			this.$store.commit('clearAllVisibleChartInstance');
			this.layout.splice(0, this.layout.length);
			this.io && this.io.disconnect() && (this.io = null);
		},
		layoutMountedEvent (colNum) {
			this.colNum = colNum
			this.createLayoutData(this.colNum)
		},
		// 构建布局数据
		async createLayoutData (colNum = 12) {
			const { perItemWidth, itemCountPerRow } = setColumnsAndRows(colNum);
			const totalItemCount = 30;
			this.$store.commit('getGraphItemCount', 30)
			let count = 0;
			// 放置几层
			const rowCount = parseInt(totalItemCount / itemCountPerRow);
			const types = ['line', 'bar'];// line', 'bar',
			const layoutData = []
			// 放置多少层
			for (let p = 0; p <= rowCount; p++) {
				// 放置多少列
				for (let j = 0; j < itemCountPerRow && count < totalItemCount; j++, count++) {
					const displayType = types[count % 2];
					const tempObj = {
						x: j * perItemWidth,
						y: p * perItemWidth,
						w: perItemWidth,
						h: 10,
						i: '' + count,
						resizable: false,
						draggable: true,
						static: false,
						displayType
					};
					const metricData = createMetricData();
					const chartData = await this.createChartDataByChartType(displayType, metricData);
					layoutData.push({
						...tempObj,
						data: chartData
					});
				}
			}
			this.layout = layoutData;
		},
		// 创建图表数据
		createChartDataByChartType (type, data) {
			let count = 0
			// switch (type) {
				// 	case 'line':
				// 		return {
				// 			xAxis: {
				// 				type: 'category',
				// 				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				// 			},
				// 			yAxis: {
				// 				type: 'value'
				// 			},
				// 			series: [{
				// 				data: [820, 932, 901, 934, 1290, 1330, 1320],
				// 				type: 'line',
				// 				smooth: true
				// 			}]
				// 		}
				// 	case 'bar':
				// 		return {
				// 			color: ['#3398DB'],
				// 			tooltip: {
				// 				trigger: 'axis',
				// 				axisPointer: { // 坐标轴指示器，坐标轴触发有效
				// 					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				// 				}
				// 			},
				// 			grid: {
				// 				left: '3%',
				// 				right: '4%',
				// 				bottom: '3%',
				// 				containLabel: true
				// 			},
				// 			xAxis: [
				// 				{
				// 					type: 'category',
				// 					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				// 					axisTick: {
				// 						alignWithLabel: true
				// 					}
				// 				}
				// 			],
				// 			yAxis: [
				// 				{
				// 					type: 'value'
				// 				}
				// 			],
				// 			series: [
				// 				{
				// 					name: '直接访问',
				// 					type: 'bar',
				// 					barWidth: '60%',
				// 					data: [10, 52, 200, 334, 390, 330, 220]
				// 				}
				// 			]
				// 		}
			// }
			// return new Promise(resolve => {
			// 	this.worker.postMessage('createChartData', [{ type, data }]).then(res => {
			// 		++count
			// 		resolve(res);
			// 		if (count === 30) {
			// 			this.worker.terminal()
			// 		}
			// 	})
			// })
			
			const obj = {
				'pie': new PieChart(),
				'line': new LineChart(),
				'bar': new BarChart(),
				'table': new CustomTable()
			}
			const chartInstance = obj[type];
			const option = chartInstance.createOption('测试', data)
			return option
		},	
		startObserver () {
			// 避免监听多次
			this.io && this.io.disconnect();
			const callback = (entries) => {
				entries.forEach(item => {
					const index = item.target.getAttribute('index');
					if (item.isIntersecting) {
						// console.log(index);
						this.$store.commit('initChart', index)
						// this.io.unobserve(item.target); // 停止观察当前元素 避免不可见时候再次调用callback函数
					} else {
						// console.log(index)
						// 清除不可见的
						this.$store.commit('clearInvisibleChartInstance', index)
					}
				});
			}
			this.io = new IntersectionObserver(callback);
			const gridItems = document.querySelectorAll('.grid-item');
			gridItems.forEach(item => {
				this.io.observe(item);
			});
		},
		createWorker () {
			this.worker = this.$worker.create([
				{
					message: 'createChartData',
					func (value) {
						const { type, data } = value;
						switch (type) {
							case 'line':
								return {
									xAxis: {
										type: 'category',
										data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
									},
									yAxis: {
										type: 'value'
									},
									series: [{
										data: [820, 932, 901, 934, 1290, 1330, 1320],
										type: 'line',
										smooth: true
									}]
								}
							case 'bar':
								return {
									color: ['#3398DB'],
									tooltip: {
										trigger: 'axis',
										axisPointer: { // 坐标轴指示器，坐标轴触发有效
											type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
										}
									},
									grid: {
										left: '3%',
										right: '4%',
										bottom: '3%',
										containLabel: true
									},
									xAxis: [
										{
											type: 'category',
											data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
											axisTick: {
												alignWithLabel: true
											}
										}
									],
									yAxis: [
										{
											type: 'value'
										}
									],
									series: [
										{
											name: '直接访问',
											type: 'bar',
											barWidth: '60%',
											data: [10, 52, 200, 334, 390, 330, 220]
										}
									]
								}
						}
					}
				}
			])
		}
	}
};
</script>

<style lang="scss" scoped>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/*text-align: center;*/
	color: #2c3e50;
	/*margin-top: 60px;*/
}
.operate-btn {
	position: absolute;
	top: 5px;
	right: 5px;
	z-index: 1000;
	// display: none;
	.ivu-icon {
		margin: 0 5px;
		&:hover {
			cursor: pointer;
		}
	}
	.remove{
		font-size: 16px;
	}
}
.vue-grid-item:hover .operate-btn {
	display: inline-block;
}
.title {
	height: 40px;
	font-size: 18px;
	line-height: 40px;
	text-align: center;
	font-weight: bold;
	font-family: 'sans-serif';
}
.metric-table {
	max-height: calc(100% - 40px);
	min-height: 150px;
	width: 100%;
	overflow: auto;
}
#content{
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 50px;
	box-sizing: border-box;
	overflow: auto;
}
.vue-grid-layout{
	height: 100% !important;
	width:100%;
	overflow: auto;
}
.title{
	height: 30px;
	cursor: move;
}
</style>
