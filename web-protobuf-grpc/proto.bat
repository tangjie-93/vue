@echo off
for %%i in (src/grpc-web-protobuf/device/service/*.proto) do (
    protoc -I=src/grpc-web-protobuf/device -I=src/grpc-web-protobuf/device/service %%i --js_out=import_style=commonjs:src/grpc-web-protobuf/device/client  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/grpc-web-protobuf/device/client
    echo exchange %%i To javascript file successfully!
)
protoc -I=src/grpc-web-protobuf/device message/Base.proto common/CommonResult.proto --js_out=import_style=commonjs:src/grpc-web-protobuf/device/client --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/grpc-web-protobuf/device/client

protoc -I=src/grpc-web-protobuf/task Task.proto --js_out=import_style=commonjs:src/grpc-web-protobuf/task/client  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/grpc-web-protobuf/task/client
echo exchange Task.proto To java file successfully!
pause
