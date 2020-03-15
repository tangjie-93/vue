<template>
  <div ref="mainLayout" class="mainLayout">
    <div ref="header" class="mainLayout__header">
      <slot name="form" />
      <!-- <div class="mainLayout__header__btn">
        <el-button size="small" type="primary" @click="submitForm">查 询</el-button>
        <el-button size="small" @click="resetForm">重 置</el-button>
      </div>-->
    </div>
    <div ref="main" class="mainLayout__main">
      <div ref="operation" class="mainLayout__main--btn">
        <slot name="operation" />
      </div>
      <slot name="table" :table-height="tableHeight" />
    </div>
    <div ref="footer" class="mainLayout__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
import { debounce, calculateTableHeight } from "@/utils/commonFun";

export default {
  name: "MainLayout",
  data() {
    return {
      tableHeight: null
    };
  },
  mounted() {
    window.onresize = () => {
      this.computeTableHeight();
    };
    this.$nextTick(() => {
      this.computeTableHeight();
    });
  },
  methods: {
    computeTableHeight() {
      this.tableHeight = debounce(calculateTableHeight, true, 300)(
        this.$refs.mainLayout,
        this.$refs.header,
        this.$refs.operation,
        this.$refs.footer
      );
    },
    submitForm() {
      this.$emit("submitForm");
    },
    resetForm() {
      this.$emit("resetForm");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.mainLayout {
  font-family: $baseTextPingFang;
  font-size: $baseText;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  margin: #{$containerPadding};
  height: calc(100vh - #{$navBarHeight} - #{$containerPadding}* 2);
  // height: 100%;
  label.el-form-item__label {
    font-weight: normal;
  }
  &__header {
    padding: 10px 45px;
    display: flex;
    justify-content: flex-start;
    .header {
      .el-form--inline /deep/ .el-form-item {
        // margin-right: 36px;
        .el-form-item__content {
          /deep/ .el-button {
            font-size: $baseText;
            width: 65px;
            height: 32px;
            // letter-spacing:4px;
          }
        }
      }
    }
    // &__btn {
    //   margin-left: 14px;
    //   display:flex;
    //   align-items: flex-end;
    //   margin-bottom: 18px;
    //   .el-button {
    //     font-size: $baseText;
    //     width: 65px;
    //     height: 32px;
    //     letter-spacing:2px;
    //   }
    // }
  }
  &__main {
    padding: 0 45px;
    &--btn {
      // padding: 15px 15px 15px 0;
      .btn-group {
        /deep/ .el-button {
          // width:82px;
          padding: 8px 17px;
          &:before {
            font-size: 11px;
          }
          span {
            padding-left: 5px;
          }
        }
        .el-button {
          font-size: $baseText;
        }
      }
    }
  }
  &__footer {
    text-align: right;
    .el-pagination {
      padding: 15px 45px;
    }
  }
}
</style>
