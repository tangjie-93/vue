export default{
	total(state){
		
		return state.todos.length;
	},
	
	completed:state=>{
		return  state.todos.filter(todo=>todo.done).length;
	},
	 //统计未完成的任务
    remaining(state){
        return state.todos.filter( todo => !todo.done).length;
    }
}

