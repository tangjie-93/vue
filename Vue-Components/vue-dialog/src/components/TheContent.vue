<template>
  <div id="theContent">
    <div class="content-cover">
      <span>{{msg}}</span>
      <button @click="show=!show">显示</button>
    </div>

    <div>
      <the-dialog
        v-show="show"
        :isShow.sync="show"
        :styleObj="styleObj"
        :dialogTitle="title"
        :showBtnClose="showBtnClose"
        :dialogModel="isModel"
        class="cover"
      >
        <ul class="userInfo">
          <li>
            <span>姓名:</span>
            <input type="text" placeholder="张三">
          </li>
          <li>
            <span>年龄:</span>
            <input type="number" placeholder="25">
          </li>
          <li>
            <span>专业:</span>
            <input type="text" placeholder="地信">
          </li>
          <li>
            <span>学校:</span>
            <input type="text" placeholder="中国地质大学">
          </li>
          <li>
            <button class="btn btn-ok" @click="show=!show">确认</button>
            <button class="btn btn-cancel" @click="show=!show">取消</button>
          </li>
        </ul>
      </the-dialog>
    </div>
  </div>
</template>
<script>
import theDialog from "./Thedialog";
export default {
  name: "theContent",
  data() {
    return {
      msg: "测试，我是主要内容",
      show: false,
      title: "测试标题",
      styleObj: {
        width: "30%",
        height: "80%",
        background: "white"
      },
      showBtnClose: false,
      isModel: true
    };
  },
  components: {
    theDialog
  },

  methods: {
    // click(){
    // }
  }
};
</script>
<style lang="css" scoped>
.cover {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: black;
  opacity: 1;
}
.userInfo li {
  list-style: none;
  padding: 10px;
}
.btn {
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  background: lightgray;
  border-radius: 5px;
}
</style>