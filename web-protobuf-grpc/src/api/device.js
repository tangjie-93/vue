const hostInfo = require('../../config')
const {
  hostname,
  port
} = hostInfo
import {
  DeviceServerClient
} from '../grpc-web-protobuf/device/client/Device_grpc_web_pb'
import {
  DevicePageQuery,
  Device,
  QueryDeviceBySnRequest,
  DeviceType,
  DeleteDeviceRequest
} from '../grpc-web-protobuf/device/client/Device_pb'
import {
  createPromiseFn
} from '../utils/createPromiseFn'
import {
  createUInt64Value,
  createTimeStamp
} from '../utils/createWrapperValue'
import {
  Decipher
} from 'crypto'
const client = new DeviceServerClient(`${hostname}:${port}`)
/**
 * 功能:查询设备数据;
 * @param {Object} data 查询字段对象
 * */
export function fetchDeviceData(data) {
  const deviceQuery = new DevicePageQuery()
  const deviceRequest = createQueryRequest(deviceQuery, data)
  // deviceQuery.setTypeCode(createDeviceType())//
  // deviceQuery.setName('小车')
  // deviceQuery.setPageNo(createUInt64Value(2))
  // deviceQuery.setPageSize(createUInt64Value(30))
  //     deviceQuery.setProcessableCategories(data.categories)
  // 解决this指向改变的问题
  const queryDeviceFn = client.queryDevice.bind(client)
  return createPromiseFn(queryDeviceFn, deviceRequest)
}
/**
 * 功能：获取设备详情
 * @param {String} sn 设备编号
 *  */
export function fetchDeviceDetailData(sn) {
  const detailRequest = new QueryDeviceBySnRequest()
  detailRequest.setSn(sn)
  const queryDeviceBySnFn = client.queryDeviceBySn.bind(client)
  return createPromiseFn(queryDeviceBySnFn, detailRequest)
}
/**
 * 功能:添加设备;
 * @param {Object} data 设备对象数据
 * */
export function addDevicedata(data) {
  const device = new Device()
  const deviceRequest = createAddOrEditRequest(device, data)
  const addDeviceFn = client.addDevice.bind(client)
  return createPromiseFn(addDeviceFn, deviceRequest)
}
/**
 * 功能:编辑设备;
 * @param {Object} data 设备对象数据
 * */
export function updateDeviceData(data) {
  let device = new Device()
  device = createAddOrEditRequest(device, data)
  const updateDeviceFn = client.updateDevice.bind(client)
  return createPromiseFn(updateDeviceFn, device)
}
/**
 * 功能:删除设备;
 * @param {Number}  id 设备id
 * */
export function delDeviceData(id) {
  const device = new Device()
  device.setId(createUInt64Value(id))
  const deleteDeviceFn = client.deleteDevice.bind(client)
  return createPromiseFn(deleteDeviceFn, device)
}
/**
 * 功能:批量删除设备;
 * @param {Number}  ids 设备id数组
 * */
export function delDevicesData(ids) {
  const requesIds = []
  const deleteRequest = new DeleteDeviceRequest()
  ids.forEach(id => {
    requesIds.push(createUInt64Value(id))
  })
  deleteRequest.setIdList(requesIds)
  const deleteDeviceFn = client.deleteDevices.bind(client)
  return createPromiseFn(deleteDeviceFn, deleteRequest)
}
/**
 * 功能:创建添加和编辑接口后台需要的请求参数;
 * @param {Object} device 要被包装的请求参数对象
 * @param {Object} data 请求参数对象
 * */
// eslint-disable-next-line no-unused-vars
function createAddOrEditRequest(device, data) {
  console.log(device)
  if (data) {
    data.id && device.setId(createUInt64Value(data.id))
    data.sn && device.setSn(data.sn)
    data.name && device.setName(data.name)
    // type是DeviceType类型的
    data.type && device.setType(createDeviceType(data.type)) //
    data.status && device.setStatus(data.status)
    data.totalDuration && device.setTotalDuration(createUInt64Value(data.totalDuration))
    data.startTime && device.setStartTime(createTimeStamp(data.startTime))
    data.length && device.setLength(createUInt64Value(data.length))
    data.width && device.setWidth(createUInt64Value(data.width))
    data.energyLevelCritical && device.setEnergyLevelCritical(createUInt64Value(data.energyLevelCritical))
    data.energyLevelGood && device.setEnergyLevelGood(createUInt64Value(data.energyLevelGood))
    data.energyLevelFull && device.setEnergyLevelFull(createUInt64Value(data.energyLevelFull))
    data.energyLevelStuff && device.setEnergyLevelStuff(createUInt64Value(data.energyLevelStuff))
    data.maxVelocity && device.setMaxVelocity(createUInt64Value(data.maxVelocity))
    data.maxReverseVelocity && device.setMaxReverseVelocity(createUInt64Value(data.maxReverseVelocity))
    // data.production_date && device.setProductionDate(createTimeStamp(data.production_date))
    // data.proc_state && device.setProcState(data.proc_state)
    // data.updated_time && device.setUpdatedTime(createTimeStamp(data.updated_time))
    // data.updated_by && device.setUpdatedBy(data.updated_by)
    // // 创建人
    // data.created_by && device.setCreatedBy(data.created_by)
    // // 创建时间
    // data.created_time && device.setCreatedTime(createTimeStamp(data.updated_time))
  }
  return device
}
/**
 * 功能:创建查询接口后台需要的请求参数;
 * @param {Object} device 要被包装的请求参数对象
 * @param {Object} data 请求参数对象
 * */
function createQueryRequest(device, data) {
  console.log(device)
  if (data) {
    data.name && device.setName(data.name)
    data.type && device.setTypeCode(createDeviceType(data.type)) //
    data.sn && device.setSn(data.sn)
    data.status && device.setStatus(data.status)
    data.pageNo && device.setPageNo(createUInt64Value(data.pageNo))
    data.pageSize && device.setPageSize(createUInt64Value(data.pageSize))
    data.processableCategories && device.setProcessableCategories(data.processableCategories)
  }
  return device
}
/**
 * 功能:封装type包装类;
 * @param {Object} type 设备类型
 * */
function createDeviceType(type) {
  const deviceType = new DeviceType()
  deviceType.setName(type.name)
  deviceType.setCode(type.code)
  return deviceType
}
