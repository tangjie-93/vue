// 任务：
// 1. 数据响应式：是data选项中的对象编程响应式的
// 2. 模板编译：对模板解析，找到其中动态绑定（即依赖关系），初始化他们并创建更新函数

// 数据响应式：
// Object.defineProperty()

const originalProto=Array.prototype
//备份,进行修改,不能直接修改原型
const arrayProto=Object.create(originalProto)

const arrayMethods=['push','pop','shift','unshift','splice','sort','reverse'];
arrayMethods.forEach(method=>{
 // cache original method   
//  arrayProto[method]=function(){

//     originalProto[method].apply(this,arguments)
//     console.log(method)
//  }
  const original = arrayProto[method];

  def(arrayProto, method, function() {
    var args = [], len = arguments.length;
    while ( len-- ) 
    {
      args[ len ] = arguments[ len ]
    };
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
})

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
function defineReactive(obj, key, val) {
   // 创建Dep实例，他和key一对一对应关系
   const dep = new Dep()
  // val可能还是对象，此时我们需要递归
  let childOb=observe(val)
  // 参数3是描述对象
  Object.defineProperty(obj, key, {
    get() {
      // console.log('get', key);
      // 依赖收集:Dep.target就是当前新创建Watcher实例
      if(Dep.target){
        dep.addDep(Dep.target)
        if (childOb) {  // 只有对象或数组才有返回值
          childOb.dep.addDep(Dep.target)  // 手动依赖管理器收集依赖
          if (Array.isArray(val)) {  //如果是数组
            dependArray(val) // 将数组每一项包装为响应式
          }
        }
      }
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        // 防止newVal是对象，提前做一次observe
        observe(newVal)
        val = newVal

        // 通知更新
        dep.notify()
      }
    }
  })
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  let ob;
  if (hasOwn(obj, '__ob__') && obj.__ob__ instanceof Observer) {
    ob=obj.__ob__;
  }else{
    ob=new Observer(obj)
  }
  // 响应式
  return ob;

}

// Observer: 辨别当前对象类型是纯对象还是数组，从而做不同响应式操作
class Observer {
  constructor(value) {
    this.value = value
    this.dep=new Dep();
    //用于更新数组
    def(value, '__ob__', this);
    // 辨别类型
    if (Array.isArray(value)) {
      var hasProto = '__proto__' in {};
      if(hasProto){
        value.__proto__=arrayMethods;
      }else{
        const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
        copyAugment(value, arrayMethods, arrayKeys);
      }
     
      this.observeArray(value);
      // todo
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    // 对象响应式
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
  observeArray(items){
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

// KVue：解析选项，响应式、编译等等
class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.$methods=options.methods
    // 对data选项做响应式处理
    observe(this.$data)

    // 代理 data
    this._proxy(this.$data)
    // 代理方法
    this._proxy(this.$methods)

    // 执行编译
    new Compile(options.el, this)
  }
  //私有方法，用于数据劫持
  _proxy(data) {
    Object.keys(data).forEach(key => {
      // 为当前实例做代理，定义一些key和data相对应
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    })
  }
}

// Compile: 遍历视图模板，解析其中的特殊模板语法为更新函数
// new Compile(el, vm)
class Compile {
  constructor(el, vm) {
    // el:宿主元素选择器
    // vm:KVue的实例
    this.$vm = vm;
    this.$el = document.querySelector(el)

    // 执行编译
    this.compile(this.$el)
  }

  compile(el) {
    // 遍历子元素，判断他们类型并做响应处理
    el.childNodes.forEach(node => {
      // 判断类型
      if (node.nodeType === 1) {
        // 元素节点
        // console.log('编译元素', node.nodeName);
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // 文本节点
        // console.log('文本节点', node.textContent);
        // double kill
        this.compileText(node)
      }

      // 递归子节点
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 是否插值绑定
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 绑定表达式解析
  compileText(node) {
    // 获取匹配表达式 RegExp.$1,比如counter， vm['counter']
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  // 编译元素节点：判断指令和事件
  compileElement(node) {
    // 获取属性
    const attrs = node.attributes

    Array.from(attrs).forEach(attr => {
      // k-text="counter"
      // attr是一个对象{name:'k-text', value: 'counter'}
      const { name, value } = attr
      // 判断是否是指令
      if (name.indexOf('k-') === 0) {
        // 截取指令
        const dir = name.substring(2)
        // 指令指令
        this[dir] && this[dir](node, value)
      }
      // 判断是否是事件 @
      else if(name.indexOf('@') === 0) {
        const eventName=name.substring(1);
        this.on(node,this.$vm,value,eventName)
      }
    })
  }

  // k-text文本更新
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }
  model(node,exp){
    this.update(node, exp, 'model')
    node.addEventListener('input',e=>{
        const value=e.target.value;
        this.$vm[exp]=value
    })
  }
  // update方法，高阶函数：除了执行dom操作，创建一个额外watcher实例
  // dir是指令名称
  update(node, exp, dir) {
    // 获取更新方法
    const fn = this[dir + 'Updater']
    // 初始化，让用户看到首次渲染结果
    fn && fn(node, this.$vm[exp])

    // 创建watcher实例
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }

  // dom执行方法
  textUpdater(node, value) {
    node.textContent = value
  }

  htmlUpdater(node, value) {
    node.innerHTML = value
  }
  modelUpdater(node, value){
    node.value = value
  }
  on(node,vm,exp,eventName){
    node.addEventListener(eventName,e=>{
        //调用call将vm实例(this)传到方法中去
        vm[exp].call(vm,e);
    })
  }
 
}

// Watcher: 管理依赖，执行更新
// const watchers = []
class Watcher {
  // vm是KVue实例
  // key是data中对应的key名称
  // fn是更新函数，他知道怎么更新dom
  constructor(vm, key, fn) {
    this.vm = vm
    this.key = key
    this.fn = fn

    // watchers.push(this)

    // 建立dep和watcher之间的关系
    Dep.target = this
    this.vm[this.key] // 读一下key的值触发其getter
    Dep.target = null
  }

  // 更新函数，由Dep调用
  update() {
    // 更新函数调用，设置上下文问KVue实例，传参是当前最新值
    this.fn.call(this.vm, this.vm[this.key])
  }

}

// Dep: 管理多个watcher实例，当对应key发生变化时，通知他们更新
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    // 添加订阅者，dep就是watcher实例
    this.deps.push(dep)
  }

  // 通知更新
  notify() {
    this.deps.forEach(w => w.update())
  }
}