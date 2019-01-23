<template>
	<div>
		<ul>
			<li v-for="(item,index) in list" :key="index" :class="{'active':index==nowIndex}" @click="toggle(index)">
				<router-link :to="item.path">{{item.name}}--{{nowIndex}}</router-link>
			</li>
			
		</ul>
	</div>
</template>

<script>
	export default {
		name: "left",
		data() {
			return {				
				nowIndex: 0 				
			}
		},
		props: {
			list: {
				type: Array,
				default: function() {
					return [ {
						"name": "首页",
						"path": '/patrol/index'
					},       {
						"name": "实时监控",
						"path": '/patrol/realMonitor'
					},       {
						"name": "sos管理",
						"path": '/patrol/sosManage'
					} ,       {
						"name": "巡检管理",
						"path": '/patrol/patrolManage'
					} ]
				}
			}
		},
		methods:{
			toggle(index){
				this.nowIndex=index;
				
			}
		}
	}
</script>

<style type="text/css" scoped="scoped">
	ul {
		list-style: none;
		padding: 1px;
		margin: 0;
		text-align: left;		
		color: white;
	}
	li{
		border-bottom: 1px solid lightgray;
		cursor: pointer;
		white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}	
	li:hover{
		background: #005CBF
	}
	li.active{
		background: #005CBF
	}
	ul>li>a{
	    text-decoration: none;
	    color: white;
	    display: block;
	    padding: 0 10px;
	    height:50px;
	    line-height: 50px;
	}
</style>