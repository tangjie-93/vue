/**
 * @fileoverview gRPC-Web generated client stub for com.bzl.bis.rrm.grpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.com = {};
proto.com.bzl = {};
proto.com.bzl.bis = {};
proto.com.bzl.bis.rrm = {};
proto.com.bzl.bis.rrm.grpc = require('./hello_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bzl.bis.rrm.grpc.HelloClient =
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
proto.com.bzl.bis.rrm.grpc.HelloPromiseClient =
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
 *   !proto.com.bzl.bis.rrm.grpc.HelloReq,
 *   !proto.com.bzl.bis.rrm.grpc.HelloResp>}
 */
const methodDescriptor_Hello_sayHello = new grpc.web.MethodDescriptor(
  '/com.bzl.bis.rrm.grpc.Hello/sayHello',
  grpc.web.MethodType.UNARY,
  proto.com.bzl.bis.rrm.grpc.HelloReq,
  proto.com.bzl.bis.rrm.grpc.HelloResp,
  /**
   * @param {!proto.com.bzl.bis.rrm.grpc.HelloReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.rrm.grpc.HelloResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bzl.bis.rrm.grpc.HelloReq,
 *   !proto.com.bzl.bis.rrm.grpc.HelloResp>}
 */
const methodInfo_Hello_sayHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bzl.bis.rrm.grpc.HelloResp,
  /**
   * @param {!proto.com.bzl.bis.rrm.grpc.HelloReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bzl.bis.rrm.grpc.HelloResp.deserializeBinary
);


/**
 * @param {!proto.com.bzl.bis.rrm.grpc.HelloReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bzl.bis.rrm.grpc.HelloResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bzl.bis.rrm.grpc.HelloResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bzl.bis.rrm.grpc.HelloClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bzl.bis.rrm.grpc.Hello/sayHello',
      request,
      metadata || {},
      methodDescriptor_Hello_sayHello,
      callback);
};


/**
 * @param {!proto.com.bzl.bis.rrm.grpc.HelloReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bzl.bis.rrm.grpc.HelloResp>}
 *     A native promise that resolves to the response
 */
proto.com.bzl.bis.rrm.grpc.HelloPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bzl.bis.rrm.grpc.Hello/sayHello',
      request,
      metadata || {},
      methodDescriptor_Hello_sayHello);
};


module.exports = proto.com.bzl.bis.rrm.grpc;

