<template>
  <ContextMenu :styleObj='styleObj' :menuData="contextMenuData" v-if="showContextMenu" @closeContextMenu='showContextMenu=false' />
</template>

<script>
import { onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import ContextMenu from './components/contextMenu/index.vue'

export default {
  name: 'App',
  components: {
    ContextMenu
  },
  setup(){
    const state=reactive({
      showContextMenu:false,
      contextMenuData:[
                {
                    text:'111',
                    callBack(){},
                },
                {
                    text:'222',
                    callBack(...args){console.log(args)},
                    children:[
                        {
                            text:'222-1',
                             callBack(...args){console.log(args)},
                        },
                         {
                            text:'222-2',
                            callBack(...args){console.log(args)},
                            children:[
                                {
                                    text:'222-2-1'
                                }
                            ]
                        },
                        {
                            text:'222-3',
                        },
                        {
                            text:'222-4',
                        },
                    ]
                }
            ],
      styleObj:null
    })
    const showContextMenu=(event)=>{
      //禁用默认事件和阻止冒泡
      event.stopPropagation();
      event.preventDefault();
      state.showContextMenu=true;
      state.styleObj={
        left:event.clientX+ "px",
        top:event.clientY+'px'
      }
    }
    onMounted(()=>{
      window.addEventListener('contextmenu',showContextMenu)
    })
    onBeforeUnmount(()=>{
      window.removeEventListener('contextmenu',showContextMenu)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>

</style>
