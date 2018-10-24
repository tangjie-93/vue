import {ADDASYNC,STOP} from './types'
export default{
	increment(state){
		state.count++;
	},
	decrement(state){
		state.count--;
	},
	clickEven(state){
		if(state.count%2==0){
			state.count++;
		}
		else{
			alert(`${state.count}不是偶数`)
		}
	},
	[ADDASYNC](state){
		state.timer=setInterval(()=>{
			state.count++;
		},1000);
	},
	[STOP](state){
		clearInterval(state.timer)
	}
	
}
