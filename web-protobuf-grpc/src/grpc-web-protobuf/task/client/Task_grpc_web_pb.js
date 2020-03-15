/**
 * @fileoverview gRPC-Web generated client stub for com.bzl.bis.task
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.com = {};
proto.com.bzl = {};
proto.com.bzl.bis = {};
proto.com.bzl.bis.task = require('./Task_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bzl.bis.task.TaskServiceClient =
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
proto.com.bzl.bis.task.TaskServicePromiseClient =
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
 *   !proto.com.bzl.bis.task.TaskDTO,
 *   !proto.com.bzl.bis.task.CommonResult>}
 */
const methodDescriptor_TaskService_addTask = new grpc.web.MethodDescriptor(
  '/com.bzl.bis.task.TaskService/addTask',
  grpc.web.MethodType.UNARY,
  proto.com.bzl.bis.task.TaskDTO,
  proto.com.bzl.bis.task.CommonResult,
  /**
   * @param {!proto.com.bzl.bis.task.TaskDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.CommonResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bzl.bis.task.TaskDTO,
 *   !proto.com.bzl.bis.task.CommonResult>}
 */
const methodInfo_TaskService_addTask = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bzl.bis.task.CommonResult,
  /**
   * @param {!proto.com.bzl.bis.task.TaskDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.CommonResult.deserializeBinary
);


/**
 * @param {!proto.com.bzl.bis.task.TaskDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bzl.bis.task.CommonResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bzl.bis.task.CommonResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bzl.bis.task.TaskServiceClient.prototype.addTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/addTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_addTask,
      callback);
};


/**
 * @param {!proto.com.bzl.bis.task.TaskDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bzl.bis.task.CommonResult>}
 *     A native promise that resolves to the response
 */
proto.com.bzl.bis.task.TaskServicePromiseClient.prototype.addTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/addTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_addTask);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bzl.bis.task.ListTaskReq,
 *   !proto.com.bzl.bis.task.ListTaskResp>}
 */
const methodDescriptor_TaskService_listTask = new grpc.web.MethodDescriptor(
  '/com.bzl.bis.task.TaskService/listTask',
  grpc.web.MethodType.UNARY,
  proto.com.bzl.bis.task.ListTaskReq,
  proto.com.bzl.bis.task.ListTaskResp,
  /**
   * @param {!proto.com.bzl.bis.task.ListTaskReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.ListTaskResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bzl.bis.task.ListTaskReq,
 *   !proto.com.bzl.bis.task.ListTaskResp>}
 */
const methodInfo_TaskService_listTask = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bzl.bis.task.ListTaskResp,
  /**
   * @param {!proto.com.bzl.bis.task.ListTaskReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.ListTaskResp.deserializeBinary
);


/**
 * @param {!proto.com.bzl.bis.task.ListTaskReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bzl.bis.task.ListTaskResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bzl.bis.task.ListTaskResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bzl.bis.task.TaskServiceClient.prototype.listTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/listTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_listTask,
      callback);
};


/**
 * @param {!proto.com.bzl.bis.task.ListTaskReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bzl.bis.task.ListTaskResp>}
 *     A native promise that resolves to the response
 */
proto.com.bzl.bis.task.TaskServicePromiseClient.prototype.listTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/listTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_listTask);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bzl.bis.task.TaskDTO,
 *   !proto.com.bzl.bis.task.CommonResult>}
 */
const methodDescriptor_TaskService_modifyTask = new grpc.web.MethodDescriptor(
  '/com.bzl.bis.task.TaskService/modifyTask',
  grpc.web.MethodType.UNARY,
  proto.com.bzl.bis.task.TaskDTO,
  proto.com.bzl.bis.task.CommonResult,
  /**
   * @param {!proto.com.bzl.bis.task.TaskDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.CommonResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bzl.bis.task.TaskDTO,
 *   !proto.com.bzl.bis.task.CommonResult>}
 */
const methodInfo_TaskService_modifyTask = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bzl.bis.task.CommonResult,
  /**
   * @param {!proto.com.bzl.bis.task.TaskDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.CommonResult.deserializeBinary
);


/**
 * @param {!proto.com.bzl.bis.task.TaskDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bzl.bis.task.CommonResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bzl.bis.task.CommonResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bzl.bis.task.TaskServiceClient.prototype.modifyTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/modifyTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_modifyTask,
      callback);
};


/**
 * @param {!proto.com.bzl.bis.task.TaskDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bzl.bis.task.CommonResult>}
 *     A native promise that resolves to the response
 */
proto.com.bzl.bis.task.TaskServicePromiseClient.prototype.modifyTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/modifyTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_modifyTask);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bzl.bis.task.GetTaskDetailByIdReq,
 *   !proto.com.bzl.bis.task.GetTaskDetailByIdResp>}
 */
