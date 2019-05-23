<template>
  <div id="parent">
    <div id="dialog-wrapper" ref="dialog-wrapper" @click.prevent="closeDialog">
      <div class="dialog" :style="styleProps" ref="dialog" id="dialog">
        <div class="dialog-header">
          <span class="dialog-title">{{dialogTitle}}</span>
          <span class="dialog-btn-close" v-show="showBtnClose" @click="hide">X</span>
        </div>
        <div  class="dialog-content"> 
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import funDrag from "@/util/drag";
export default {
  name: "theDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    styleObj: {
      type: Object,
      default: {
        width: "30%",
        height: "70",
        top: "15%",
        left: "35%"
      }
    },
    dialogTitle: {
      type: String,
      default: ""
    },
    showBtnClose: {
      type: Boolean,
      default: true
    },
    dialogModel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFlag: false,
      b: 1,
      styleProps: {}
    };
  },
  created() {
    this.showFlag = this.isShow;
    this.styleProps = this.styleObj;
    this.calculatePosition();
  },
  mounted() {
    var dragDom = document.getElementById("dialog");
    var parentDom = document.getElementById("dialog-wrapper");

    funDrag(dragDom, parentDom);
  },
  methods: {
    hide() {
      this.$emit("update:isShow", false); //触发 input 事件，并传入新值
    },
    closeDialog(event) {
      event = window.event || event;
      let target = event.target || event.srcElement;
      let domId = target.getAttribute("id");
      if (this.dialogModel && domId === "dialog-wrapper") {
        this.$emit("update:isShow", false); //触发 input 事件，并传入新值
      }
    },
    calculatePosition() {
      for (var type in this.styleProps) {
        console.log(type);
        debugger
        if (type === "width" || type === "height") {
          debugger;
          let val = this.styleObj[type];
          let winWidth = window.innerWidth;
          let winHeight = window.innerHeight;
          switch (type) {
            case "width":
              let dialogWidth = parseInt(val);
              if (dialogWidth && dialogWidth >= 0) {
                if (val.includes("%")) {
                  this.styleObj["left"] = (100 - parseInt(val))/2 + "%";
                }
                if (val.includes("px") || /^\d+$/.test(val)) {
                  if (dialogWidth < winWidth) {
                    this.styleObj["left"] = (winWidth - dialogWidth) / 2 + "px";
                  }
                }
              }
              break;
            case "height":
              let dialogHeight = parseInt(val);
              if (dialogHeight && dialogHeight >= 0) {
                if (val.includes("%")) {
                  this.styleObj["top"] = (100 - parseInt(val))/2 + "%";
                }
                if (val.includes("px") || /^\d+$/.test(val)) {
                  if (dialogWidth < winWidth) {
                    this.styleObj["top"] = (winWidth - dialogWidth) / 2 + "px";
                  }
                }
              }
              break;
            default:
              break;
          }
        }
      }
    }
  }
};
</script>
<style scoped>
#dialog-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.dialog {
  position: fixed;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background: red;
  cursor: move;
  pointer-events: auto;
}
.dialog-header {
  background: lightgray;
  text-align: left;
  padding: 5px;
}

.dialog-btn-close {
  float: right;
}
.dialog-content{
    padding: 0;
    position: relative;
    height: calc(100% - 30px);
    overflow-y: auto;
    margin: 0;
}
</style>
