<script>
export default {
    name:'router-link',
    props:{
            to:{
                type:String,
                default:"",
            }
        },
        render(h) {
            //参数1四标签 参数2是各种属性
            return h('a',{
                attrs:{
                    href:"#"+this.to
                }
            },this.$slots.default)
        },
}
</script>