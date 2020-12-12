import { createVNode, render } from 'vue';
import type {App} from "vue";
import MessageConstructor from './index.vue'
const body=document.body;
const Message: any= function(options: any){
  const modelDom=body.querySelector(`.container_message`)
    if(modelDom){
      body.removeChild(modelDom)
    }
    options.visible=true;
    const container = document.createElement('div')
    container.className = `container_message`
    const vm = createVNode(
      MessageConstructor,
      options,
    )
    render(vm, container)
    console.log(vm,container);
    document.body.appendChild(container);
}  
export default {
  install(app: App): void {
    app.config.globalProperties.$message = Message
  }
}

