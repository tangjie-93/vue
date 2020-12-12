<template>
    <div v-if="visible" class="model-container" ref="model">
      <div class="custom-confirm">
        <div class="custom-confirm-header">{{ title }}</div>
        <div class="custom-confirm-body" v-html="content"></div>
        <div class="custom-confirm-footer">
          <button @click="handleOk">{{ okText }}</button>
          <button @click="handleCancel">{{ cancelText }}</button>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive,toRefs} from "vue";
export default defineComponent({
  name: "ElMessage",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    okText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    ok: {
      type: Function,
    },
    cancel: {
      type: Function,
	},
	visible:{
		type:Boolean,
		default:false
	}
  },
  setup(props) {
    const state = reactive({
    visible: props.visible,
	});
    function handleCancel() {
		state.visible = false;
		props.cancel && props.cancel();
		
    }
    function handleOk() {
		state.visible = false;
		props.ok && props.ok();
		
	}
    return {
		...toRefs(state),
		handleOk,
		handleCancel,
    };
  },
});
</script>
<style scoped lang="less">
.model-container {
  position: relative;
  background-color: #666;
  .custom-confirm {
    position: absolute;
    border-radius: 3px;
    width: 300px;
    height: 120px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: lightgoldenrodyellow;
    z-index: 1000000000;
    margin: auto;
    border: 1px solid lightgray;
    transition: height 5s;
    &-header {
      text-align: center;
      color: #333;
      font-size: 14px;
      font-weight: bold;
    }
    &-body {
      text-align: center;
      color: #666;
      font-size: 12px;
      line-height: 22px;
      margin-top: 20px;
      padding: 0 65px;
    }
    &-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 70px;
      /deep/ .ivu-btn {
        height: 26px;
        width: 72px;
        color: #ffffff;
        font-size: 12px;
        background-color: #00bdec;
      }
    }
  }
}
</style>
