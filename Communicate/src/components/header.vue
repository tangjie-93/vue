<template>
	<div class="header">
		<img src="../assets/logo.png" />
		<span>广东满天星云科技股份有限公司</span>

		<ul class="nav">

			<li v-for="(item,index) in operate" :key="index" :class="{'active':index==nowIndex}" @click="toggle(index)">
				<router-link :to="item.path">{{item.name}}</router-link>
			</li>

		</ul>
		<div class="operate" @click="dialogVisible = true">
			<button class="loginOut">注销</button>
		</div>
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
		name: "headers",
		data() {
			return {  
				"operate": [     {
					"name": "智能巡检",
					"path": '/index'
				},       {
					"name": "实话监控",
					"path": '/realMonitor'
				},       {
					"name": "sos管理",
					"path": '/sosManage'
				} ,       {
					"name": "巡检管理",
					"path": '/patrolManage'
				},         ],
				nowIndex: 0,
				dialogVisible: false
			}
		},
	
		methods: {
			loginOut() {
				this.dialogVisible=false;
				this.$nextTick(function(){
					this.$router.push("/");
				})
				
			},
			toggle(index){
				this.nowIndex=index;
			}
		}
	}
</script>

<style type="text/css" scoped>
	.header {
		height: 60px;
		background: #001A35;
		text-align: left;
	}
	
	.header>img {
		height: 40px;
		margin: 10px;
		margin-left: 20px;
		vertical-align: middle;
	}
	
	.header>span {
		display: inline-block;
		color: white;
		cursor: pointer;
	}
	
	.operate {
		float: right;
		color: white;
		cursor: pointer;
		padding-right: 10px;
		line-height: 60px;
	}
	
	.nav {
		display: inline-block;
		height: 100%;
		margin: 0;
		padding: 0;
		margin-left: 30px;
		line-height: 60px;
		border-left: 1px solid;
		border-right: 1px solid;
	}
	
	.nav>li>a {
		text-decoration: none;
		color: white;
		display: block;
	    padding: 0 10px;
	    height: 60px;
	}
	
	.nav>li {
		border-right: 1px solid;
		display: inline-block;
	}
	.active{
		background: #005CBF;
	}
	.nav>li:hover {
		background: #005CBF;
	}
	
	.nav>li:last-child {
		border-right: none;
	}
	
	.loginOut {
		border-radius: 4px;
		padding: 5px;
		color: white;
		background: black;
		border: 1px solid;
	}
</style>