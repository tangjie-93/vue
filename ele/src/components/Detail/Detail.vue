<template>
	<transition name="fade">
		<div class="detail" v-show="show">
			<div class="detail-hd">
				<img :src="food.image" alt="">
				<div @click="show=false" class="back"> < </div>
			</div>
		<div class="detail-bd">
			<div class="food-basic">
				<h2>{{food.name}}</h2>
				<p class="sale"><span>月售{{food.sellCount}}</span> <span>好评率{{food.rating}}</span></p>
			<p class="price"><strong>￥{{food.price}}</strong> <span v-if="food.oldPrice">￥{{food.oldPrice}}</span></p>
			</div>
		</div>
	</div>
	</transition>
	
</template>

<script>
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				show:false
			}
		},		
		methods:{
			showFood(){
				this.show=true;
			}
		}
	}
</script>

<style lang="less" scoped>
/*过渡动画设置*/
.fade-enter-active,.fade-leave-active{
	transition:all 0.4s;
}
.fade-enter,.fade-leave-active{
	transform: translateX(100%);
	/*向右移动整个宽度*/
	opacity: 0;
}
.detail{
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	bottom: 48px;
	background: #fff;
}
.detail-hd{
	height: 375px;
	position: relative;
    img{
    	width:100%;
    	height: 100%;
    }
    .back{
    	position: absolute;
    	left: 10px;
    	top: 10px;
    	color:#fff;
    	font-size: 32px;
    }
}
</style>