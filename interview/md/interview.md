1. html和js通过什么交互的？ 什么是事件流？ 捕获，冒泡，事件委托， event loop 如何理解

2. js原型链，顺带说一下new 操作符调用构造函数发生了什么，手写new过程, 原型继承和class继承的区别
function f() { this.foo = 1;}  
function s() { this.bar = 2; }  
s.prototype = new f(); 
var son = new s();
(son.constructor == s) //输出结果
3.  /** 如何改变能够按期望输出0 1 2 3 4，为什么
 * 把下面的var i 改成 let i
 * 这样就会形成一个块级作用域（顺带讲下es6以前的作用域概念）
 */
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
4. /**下列执行顺序
const date = new Date()
setTimeout(()=>{
  console.log(new Date() - date)
}, 500)
let a = 0
while(new Date()-date < 3000){
  a++;
}

5. 待定浏览器垃圾回收机制？
6. 平常用到的js设计模式， 观察者模式和发布订阅模式的区别
7. 做前端考虑什么安全问题，怎么解决这些问题
8. 对于前端工程化的理解
9. 对于加班的看法