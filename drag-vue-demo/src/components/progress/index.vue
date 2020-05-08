<template>
	<div>
			<span class="text">{{text}}</span>
			<div :style="customStyle" class="progress"></div>
	</div>
</template>
<script>
export default {
  name: 'custom-Progress',
  props: {
    customStyle: Object,
    text: String
  }
}
</script>
<style lang="scss" scoped>
.progress {
	// display: inline-block;
	// width: 80%;
	// vertical-align: middle;
}
.text {
	font-weight: bold;
	background: #f8f8f9;
}
</style>
