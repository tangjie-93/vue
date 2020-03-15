<template>
  <div>
    <abheader/>
    <div class="container">
         <div class="operate">
            <el-button type="primary" @click="showAddDialog=true" icon="el-icon-circle-plus-outline" class="add">添加</el-button>
            <div class="search">
              <el-input type="text" v-model="userName" placeholder="用户名" @input="getUserData(userName)"/>
            </div>
          </div>
      <el-table :data="tableData" border :close-on-click-modal=false style="width: 100%; margin-top: 20px" class="table">
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="major" label="专业" width="180"></el-table-column>
        <el-table-column prop="school" label="学校"></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

       <el-dialog title="添加" :visible.sync="showAddDialog " width="30%" class="dialog">
        <addUser :showDialog.sync="showAddDialog" @isShow="getUserData"/>
      </el-dialog>
       <el-dialog title="编辑" :visible.sync="showEditDialog " width="30%" class="dialog">
         <editUser :editData="updateData" :showDialog.sync="showEditDialog" @isShow="getUserData"/>
      </el-dialog>
       <el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <span>您确定删除吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="deleteData">确 定</el-button>
		  </span>
		</el-dialog> 

    </div>
   
</div>
</template>

<script>
import { getUsers,deleteUser } from "@/api/user";
import { Message } from "element-ui";
export default {
  data() {
    return {
      dialogVisible:false,
      showAddDialog: false,
      showEditDialog:false,
      userName: "",
      selectedIndex: 0,
      tableData: [],
      updateData:{},
      userId:""
    };
  },
  created(){
    this.getUserData();
    this.$nextTick(function(){
      debugger;
       this.getUserData();
    })
  },
  components:{
      addUser:()=>import("./addUser"),
      editUser:()=>import("./editUser"),
      abheader:()=>import("./abHeader")
  },
  methods: {
    getUserData(userName){
       getUsers(userName).then(response=>{
      this.tableData=response.data.dataList;
    }).catch(error=>{
      Message({
         message: error.message,
         type: "error"
      })
    })
    },
    handleEdit(index, row) {
      this.selectedIndex = index;
      this.showEditDialog = true;
      this.updateData=row;
     
    },
    handleDelete(index, row) {
      if(row.userId){
            this.dialogVisible=true;
            this.userId=row.userId;
      }else{
        Message({
         message: "用户Id有误",
         type: "error"
      })
      }

    },
    deleteData(){
       deleteUser(this.userId).then(response=>{
        let data=response.data;
        if(data.ok){
          Message({
            message: data.message,
            type: "success"
          })
          this.dialogVisible=false;
          this.getUserData();
        }else{
          Message({
            message: data.message,
            type: "error"
          })
        }
      }).catch(error=>{
          Message({
            message: error.message,
            type: "error"
          })
      });
    }
  }
};
</script>
<style scoped>
.container{
  padding: 5px;
}
.search {
  float: right;
}
.el-table th > .cell {
  text-align: center !important;
}
.dialog {
  text-align: left;
  padding: 8px;
}
.dialog-div {
  border: 1px solid lightblue;
  padding: 8px;
}
</style>

