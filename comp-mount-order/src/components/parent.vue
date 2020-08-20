<template>
	<div>
		<SyncChild>
			<SlotChild v-for="item in [1,2,3,4]" :key="item" :index="item">
				{{item}}
			</SlotChild>
		</SyncChild>
		<AsynChild>

		</AsynChild>
	</div>
</template>

<script>
import SyncChild from './syncChild';
import SlotChild from './slotChild';
export default {
	data() {
		return {};
	},
	components: {
		SyncChild,
		SlotChild,
		AsynChild: () => import('./asyncChild'),
	},
	methods: {},
	created() {},
	mounted() {
		console.log('我是父组件');
	},
};
</script>
<style lang='scss' scoped>
</style>