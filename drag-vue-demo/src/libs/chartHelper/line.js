import BaseChart from './baseChart';
import echarts from 'echarts';
export default class LineChart extends BaseChart {
    // eslint-disable-next-line no-useless-constructor
    constructor () {
        super()
    }
    createOption (title, data) {
        // return option
         // x轴数据
         const xAxisData = Object.keys(data);
         const seriesData = [];
         xAxisData.forEach(key => {
             seriesData.push(data[key]);
         })
         super.createXAxiosData(xAxisData)
        let option = {
            tooltip: {
                trigger: 'axis'
                // formatter: "{b} <br> 合格率: {c}%"
            },
            grid: {
                top: 10,
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },

            xAxis: super.createXAxiosData(xAxisData),
            yAxis: super.createYAxiosData(),
            series: super.createSeriesData(title, 'line', seriesData)
        }
        return option
    }

    createSeriesData (title, type, data) {
        const seriesData = [{
            name: title,
            data,
            type,
            smooth: true,
            areaStyle: {
                normal: {
                    // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(80,141,255,0.39)'
                        },
                        {
                            offset: 0.34,
                            color: 'rgba(56,155,255,0.25)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(38,197,254,0.00)'
                        }
                    ])
                }
            } // 区域颜色渐变
        }]
        return seriesData
    }
}
