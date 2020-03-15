var  { file, parse }=require('./globals.js');

function component(){
	var element=document.createElement("div");
	element.innerHTML=join(["Hello ","Webpack"],"");
	console.log(file+","+parse());
	this.alert('Hmmm, this probably isn\'t a great idea...')
	return element;
}
document.body.appendChild(component());
 fetch('https://jsonplaceholder.typicode.com/users')
   .then(response => response.json())
   .then(json => {
     console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
     console.log(json)
   })
   .catch(error => console.error('Something went wrong when fetching this data: ', error))