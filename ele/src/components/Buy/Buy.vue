<template>
	<div class="buy-container">
		<transition name="rotate">
			<span class="iconfont icon-jian decrease" @click="decrease" v-show="food.count"></span>
		</transition>
		<span class="count" v-show="food.count">{{food.count}}</span>
			<span class="iconfont icon-jia increase" @click="increase"></span>
	</div>
</template>

<script>
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			decrease() {
				if(this.food.count <= 0) {
					alert("请先添加商品");
				} else {
					this.food.count--;
				}

			},
			increase() {
				//对food.count进行判断，如果没有，就设置为1，如果则加1
				if(!this.food.count) {
					//需要使用$set的方式来增加
					this.$set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.rotate-enter-active,
	.rotate-leave-active {
		transition: all 0.3s;
	}
	
	.rotate-enter,
	.rotate-enter-active {
		transform: translateX(24px) rotate(360deg);
	}
	
	.buy-container {
		position: absolute;
		right: 0;
		bottom: 10px;
		display: flex;
		align-items: center;
		.count {
			color: #999;
			margin: 0 8px;
		}
		.decrease,
		.increase {
			color: #00a0dc;
			font-size: 24px
		}
		.decrease {
			position: relative;
			top: -2px;
		}
	}
</style>