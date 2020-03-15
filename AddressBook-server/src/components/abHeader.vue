<template>
    <div class="abheader">
        <span class="title">通讯录管理系统</span> 
        <el-button type="primary" class="loginOut" @click="dialogVisible=true">注销</el-button>   
        	<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <span>您确定注销吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="loginOut">确 定</el-button>
		  </span>
		</el-dialog> 
    </div>        
</template>

<script>
export default {
    name:"abheader",
    data(){
        return{
            dialogVisible:false
        }
    },
    methods:{
        loginOut(){
            this.dialogVisible=true;
			this.$nextTick(function(){
					this.$router.push("/");
			})
        }
    }
}
</script>

<style type="text/css" scoped>
 .abheader{
     background: lightgray;
     padding: 5px;
     height: 40px;
     margin-bottom: 10px;
 }
 .title{
     line-height: 40px;
     font-weight: bolder;
 }
 .loginOut{
     position: fixed;
     right: 10px;
 }
</style>
