import A from "./a"
export default class B extends A{
    constructor(){
        super()
    }
    test(){
       super.test();
        console.log("B")
    }
}