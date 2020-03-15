<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入你的姓名" :key="form.userName" ></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age" placeholder="请输入你的年龄" ></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-input v-model="form.major" placeholder="请输入你的专业名称"></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="school">
        <el-input v-model="form.school" placeholder="请输入你的学校名称"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="form.telephone" placeholder="请输入你的电话号码" ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入你的联系地址" ></el-input>
      </el-form-item>
      <el-form-item class="operate">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button type="primary" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from "@/api/user";
import {nameValidate,ageValidate,majorValidate,schoolValidate,addressValidate,telephoneValidate} from "@/utils/validateFun"
import { Message } from "element-ui";

export default {
  name: "addUser",
  data() {
    return {
      isShow: false,
      form: {
        userName: "",
        age:20,
        major: "",
        telephone: "",
        address: "",
        school: ""
      },
      rules: {
        userName: [
          {
            required: true,
          }
        ],
        age: [
          {
            type: Number,
            required: true,
          },
          { min: 1, max: 100}
        ],
        major: [
          {
            required: true,
          }
        ],
        telephone: [
          {
            required: true,
          }
        ],
        address: [
          {
            required: true,
          }
        ],
        school: [
          {
            required: true,
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {  
      debugger
      let form=this.form;
      if(nameValidate(form.userName)&&ageValidate(form.age)
      &&majorValidate(form.major)&&telephoneValidate(form.telephone)
      &&schoolValidate(form.school)&&addressValidate(form.address)){
         addUser(this.form)
        .then(response=>{
          console.log(response);
          debugger;
          let data=response.data;
          let type=""
          if(data.ok){
             Message({
              message: data.message,
              type: "success",
              duration: 1000
             });
             this.$emit("update:showDialog",false);     
             this.$emit("isShow");                 
          }else{
             Message({
              message: data.message,
              type: "error",
              duration: 1000
            });
          }
       
        })
        .catch(error => {
          Message({
            message: error.message,
            type: "error",
            duration: 1000
          });
        });
      }
    },
    onCancel(){
      this.$emit("update:showDialog",false);  
    },
   
    validate() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operate{
  text-align: center
}
</style>
