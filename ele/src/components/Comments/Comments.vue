<template>
	<div id="box">
		<form role="form">
			<div class="form-group">
				<textarea v-model="msg" cols="15" class="form-control" rows="6"></textarea>
				<button class="btn btn-default submit" @click.prevent="add">提交</button>
			</div>
		</form>
		<hr/>
		<h4>评论区</h4><span>/共计{{sum}}条评论</span><button class="btn btn-default deleteAll" @click="removeAll">删除全部留言</button>
		<div class="messagearea">
			<ul>
				<li v-if="myData.length>0" v-for="(val,index) in myData">
					<div>
						<strong class="message">最新评论{{index+1}}.{{val}}</strong><button class="btn btn-default delete" @click="remove(index)">删除</button><br>
					</div>
					<span class="date">时间------{{new Date()|dateFormat}}</span>
					<hr/>
				</li>
				<li v-if="myData.length==0" class="nomessage">
					 <h3 class="h3">暂无评论</h3>
				</li>
               
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: "",
				myData: ["我是第一条留言"]
			}
		},
		methods: {
			add() {
				this.myData.unshift(this.msg);
				//sum++;
				this.msg = "";
			},
			remove(index) {
				this.myData.splice(index, 1)
				//sum--;
			},
			removeAll() {
				this.myData.splice(0, this.myData.length)
			}
		},
		computed: {
			sum() {
				return this.myData.length;
			}
		},
		filters: {
			dateFormat(date) {
				var d = new Date(date);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
				var hour = d.getHours();
				var minutes = d.getMinutes();
				var seconds = d.getSeconds();
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			}
		}
	}
</script>

<style scoped>
	#box {
		max-width: 50%;
		margin: 1% 25%;
	}
	
	h4 {
		display: inline-block;
		margin-top: 5px;
		font-weight: bold;
	}
	h3{
		margin-top: 5px;
	}
	hr {
		border: 0.5px dashed #ccc;
		margin-bottom: 5px;
		margin-top: 5px;
	}
	
	ul {
		padding: 0;
		margin-bottom: 0;
	}
	
	ul li {
		list-style: none;
		margin-top: 3px;
		margin-bottom: 3px;
		padding: 2px 10px;
	}
	
	ul li>hr {
		margin-top: 3px;
		margin-bottom: 0;
	}
	
	.submit {
		margin-top: 5px;
	}
	
	.messagearea {
		border: 0.5px dashed #31B0D5;
		border-radius: 3px;
		margin-top: 5px;
	}
	.nomessage{
		text-align: center;
		padding: 5px;
	}
	.btn-default.delete,
	.btn-default.deleteAll {
		float: right;
	}
	
	.message {
		display: inline-block;
		margin: 5px 0;
	}
	.h3{
		margin-bottom: 0;
	}
</style>