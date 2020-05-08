import BaseChart from './baseChart'
export default class BarChart extends BaseChart {
    // eslint-disable-next-line no-useless-constructor
    constructor () {
        super()
    }
    createOption (title, data) {
        // x轴数据
        const xAxisData = Object.keys(data);
        const seriesData = [];
        xAxisData.forEach(key => {
            seriesData.push(data[key]);
        })
        let option = {
            title: {
                text: title,
                x: 'center'
            },
            tooltip: {
                trigger: 'axis'
                // formatter: (params) => {
                //     // console.log(params)
                //     let str = params[0].axisValue + '<br>' + params[0].seriesName + '：' + params[0].value + '<br>';
                //     params[0].data.metricData.forEach(item => {
                //         Object.keys(item).forEach(key => {
                //             str += key + '：' + this.formatterMetricValue(item[key]) + '<br>';
                //         })
                //     })
                //     return str;
                // }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: super.createXAxiosData(xAxisData),
            yAxis: super.createYAxiosData(),
            series: super.createSeriesData(title, 'bar', seriesData)
        }
        return option
    }
    // createxAxiosData (data) {
    //     const xAxisObj = super.createxAxiosData(data)
    //     // const xAxisObj = {
    //     //     type: 'category',
    //     //     data,
    //     //     axisLine: {
    //     //         lineStyle: {
    //     //             color: '#8FA3B7' // y轴颜色
    //     //         }
    //     //     },
    //     //     axisLabel: {
    //     //         show: true,
    //     //         textStyle: {
    //     //             color: '#6D6D6D'
    //     //         }
    //     //         // formatter: (value, index) => {
    //     //         //     return timeFormat(new Date(value), 'hh:mm:ss');
    //     //         // }
    //     //     },
    //     //     axisTick: { show: false }
    //     // }
    //     return xAxisObj
    // }
    // createSeriesData (title, data) {
    //     const seriesData = super.createSeriesData(title, data)
    //     // const seriesData = {
    //     //     name: title,
    //     //     type: 'bar',
    //     //     data
    //     // }

    //     return seriesData
    // }

    // // 做适配处理
    // createyAxiosData () {
    //     const yAxisObj = super.createYAxiosData();
    //     // const yAxisObj = {
    //     //     type: 'value',
    //     //     splitLine: { show: false },
    //     //     // max: 700,
    //     //     splitNumber: 3,
    //     //     axisTick: { show: false },
    //     //     axisLine: {
    //     //         lineStyle: {
    //     //             color: '#8FA3B7' // y轴颜色
    //     //         }
    //     //     },
    //     //     axisLabel: {
    //     //         show: true,
    //     //         textStyle: {
    //     //             color: '#6D6D6D'
    //     //         }
    //     //     }
    //     // }
    //     return yAxisObj
    // }
    // 格式化tooltip
    formatterMetricValue (value) {
        const len = value.length;
        return len > 15 ? value.slice(0, 15) + '...' : value
    }
}
