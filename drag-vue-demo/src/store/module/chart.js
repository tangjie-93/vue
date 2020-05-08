export default {
  state: {
    echartCount: 0,
    gridItemCount: undefined,
    isEcahrtAllMounted: false,
    chartInstanceObj: {},
    layouts: null,
    // 当前视图内可见图表
    visibleChartInstanceArr: [],
    isresize: false// 是否调用了resize
  },
  mutations: {
    addChartInstance (state, { index, chart, option }) {
      state.chartInstanceObj[index] = { chart, option }
    },
    removeChartInstance (state, index) {
      state.chartInstanceObj[index] = null
      delete state.chartInstanceObj[index]
    },
    resizeSingleChart (state, index) {
      const chartInstanceObj = state.chartInstanceObj[index]
      chartInstanceObj && chartInstanceObj.chart.resize()
    },
    initChart (state, index) {
      const obj = state.chartInstanceObj[index]
      if (obj) {
        const option = obj.option;
        obj.chart.setOption(option)
        obj.chart.hideLoading()
        // 判断window是否已经resize了
        state.isresize && obj.chart.resize();
        // 将可见视图存起来
        const visibleChartInstanceArr = state.visibleChartInstanceArr;
        const isExist = visibleChartInstanceArr.includes(index);
        !isExist && visibleChartInstanceArr.push(index);
        // debugger
      } 
    },
    clearInvisibleChartInstance (state, index) {
      const visibleChartInstanceArr = state.visibleChartInstanceArr
      if (visibleChartInstanceArr.length) {
        const curIndex = visibleChartInstanceArr.indexOf(index)
        curIndex > -1 && visibleChartInstanceArr.splice(curIndex, 1)
      }
    },
    storeLayouts (state, layouts) {
      state.layouts = layouts
    },
    getGraphItemCount (state, count) {
      state.gridItemCount = count;
    },
    statCountofchartMounted (state) {
        state.echartCount += 1
        state.echartCount === state.gridItemCount && (state.isEcahrtAllMounted = true)
    },
    UpdateStatusOfEcahrtAllMounted (state) {
        state.isEcahrtAllMounted = false
    }
  },
  actions: {
    resizeChart ({ commit }, index) {
      // commit('resizeSingleChart', index)
      setTimeout(() => {
        commit('resizeSingleChart', index)
      }, 300)
    },
    resizeAllCharts ({ state, commit }) {
      !state.isresize && (state.isresize = true)
      Object.values(state.visibleChartInstanceArr).forEach(index => {
        // commit('resizeSingleChart', index)
        setTimeout(() => {
          commit('resizeSingleChart', index)
        }, 300)
      })
    }
  }
}
