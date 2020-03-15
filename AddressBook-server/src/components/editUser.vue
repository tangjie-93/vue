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
        <el-input v-model="form.userName" placeholder="请输入你的姓名" :key="form.userName" @blur="nameValidate(form.userName)"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age" placeholder="请输入你的年龄" @blur="ageValidate(form.age)"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-input v-model="form.major" placeholder="请输入你的专业名称" @blur="majorValidate(form.major)" ></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="school">
        <el-input v-model="form.school" placeholder="请输入你的学校名称" @blur="schoolValidate(form.school)"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="form.telephone" placeholder="请输入你的电话号码" @blur="telephoneValidate(form.telephone)"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入你的联系地址" @blur="addressValidate(form.address)"></el-input>
      </el-form-item>
      <el-form-item class="operate">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button type="primary" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editUser } from "@/api/user";
import {nameValidate,ageValidate,majorValidate,schoolValidate,addressValidate,telephoneValidate} from "@/utils/validateFun"
import { Message } from "element-ui";
export default {
  name: "addUser",
  data() {
    return {
      isShow: false,
      form: {
        userName: "",
        age: "",
        major: "",
        telephone: "",
        address: "",
        school: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入您的名字",
            trigger: "blur"
          }
        ],
        age: [
          {
            type: "number",
            required: true,
            message: "请输入您的年龄",
            trigger: "blur"
          },
          { min: 1, max: 100, type:"number", message: "年龄最大不能超过100", trigger: "blur" }
        ],
        major: [
          {
            required: true,
            // validator: this.majorValidate,
            message: "请填写您的专业名称",
            trigger: "blur"
          }
        ],
        telephone: [
          {
            required: true,
            // validator: this.telephoneValadate,
            message: "请填写您的电话号码",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            // validator: this.addressValidate,
            message: "请输入你的联系地址",
            trigger: "blur"
          }
        ],
        school: [
          {
            required: true,
            // validator: this.schoolValidate,
            message: "请填写学校名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props:{
    editData:{
      type:Object,
      default:{}
    },
    updateDialog:{
        type:Boolean,
        default:false
    }
  },
  created() {
        this.form.userName=this.editData.userName;
        this.form.age=this.editData.age;
        this.form.major=this.editData.major;
        this.form.school=this.editData.school;
        this.form.telephone=this.editData.telephone;
        this.form.address=this.editData.address;
  },
  mouted(){
       debugger;
    this.$nextTick(function(){
           console.log(this.editData);
           debugger
    })
  },
  methods: {
    onSubmit() {   
          let data={}
        data["userId"]=this.editData.userId;
        data["userName"]=this.form.userName;
        data["age"]=this.form.age;
        data["major"]=this.form.major;
        data["school"]=this.form.school;
        data["telephone"]=this.form.telephone;
        data["address"]=this.form.address;
     editUser(data).then(response=>{
         console.log(response);
        let data = response.data;
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

     }).catch(error=>{
          Message({
            message: error.message,
            type: "error",
            duration: 1000
          });
     })
    },
    onCancel(){
      this.$emit("update:showDialog",false);  
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operate{
  text-align: center
}
</style>
