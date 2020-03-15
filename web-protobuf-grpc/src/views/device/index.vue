<template>
  <section class="container">
    <base-layout>
      <template #form>
        <div>
          <el-form ref="formData" inline :model="formData" label-position="left">
            <el-form-item label="设备编号" prop="sn" size="small">
              <el-input v-model="formData.sn" placeholder="请输入内容" clearable />
            </el-form-item>
            <el-form-item label="设备名称" prop="name" size="small">
              <el-input v-model="formData.name" placeholder="请输入内容" clearable />
            </el-form-item>
            <el-form-item label="设备类型" prop="type" size="small">
              <el-select v-model="formData.type.code" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="运行状态" prop="status" size="small">
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option
                  v-for="item in statusList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item size="small" class="form-btn-group">
              <el-button type="primary" @click="fetchEquipmentList(1)">查 询</el-button>
              <el-button @click="resetForm">重 置</el-button>
              <el-button
                class="el-button--primary"
                size="small"
                type="default"
                icon="el-icon-edit"
                @click="showDeviceOperation = true"
              >添加设备</el-button>
              <el-button
                size="small"
                icon="el-icon-delete"
                type="danger"
                @click="deleteMultipleRow"
              >删除设备</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #table="table">
        <base-table
          :data.sync="tableData"
          :height="table.tableHeight"
          :table-header="tableHeader"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :total="total"
          @pageSizeChange="pageSizeChange"
          @currentPageChange="fetchEquipmentList"
          @selectionChange="selectionChange"
        />
      </template>
    </base-layout>
    <el-dialog :title="title" width="40%" :visible.sync="showDeviceOperation">
      <device-operation
        ref="deviceDialog"
        :form="form"
        @onSubmit="deviceDialogCommit"
        @closeDialog="closeDialog"
      />
    </el-dialog>
  </section>
</template>

