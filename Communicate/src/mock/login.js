export default {
	loginByUsername: config => {
		debugger
		const {
			userName,
			passWord
		} = JSON.parse(config.body)
		if(userName === "111" && passWord === "111") {
			return {
				bool: true,
				msg:null
				
			}
		}else if(userName === "111" && passWord !== "111"){
			return {
				bool: false,
				msg:"密码错误"
			}
		}else{
			return {
				bool: false,
				msg:"用户名错误"
			}
		}

	},
	getUserInfo: config => {
		const {
			token
		} = param2Obj(config.url)
		if(userMap[token]) {
			return userMap[token]
		} else {
			return false
		}
	},
	logout: () => 'success'
}