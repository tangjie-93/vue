<template>
	<div>
		<div>
			<h5>学生签到信息</h5>
		</div>
		<div class="operate">
			<ul>
				<li>
					<select id="address" class="form-control">
						
					</select>
				</li>
				<li>
					<button class="btn" id="query" @click="getData">查询</button>
				</li>
				<li>
					<button class="btn" id="output">导出</button>
					<a href="#" id="dlink"></a>
				</li>
			</ul>
		</div>
		<table id="userInfos" class="table table-bordered">
			<thead>
				<tr>
					<td>
						序号
					</td>
					<td>
						姓名
					</td>
					<td>
						专业
					</td>
					<td>
						学校
					</td>
					<td>
						手机号码
					</td>
					<td>
						是否网申
					</td>
					<td>
						签到时间
					</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<div class="page">
			<select id="pageNumber" class="form-control">
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
			<span class="total"></span>
			<span class="first">首页</span>
			<span class="prev">上页</span>
			<span class="curent">第1页</span>
			<span class="next">下页</span>
			<span class="last">末页</span>
		</div>
		<div id="mask"></div>
		<div id="pop">

			<ul>
				<li class="userName"><span>姓名:</span><input id="userName" type="text" class="form-control" /></li>
				<li class="major"><span>专业:</span><input id="major" type="text" class="form-control" /></li>
				<li class="school"><span>学校:</span><input id="school" type="text" class="form-control" /></li>
				<li class="telephone"><span>手机号码:</span><input id="telephone" type="text" class="form-control" /></li>
				<li class="onlineApply"><span>是否网申:</span>
					<div>
						<span id="">是</span><input class="on" type="radio" name="onlineApply" value="true" />
					</div>
					<div>
						<span id="">否</span><input class="off" type="radio" name="onlineApply" value="false" />
					</div>
				</li>
				<li><button class="btn cancel">取消</button><button class="btn ok">确定</button></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pageIndex: 1,
				pageNumber: 10,
				endIndex: 10,
				startIndex: 0,
				length: null,
				userInfos: [],
				address: null,
				url: null
			}
		},
		methods: {
			getData() {
				
				$("#userInfos>tbody").children().remove();
				this.userInfos.splice(0, userInfos.length);
				this.address = $("#address").val();
				var data = {};
				data["address"] = this.address;
				data = JSON.stringify(data)
				//url = "/data/" + address + ".txt";
				this.url = 'api/query';
				var $this=this;
				$.post(this.url, {
					data: this.address
				}, function(result, textStatus, jqXHR) {
					var bool=result.ok;
					if(bool){
						$this.loadData(result.info);
					}						
					else {
						alert(result.message);
					}
				})
			},
			loadData(result) {
				this.userInfos=[];
				if(result.length == 0) {
					alert("您读取的文件暂无数据");
					$(".total").text("一共0条数据");
					var tr = $("<tr><td colspan='8'>暂无数据</td></tr>")
					$("#userInfos>tbody").append(tr);
				} else if(result.length > 0) {

					for(var i = 0; i < result.length; i++) {
						this.userInfos.push(result[i]);
					}
					//数据个数
					this.length = this.userInfos.length;
					if(this.length > 10) {
						$(".first").removeClass("highlight");
						$(".prev").removeClass("highlight");
						$(".next").addClass("highlight");
						$(".last").addClass("highlight");
					} else {
						$(".first").removeClass("highlight");
						$(".prev").removeClass("highlight");
						$(".next").removeClass("highlight");
						$(".last").removeClass("highlight");

					}
					this.endIndex = this.length > this.endIndex ? this.endIndex : this.length;
					this.pageClick(this.startIndex, this.endIndex);
					$(".total").text("一共" + this.length + "条数据");
				} else {
					$(".total").text("一共0条数据");
					var tr = $("<tr><td colspan='8'>暂无数据</td></tr>")
					$("#userInfos").append(tr);
				}
			},
			pageClick(startIndex, endIndex) {
				//清空数据
				$("#userInfos").children("tbody").remove();
				endIndex = endIndex > this.length ? this.length : endIndex;
				var $tbody = $("<tbody/>");
				$("#userInfos").append($tbody);
				for(var j = startIndex; j < endIndex; j++) {
					var userInfo = this.userInfos[j];
					var tr = $("<tr></tr>"); //$("<tr/>")
					$("<td></td>").text(j + 1).appendTo($(tr));
					$("<td></td>").text(userInfo.userName).appendTo($(tr));
					$("<td></td>").text(userInfo.major).appendTo($(tr));
					
					$("<td></td>").text(userInfo.school).appendTo($(tr));
					$("<td></td>").text(userInfo.telephone).appendTo($(tr));
					var bool = userInfo.onlineApply === "on" ? "是" : "否";
					$("<td></td>").text(bool).appendTo($(tr));
					$("<td></td>").text(userInfo.time).appendTo($(tr));
					var td7 = $("<td class='operate'></td>");
					var delbtn = $("<button class='btn delete'>删除</button>");
					var updbtn = $("<button class='btn update'>修改</button>");
					$("<td class='operate'></td>").append(delbtn).append(updbtn).appendTo($(tr));				
					$("#userInfos").children("tbody").append(tr);
				}
				var $this=this;
				$(".delete").click(function() {
					console.log(userInfos);
					var index = 10 * ($this.pageIndex - 1) + $(this).parents("tr").index();
					var selectedUser = $this.userInfos[index];
					var data = {};
					data["id"] = selectedUser.id;
					data = JSON.stringify(data);
					$.post(
						"api/delete", {
							data: data
						},
						function(result, textStatus, jqXHR) {
							var bool=result.ok;
								if(bool) {
									alert("删除成功");
								$this.getData();
								} else {
									alert(result.message);
								}
							

						}
					)
					return false;
				});
				$(".update").click(function() {
					$("#mask").show();
					$("#pop").show();
					var index = 10 * ($this.pageIndex - 1) + $(this).parents("tr").index();
					var selectedUser = $this.userInfos[index];
					console.log(selectedUser);
					$("#userName").val(selectedUser.userName)
					$("#major").val(selectedUser.major)
					$("#school").val(selectedUser.address);
					$("#telephone").val(selectedUser.telephone);
					if(selectedUser.onlineApply == "true") {
						$(".on").attr("checked", "checked")
					} else {
						$(".off").attr("checked", "checked")
					}

					var height = $("#pop").outerHeight();
					var width = $("#pop").outerWidth();
					console.log(height);
					console.log(width);
					$("#pop").css("margin-top", -parseInt(height / 2));
					$("#pop").css("margin-left", -parseInt(width / 2));

					$(".cancel").click(function() {
						$("#pop").hide("slow");
						$("#mask").hide("slow");
						return false;
					})
					$(".ok").click(function() {
						var data = {}
						data["id"]=selectedUser.id;
						data["userName"] = $("#userName").val();
						data["major"] = $("#major").val();
						data["school"] = $("#school").val();
						if(!(/^1[34578]\d{9}$/.test($("#telephone").val()))) {
							alert("手机号码格式有误，请重新输入");
							return;
						}
						data["telephone"] = $("#telephone").val();

						data["onlineApply"] = $("input[name='onlineApply']:checked").val();
						data["address"] = $("#address").val();
						var time = new Date().Formate("yyyy-MM-dd HH:mm:ss");
						data["time"] = time;
						data = JSON.stringify(data);
						$.post(
							"api/edit", {
								data: data
							},
							function(result, textStatus, jqXHR) {
								console.log(result);
								var bool=result.ok;
								if(bool) {
									alert("更新成功")
									$("#pop").hide();
									$("#mask").hide();
									$this.getData()
								} else {
									alert(result.message);
								}

							}
						)
						return false;
					})
					return false;

				})
			}

		},
		mounted() {
			var $this=this;
			$.get("static/data/school.json", function(result, textStatus, jqXHR) {
					if(textStatus === "success") {
						for(var i = 0; i < result.length; i++) {
							$("<option/>").text(result[i].name).val(result[i].name).appendTo($("#address"));
						}
					    $this.getData();
					} else {
						alert("您访问的文件不存在");
					}
				})
		}

	}
