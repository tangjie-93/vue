const google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')
const google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb')
/**
 * 功能:将原始类型的数据装换成包装类(UInt64Value);
 * @param {Number} value 要包装的简单值
 * */
export function createUInt64Value(value) {
  return new google_protobuf_wrappers_pb.UInt64Value([value])
}
/**
 * 功能：创建包装类的时间戳
 * @param {Date} date 要包装的时间戳
 */
export function createTimeStamp(date) {
  return new google_protobuf_timestamp_pb.Timestamp([date])
}

