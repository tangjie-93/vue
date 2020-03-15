export const tableData = [
  {
    id: '000001',
    title: '移动到电梯前',
    taskType: '移动',
    robotName: '1001机器人',
    state: '执行中'
  },
  {
    id: '000002',
    title: '移动到作业原点',
    taskType: '移动',
    robotName: '1002机器人',
    state: '等待中'
  },
  {
    id: '000003',
    title: '移动到下一个作业点',
    taskType: '移动',
    robotName: '1003机器人',
    state: '暂停中'
  },
  {
    id: '000004',
    title: '移动到作业原点',
    taskType: '移动',
    robotName: '1002机器人',
    state: '重启中'
  }
]
export const taskTypeName = {
  m: '移动',
  p: '喷涂'
}
export const taskTypes = [
  {
    value: 'm',
    label: taskTypeName['m']
  },
  {
    value: 'p',
    label: taskTypeName['p']
  }
]
export const robots = [
  {
    value: '1001机器人',
    id: 0
  },
  {
    value: '1002机器人',
    id: 2
  },
  {
    value: '1003机器人',
    id: 3
  }
]
export const states = {
  a: '新建',
  b: '已激活',
  c: '可调度',
  d: '已发送',
  e: '执行中',
  f: '失败',
  g: '不可路由',
  h: '已完成',
  i: '暂停',
  j: '重启',
  r: '已删除'
}

export const modifyTaskRules = {
  title: [
    { required: true, message: '请输入任务名称', trigger: 'blur' }
  ],
  taskType: [
    { required: true, message: '请输入任务类型', trigger: 'blur' }
  ],
  robotName: [
    { required: true, message: '请选择机器人', trigger: 'change' }
  ]
}
