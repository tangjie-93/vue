<template>
	<div class="login-container">
		<form id="login-form">
			<svg-icon icon-class="user" />
			<div>
				<span class="userName">
					<img class="userName" src="../../assets/uerName.png"/>
				</span>

				<input type="text" v-model="userName" placeholder="请输入用户名" class="form-control" />
			</div>
			<div>
				<span class="passWord"><img src="../../assets/passWord.png"/></span>
				<input type="password" placeholder="请输入密码" v-model="passWord" class="form-control" />
			</div>
			<div>
				<input type="text" placeholder="验证码" class="form-control checkCode" ref='checkCode' @keyup.enter="loginIn" />
				<span class="code" id="code" ref='code' @click="createCode"></span>
			</div>
			<div>
				<input type="checkbox" class="saveInfo" v-model="isSave" />
				<label class="tip">保存用户信息</label>
			</div>
			<div>
				<input type="button" @click="loginIn" class="login" value="登录" />
			</div>
		</form>
	</div>
</template>

<script type="module">
	import { loginByUsername, logout } from '@/api/login'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				userName: "111",
				passWord: "111",
				isSave: false
			}
		},
		mounted() {		
			var $this=this;
			this.$nextTick(function(){
				$this.createCode();
				if(localStorage.getItem("userName")) {
					$this.userName = localStorage.getItem("userName");
				}
				if(localStorage.getItem("passWord")) {
					$this.passWord = localStorage.getItem("passWord");
				}
			})
			
		},
		methods: {
			loginIn() {
				if(this.isSave) {
					localStorage.setItem("userName", this.userName);
					localStorage.setItem("passWord", this.passWord);
				}
                else{
                	localStorage.removeItem("userName");
					localStorage.removeItem("passWord");
                }
				if(!this.matchChineseLetterAndNum(this.userName)) {
					Message({
							message: "您输入的用户名包含特殊字符",
							type: 'error',
							duration:1000
					})
					return;
				}
				if(!this.matchChineseLetterAndNum(this.passWord)) {

					Message({
							message: "您输入的密码包含特殊字符",
							type: 'error',
							duration:1000
					})
					return;
				}
				if(!this.validateCode()) {
					Message({
							message: "您输入的验证码有误",
							type: 'error',
							duration:1000
					})		
					return;
				}
				loginByUsername(this.userName, this.passWord).then(response => {
					const data = response.data;
					if(data.bool) {
						Message({
							message: "登录成功",
							type:'success'
						})
						this.$router.push("/index");
					} else {
						Message({
							message: "登录失败,"+data.msg,
							type: 'error',
							duration:1000
						})
					}
				}).catch(error => {
					Message({
						message: error.message,
						type: 'error',
						duration: 1000
					})
				})

			},
			createCode() {
				var code = "";
				var codeLength = 4; //验证码的长度
				var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
					'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
				for(var i = 0; i < codeLength; i++) {
					var charNum = Math.floor(Math.random() * 62);
					code += codeChars[charNum];
				}
				document.getElementById("code").innerHTML = code;
			},
			validateCode() {
				var checkCode = this.$refs.checkCode.value;
				var code = this.$refs.code.innerHTML;
				//debugger;
				if(checkCode && code && checkCode.toLowerCase() === code.toLowerCase()) {
					return true;
				}
				return false;
			},
			matchChineseLetterAndNum(value) {
				var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
				if(pattern.test(value)) {
					return true;
				} else {
					return false;
				}
			}

		}
	}
</script>

<style type="text/css" scoped="scoped">
	.login-container {
		position: absolute;
		min-height: 100%;
		width: 100%;
		background-color: #2d3a4b;
		overflow: hidden;
	}
	
	span {
		display: inline-block;
		height: 34px;
		vertical-align: middle;
		width: 40px;
		line-height: 28px;
		background: lightslategray;
	}
	
	.userName>img,
	.passWord>img {
		width: 20px;
		height: 20px;
		margin-top: 7px;
	}
	
	.form-control {
		padding: 8px;
		border: 1px solid lightgrey;
		width: calc(100% - 60px);
		width: -webkit-calc(100% - 60px);
		width: -moz-calc(100% - 60px);
	}
	
	.checkCode {
		width: calc(100% - 100px);
		width: -webkit-calc(100% - 100px);
		width: -moz-calc(100% - 100px);
	}
	
	.code {
		width: 80px;
		letter-spacing: 2px;
		font-weight: bolder;
		color: blue;
		line-height: 34px;
		cursor: pointer;
	}
	
	#login-form {
		color: white;
		width: 300px;
		height: 200px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -150px;
		margin-top: -100px;
	}
	
	#login-form>div {
		display: table;
		width: 100%;
		margin: 10px 0;
	}
	
	.login {
		width: 100%;
		padding: 8px;
		background: lightslategray;
		color: white;
		border-radius: 4px;
		border: 1px solid;
		font-weight: bold;
		letter-spacing: 10px;
	}
	
	.saveInfo {
		float: left;
		width: 20px;
		height: 20px;
		vertical-align: top;
		margin: 0;
	}
	
	.tip {
		float: left;
		line-height: 20px;
		font-size: 14px;
		margin-left: 10px;
	}
</style>