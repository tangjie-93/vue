<template>
  <div id="app">
   
   <input type="button" value="增加" @click="increment"/>
   <input type="button"value="减少"@click="decrement"/> 
   <input type="button" value="偶数才能点击"@click='clickEven' />
   <input type="button" value="异步添加"@click="addasync"/>
   <input type="button" value="暂停异步"@click="stopasync"/>
   <div>现在的数字为:{{count}},它现在是{{status}}</div>
  </div>
</template>

<script>
	import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
	computed:{
		...mapGetters(['count','status']),
	},
  methods:{
  	...mapMutations(['increment','decrement','clickEven']),
  	...mapActions(['addasync','stopasync']),
  }
  
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
