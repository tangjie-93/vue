<template>
	<div>
		<div class="cart-container" @click.stop="show=!show">
			<div class="cart-left">
				<div class="cart-outer">
					<div class="cart-inner" :class="{'highlight':totalCount>0}">
						<i class="iconfont icon-gouwuche"></i>
						<!--数量-->
						<div class="count" v-show="totalCount">{{totalCount}}</div>
					</div>
				</div>
			</div>
			<div class="cart-md">
				<strong>￥{{totalPrice}}</strong>
				<span>|</span>
				<em>另需配送费￥{{fee}}元</em>
			</div>
			<div class="cart-right" :class="payClass">{{payDesc}}</div>
		</div>
		<transition name="fade">
			<div class="cart-list" v-show="show&&foods.length">
				<div class="cart-hd">
					<strong>购物车</strong>
					<span @click="clearFoods">清空</span>
				</div>
				<div class="cart-bd">
					<ul>
						<li v-for="food in foods">
							<span>{{food.name}}</span>
							<strong>￥{{food.count*food.price}}</strong>
							<!--添加购物车组件-->
							<ele-buy :food="food"></ele-buy>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="hide">
			<div class="mask" v-show="show&&foods.length"></div>
		</transition>
	</div>
</template>

<script>
	import Buy from '../Buy/Buy'
	export default {
		data() {
			return {
				show: false
			}
		},
		props: {
			foods: {
				type: Array
			},
			fee: {
				type: Number
			},
			start: {
				type: Number
			}
		},
		computed: {
			//统计总价
			totalPrice() {
				let sum = 0;
				this.foods.forEach((item) => {
					sum += item.count * item.price;
				});
				return sum;
			},
			//统计数量
			totalCount() {
				let sum = 0;
				this.foods.forEach((item) => {
					sum += item.count;
				});
				return sum;
			},
			payDesc() {
				if(this.totalCount == 0) {
					//购物车中没有商品
					return `￥${this.start}元起送`;
				} else if(this.totalPrice < this.start) {
					//总价小于起送费用时
					let diff = this.start - this.totalPrice;
					return `还差￥${diff}元起送`;
				} else {
					return `去结算`;
				}
			},
			//获取样式
			payClass() {
				if(this.totalPrice < this.start) {
					return "";
				} else {
					return 'enough';
				}
			}
		},
		components: {
			//注册组件
			'ele-buy': Buy
		},
		methods: {
			clearFoods() {
				//清空，遍历foods数组，将其中所有的count删除掉
				this.foods.forEach((item) => {
					item.count = 0;
				});
				this.show = false;
			}
		}
	}
</script>

<style lang="less" scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.4s;
	}
	
	.fade-enter,
	.fade-leave-active {
		transform: translateY(100%);
	}
	
	.cart-container {
		position: fixed;
		z-index: 99;
		width: 100%;
		height: 48px;
		left: 0;
		bottom: 0;
		background: #101821;
		display: flex;
		color: #fff;
		align-items: center;
		.cart-left {
			width: 80px;
			height: 100%;
			position: relative;
			.cart-outer {
				width: 56px;
				height: 56px;
				background: #141d27;
				border-radius: 50%;
				position: absolute;
				left: 12px;
				top: -10px;
				.cart-inner {
					width: 44px;
					height: 44px;
					background: #2b343c;
					border-radius: 50%;
					margin: 6px;
					text-align: center;
					line-height: 44px;
					&.highlight {
						background: #00a0dc;
						i {
							color: #fff;
						}
					}
					i {
						color: #80858a;
						font-size: 24px;
					}
				}
				.count {
					position: absolute;
					width: 24px;
					height: 24px;
					background: #f01414;
					border-radius: 16px;
					text-align: center;
					line-height: 24px;
					color: #fff;
					font-weight: bold;
					top: 0;
					right: 0;
					font-size: 9px;
				}
			}
		}
		.cart-md {
			flex-grow: 1;
			strong {
				font-size: 16px;
				font-weight: bold;
			}
			span {
				color: rgba(255, 255, 255, 0.4);
				margin: 0 10px;
			}
			em {
				font-size: 10px;
				color: rgba(255, 255, 255, 0.4);
			}
		}
		.cart-right {
			width: 105px;
			height: 100%;
			line-height: 48px;
			text-align: center;
			background: #2b333b;
			font-size: 12px;
			color: rgba(255, 255, 255, 0.4);
			&.enough {
				background: #00b43c;
				color: #fff;
			}
		}
	}
	
	.cart-list {
		width: 100%;
		position: fixed;
		z-index: 90;
		left: 0;
		bottom: 48px;
		background: #fff;
		.cart-hd {
			height: 48px;
			line-height: 48px;
			background: #f3f5f7;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			padding: 0 18px;
			position: relative;
			strong {
				font-size: 14px;
				color: #07111b;
			}
			span {
				position: absolute;
				right: 18px;
				top: 0;
				color: #00a0dc;
				font-size: 12px;
			}
		}
		.cart-bd {
			padding: 0 18px;
			li {
				line-height: 48px;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				display: flex;
				justify-content: space-between;
				span {
					color: #07111b;
					font-size: 14px;
				}
				strong {
					color: #f01414;
					font-size: 14px;
					text-align: right;
					flex-grow: 1;
					margin-right: 10px;
				}
				div {
					width: 80px;
					position: relative;
					top: 0px;
				}
			}
		}
	}
	
	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 80;
		background: rgba(7, 17, 27, 0.6);
		&.hide-enter-active,
		&.hide-leave-active {
			transition: all 0.4s;
		}
		&.hide-enter,
		&.hide-leave-active {
			opacity: 0;
		}
	}
</style>