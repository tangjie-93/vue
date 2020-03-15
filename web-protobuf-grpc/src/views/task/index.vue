<template>
  <div>
    <div class="task-search">
      <div class="task-search__operation">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addTask"
        >新增任务</el-button>
        <el-input
          v-model="searchContent"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="small "
          class="task-search__input"
        />
      </div>
      <el-select v-model="search.taskType" placeholder="任务类型" size="mini">
        <el-option
          v-for="(item, index) in taskTypes"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="search.robotId" placeholder="机器人" size="mini">
        <el-option
          v-for="item in robots"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="search.state" placeholder="状态" size="mini">
        <el-option
          v-for="(key, value) in states"
          :key="key"
          :label="key"
          :value="value"
        />
      </el-select>
      <el-button size="mini" @click="searchList">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :max-height="520"
      class="table__head"
    >
      <el-table-column
        prop="id"
        label="任务编号"
      />
      <el-table-column
        prop="title"
        label="任务名称"
      />
      <el-table-column
        :formatter="formatTaskTypeName"
        prop="taskTypeName"
        label="任务类型"
      />

      <el-table-column
        :formatter="formatRobotName"
        prop="robotName"
        label="机器人"
      />
      <el-table-column
        :formatter="formatTaskState"
        prop="state"
        label="状态"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editTask(scope.row)">编辑</el-button>
          <el-button type="text" size="small" danger @click="deleteTask(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页功能TODO
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    -->

    <el-dialog
      class="modify-task__dialog"
      :title="dialogTitle"
      width="460px"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="modifyTaskForm"
        :model="currentTask"
        :rules="modifyTaskRules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item prop="title" label="任务名称">
          <el-input
            v-model="currentTask.title"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="taskType" label="任务类型">
          <el-select v-model="currentTask.taskType" placeholder="请选择">
            <el-option
              v-for="(item, index) in taskTypes"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="robotName" label="机器人">
          <el-select v-model="currentTask.robotName" placeholder="请选择">
            <el-option
              v-for="(item, index) in robots"
              :key="index"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button
          type="primary"
          @click="modifyTask"
        >确定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchTaskData, addTaskReq, modifyTaskReq, deleteTaskReq } from '@/api/task'
import { taskTypes, taskTypeName, robots, states, modifyTaskRules } from './constant'
export default {
  components: {
  },
  data() {
    return {
      tableData: [],
      taskTypes,
      robots,
      states,
      search: {
        type: '',
        robot: '',
        state: ''
      },
      searchContent: '',
      // dialog start
      dialogTitle: '',
      dialogVisible: false,
      modifyState: '',
      currentTask: {},
      modifyTaskRules,
      // dialog end
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
      total: 0
    }
  },
  created() {
    this.getList({})
  },
  methods: {
    getList(data) {
      fetchTaskData(data)
        .then(res => {
          this.tableData = res.rowsList
        })
        .catch(err => {
          console.error(err)
        })
    },
    deleteTask(row) {
      console.log(row)
      deleteTaskReq(row.id)
        .then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList({})
        })
        .catch(err => {
          console.error(err)
        })
    },
    getTaskDetailById(id) {

    },
    editTask(data) {
      this.dialogVisible = true
      this.modifyState = 'edit'
      this.dialogTitle = '编辑任务'
      this.currentTask = Object.assign({}, data)
      if (this.$refs['modifyTaskForm']) {
        this.$refs['modifyTaskForm'].resetFields()
      }
    },
    addTask() {
      this.dialogVisible = true
      this.modifyState = 'add'
      this.dialogTitle = '新增任务'
      this.currentTask = Object.assign({}, {
        taskType: 'm',
        robotId: 0,
        createdBy: '1'
      })
      if (this.$refs['modifyTaskForm']) {
        this.$refs['modifyTaskForm'].resetFields()
      }
    },
    modifyTask() {
      this.$refs['modifyTaskForm'].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          if (this.modifyState === 'add') {
            addTaskReq(this.currentTask)
              .then(res => {
                this.getList({})
              })
              .catch(err => {
                this.$message.error(err)
              })
          } else {
            modifyTaskReq(this.currentTask)
              .then(res => {
                const taskIndex = this.tableData.findIndex(item => item.id === this.currentTask.id)
                this.tableData.splice(taskIndex, 1, this.currentTask)
              })
              .catch(err => {
                this.$message.error(err)
              })
          }
        } else {
          return false
        }
      })
    },
    formatRobotName(row, column) {
      row.robotName = '0001机器人'
      return '0001机器人'
    },
    formatTaskState(row, column) {
      return states[row.state]
    },
    formatTaskTypeName(row, column) {
      return taskTypeName[row.taskType]
    },
    searchList() {
      this.getList(this.search)
    },
    handleCurrentChange() {

    },
    handleSizeChange() {

    }
  }
}
</script>

<style lang="scss" scope>
  .task-search {
    margin: 40px;
    .task-search__input {
      width: 180px;
      margin-left: 20px;
    }
    .el-select {
      margin-right: 20px;
    }
  }
  .task-search__operation {
    margin: 20px 0
  }
</style>
