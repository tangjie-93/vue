<template>
	<button @click="change">count is: {{ count }}</button>
	<p>{{name}}</p>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs, onMounted, watch,getCurrentInstance } from 'vue';
export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true,
		},
	},
	setup: () => {
		const instance=getCurrentInstance();
		const count = ref(0);
		const state = reactive({
			name: 'james',
			age: 18,
		});
		function change() {
			count.value++;
			instance!.appContext.config.globalProperties.$message({
				title:"自定义弹出框",
				content:"fer",

			})
		}

		onMounted(() => {
		
			watch(count, () => {
				console.log(count.value);
			});
		});
		return { ...toRefs(state),count,  change };
	},
});
</script>
