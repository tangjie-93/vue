<template>
	<div class="hello">
		<div>count:{{count}}</div>
		<div>doubleCount:{{doubleCount}}</div>
		<button @click="add">同步递增</button>
		<button @click="asyncAdd">异步递增</button>
	</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed:{
    count(){
      return this.$store.state.count
    },
    doubleCount(){
      
      return this.$store.getters.doubleCount
    }
  },
  methods:{
    add(){
      this.$store._mutations.add(this.$store.state)
      console.log(this.$store);
      // this.$store.commit('add')
    },
    asyncAdd(){
      this.$store.dispatch('add')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