const methodDescriptor_TaskService_getTaskDetailById = new grpc.web.MethodDescriptor(
  '/com.bzl.bis.task.TaskService/getTaskDetailById',
  grpc.web.MethodType.UNARY,
  proto.com.bzl.bis.task.GetTaskDetailByIdReq,
  proto.com.bzl.bis.task.GetTaskDetailByIdResp,
  /**
   * @param {!proto.com.bzl.bis.task.GetTaskDetailByIdReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.GetTaskDetailByIdResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bzl.bis.task.GetTaskDetailByIdReq,
 *   !proto.com.bzl.bis.task.GetTaskDetailByIdResp>}
 */
const methodInfo_TaskService_getTaskDetailById = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bzl.bis.task.GetTaskDetailByIdResp,
  /**
   * @param {!proto.com.bzl.bis.task.GetTaskDetailByIdReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.GetTaskDetailByIdResp.deserializeBinary
);


/**
 * @param {!proto.com.bzl.bis.task.GetTaskDetailByIdReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bzl.bis.task.GetTaskDetailByIdResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bzl.bis.task.GetTaskDetailByIdResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bzl.bis.task.TaskServiceClient.prototype.getTaskDetailById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/getTaskDetailById',
      request,
      metadata || {},
      methodDescriptor_TaskService_getTaskDetailById,
      callback);
};


/**
 * @param {!proto.com.bzl.bis.task.GetTaskDetailByIdReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bzl.bis.task.GetTaskDetailByIdResp>}
 *     A native promise that resolves to the response
 */
proto.com.bzl.bis.task.TaskServicePromiseClient.prototype.getTaskDetailById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/getTaskDetailById',
      request,
      metadata || {},
      methodDescriptor_TaskService_getTaskDetailById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bzl.bis.task.DeleteTaskIdReq,
 *   !proto.com.bzl.bis.task.CommonResult>}
 */
const methodDescriptor_TaskService_deleteTask = new grpc.web.MethodDescriptor(
  '/com.bzl.bis.task.TaskService/deleteTask',
  grpc.web.MethodType.UNARY,
  proto.com.bzl.bis.task.DeleteTaskIdReq,
  proto.com.bzl.bis.task.CommonResult,
  /**
   * @param {!proto.com.bzl.bis.task.DeleteTaskIdReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.CommonResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bzl.bis.task.DeleteTaskIdReq,
 *   !proto.com.bzl.bis.task.CommonResult>}
 */
const methodInfo_TaskService_deleteTask = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bzl.bis.task.CommonResult,
  /**
   * @param {!proto.com.bzl.bis.task.DeleteTaskIdReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.task.CommonResult.deserializeBinary
);


/**
 * @param {!proto.com.bzl.bis.task.DeleteTaskIdReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bzl.bis.task.CommonResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bzl.bis.task.CommonResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bzl.bis.task.TaskServiceClient.prototype.deleteTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/deleteTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_deleteTask,
      callback);
};


/**
 * @param {!proto.com.bzl.bis.task.DeleteTaskIdReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bzl.bis.task.CommonResult>}
 *     A native promise that resolves to the response
 */
proto.com.bzl.bis.task.TaskServicePromiseClient.prototype.deleteTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bzl.bis.task.TaskService/deleteTask',
      request,
      metadata || {},
      methodDescriptor_TaskService_deleteTask);
};


module.exports = proto.com.bzl.bis.task;

