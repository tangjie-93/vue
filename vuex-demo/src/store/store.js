import applyMixin from "./mixin"
import { forEachValue, partial } from "./utils"
let Vue;//用于存放调用install函数时传入的Vue
class Store {
    constructor (options) {
        this.$options = options
        this._mutations = options.mutations;
        this._actions = options.actions;
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this);
        let store = this;
        //使得可以通过在组件中可以用this.$store.getters来获取属性
        store.getters = {};
        const computed = {}
        forEachValue(options.getters, (fn, key) => {
            //将state转入 getters中,fn只的就是getters里面的方法，options.state就是参数state
            computed[key] = partial(fn, options.state);
            //使的getters响应式
            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key],
                enumerable: true
            })

        })
        //使state可响应
        this._vm = new Vue({
            data () {
                return {
                    $$state: options.state
                }
            },
            //挂载到this._vm实例上，使得getters直接可以在this._vm获取
            computed
        })
    }
    get state () {
        return this._vm._data.$$state
    }
    set state (value) {
        console.error('please use replaceState to reset state');
    }
    commit (type, payload) {
        const entry = this._mutations[type];
        if (entry) {
            entry(this.state, payload)
            return;
        }
        console.error('没有这个mutation');
    }
    dispatch (type, payload) {
        const entry = this._actions[type]
        if (entry) {
            entry(this, payload)
            return;
        }
        console.error('没有这个action');
    }
}

function install (_Vue) {
    Vue = _Vue;
    applyMixin(Vue);
}
export default {
    Store,
    install
}
