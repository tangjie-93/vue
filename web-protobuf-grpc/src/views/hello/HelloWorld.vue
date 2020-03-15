<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// import { HelloClient } from '../grpc-web-protobuf/device/client/hello_grpc_web_pb';
// import { HelloReq } from '../grpc-web-protobuf/device/client/hello_pb';
import { fetchDeviceData } from '../../api/device'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      client: null
    }
  },
  created: function() {
    // eslint-disable-next-line
    // this.client = new HelloClient('http://10.8.202.179:8080');
    // console.log(this.client);
    // this.getHelloReq();
    this.getDeviceData()
  },
  methods: {
    getHelloReq() {
      // eslint-disable-next-line
      let request = new HelloReq();
      request.setName('World')

      this.client.sayHello(request, {}, (err, response) => {
        if (!err) {
          this.name = response.toObject()
          console.log(this.name)
        } else {
          console.log(err)
        }
      })
    },
    getDeviceData() {
      fetchDeviceData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
