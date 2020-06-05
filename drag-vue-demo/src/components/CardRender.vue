<template>
    <div class="render-container">
        <!-- {{item.data.data}} -->
        <template v-if="item.displayType!=='table'">
            <Chart
                :optionData="item.data"
                :index='item.i'
                :type="item.displayType"
            />
        </template>
      
        <template v-else>
            <Table :columns="item.data.columns" :data="item.data.data"></Table>
        </template>
    </div>
</template>

<script>
export default {
    name: 'CradRender',
    props: {
        item: Object
    },
    components: {
        Chart: () => import('./charts')
    }
}
</script>
<style lang="scss" scoped>
    .render-container{
        width: 100%;
        height: calc(100% - 30px);
    }
</style>
