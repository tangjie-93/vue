import applyMixin from "./mixin"
import { forEachValue, partial } from "./utils"
import ModuleCollection from "./module/module-collection"

let Vue;//用于存放调用install函数时传入的Vue
class Store {
    constructor (options) {
        this.$options = options;
        this.state = options.state;
        this._mutations = options.mutations;
        this._actions = options.actions;
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this);

        //使得可以通过在组件中可以用this.$store.getters来获取属性
        this._wrapGetters = {};
        //收集Module
        this._modules = new ModuleCollection(options)
        //注册Module

        installModule(this, this.state, [], this._modules.root);

        const computed = {}
        forEachValue(options.getters, (fn, key) => {
            //将state转入 getters中,fn只的就是getters里面的方法，options.state就是参数state
            computed[key] = partial(fn, options.state);
            //使的getters响应式
            Object.defineProperty(this._wrapGetters, key, {
                get: () => this._vm[key],
                enumerable: true
            })

        })
        //使state可响应
        this._vm = new Vue({
            data () {
                return {
                    //$开头的不会添加到实例上
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

function installModule (store, rootStore, path, module) {
    module.forEachMutation((mutation, key) => {
        store._mutations[key] = (store._mutations[key] || []);
        store._mutations[key].push((payload) => {
            mutation.call(store, module.state, payload)
        })
    })
    module.forEachAction((action, key) => {
        store._actions[key] = (store._actions[key] || []);
        store._actions[key].push((payload) => {
            action.call(store, module, payload)
        })
    })
    module.forEachGetter((getter, key) => {
        store._wrapGetters[key] = (store._wrapGetters[key] || []);
        store._wrapGetters[key].push((payload) => {
            getter.call(store, module, payload)
        })
    })
    module.forEachChild((child, key) => {

    })
}

function install (_Vue) {
    Vue = _Vue;
    applyMixin(Vue);
}
export default {
    Store,
    install
}