</script>

<style scoped="scoped">
	h5 {
		text-align: center;
		padding: 10px 0;
		font-weight: bold;
	}	
	ul {
		padding: 0;
		display: box;
		/* OLD - Android 4.4- */
		display: -webkit-box;
		/* OLD - iOS 6-, Safari 3.1-6 */
		display: -moz-box;
		/* OLD - Firefox 19- (buggy but mostly works) */
		display: -ms-flexbox;
		/* TWEENER - IE 10 */
		display: -webkit-flex;
		/* NEW - Chrome */
		display: flex;
	}
	
	li {
		list-style: none;
		padding: 0 20px;
	}
	
	li>button {
		height: calc(2.25rem + 2px);
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
	}
	
	#userInfos {
		text-align: center;
		margin-bottom: 30px;
	}
	
	.page {
		position: relative;
		bottom: 10px;
		right: 10px;
		float: right;
		font-size: 0;
	}
	
	.page>span {
		font-size: 1rem;
		padding: 4px;
		background: #cfbfbf;
		cursor: pointer;
		display: inline-block;
		margin-right: 5px;
		border-radius: 5px;
	}
	
	.page>.highlight {
		background: #2196f3;
	}
	
	#pageNumber {
		display: inline-block;
		width: 55px;
		padding: 0;
		height: 30px;
		;
		margin-right: 5px;
		;
	}
	
	.btn {
		padding-top: 0;
		padding-bottom: 0;
	}
	
	@media only screen and (max-width: 420px) {
		#output {
			display: none;
		}
	}
	
	#pop {
		position: absolute;
		display: none;
		margin: 0 auto;
		background: lightgray;
		border-radius: 5px;
		top: 50%;
		left: 50%;
	}
	
	#pop>ul {
		display: block;
		margin-top: 20px;
		;
	}
	
	#pop>ul>li {
		display: flex;
		padding-top: 5px;
		;
		text-align: center;
	}
	
	#pop>ul>li>span {
		flex: 0.33;
	}
	
	#pop>ul>li>input {
		flex: 0.67;
	}
	
	#pop>ul>li>div {
		flex: 0.33;
	}
	
	#pop>ul>li>button {
		flex: 1;
		margin: 2px 10px;
		outline: none;
		background: #2196F3;
		color: white;
	}
	#pop>ul>li>button:hover{
		font-weight: bold;
	}
	#mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.9);
		display: none;
	}
</style>