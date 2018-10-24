<template>
	<div>
		<!-- 有且仅有一个根元素 -->
		<div class="goods">
			<!-- 菜单 -->
			<div class="menu">
				<ul>
					<li v-for="(item,index) in goods" :class="{'on' : index==current }" @click="selectCat(index)">{{item.name}}</li>
				</ul>
			</div>
			<!-- 列表 -->
			<div class="list" id="list" ref="list">
				<div>
					<dl v-for="item in goods">
						<dt>{{item.name}}</dt>
						<dd v-for="food in item.foods">
							<div class="food-container" @click.stop="showDetail(food)">
								<img :src="food.icon" alt="">
								<div class="food-info">
									<h3>{{food.name}}</h3>
									<p class="desc">{{food.description}}</p>
									<p class="sale"><span>月售{{food.sellCount}}</span> <span>好评{{food.rating}}</span></p>
									<p class="price"><strong>￥{{food.price}}</strong> <del v-if="food.oldPrice">￥{{food.oldPrice}}</del></p>
								</div>
							</div>
                        <!--添加购物车组件-->
                        <ele-buy :food=food></ele-buy>
						</dd>
					</dl>
				</div>
			</div>
		</div>
		<!--商品详情组件-->
		<ele-detail ref="food":food="selectedFood"></ele-detail>
		<!--购物车组件-->
		<ele-cart :foods="cartFoods" :fee="seller.deliveryPrice" :start="seller.minPrice"></ele-cart>
	</div>
</template>

<script>
	//引入data.json
	import data from '../../../data.json';
	//引入detail子组件
	import Detail from '../Detail/Detail';
	//引入添加购物车组件
	import Buy from '../Buy/Buy';
	//引入购物车组件
	import Cart from '../Cart/Cart';
	export default {
		name: 'Goods', //组件的
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [], //表示当前商家所有的商品
				current: 0, //表示当前是第几个分类
				selectedFood:{}//当前选中的商品
			}
		},
		created() {
			this.goods = data.goods;
		},
		mounted() {
			//在vue实例上，临时增加一个属性scrollFoods，不需要实现数据绑定，不用在data中设置
			this.scrollFoods = new IScroll("#list", { click: true });
			new IScroll(".menu", { click: true });

			//在scrollFoods上注册事件
			this.scrollFoods.on('scrollEnd', () => {
				console.log(this.scrollFoods.y);
			});
		},
		methods: {
			selectCat(index) {
				// alert(index);
				//获取右边所有的dl，
				let dls = this.$refs.list.getElementsByTagName('dl');
				//滚动到对应的dl
				this.scrollFoods.scrollToElement(dls[index]);
				//改变当前分类，设置current
				this.current = index;
			},
			showDetail(food){
				//调用子组件对象的showFood方法
				this.$refs.food.showFood();
				//设置selectedFood的值
				this.selectedFood=food;
			}
		},
		components: {
			'ele-detail': Detail,
			'ele-buy':Buy,
			'ele-cart':Cart
		},
		computed:{
			cartFoods(){
				let arr=[];
				this.goods.forEach((item)=>{
					//item是指分类对象，还需要遍历
					item.foods.forEach((item2)=>{
						//item2就是指每一个food
						if(item2.count){
							arr.push(item2);
						}
					})
				});
				return arr;
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods {
		display: flex;
		position: absolute;
		left: 0;
		right: 0;
		top: 174px;
		bottom: 48px;
		overflow: hidden;
		.menu {
			min-width: 80px;
			flex-basis: 80px;
			li {
				height: 54px;
				display: flex;
				align-items: center;
				font-size: 12px;
				color: rgb(77, 85, 93);
				padding: 0 12px;
				background: #f3f5f7;
				&.on {
					background: #fff;
				}
			}
		}
		.list {
			flex-grow: 1;
			dl {
				margin-bottom: 0;
			}
			dt {
				height: 26px;
				line-height: 26px;
				background: #f3f5f7;
				font-size: 12px;
				color: rgb(147, 153, 159);
				border-left: 2px solid #d9dde1;
				padding-left: 14px;
			}
			dd {
				margin: 18px;
				padding-bottom: 10px;
				border-bottom: 1px solid rgba(7, 17, 27, .1);
				position: relative;
			}
			.food-container {
				display: flex;
				img {
					width: 57px;
					height: 57px;
					margin-right: 10px;
				}
				.food-info {
					flex-grow: 1;
					h3 {
						font-size: 14px;
						color: rgb(7, 17, 27);
						line-height: 14px;
						margin-bottom: 0;
						margin-top: 0;
					}
					.desc,
					.sale {
						font-size: 10px;
						color: rgb(147, 153, 159);
						margin: 8px 0;
					}
					.price {
						strong {
							color: rgb(240, 20, 20);
							font-size: 14px;
							font-weight: bold;
						}
						del {
							font-size: 10px;
							color: rgb(147, 153, 159);
						}
					}
				}
			}
		}
	}
</style>