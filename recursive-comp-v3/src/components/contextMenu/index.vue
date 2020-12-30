<template>
    <teleport to='body' >
        <div class="content-menu_container" :style="styleObj">
            <list-comp 
                :list-data='menuData'
                @hideContextMenu='windowClickHandler'
             />
        </div>
    </teleport>
</template>
 
<script>
import { defineComponent } from "vue";
import ListComp from "./list-comp.vue"
export default defineComponent({
    name:"contextMenu",
    components:{
        ListComp
    },
    props:{
        styleObj:{
            type:Object,
            default:()=>{}
        },
        menuData:{
            type:Array,
            default:()=>[]
        }
    },
    emits:['closeContextMenu'],
    setup(props,{emit}){
        const windowClickHandler=()=>{
            console.log('closeContextMenu');
            emit('closeContextMenu')
        };
        return {
            windowClickHandler,
        }
    }
})
</script>
<style scoped>
.content-menu_container{
    padding: 10px 0;
    position: absolute;
    border: 1px solid lightgray;
    min-width: 200px;
    background-color: #fff;
    background-clip: #fff;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 0.25rem;
}
</style>