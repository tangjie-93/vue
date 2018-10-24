import * as types from './types'
export default{
	addasync:({commit})=>{
		commit(types.ADDASYNC);
	},
	stopasync:({commit})=>{
		commit(types.STOP);
	},
}
