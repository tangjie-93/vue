export default class BaseChart {
    createSeriesData (title, type, data) {
        const seriesData = {
            name: title,
            type,
            data
        }
        return seriesData
    }
    createXAxiosData (data) {
        return {
            type: 'category',
            data,
            axisLine: {
                lineStyle: {
                    color: '#8FA3B7' // y轴颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#6D6D6D'
                }
                // formatter: (value, index) => {
                //     return timeFormat(new Date(value), 'hh:mm:ss');
                // }
            },
            axisTick: { show: false }
        }
    }
    createYAxiosData () {
         return {
            type: 'value',
            splitLine: { show: false },
            // max: 700,
            splitNumber: 3,
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: '#8FA3B7' // y轴颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#6D6D6D'
                }
            }
         }
    }
}
