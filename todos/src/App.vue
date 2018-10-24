<template>
  <div id="app"> 	
  	<header class="header">
  		<h1>todos</h1> 
  		<input type="text" placeholder="what need to be done?"@keyup.enter="addTodo" class="new-todo">
  	</header>
  	<div class="todolist">
  		 <ol>
	     	<li v-for="(todo,index) in todos" v-show="index<endIndex&&index>=startIndex">     		
	     			<input class="checkbox" type="checkbox" @click="toggleTodo(index)" :checked="todo.done"></input>
		     		<input type="text" :class="{completed : todo.done}" class="text" v-model="todo.text" @keyup.enter="doneEdit(index,$event)"/>
		     		<button class="remove" @click="deleteTodo(index)"></button>		     		
	     	</li>
     	</ol>   	
	  	<div class="page">
	  		<span :class="{active:startIndex>=pageNumber&&total>5}" @click="first">首页</span>
	  		<span :class="{active:startIndex>=pageNumber&&total>5}" @click="prev">上页</span>
	  		第{{pageIndex}}页
	  		<span :class="{active:total>endIndex&&total>5}" @click="next">下页</span>
	  		<span :class="{active:total>endIndex&&total>5}" @click="last">末页</span>
	  	</div>
	  </div>
  	<footer>
  		<span class="all">全部课程：{{total}}</span>
  		<span class="complete">已完成：{{completed}}</span>
  		<span class="remaining">未完成：{{remaining}}</span>
  		
      <button @click="removeAll">删除所有</button>
      <button @click="removeCompleted">删除完成的</button>
      <button @click="removeRemaining">删除未完成的</button>
  	</footer>    
  </div>
</template>

<script>
import {mapMutations,mapGetters,mapState} from 'vuex'
export default {
  name: 'App',
  data(){
  	return{
  		editing:false,
  		endIndex:5,
  		startIndex:0,
  		pageNumber:5,
  		pageIndex:1
  	}  	
  },
  computed:{
  	...mapState(["todos"]),
  	...mapGetters([
        'total',
        'completed',
        'remaining',
    ])
  
  },
  methods:{
  	...mapMutations([
  		'deleteTodo',//将 `this.increment()` 映射为 `this.$store.commit('increment')`
  		'toggleTodo',
  		'updateTodo',
  		
  		
  	]),
  	//添加todo
    addTodo(e){ //e是事件对象，可以不用$event来传递
        let text = e.target.value.trim();
        if(text) {
            //需要通过store的commit进行提交
            this.$store.commit('addTodo',{text});
            //置空
            e.target.value = "";
        }
    },
    //编辑
    doneEdit(index,e){
    		let text=e.target.value.trim();   		
    		if(text){
    			this.updateTodo({text, index});
    		}else{
    			this.deleteTodo(index);
    		}   
    },
    //删除所有的
    removeAll(){    	
    	this.pageindex=1;
    	this.startIndex=0;
    	this.endIndex=5;
    	this.$store.commit('removeAll');
    },
    //删除完成的
    removeCompleted(){
    	this.pageindex=1;
    	this.startIndex=0;
    	this.endIndex=5;
    	this.$store.commit('removeCompleted');
    },
    //删除未完成的
    removeRemaining(){
    	this.pageindex=1;
    	this.startIndex=0;
    	this.endIndex=5;
    	this.$store.commit('removeRemaining');
    },
    //下一页
    next(){
    	if(this.total>this.endIndex){
    		this.startIndex=this.startIndex+this.pageNumber*1;
    	  this.endIndex=this.endIndex+this.pageNumber*1;
    	  this.pageIndex++;
    	}    	
    },
    //上一页
    prev(){
    	if(this.startIndex>=this.pageNumber){
    		this.startIndex=this.startIndex-this.pageNumber*1;
    	  this.endIndex=this.endIndex-this.pageNumber*1;
    	  this.pageIndex--;
    	}
    },
    //首页
    first(){
    	if(this.startIndex>=this.pageNumber){
    		this.startIndex=0;
    	  this.endIndex=5;
    	  this.pageIndex=1;
    	}
    },
    last(){
    	if(this.total>this.endIndex){
    		this.startIndex=Math.floor(this.total/this.pageNumber)*this.pageNumber+1;
    	  this.endIndex=this.total;
    	  this.pageIndex=Math.ceil(this.total/this.pageNumber);
    	} 
    }
  }
  
}
</script>

<style scoped="scoped">
	
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
#app h1{
    margin: 0;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
}
.new-todo{
	padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    font-size: 40px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
}
.new-todo:active,.new-todo:focus{
	border: none;
	outline: none;
}
.checkbox{
	width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
}
.text{
	border: none;
  font-size: 1em;
}
.text:focus,.text:hover{
	border: none;
	outline: none;
}

.todolist>ol{
	margin: 0;
	padding: 0;
	list-style: none;
	text-align: left;
}
.todolist>ol>li{
	padding: 10px 20px;
	font-size: 24px;
}
.todolist>ol>li:hover{
	background: burlywood;
}
.todolist>ol>li:hover>.text{
	background: burlywood;
}
.todolist>ol>li:focus>.text{
	background: blue;
}
.todolist>ol>li>.text:focus{
	background: dodgerblue;
	border-radius: 5px;
}
.todolist>ol>li.editing>.edit{
	display: block;
}
.editing{
	display: none;
}
.edit{
	display: none;
}
.todolist>ol>li>button{
	float: right;
	display: none;
	border: none;
	background: none;
	font-size: 30px;
	color: #cc9a9a;
	line-height: 0.9;
	color: white;
	outline: none;
}
.todolist>ol>li:hover>button{
	display: inline-block;
}
.todolist>ol>li>button:after{
	content: "x";

}
.completed{
	text-decoration: line-through;
	color: #e5dede;
}
footer{
	font-size: 1.1em;
}
footer span{
	display: inline-block;
	width: 32%;
	padding: 0;
}
footer button{
	width: 32%;
	border-radius: 5px;
	box-shadow: none;
	line-height: 1;
	font-size: 1em;
}
footer button:focus{
	outline: none;
}
.page{
	text-align: right;
	padding: 10px;

}
.page span{
	display: inline-block;
	padding: 0 10px;
	margin: 0 2px;
	border-radius: 5px;
	border: 1px gainsboro solid;
}
.page span:hover{
	cursor: pointer;
}
.active{
	background: bisque;
}
</style>
