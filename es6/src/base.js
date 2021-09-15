const { global } = require("core-js")

const getGlobal = function () {
  if (typeof window !== 'undefined') return window
  if (typeof self !== 'undefined') return self
  if (typeof global !== 'undefined') return global
  throw new Error('unable to locate global object')
}

console.log(`now global is ${getGlobal()}`)
// let和const
{
  let a = 10
  var b = 1
}

{
  let a = []
  for (let i = 0; i < 11; i++) {
    a[i] = () => {
      console.log(i)
    }
  }

  a[6]()
}


//块级作用域与函数声明
// 浏览器的 ES6 环境
function f() { console.log('I am outside!') }

(function () {

  f()
}())

/**
 * ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
 * 1.let只能出现在当前作用域的顶层
 *  2.严格模式下，函数只能声明在当前作用域的顶层 
 */

 {
  // if (true) let x = 1; // 报错
  // if (true) function f() {}  // 严格模式下报错
  const foo = Object.freeze({a: {}, b: 2})
  foo.a.a = {a: 3} 
  console.log(foo)
 }


/**
 * 变量的结构赋值
 * 1.数组的解构赋值 如果等号右边不是可遍历的结构Iterator,那么将会报错
 * 2.对象的解构赋值可以取到继承的属性
 * 3.字符串的解构赋值
 * 4.数值和布尔值的解构赋值
 * 5.函数的解构赋值
 * 
 */
console.log('/**-----------------变量解构赋值---------------- */')
{
  // let [x] = 1 // 报错
  let [a, b, c] = [1, 2, 3]
  console.log(a)

  function* fibs() {
    let a = 0
    let b = 1
    while (true) {
      yield a;
      [a, b] = [b, a + b]
    }
  }
  let [, , , , , sixth] = fibs()
  console.log('数组的解构赋值'+sixth)

  function f() {
    return 2
  }
  let [x = f()] = [1]  // x=1;
  let [xx = f()] = []  // xx=2;

  let [m=1, n=m] = [2]  // m=2; n=2

  // obj
  let obj = { first: 'hello', last: 'world' }
  let { first: ff, last: ll } = obj   // ff hello; ll world 

  const obj1 = {}
  const obj2 = { foo: 'bar' }
  Object.setPrototypeOf(obj1, obj2)
  const {foo} = obj1
  console.log(foo)

  // 字符串的解构赋值
  let { length } = 'hello world'  
  console.log(length)
  let { 4: fiveStr } = 'hello word'  //直接获取字符串的某个字符
  console.log(fiveStr)
  const getPostionStr = function (postion,str) {
    let { [n-1]:strs } = str
    return strs
  }
  console.log(getPostionStr(2, 'abcd'))

  let ss = 1
  let ww = 5;
  [ss, ww] = [ww, ss]
  console.log(ss,ww)
}

/**字符串的扩展
 * 1.字符的Unicode表示法
 * 2.字符串的遍历器接口
 * 3.直接输入 U+2028和U+2029
 * 4.JSON.stringify()的改造。可能返回不符合UTF-8标准的字符串，遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理
 * 5.模板字符串
 * 6.模板编译
 * 7.标签模板
 * 8.模板字符串的限制
 */
console.log('/**-----------------字符串的扩展---------------- */')
{
  "\u0061" // a
  "\uD842\uDFB7" //吉 
  for ( let x in 'wsdmn') {
    console.log(x)
  }
  //fromCharCode()
  let str = String.fromCodePoint(0x20BB7)  // 当str为大于0xFFFF的码点时for i循环不能正确识别这样的码点
  for (let i = 0; i < str.length; i++) {
    console.log(str[i])
  }

  for (let val of str) {
    console.log(val)
  }

  String.raw`Hi\n${2+3}`

  let s = '𠮷'
  console.log(s.codePointAt(),s.charCodeAt())

  // includes   startsWith()  endsWith() 

  // repeat()
  'hello'.repeat(5)
  // 'world'.repeat(Infinity)  // 参数不能为负数和Infinity 如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。
  // '!'.repeat(-1)

  s.padStart(5,'wsddfasdfa')
  s.padEnd(3,'ss')
  s.padStart(5)
  '1390144'.padStart(8,'0')
  '159'.padStart(8,'0')
  '2020-08-28'.padStart(10,'YYYY-MM-DD')

  let strings = ' sfdd sa  '
  strings.trim()
  strings.trimStart()
  strings.trimEnd()
  console.log(strings.matchAll())
}


/**数值的扩展
 * 1.二进制和八进制表示法
 * 2. Number.isFinite(), Number().isNaN()
 * 
 */
