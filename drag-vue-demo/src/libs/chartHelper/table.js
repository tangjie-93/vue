export default class CustomTable {
    createOption () {
        const columnNames = ['james', 'tang', 'jie']
        const tableData = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        const columns = []
        const data = []
        const max = Math.max.apply(null, tableData.map(item => item.length))
        columnNames.forEach((name, index) => {
            columns.push({
                title: name,
                key: name
            })
        })
        for (let i = 0; i < max; i++) {
            const obj = {}
            columnNames.forEach((name, index) => {
                obj[name] = tableData[index][i]
            })
            data.push(obj)
        }
        return {
            columns,
            data
        }
    }
}
