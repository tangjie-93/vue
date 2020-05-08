<template>
	<div
		ref="dom"
		class="charts chart-pie"
	></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'Chart',
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    optionData: Array | Object,
    // eslint-disable-next-line vue/require-prop-type-constructor
    index: String | Number,
    type: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      dom: null
    }
  },
  mounted () {
    this.$store.commit('statCountofchartMounted')
    this.initChart()
  },
  computed: {
    isEcahrtAllMounted () {
            return this.$store.state.chart.isEcahrtAllMounted
		}
  },
  watch: {
    type (value) {
      value && this.initChart()
    }
  },
  methods: {
    initChart () {
      setTimeout(() => {
        if (this.optionData) {
          this.dom = echarts.init(this.$refs.dom, 'tdTheme')
          this.dom.showLoading({ text: '数据正在加载中' })
           this.index && this.$store.commit('addChartInstance', { index: this.index, chart: this.dom, option: this.optionData })
           if (this.isEcahrtAllMounted) {
            this.$emit('gridItemAllMounted')
            this.$store.commit('UpdateStatusOfEcahrtAllMounted')
          }
        }
      }, 10)
    }
  }
}
</script>
<style lang="scss" scoped>
.charts {
	width: 100%;
	height: 100%;
	display: inline-block;
	position: relative;
}
</style>
