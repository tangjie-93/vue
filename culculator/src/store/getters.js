export default{	
    count(state){
    	return state.count;
    },
    status(state){
    	var data=state.count%2==0?"偶数":"奇数";
    	return data;
    }
    
}
