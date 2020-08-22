<script>
export default {
    name:"router-view",
    render(h) {
        //添加额外属性，用于标记为router-view组件，深度标记
        this.$vnode.data.routerView=true;
        let depth=0;
        let parent=this.$parent;
        //判断是否有父级
        while(parent){
            const vnodeData=parent.$vnode&&parent.$vnode.data;
            if(vnodeData){
                 //判断是否是routerView
                if(vnodeData.routerView){
                    depth++
                }
            }
           
            parent=parent.$parent
        }
       let component=null;
       const route=this.$router.matched[depth];
       if(route){
           component=route.component;
       }
        return h(component)
    }
}
</script>