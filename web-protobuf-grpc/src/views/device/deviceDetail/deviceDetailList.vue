<template>
  <div class="device_list_item">
    <span class="device_list_item_title">{{ name }}：</span>
    <span class="device_list_item_value">{{value}}</span>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scpoed>
$divWidth: 33.3%;
$titleWidth: 100px;
$titleheight: 24px;
$margeTop: 5px;
$titleColor: rgba(0, 0, 0, 0.447058823529412);
$valueColor: rgba(0, 0, 0, 0.647058823529412);
.device_list_item {
  width: $divWidth;
  height: $titleheight;
  line-height: $titleheight;
  margin: $margeTop 0;
  &_title {
    color: $titleColor;
    display: inline-block;
    width: $titleWidth;
  }
  &_value {
    color: $valueColor;
  }
}
</style>