<template>
  <div>
    <el-form
      ref="deviceForm"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <el-form-item
        label="设备编号"
        prop="sn"
      >
        <el-input
          v-model.trim="form.sn"
          placeholder="请输入设备编号"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="设备名称"
        prop="name"
      >
        <el-input
          v-model.trim="form.name"
          placeholder="请输入内容"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="设备类型"
        prop="type"
      >
        <el-select
          v-model="form.type"
          placeholder="请选择"
        >
          <el-option
            v-for="item in typeList"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="设备长度"
        prop="length"
      >
        <el-input
          v-model.trim="form.length"
          placeholder="请输入内容"
          clearable
        >
          <template slot="append">mm</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="设备宽度"
        prop="width"
      >
        <el-input
          v-model.trim="form.width"
          placeholder="请输入内容"
          clearable
        >
          <template slot="append">mm</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="电量不足阈值"
        prop="energyLevelCritical"
      >
        <el-input
          v-model.trim="form.energyLevelCritical"
          placeholder="请输入内容"
          clearable
        >
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="良好电量阈值"
        prop="energyLevelGood"
      >
        <el-input
          v-model.trim="form.energyLevelGood"
          placeholder="请输入内容"
          clearable
        >
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="满电量阈值"
        prop="energyLevelFull"
      >
        <el-input
          v-model.trim="form.energyLevelFull"
          placeholder="请输入内容"
          clearable
        >
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="建议充电阈值"
        prop="energyLevelStuff"
      >
        <el-input
          v-model.trim="form.energyLevelStuff"
          placeholder="请输入内容"
          clearable
        >
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="最大正向速度"
        prop="maxVelocity"
      >
        <el-input
          v-model.trim="form.maxVelocity"
          placeholder="请输入内容"
          clearable
        >
          <template slot="append">m/s</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="最大反向速度"
        prop="maxReverseVelocity"
      >
        <el-input
          v-model.trim="form.maxReverseVelocity"
          placeholder="请输入内容"
          clearable
        >
          <template slot="append">m/s</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button
        type="primary"
        :loading="confirmLoading"
        @click="onSubmit"
      >确 定</el-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        sn: [{ required: true, message: '请输入设备编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入设备类型', trigger: 'blur' }]
      },
      typeList: [
        { label: 'sfsdfsadf', value: 'aa' },
        { label: '地面抹平机器人', value: 1 },
        { label: '地面整平机器人', value: 2 },
        { label: '腻子涂敷机器人', value: 3 },
        { label: '墙地砖填缝机器人', value: 4 },
        { label: '地砖铺贴子母机', value: 5 },
        { label: '楼宇清洁机器人', value: 6 },
        { label: '墙纸铺贴机器人', value: 7 }
      ],
      confirmLoading: false
    }
  },
  methods: {
    closeDialog() {
      this.$refs.deviceForm.resetFields()
      this.$emit('closeDialog')
    },
    onSubmit() {
      console.log(this.form)
      this.$refs.deviceForm.validate(valid => {
        if (valid) {
          this.$emit('onSubmit', this.form)
        } else {
          // 跳转到第一个验证不通过的地方
          setTimeout(() => {
            const isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-group {
  display: flex;
  justify-content: flex-end;
}
.el-select {
  width: 100%;
}
</style>
