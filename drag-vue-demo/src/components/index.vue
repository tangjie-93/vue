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
				@layout-updated="layoutUpdatedEvent"
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
					class="grid-item"
					:index="item.i"
					@resized="resized">
					<div class="operate-btn">
						<!-- <button
							type="ios-hammer"
							title='编辑'
							class="edit"
							@click="editItem(item.i)"
						>编辑</button> -->
						<button
							type="ios-trash-outline"
							class="remove"
							title="删除"
							@click="removeItem(item.i)"
						>删除</button>
						{{item.i}}
					</div>
					<template v-if="item.type!=='table'">
						<Chart
							:optionData="item.data"
							:index='item.i'
							:type="item.displayType"
							@gridItemAllMounted="gridItemAllMountedEvent"
						/>
					</template>

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
import { BarChart, LineChart, PieChart } from '@/libs/chartHelper'
// console.log(Worker)
export default {
	name: 'app',
	components: {
		GridLayout,
		GridItem,
		Chart
	},
	data () {
		return {
			layout: [],
			draggable: true,
			resizable: true,
			mirrored: false,
			responsive: true,
			preventCollision: false,
			rowHeight: 30,
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
	methods: {
		removeItem (index) {
			this.layout.splice(index, 1);
			this.$store.commit('removeChartInstance', index);
		},
		editItem (index) {
			this.$emit('handleEdit', this.layout[index]);
		},
		resized (i) {
			i > -1 && this.$store.dispatch('resizeChart', i);
		},
		layoutMountedEvent (colNum) {
			this.colNum = colNum
			this.createLayoutData(this.colNum)
		},
		// 布局更新后的新布局
		layoutUpdatedEvent (newLayout, layouts) {
			this.$store.commit('storeLayouts', layouts);
		},
		// 构建布局数据
		createLayoutData (colNum = 12) {
			const { perItemWidth, itemCountPerRow } = setColumnsAndRows(colNum);
			const totalItemCount = 100;
			this.$store.commit('getGraphItemCount', 100)
			let count = 0;
			// 放置几层
			const rowCount = parseInt(totalItemCount / itemCountPerRow);
			const types = ['line', 'bar'];
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
						draggable: false,
						static: false,
						displayType
					};
					const metricData = createMetricData();
					const chartData = this.createChartDataByChartType(displayType, metricData);
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
			const obj = {
				'pie': new PieChart(),
				'line': new LineChart(),
				'bar': new BarChart()
				// 'table': new CustomTable()
			}
			const chartInstance = obj[type];
			const option = chartInstance.createOption('测试', data)
			return option
		},	
		gridItemAllMountedEvent () {
			debugger
			this.startObserver()
		},
		startObserver () {	
			const callback = (entries) => {
				entries.forEach(item => {
					const index = item.target.getAttribute('index');
					if (item.isIntersecting) {
						console.log(index);
						this.$store.commit('initChart', index)
						// this.io.unobserve(item.target); // 停止观察当前元素 避免不可见时候再次调用callback函数
					} else {
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
</style>
