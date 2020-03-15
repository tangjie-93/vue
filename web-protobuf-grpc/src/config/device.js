const deviceList = [{
  name: '设备编号',
  label: 'sn'
},
{
  name: '设备名称',
  label: 'name'
},
{
  name: '设备类型',
  label: 'type',
  data: 'name'
},
// {
//     name: "设备状态",
//     label: "status"
// },
{
  name: '运行状态',
  label: 'status'
},
{
  name: '总运行时长',
  label: 'tototalDurationalTime'
},
{
  name: '设备长度',
  label: 'length'
},
{
  name: '设备宽度',
  label: 'width'
},
{
  name: '电量不足阈值',
  label: 'energyLevelCritical'
},
{
  name: '良好电量阈值',
  label: 'energyLevelGood'
},
{
  name: '满电阈值',
  label: 'energyLevelFull'
},
{
  name: '建议充电阈值',
  label: 'energyLevelStuff'
},
{
  name: '最大正向速度',
  label: 'maxVelocity'
},
{
  name: '最大反向速度',
  label: 'maxReverseVelocity'
},
{
  name: '生产时间',
  label: 'productionDate'
},
{
  name: '创建人',
  label: 'createdBy'
},
{
  name: '创建时间',
  label: 'createdTime'
},
{
  name: '更新人',
  label: 'updatedBy'
},
{
  name: '更新时间',
  label: 'updatedTime'
}
]
const typeList = [{
  label: '地面磨平机器人',
  value: 'aa'
},
{
  label: '地面抹平机器人',
  value: 1
},
{
  label: '地面整平机器人',
  value: 2
},
{
  label: '腻子涂敷机器人',
  value: 3
},
{
  label: '墙地砖填缝机器人',
  value: 4
},
{
  label: '地砖铺贴子母机',
  value: 5
},
{
  label: '楼宇清洁机器人',
  value: 6
},
{
  label: '墙纸铺贴机器人',
  value: 7
}
]
const statusList = [
  {
    label: '停止',
    value: 0
  },
  {
    label: '启动',
    value: 1
  },
  {
    label: '运行',
    value: 2
  },
  {
    label: '保养',
    value: 3
  },
  {
    label: '故障',
    value: 4
  },
  {
    label: '维修',
    value: 5
  }
]
const deviceTableHeader = [
  {
    label: '同步时间',
    property: 'time',
    sortable: true
  },
  {
    label: '能量水平',
    property: 'power',
    sortable: true
  },
  {
    label: '位置ID',
    property: 'id',
    sortable: true
  },
  {
    label: '实际位置',
    property: 'address',
    sortable: true
  },
  {
    label: '角度',
    property: 'angle',
    sortable: true
  },
  {
    label: '速度',
    property: 'speed',
    sortable: true
  }
]
export {
  deviceList, deviceTableHeader, statusList, typeList
}