console.log('/**-----------------数值的扩展---------------- */')
{
  Number.isFinite(10)  // true
  Number.isFinite('10') // false
  isFinite('10')  // true
  Number.isNaN(NaN) // true
  Number.isNaN('NaN') // false
  isNaN('NaN')   // true
  Number.isNaN('10') // false

  parseInt('12.34')
  Number.parseInt('12.34')

  parseFloat('12.34')
  Number.parseFloat('12.34')

  Number.isInteger(25)  // true
  Number.isInteger('25') // false
  Number.isInteger(3.0000000000000002) // true
  Number.EPSILON === Math.pow(2.-52)  // true

  Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

  Number.MAX_SAFE_INTEGER === 9007199254740991  // true
  Number.MIN_SAFE_INTEGER === -9007199254740991  // true
  Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER  // true

  Number.isSafeInteger()   //  JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点）用来判断一个整数是否落在这个范围之内。

  Math.trunc()  //NaN //方法用于去除一个数的小数部分，返回整数部分。
  Math.trunc(1.2)  // 1
}

/**函数的扩展
 * 1.函数参数的默认值
 * 
 */
console.log('/**-----------------函数的扩展---------------- */')
{
  let obj = {a:1,b:2,axisLabel: {
    fontSize: 12,
    color: '#020F22'}}
  console.log({...obj,c:5,axisLabel:{fontSize: 15}})
}

// includes 
console.log('/**-----------------includes---------------- */')
{
  let arr = ['vue', 'react','angular']
  console.log(arr.indexOf('vue') !== -1)  // true
  console.log(~arr.indexOf('vue'))   // -1
  console.log(arr.includes('vue'))  // true

  //includes第二可选参数fromIndex，这对于优化是有好处的，因为它允许从特定位置开始寻找匹配。
  console.log(arr.includes('vue', 1))  // false

  //NaN
  let arryNaN = [1, 2, NaN]
  console.log(arryNaN.indexOf(NaN) !== -1)  // false
  console.log(arryNaN.includes(NaN))  // true
}


//Exponentiation Operator
{
  const calculateExponent = (base, exponent) => {
    return base * ((--exponent > 1) ? calculateExponent(base, exponent) : base)
  }
  
  console.log(calculateExponent(7, 2))
  console.log(Math.pow(7, 2))
}


//Generator
console.log('/**-----------------Generator---------------- */')
{
  function* generator () {
    yield hellow()
    yield 'generator next2'
    return 'generator next3'
  }
  
  function hellow () {
    return 'generator next1'
  }
  
  const gen = generator()
  console.log(gen.next())
  console.log(gen)
}


// async function test () {
//   let arr = [3,2,1]
//   await Promise.all(arr.map( async (item) => {
//    const res = await fetch(item)
//     console.log(res)
//   }))
//   console.log('end')
// }

async function test () {
  let arr = [1,2,3]
  await arr.reduce( async (total, item) => {
   const res = await fetch(item)
    console.log(res)
  }, '')
  console.log('end')
}

// async function test () {
//   let arr = [1,2,3]
//   await arr.forEach( async (item) => {
//    const res = await fetch(item)
//     console.log(res)
//   })
//   console.log('end')
// }

// async function test () {
//   let arr = [1, 2, 3]
//   for (const item of arr) {
//    const res = await fetch(item)
//    console.log(res)
//   }
//   console.log('end')
// }


function fetch(x) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(x)
    },x*1000)
  })
 }

 test()

 console.log(Object.values)


 class Counter {
constructor() {
  this.count = 0;
}

increment() {
  this.count++;
}
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);


const data = {
  name: 0, 
  children:[
    {name: 1, children: [{name: '1-1'},{name:'1-2'}]},
    {name: 2, children: [{name: '2-1'},{name:'2-2'}]}, 
    {name: 3, children: [{name: '3-1'},{name:'3-2'}]}
  ]
}
// 深度优先
let deepTraversal1 = (node, nodeList = []) => {
  if (node !== null) {
    nodeList.push(node)
    let children = node.children
    console.log(children)
    if (!children) return
    for (let i = 0; i < children.length; i++) {
      deepTraversal1(children[i], nodeList)
    }
  }
  return nodeList
};  
console.log(deepTraversal1(data, []))

const deepTraversal3 = (node) => {

}

console.log('1');
async function async1() {
    console.log('2');
    await async2();
    console.log('3');
}
async function async2() {
    console.log('4');
}

process.nextTick(function() {
    console.log('5');
})
async1()
setTimeout(function() {
    console.log('6');
    process.nextTick(function() {
        console.log('7');
    })
    new Promise(function(resolve) {
        console.log('8');
        resolve();
    }).then(function() {
        console.log('9')
    })
})

new Promise(function(resolve) {
    console.log('10');
    resolve();
}).then(function() {
    console.log('11');
});
console.log('12');

const test2 = (obj) => {
  console.log(obj?.name, obj.ages?.tody, obj.age?.name)
}

test2({name: 123, age: 27})
