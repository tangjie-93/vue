<h3>1、vue双向绑定的实现</h3>

const Vue=(function(){
    class Observer{
        constructor(value){
            this.value=value;
            this.walk(value);
        };
        walk(value){
            Object.keys(value).forEach(key=>{
                this.convert(key,value[key]);
            })
        };
        convert(key,value){
            defineReactive(this.value,key,value);
        };
    }
    function defineReactive(value,key,val){
        let dep=new dep();
        observe(val);
        Object.defineProperty(value,key,{
            configurable:true,
            enumerable:true,
            get(){
                if(Dep.target){
                    dep.depend();
                }
                return val;
            },
            set(newVal){
                if(val!==newVal){
                    val=newVal;
                    observe(val);
                    dep.notice();
                    return val;
                }
            }
        })

    }
    function observe(val){
        if(!val||typeof val !=="object"){
            return;
        }
        return new Observer(val);
    }
    //消息管理者
    let uid=0;
    class Dep{
        constructor(){
            this.id=uid;
            this.watcherList=[];
        };
        depend(dep){
            Dep.target.addDep(dep)
        };
        addWatcher(watcher){
            this.watcherList.push(watcher)
        };
        notice(){
            this.watcherList.forEach(watcher=>{
                watcher.update();
            })
        }
    }
    Dep.target=null;
    class Watcher{
        constructor(vm,prop,cb){
            this.depIds={};
            this.vm=vm;
            this.prop=prop;
            this.cb=cb;
            this.value=this.get();
        };
        update(){
            this.run();
        };
        addDep(dep){
           if(!depIds.hasOwnProperty(dep.id)){
               depIds[dep.id]=dep;
           }
        };
        run(){
            let val=this.get();
            if(this.value!==val){
                this.value=va;
                this.cb.call(this.vm,val);
            }
        };
        get(){
            Dep.target=this;
            let val=this.vm._data[this.prop];
            return val;
        }
    }
    class Vue{
        constructor(option={}){
            this.$options=option;
            let data=(this._data=this.$options.data);
            Object.keys(data).forEach(key=>{
                this._proxy(key);
            })

        };
        $watch(prop,callBack){
            new Watcher(this,prop,callBack);
        };
        _proxy(key){
            Object.defineProperty(this,key,{
                configurable:true,
                enumerable:true,
                get(){
                    return this._data[key];
                },
                set(val){
                    this._data[key]=val;
                }
            })
        }
    }
    return Vue;
})()

