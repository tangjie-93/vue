<template>
   <ul class="list-container">
       <li v-for="(item,index) in listData" 
            :key="index" class="list-item" 
            @click.prevent.stop="handleClick($event,item)"
            @mouseover="childrenMenuIndex=index"
            >
           <span class="list-item_span">
               {{item.text}}
           </span>
           <CaretRightOutlined v-if="item.children"  />
           <!-- 判断是否需要调用自身 -->
           <div v-if="item.children&&childrenMenuIndex===index"
            class="context-menu context-menu_children"
           >
           <!-- 在组件自身内部调用自身 -->
            <list-comp :list-data='item.children' @hideContextMenu='hideContextMenuEvent' />
           </div>
       </li>
   </ul>
</template>

<script>
import { defineComponent, ref, onBeforeUnmount, onMounted  } from "vue";
import {CaretRightOutlined} from '@ant-design/icons-vue';
export default defineComponent({
    name:'list-comp',
    props:{
        listData:{
            type:Array,
            default:()=>[]
        }
    },
    components:{
        CaretRightOutlined
    },
    emits:[
        "hideContextMenu"
    ],
    setup(props,{emit}){
        const handleClick=(event,{callBack})=>{
            console.log(222);
            emit('hideContextMenu');
            if(callBack){
                callBack();
                return;
            }
        }
        //这里需要注意
        //在组件自身内部，也需要接收在组件内部通过emit出发的事件，不然递归组件内部的组件本身发出的事件，不会被监听到
        const hideContextMenuEvent=()=>{  
            emit('hideContextMenu');    
        }
        const childrenMenuIndex=ref(-1);
        const eventNames=['click','contextmenu'];
        onMounted(()=>{ 
            eventNames.forEach(eventName=>window.addEventListener(eventName,hideContextMenuEvent))
        })
        onBeforeUnmount(()=>{
            eventNames.forEach(eventName=>window.removeEventListener(eventName,hideContextMenuEvent))
        })
        return {
            // listData,
            handleClick,
            childrenMenuIndex,
            hideContextMenuEvent
        }
    }
})
</script>
<style lang='less' scoped>
    .list-container{
        list-style:none;
        padding: 0;
        margin: 0;
         .list-item{
            display: flex;
            align-items: center;
            position:relative;
            line-height: 1.5;
            padding: 0 5px;
            white-space: pre;
            &:hover{
                background-color: #3333;
            }
            &_span{
                flex: 1;
                height: 2em;
                line-height: 2em;
                padding-left: 10px;
                vertical-align: middle;
                cursor: pointer;
            }
            .context-menu_children{
                position: absolute;
                top: 0;
                left: 100%;
                border: 1px solid lightgray;
                min-width: 200px;
                cursor: default;
                background-color: #fff;
                background-clip: #fff;
                border: 1px solid rgba(0,0,0,0.15);
                border-radius: 0.25rem;
            }
        }
        .list-item:hover{
             background-color: #3333;
        }
    }
   
</style>