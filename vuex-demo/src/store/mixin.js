export default function (Vue) {
    Vue.mixin({
        beforeCreate: vuexInit
    })

    function vuexInit () {
        const store = this.$options.store
        //方案1 判断是否是根组件
        if (store) {
            Vue.prototype.$store = store;
        }
        //方案2 官方
        // if (this.$options.store) {
        //     this.$store = store;
        // } else if (this.$parent && this.$parent.$store) {
        //     this.store = this.$parent.$store
        // }
    }
}