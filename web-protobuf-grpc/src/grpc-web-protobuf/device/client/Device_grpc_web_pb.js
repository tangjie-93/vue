/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var message_Base_pb = require('./message/Base_pb.js')

var common_CommonResult_pb = require('./common/CommonResult_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')
const proto = require('./Device_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.DeviceServerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.DeviceServerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Device,
 *   !proto.CommonResult>}
 */
const methodDescriptor_DeviceServer_addDevice = new grpc.web.MethodDescriptor(
  '/DeviceServer/addDevice',
  grpc.web.MethodType.UNARY,
  proto.Device,
  common_CommonResult_pb.CommonResult,
  /**
   * @param {!proto.Device} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_CommonResult_pb.CommonResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Device,
 *   !proto.CommonResult>}
 */
const methodInfo_DeviceServer_addDevice = new grpc.web.AbstractClientBase.MethodInfo(
  common_CommonResult_pb.CommonResult,
  /**
   * @param {!proto.Device} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_CommonResult_pb.CommonResult.deserializeBinary
);


/**
 * @param {!proto.Device} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.CommonResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.CommonResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DeviceServerClient.prototype.addDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/DeviceServer/addDevice',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_addDevice,
      callback);
};


/**
 * @param {!proto.Device} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.CommonResult>}
 *     A native promise that resolves to the response
 */
proto.DeviceServerPromiseClient.prototype.addDevice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/DeviceServer/addDevice',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_addDevice);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Device,
 *   !proto.CommonResult>}
 */
const methodDescriptor_DeviceServer_updateDevice = new grpc.web.MethodDescriptor(
  '/DeviceServer/updateDevice',
  grpc.web.MethodType.UNARY,
  proto.Device,
  common_CommonResult_pb.CommonResult,
  /**
   * @param {!proto.Device} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_CommonResult_pb.CommonResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Device,
 *   !proto.CommonResult>}
 */
const methodInfo_DeviceServer_updateDevice = new grpc.web.AbstractClientBase.MethodInfo(
  common_CommonResult_pb.CommonResult,
  /**
   * @param {!proto.Device} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_CommonResult_pb.CommonResult.deserializeBinary
);


/**
 * @param {!proto.Device} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.CommonResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.CommonResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DeviceServerClient.prototype.updateDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/DeviceServer/updateDevice',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_updateDevice,
      callback);
};


/**
 * @param {!proto.Device} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.CommonResult>}
 *     A native promise that resolves to the response
 */
proto.DeviceServerPromiseClient.prototype.updateDevice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/DeviceServer/updateDevice',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_updateDevice);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Device,
 *   !proto.CommonResult>}
 */
const methodDescriptor_DeviceServer_deleteDevice = new grpc.web.MethodDescriptor(
  '/DeviceServer/deleteDevice',
  grpc.web.MethodType.UNARY,
  proto.Device,
  common_CommonResult_pb.CommonResult,
  /**
   * @param {!proto.Device} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_CommonResult_pb.CommonResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Device,
 *   !proto.CommonResult>}
 */
const methodInfo_DeviceServer_deleteDevice = new grpc.web.AbstractClientBase.MethodInfo(
  common_CommonResult_pb.CommonResult,
  /**
   * @param {!proto.Device} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_CommonResult_pb.CommonResult.deserializeBinary
);


/**
 * @param {!proto.Device} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.CommonResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.CommonResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DeviceServerClient.prototype.deleteDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/DeviceServer/deleteDevice',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_deleteDevice,
      callback);
};


/**
 * @param {!proto.Device} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.CommonResult>}
 *     A native promise that resolves to the response
 */
proto.DeviceServerPromiseClient.prototype.deleteDevice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/DeviceServer/deleteDevice',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_deleteDevice);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.DevicePageQuery,
 *   !proto.DeviceListResponse>}
 */
const methodDescriptor_DeviceServer_queryDevice = new grpc.web.MethodDescriptor(
  '/DeviceServer/queryDevice',
  grpc.web.MethodType.UNARY,
  proto.DevicePageQuery,
  proto.DeviceListResponse,
  /**
   * @param {!proto.DevicePageQuery} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.DeviceListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.DevicePageQuery,
 *   !proto.DeviceListResponse>}
 */
const methodInfo_DeviceServer_queryDevice = new grpc.web.AbstractClientBase.MethodInfo(
  proto.DeviceListResponse,
  /**
   * @param {!proto.DevicePageQuery} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.DeviceListResponse.deserializeBinary
);


/**
 * @param {!proto.DevicePageQuery} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.DeviceListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.DeviceListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DeviceServerClient.prototype.queryDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/DeviceServer/queryDevice',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_queryDevice,
      callback);
};


/**
 * @param {!proto.DevicePageQuery} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.DeviceListResponse>}
 *     A native promise that resolves to the response
 */
proto.DeviceServerPromiseClient.prototype.queryDevice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/DeviceServer/queryDevice',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_queryDevice);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.QueryDeviceBySnRequest,
 *   !proto.DeviceResponse>}
 */
const methodDescriptor_DeviceServer_queryDeviceBySn = new grpc.web.MethodDescriptor(
  '/DeviceServer/queryDeviceBySn',
  grpc.web.MethodType.UNARY,
  proto.QueryDeviceBySnRequest,
  proto.DeviceResponse,
  /**
   * @param {!proto.QueryDeviceBySnRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.DeviceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.QueryDeviceBySnRequest,
 *   !proto.DeviceResponse>}
 */
const methodInfo_DeviceServer_queryDeviceBySn = new grpc.web.AbstractClientBase.MethodInfo(
  proto.DeviceResponse,
  /**
   * @param {!proto.QueryDeviceBySnRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.DeviceResponse.deserializeBinary
);


/**
 * @param {!proto.QueryDeviceBySnRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.DeviceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.DeviceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DeviceServerClient.prototype.queryDeviceBySn =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/DeviceServer/queryDeviceBySn',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_queryDeviceBySn,
      callback);
};


/**
 * @param {!proto.QueryDeviceBySnRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.DeviceResponse>}
 *     A native promise that resolves to the response
 */
proto.DeviceServerPromiseClient.prototype.queryDeviceBySn =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/DeviceServer/queryDeviceBySn',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_queryDeviceBySn);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.DeleteDeviceRequest,
 *   !proto.CommonResult>}
 */
const methodDescriptor_DeviceServer_deleteDevices = new grpc.web.MethodDescriptor(
  '/DeviceServer/deleteDevices',
  grpc.web.MethodType.UNARY,
  proto.DeleteDeviceRequest,
  common_CommonResult_pb.CommonResult,
  /**
   * @param {!proto.DeleteDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_CommonResult_pb.CommonResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.DeleteDeviceRequest,
 *   !proto.CommonResult>}
 */
const methodInfo_DeviceServer_deleteDevices = new grpc.web.AbstractClientBase.MethodInfo(
  common_CommonResult_pb.CommonResult,
  /**
   * @param {!proto.DeleteDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_CommonResult_pb.CommonResult.deserializeBinary
);


/**
 * @param {!proto.DeleteDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.CommonResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.CommonResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DeviceServerClient.prototype.deleteDevices =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/DeviceServer/deleteDevices',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_deleteDevices,
      callback);
};


/**
 * @param {!proto.DeleteDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.CommonResult>}
 *     A native promise that resolves to the response
 */
proto.DeviceServerPromiseClient.prototype.deleteDevices =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/DeviceServer/deleteDevices',
      request,
      metadata || {},
      methodDescriptor_DeviceServer_deleteDevices);
};


module.exports = proto;

