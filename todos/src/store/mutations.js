export default{
	//添加todo
    addTodo(state,{text}) {
    	
        state.todos.push({
            text,
            done : false
        });
    },
    //删除
    deleteTodo(state,index){
    	
    	state.todos.splice(index,1);
    },
    //切换状态
    toggleTodo(state,index){
    	state.todos[index].done=!state.todos[index].done
    },
    updateTodo(state,{text,index}){
    	state.todos[index].text=text;
    	alert("更新成功");
    },
    //删除所有的
    removeAll(state){
    	state.todos=[];
    },
    //删除完成的
    removeCompleted(state){
    	state.todos=state.todos.filter(todo=>!todo.done);
    },
    //删除未完成的
    removeRemaining(state){
    	state.todos=state.todos.filter(todo=>todo.done);
    }
    
}
