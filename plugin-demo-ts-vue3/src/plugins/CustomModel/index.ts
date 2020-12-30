import { createVNode, render } from 'vue';
import type {App} from "vue";
import MessageConstructor from './index.vue'
const Message: any= function(options: any){
    const container = document.createElement('div')
    const vm = createVNode(
      MessageConstructor,
      options as any,
    )
    render(vm, container)
    document.body.appendChild(container);
}  
export default {
  install(app: App): void {
    app.config.globalProperties.$message = Message
  }
}

