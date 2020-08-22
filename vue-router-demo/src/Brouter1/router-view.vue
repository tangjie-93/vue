<script>
export default {
    name:"router-view",
    render(h) {
        const {current,routeMap}=this.$router;
        const component=routeMap[current]?routeMap[current].component:null
        return h(component)
    }
}
</script>