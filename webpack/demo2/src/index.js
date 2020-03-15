import _ from 'lodash';
import './style.css';
import printMe from './print.js'
function component() {
  var element = document.createElement('div');
  var btn=document.createElement("button");
  
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
  btn.innerHTML="click me and check the console!";
  btn.onclick=printMe;
  element.appendChild(btn);
  return element;
}
let element=component();
document.body.appendChild(element);


if (module.hot) {
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
     //printMe();
     document.body.removeChild(element);
     element=component();
     document.body.appendChild(element);
   })
 }