<script>
import _ from "lodash";
import BaseLayout from "@/components/BaseLayout/index";
import BaseTable from "@/components/BaseTable/index";
import { typeList, statusList } from "@/config/device";
import {
  fetchDeviceData,
  addDevicedata,
  updateDeviceData,
   delDeviceData,
  delDevicesData
  //   deleteEquipment,
  //   getEquipmentType
} from "@/api/device";
// import { getMapList } from "@/api/map";
// import { addMap } from "@/api/map/mapList";
import {
  debounce,
  calcPageIndex,
  IpValidate,
  macValidate,
  dateFormat
} from "@/utils/commonFun";
export default {
  name: "Device",
  components: {
    BaseLayout,
    BaseTable,
    DeviceOperation: () => import("./deviceOperation")
  },
  data() {
    return {
      showDeviceOperation: false,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
      total: 0,
      equipmentFormDialog: false,
      formData: {
        sn: "",
        name: "",
        type:{},
        status:""
      },
      form: {
        sn: "",
        name: "",
        type: null,
        status: "",
        totalDuration: "",
        startTime: "",
        length: null,
        width: null,
        energyLevelCritical: null,
        energyLevelGood: null,
        energyLevelFull: null,
        energyLevelStuff: null,
        maxVelocity: null,
        maxReverseVelocity: null
      },
      tableData: [],
      tableHeader: [
        { type: "selection" },
        { type: "index", label: "序号" },
        { label: "设备编号", property: "sn", sortable: true },
        { label: "设备名称", property: "name", sortable: true },
        { label: "设备类型", property: "type", sortable: true },
        { label: "运行状态", property: "status", sortable: true},
        {label:"生产时间",property:"productionDate",sortable:true,
          scopedSlots:{
             default: scope => (
                `${scope.row.productionDate ? dateFormat('yyyy-MM-dd hh:mm:ss',new Date(scope.row.productionDate)):''}`
             )
          }
        },
        { label: "总运行时间", property: "totalDuration", sortable: true },
        { label: "更新时间", property: "updatedTime", sortable: true,
          scopedSlots:{
             default: scope => (
                `${dateFormat('yyyy-MM-dd hh:mm:ss',new Date(scope.row.updatedTime))}`
             )
          }
        
        },
        {
          label: "操作",
          property: "rightOperations",
          width: 200,
          fixed: "right",
          scopedSlots: {
            default: scope => (
              <div class="operation">
                <el-button
                  size="small"
                  type="text"
                  nativeOnClick={() => this.toDetails(scope.row)}
                >
                  详情
                </el-button>
                <div class="operation--divider"></div>
                <el-button
                  size="small"
                  type="text"
                  nativeOnClick={() => this.editRow(scope.row)}
                >
                  编辑
                </el-button>
                <div class="operation--divider"></div>
                <el-button
                  size="small"
                  type="text"
                  class="operation--text"
                  onClick={() => this.deleteRow(scope.row, scope.$index)}
                >
                  删除
                </el-button>
              </div>
            )
          }
        }
      ],
      typeList:typeList,
      statusList: statusList,

      chargeoOptions: [
        {
          value: true,
          label: "启用"
        },
        {
          value: false,
          label: "禁用"
        }
      ],
      changeType: "add",
      disabled: false,
      mapDialogVisible: false,
      editRowData: null,
      confirmLoading: false,
      resetMapList: true,
      selectedRow: null
    };
  },
  computed: {
    title() {
      return this.changeType === "add" ? "添加设备" : "编辑设备";
    }
  },
  watch: {
   'formData.type.code':{
     handler(newValue,oldValue){
      const item= this.typeList.filter(item=> newValue===item.value )
      this.formData.type.name=item[0].label;
      console.log( this.formData)
    }
   }
  },
  created() {
    this.fetchEquipmentList(1);
  },
  mounted() {},
  methods: {
   
    // getEquipmentType,
    // getMapList,
    fetchEquipmentList(pageNo) {
      pageNo = calcPageIndex(this.tableData, pageNo);
      const { formData, pageSize } = this;
      const data = {
        ...formData,
        pageSize,
        pageNo
      };
      console.log(data);
      // data.status = data.status === "" ? -1 : Number(data.status);
      // data.type = data.type === "" ? -1 : Number(data.type);
      fetchDeviceData(data).then(res => {
        this.tableData = res.rowsList;
        console.log(res);
        this.tableData.forEach(item => {
          item.type = item.type.name;
          item.status=this.statusList.filter(obj=>obj.value==item.status)[0].label
        });
        this.total = res.pageData.total;
      });
    },
    resetForm() {
      this.$refs.formData.resetFields();
    },
   
    selectionChange(val) {
    //  this.selectedRow = val;
   
       this.selectedRow=[];
      val.forEach(element => {
        this.selectedRow.push(element.id)
      });
      console.log(this.selectedRow);
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.fetchEquipmentList(1);
    },
    deviceDialogCommit(form) {
      this.confirmLoading = true;
      // const { form } = this;
      // form.port = form.port === "" ? -1 : Number(form.port);
      const params = _.cloneDeep(form);
      params.type = { name: "sdf", code: "aa" };
      if (this.changeType === "edit") {
        // 修改设备
        console.log(params);
        updateDeviceData(params)
          .then(res => {
            console.log(res);
            this.$refs.deviceDialog.$refs.deviceForm.resetFields();
            this.closeDialog();
            this.fetchEquipmentList(1);
            this.confirmLoading = false;
          })
          .catch(err => {
            this.$message.error(err);
            this.confirmLoading = false;
          });
      } else {
        // 添加设备

        console.log(params);
        addDevicedata(params)
          .then(res => {
            console.log(res);
            this.closeDialog();
            this.fetchEquipmentList(1);
            this.confirmLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.$message.error(err.message || err);
            this.confirmLoading = false;
          });
      }
    },
    toDetails(row) {
      this.$router.replace({
         path: `/deviceDetail`,
         query: {      
          sn: row.sn,
        },
      })
    },
    editRow(row) {
      console.log(row);
      this.showDeviceOperation = true;
      this.changeType = "edit";
      this.disabled = true;
      this.$nextTick(() => {
        this.form = _.cloneDeep(row);
      });
    },
    deleteRow(row, index) {
      this.$confirm(`确定删除${row.name}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          const params = {
            id: row.id.value
          };
          this.tableData.splice(index, 1);
          console.log(params);
          delDeviceData(row.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.fetchEquipmentList(1);
              console.log(res)
            })
            .catch(err => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {});
    },
    deleteMultipleRow() {
      this.$confirm(`确定删除选中的设备吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          delDevicesData(this.selectedRow)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.fetchEquipmentList(1);
            })
            .catch(err => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {});
    },
    onSubmit(form) {
      this.$refs.equipmentForm.validate(valid => {
        if (valid) {
          this.deviceDialogCommit(form);
        } else {
          // 跳转到第一个验证不通过的地方
          setTimeout(() => {
            const isError = document.getElementsByClassName("is-error");
            isError[0].querySelector("input").focus();
          }, 100);
          return false;
        }
      });
    },
    closeDialog() {
      // 调用子组件重置方法
      this.showDeviceOperation = false;
      this.changeType = "add";
      this.disabled = false;
    },
    // 添加地图
    setDialogVisible(flag, val) {
      flag ? this.addMapData(val) : this.closeMapDialog();
    },
    closeMapDialog() {
      this.mapDialogVisible = false;
      this.$refs.addDialog.$refs.form.resetFields();
    },
    addMapData(val, msg) {
      this.resetMapList = false;
      addMap(val)
        .then(res => {
          if (res) {
            if (res.code === 200) {
              this.$nextTick(() => {
                this.resetMapList = true;
                this.form.mapId = res.data.mapId;
              });

              this.$message({
                type: "success",
                message: "添加成功"
              });
            }
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: `添加失败,${error}`
          });
          this.$nextTick(() => {
            this.resetMapList = true;
          });
        })
        .finally(() => {
          this.isLoading = false;
          this.closeMapDialog();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  align-items: center;
  &--divider {
    height: 1px;
    width: 8px;
    margin: 0 6px;
    background: #ccc;
  }
  &--text {
    color: #f56c6c;
  }
}
</style>
