<template>
	<div id="app">
		<ele-header :seller="seller"></ele-header>
		<ul class="nav">
			<li>
				<router-link to="/goods">商品</router-link>
			</li>
			<li>
				<router-link to="/comments">评论</router-link>
			</li>
			<li>
				<router-link to="/seller">商家</router-link>
			</li>
		</ul>
		<!-- 占位区-->
		<div>
			<!--这其实也就是放置组件的位置-->
			<router-view :seller="seller"></router-view>
		</div>
		<!--购物车组件-->
		<!--<h3>购物车</h3>-->
	</div>
</template>

<script>
	import Header from './components/Header/Header.vue'
	import data from '../data.json'
	export default {
		name: 'app',
		data() {
			return {
				seller: {}
			}
		},
		//实例创建完毕,就可以执行这个函数
		created() {
			this.seller = data.seller;
		},
		//注册
		components: {
			//以键值对形式来注册
			'ele-header': Header
		}
	}
</script>

<style lang="less" scoped>
.nav{
	height: 40px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	a{
		text-decoration: none;
		font-size: 14px;
		color: rgb(77,85,93);
		&.router-link-active{
			color:rgb(240,20,20)
		}
	}
}
</style>