const hostInfo = {
  hostname: 'http://10.8.202.179',
  port: '9293'
}
const { hostname, port } = hostInfo
import { TaskServiceClient } from '../grpc-web-protobuf/task/client/Task_grpc_web_pb'
import { ListTaskReq, TaskDTO, DeleteTaskIdReq } from '../grpc-web-protobuf/task/client/Task_pb'
import { createPromiseFn } from '../utils/createPromiseFn'
import { createUInt64Value } from '../utils/createWrapperValue'
const client = new TaskServiceClient(`${hostname}:${port}`)

/**
 * 功能:查询任务列表;
 * @param {Object} data 查询字段对象
 * */
export function fetchTaskData(data) {
  const listTaskQuery = createQueryTask(data)
  const listTaskFn = client.listTask.bind(client)
  return createPromiseFn(listTaskFn, listTaskQuery)
}

/**
 * 功能:新增任务数据;
 * @param {Object} data 添加的字段对象
 * */
export function addTaskReq(data) {
  const addTaskFn = client.addTask.bind(client)
  const taskObject = createTaskObj(data)
  return createPromiseFn(addTaskFn, taskObject)
}

/**
 * 功能:修改任务数据;
 * @param {Object} data 修改字段对象
 * */
export function modifyTaskReq(data) {
  const taskObject = createTaskObj(data)
  const modifyTaskFn = client.modifyTask.bind(client)
  return createPromiseFn(modifyTaskFn, taskObject)
}

/**
 * 功能:删除任务数据;
 * @param {String} id 任务id
 * */
export function deleteTaskReq(id) {
  const deleteTaskObj = new DeleteTaskIdReq()
  deleteTaskObj.setId(id)
  const deleteTaskFn = client.deleteTask.bind(client)
  return createPromiseFn(deleteTaskFn, deleteTaskObj)
}

/**
 * 功能: 创建查询数据;
 * @param {Object}} data 任务查询关键字
 * */
function createQueryTask(data) {
  const listTaskReq = new ListTaskReq()
  listTaskReq.setPageNo(createUInt64Value(data.pageNo || 1))
  listTaskReq.setPageSize(createUInt64Value(data.pageSize || 10))
  data.taskType && listTaskReq.setTaskType(data.taskType)
  data.robotId && listTaskReq.setRobotId(data.robotId)
  data.state && listTaskReq.setState(data.state)
  return listTaskReq
}

/**
 * 功能: 创建任务保存数据;
 * @param {Object}} data 任务存储的数据
 * */
function createTaskObj(data) {
  const TaskDTOInstance = new TaskDTO()
  TaskDTOInstance.setId(data.id)
  TaskDTOInstance.setTaskType(data.taskType)
  TaskDTOInstance.setTitle(data.title)
  TaskDTOInstance.setState(data.state || 'a')
  TaskDTOInstance.setCreatedBy(data.createdBy || '1')
  TaskDTOInstance.setRobotId(data.robotId || 0)
  return TaskDTOInstance
}
