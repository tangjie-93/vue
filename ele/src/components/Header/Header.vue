<template>
	<div class="header">
		<!--商家信息-->
		<div class="seller">
			<img :src="seller.avatar" />
			<div class="seller-info">
				<h2>{{seller.name}}</h2>
				<p class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
				<p class="pay" v-if="seller.supports.length">{{seller.supports[0].description}}</p>
			</div>
			<div class="btn" @click="show=true">5个</div>
		</div>
		<!--公告，介绍-->
		<div class="bulletin">
			<p>{{seller.bulletin}}</p>
		</div>
		<!--底部bg-->
		<div class="bg">
			<img :src="seller.avatar" alt="" />
		</div>
		<!--弹出层-->
		<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
			<div class="popup" v-show="show">
				<!--需要引入弹出组件-->
				<div class="close" @click="show=false">&times;</div>
			</div>
		</transition>

	</div>

</template>

<script>
	export default {
		props: {
			seller: Object
		},
		data() {
			return {
				show: false
			}
		}
	}
</script>

<style lang="less" scoped>
	.header {
		height: 134px;
		width: 100%;
		position: relative;
		background: rgba(7, 17, 27, 0.7);
		color: #fff;
		.seller {
			padding: 24px 12px 18px 24px;
			display: flex;
			img {
				width: 64px;
				height: 64px;
				margin-right: 16px;
				border-radius: 4px;
			}
			.seller-info {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				h2 {
					font-size: 16px;
					font-weight: bold;
					margin-bottom: 0;
					margin-top: 0;
					i {
						display: inline-block;
						width: 30px;
						height: 18px;
						background: url('brand@2x.png') no-repeat 0 0;
						background-size: contain;
						margin-right: 5px;
						vertical-align: top;
					}
				}
				p {
					margin: 0;
				}
				.delivery {
					font-size: 12px;
				}
				.pay {
					font-size: 10px;
					i {
						display: inline-block;
						width: 12px;
						height: 12px;
						background: url(decrease_1@2x.png) no-repeat 0 0;
						background-size: contain;
						margin-right: 4px;
						vertical-align: top;
					}
				}
			}
			.btn {
				align-self: flex-end;
				background: rgba(0, 0, 0, 0.2);
				font-size: 10px;
				padding: 6px 10px;
				border-radius: 5px;
			}
		}
		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.bulletin {
			height: 28px;
			line-height: 28px;
			overflow: hidden;
			background: rgba(7, 17, 27, 0.2);
			font-size: 10px;
			padding: 0 12px;
			i {
				display: inline-block;
				width: 22px;
				height: 12px;
				background: url(bulletin@2x.png) no-repeat 0 0;
				background-size: contain;
				margin-right: 4px;
				vertical-align: middle;
			}
			p {
				/*显示省略号的固定用法*/
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.popup {
			position: fixed;
			z-index: 100;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(7, 17, 27, 0.8);
			blur: 10px;
			.close {
				position: absolute;
				bottom: 15px;
				left: 50%;
				font-size: 32px;
				transform: translateX(-50%);
			}
		}
	}
</style>