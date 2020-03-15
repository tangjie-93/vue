var HelloWorldPlugin = require('./hello-world');

module.exports = {
  // ... 这里是其他配置 ...
  plugins: [new HelloWorldPlugin({ options: true })]
};