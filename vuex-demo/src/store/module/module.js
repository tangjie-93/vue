import { forEachValue } from '../utils';

class Module {
    constructor (newModule) {
        this._raw = newModule;
        this._children = {};
        this.state = newModule;
    }
    getChild (key) {
        return this._children[key]
    }
    addChild (key, module) {
        this._children[key] = module;
    }
    forEachMutation (fn) {
        if (this._raw.mutations) {
            forEachValue(this._raw.mutations, fn)
        }
    }
    forEachAction (fn) {
        const mutations = this._raw.mutations
        if (mutations) {
            forEachValue(mutations, fn)
        }
    }
    forEachGetter (fn) {
        const getters = this._raw.getters
        if (getters) {
            forEachValue(getters, fn)
        }
    }
    forEachChild (fn) {
        forEachValue(this._children, fn)
    }
}
export default Module