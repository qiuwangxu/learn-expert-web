export {}

/**手写new过程 */
console.log('######手写new start#####')
const my_new = function (fn:any, ...arg:any[]) {
  const obj = Object.create(fn.prototype)
  const result = fn.call(obj, ...arg)
  return result instanceof Object ? result : obj
}
function person (this: any, name:string, age:number) {
  this.name = name
  this.age = age
}
person.prototype.eat = function () {
  console.log(`我是${this.name}今年${this.age}岁了，我很会吃饭`)
}
const person1 = my_new(person, 'daidai', 20)

console.log(person1)
console.log('######手写new end#####')

/**js实现map方法 */
Array.prototype.forkmap = function (fn, thisArg) {
  const arr = this
  const result = []
  for (let i=0; i < arr.length; i++) {
    result.push(fn.call(thisArg, arr[i], i, arr))
  }
  return result
}

Array.prototype.forkmap2 = function (fn, thisArg) {
  return this.reduce(function (pre, cur, index, arr) {
    pre.push(fn.call(thisArg, cur, index, arr))
    return pre
  }, [])
}

console.log([1,2].forkmap2(function(this:any,item, index, arr){
  console.log(index, arr, this)
  return item * item
}, {name: 'adai'}))

/**实现一个批量请求函数 multiRequest(urls, maxNum)，
 * 要求最大并发数 maxNum，每当有一个请求返回，就留下一个空位，
 * 可以增加新的请求，所有请求完成后，结果按照 urls 里面的顺序依次打出。
*/
const request = (url:string) => {
  return new Promise((resolve, reject)=>{
    if (Math.floor(Math.random() * 10) === 2) {
      reject(url)
    }else {
      setTimeout(()=>{
        resolve(url)
      }, Math.floor(Math.random() * 10) * 100)
    }
  })
}
const multiRequest = (urls: string[], maxNum:number) => {
  return new Promise((resolve)=>{
    let stackNum = 0
    const _urls = [...urls]
    const reqlsit: {[prop:string]: any} = {}
    const reslsit:any[] = []
    const next = (url?:string) => {
      let path:any
      if (url) {
        path = url
      } else {
        if(stackNum >= maxNum || _urls.length == 0) return
        path = _urls.shift()
        stackNum++
      }
      request(path).then((res)=>{
        stackNum--
        reqlsit[path] =  res
        if (stackNum === 0 && _urls.length == 0) {
          for (let i=0; i < urls.length;i++) {
            reslsit.push(reqlsit[urls[i]])
          }
          resolve(reslsit)
        } else {
          next()
        }
      }).catch((err) => {
        next(err)
      })
    }
    while (stackNum < maxNum) {
      next()
    }
  })
}

const multiRequest2 = (urls:string[], maxNum = 3) => {
  return new Promise<Array<any>>((resolve, reject) => {
    const quee:any[] = []
    const _urls = [...urls]
    const reslt:any[] = []
    const reqobj: {[prop:string]:any} = {}
    const next = (url?:string) => {
      let path:any
      if (url) {
        path = url
      }else {
        if (quee.length >= maxNum || _urls.length == 0) return
        path = _urls.shift()
        quee.push(path)
      }
      request(path).then(res => {
        quee.splice(quee.indexOf(path), 1)
        reqobj[path] = res
        if (quee.length === 0 && _urls.length === 0) {
          for (let i=0; i< urls.length; i++) {
            reslt.push(reqobj[urls[i]])
            resolve(reslt)
          }
        }else{
          next()
        }
      }).catch(err=>{
        next(err)
      })
    }
    while (quee.length < maxNum) {
      next()
    }
  })
}
multiRequest2(['a','b','c','d','e','f'], 3).then((res) => {
  console.log(res)
})


// /**阻止事件冒泡和阻止默认事件 */
// const stopBubble = function (e:Event) {
//   if (e&&e.stopPropagation) {
//     e.stopPropagation()
//   } else {
//     (window.event as any).cancelBubble = true
//   }
// }

// const preventDefault = function (e:Event) {
//   if (window.event) {
//     window.event.returnValue = false
//   } else {
//     e.preventDefault()
//   }
// }


/**js 插入大量dom优化，渲染1万条数据 */
const renderList = (el:HTMLElement, data: string|number[]) => {
  const totalNum = data.length
  const pageSize = 200
  const pageCount = Math.ceil(totalNum/pageSize)
  for (let i =0; i < pageCount; i++) {
    let list:string|number[] = []
    if (pageSize*(i+1) <= totalNum) {
      list = data.slice(i*pageSize, pageSize*(i+1))
    }else{
      list = data.slice(i*pageSize)
    }
    window.requestAnimationFrame(()=>{
      loop(el,list)
    })
  }
}
const loop = (el:HTMLElement, data: string | any[]) => {
  const Fargment = document.createDocumentFragment()
  for (let i = 0; i<data.length; i++) {
    const li = document.createElement('li')
    li.innerText = data[i]
    Fargment.appendChild(li)
  }
  el.appendChild(Fargment)
}
const app:any = document.getElementById('app')
const data = Array.from(new Array(999), (item,index)=>{return index})
renderList(app, data)


/**原型链 */
console.log('######prototype start#####')
const cat = function (this:any, bradn:string) {
  this.brand = bradn
}
cat.prototype.run = function () {
  console.log(`${this.brand}跑的很快`)
}
const bmw = new (cat as any)('bmw')
console.log(bmw.__proto__ === cat.prototype)
console.log(Object.getPrototypeOf(bmw) === cat.prototype)
console.log(cat.prototype.constructor === cat)
console.log(cat.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.constructor === Object)
console.log((Object.prototype as any).__proto__ === null)

console.log('######prototype end#####')


/** typescript泛型的理解，内置方法的具体实现，具体怎么实现的
 * 泛型是ts中创建可复用代码组件的工具，这个组件不是只能被一种类型使用，而是能被多种类型复用。
 * 类似于参数的作用。
 * 泛型是增强类，类型，接口可靠的手段。
 * keyof 能够取得 key
 */
type myPartial<T> = { [K in keyof T]?: T[K] }


/**promise then怎么实现的链式调用，
 * 怎么优雅的实现链式调用，一个类，
 * 怎么去添加链式调用方法 */
console.log('######promise start#####')

// promise能实现链式调用的原因是因为then方法返回的就是一个promise
class Sum {
   [prop: string]: any
   value = 1
   add () {
     this.value++
     return this
   }
   subtract () {
     this.value --
     return this
   }
   addMethod (name: string, fn:Function) {
     this[name] = fn
     return this
   }
}
const sum = new Sum()
sum.addMethod('haha', function(this:any){
  console.log('我是动态添加方法---haha')
  return this
})
console.log('实现链式调用----',sum.haha().add().add().value)

/**await 后面跟promsie 如果直接rejetc不catch的话是会直接报错，不执行下面的代码的  */
async function test () {
  console.log('1')
  await new Promise((resolve, reject) => {
    reject(2)
  }).catch(err=>console.log(err))
  console.log('2')
}
test()

/**手写promise */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class _Promise {
  private status: string
  private value: string | undefined
  private reason: string | undefined
  private resolveCallbacks: Array<Function>
  private rejectCallbacks: Array<Function>
  constructor (executor:Function) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    const resolve = (value:any) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.resolveCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason:any) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    }catch (err) {
      reject(err)
    }
  }

  private resolvePromise (_promise:any, callback:any, reslove:Function, reject:Function) {
    if (_promise === callback) return reject(new TypeError('不能循环调用promise'))
    let called = false
    if (typeof callback === 'object' && callback !== null || typeof callback === 'function') {
      try {
        const then = callback.then()
        if (typeof then === 'function') {
          then.call(callback, (r:any)=>{
            if (called) return
            called = true
            this.resolvePromise(_promise, r, reslove, reject)
          }, (e:any)=>{
            if (called) return
            called = true
            reject(e)
          })
        }else {
          reslove (callback)
        }
      }catch (e) {
        if (called) return
        called = true
        reject(e)
      }
    } else {
      reslove(callback)
    }
  }

  then (onResolve?:any, onReject?:any) {
    const onResolves = typeof onResolve === 'function' ? onResolve : (v:any) => v
    const onRejects = typeof onReject === 'function' ? onReject : (err:any) => {throw err}
    const _promise2 = new _Promise ((resolve:any, reject:any) => {
      if (this.status === PENDING) {
        this.resolveCallbacks.push(()=> {
          setTimeout(() => {
            try {
              const callback = onResolves(this.value)
              this.resolvePromise(_promise2, callback, resolve, reject)
            }catch (e) {
              reject(e)
            }
          })
        })

        this.rejectCallbacks.push(()=>{
          setTimeout(() => {
            try {
              const callback = onRejects(this.status)
              this.resolvePromise(_promise2, callback, resolve, reject)
            }catch (e) {
              reject(e)
            }
          })
        })
      }

      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const callback = onResolves(this.value)
            this.resolvePromise(_promise2, callback, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const callback = onRejects(this.reason)
            this.resolvePromise(_promise2, callback, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return _promise2
  }
}

class myPromise {
  private status: string
  private value: string | undefined
  private reason: string | undefined
  private resolveCallbacks: Array<Function>
  private rejectCallbacks:  Array<Function>

  constructor(exectur: Function) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    const reslove = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.resolveCallbacks.forEach(fn=>fn())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectCallbacks.forEach(fn=>fn())
      }
    }
    try {
      exectur(reslove, reject)
    } catch (error) {
      reject(error)
    }
  }
  resolvPromise (promise:any, callback:any, reslove:any,reject:any) {
    if (promise===callback) return reject(new TypeError('循环引用'))
    if(callback!==null && (typeof callback=== 'object' || typeof callback=== 'function')) {
      try {
        let then = callback.then
        if (typeof then === 'function') {
          then.call(callback, (r:any)=>{
            this.resolvPromise(promise, r,reslove,  reject)
          }, (e:any)=>{
            reject(e)
          })
        } else {
          reslove(callback)
        }
      } catch (error) {
        reject(error)
      }
    } else {
      reslove(callback)
    }
  }
  then(onReslove?:any, onReject?:any) {
   const onResloves = typeof onReslove === 'function' ? onReslove : (v:any)=>v
   const onRejects = typeof onReject === 'function' ? onReject : (err:any)=> {throw err}
   const promise2 = new myPromise((resolve:any, reject:any)=>{
    if (this.status === PENDING) {
      this.resolveCallbacks.push(()=>{
       const callback = onReslove(this.value)
       this.resolvPromise(promise2, callback, resolve, reject)
      })
      this.rejectCallbacks.push(()=>{
        const callback =onReject(this.reason)
       this.resolvPromise(promise2, callback, resolve, reject)
      })
    }
     if (this.status === FULFILLED) {
      const callback =onReslove(this.value)
       this.resolvPromise(promise2, callback, resolve, reject)
     }
     if (this.status === PENDING) {
      const callback =onReject(this.reason)
       this.resolvPromise(promise2, callback, resolve, reject)
     }
   })
   return promise2
  }


}
const b = new _Promise((resolve:any, reject:any)=>{
  setTimeout(() => {
    resolve('_promise 666666')
  })
})

b.then((data: any) => {return data}).then((data:any) => {
  console.log(data)
})


console.log('######promise end#####')

/** async/await 实现原理 */

/**数组合并方法 */
const arryA = [ 1, 2 ,3]
const arryB = [5, 6]

console.log(arryA.concat(arryB))

console.log([...arryA, ...arryB])

Array.prototype.push.apply(arryA, arryB)

// for (let i of arryB) {
//   arryA.push(i)
// }
console.log(arryA)



/** 用递归的方法实现fibonicc(n)函数，输入数字n,输出波菲那契数列第n项数字，并给该函数加缓存功能 */
const fibonicc = (n:number):number => {
  if (n <= 2) return 1
  return fibonicc(n-1) + fibonicc(n-2)
}
const fibonicc2= (n:number, res1 = 1, res2 = 1):number => {
  if (n<=1) return res2
  return fibonicc2(n-1, res2, res1+ res2)
}

/**  实现一个函数，用于计算用户一个月共计交费多少港元 */
class Count {
  private ratesList = [
    { number: 5, price: 30 },
    { number: 20, price: 15 },
    { number: 50, price: 10 },
    { number: 100, price: 9 },
    { number: 500, price: 8 },
    { number: 1000, price: 7 },
    { number: 2000, price: 6 },
    { number: 3000, price: 5 },
    { number: 4000, price: 4 },
    { number: 5000, price: 3 },
    { number: 6000, price: 2 },
    { number: 6001, price: 1 }
  ]
  sum (number = 0) {
    let level = 0
    for (let i = 0; i < this.ratesList.length; i++) {
      if (number <= this.ratesList[i].number) {
        level = i
        break
      }
    }
    const cha = level > 0 ? number - this.ratesList[level-1].number : number
    const inintValue = cha * this.ratesList[level].price
    return this.ratesList.reduce((pre:any, cur, index, arr)=>{
      if (level > index) {
        const num = index > 0 ? cur.number - (arr[index -1].number) : cur.number
        return pre + num * cur.price
      }else {
        return pre
      }
    },inintValue)
  }
}

const count = new Count()
console.log(count.sum(6001))

/**下列执行顺序
 * 执行let date
 * 运行setTimeout函数，放入宏任务队列（此处描述可以加入event loop机制）
 * let a = 0
 * 执行while 此时 new Date - date 是会类型转换，找到date的valueOf属性，获取原始值
 * 当 > 3000后 执行上面宏任务队列输出 new Date() - date
 */
const date:any = new Date()
setTimeout(()=>{
  console.log(new Date() as any - date)
}, 1000)
let a = 0
while((new Date() as any-date) < 3000){
  a++;
}

/** 如何改变能够按期望输出0 1 2 3 4，为什么
 * 把下面的var i 改成 let i
 * 这样就会形成一个块级作用域（顺带讲下es6以前的作用域概念）
 */
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}

/** 原型继承和class继承的区别
 * 1.原型继承共享属性 class不会
 *
 */
// 寄生组合模式
function inherit(SubType:any, SuperType:any) {
  const proto = Object.create(SuperType.prototype);
  proto.constructor = SubType  // 修复构造函数指向
  SubType.prototype = proto
  console.log('object.create',proto)
}
function Super(this:any, name:any) {
  this.name = name
  this.friends = ['nnn']
}
Super.prototype.fun1 = function() {}
Super.prototype.fun2 = function() {}
function Sub(this:any, name:any) {
  this.hobby = 'hhh'
  Super.call(this, name)
}
inherit(Sub, Super) // 核心
Sub.prototype.fun11 = function() {
  console.log('fun11')
}
const sub1 = new (Sub as any)('xql')
console.log(sub1);

// 函数防抖
const debounce = function (fn:Function, wait = 300) {
  let timer:any = null
  return function (this:any) {
     const context:any = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.call(context, arguments)
      timer = null
    }, wait)
  }
}

// 函数节流
const throttle = function (fn:Function, wait = 3000) {
  let isCan:any
  return function (this:any) {
    if (!isCan) {
      fn.call(this, arguments)
      isCan = setTimeout(()=>{
        isCan = null
      },wait)
    }
  }
}
// 函数深拷贝
function deepClone (source: any) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj:any = Array.isArray(source) ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}


const longeStr = function (str:string) {
  const obj:any = {}
  let len = str.length
  for(let i = 0; i<str.length; i++) {
    if (!obj[str.charAt(i)]) {
      obj[str.charAt(i)] =1
    }else{
      obj[str.charAt(i)]++
    }
  }
  let mes = ''
  let isMax = 0
  for (let i in obj) {
    if (obj[i] > isMax) {
      isMax = obj[i]
      mes = i
    }
  }
  return mes
}

class Event {
  private sub: Array<Function>
  constructor () {
    this.sub = []
  }
  on(cb:Function) {
    const obj:any = {
      name: cb.name,
      cb
    }
    this.sub.push(obj)
  }
  emit(...args:any) {
    this.sub.forEach((item:any)=>{
      item.cb(...args)
    })
  }
  off (cb:Function) {
    const name = cb.name
    const index = this.sub.findIndex((item:any)=>{
      item.name = name
    })
    this.sub.splice(index, 1)
  }
}

const exampleEvent = new Event();
const foo = (x:any, y:any) => {
  console.log('aaaaaa',x, y);
};
const bar = (x:any, y:any) => {
  console.log('bbbbb', y, x);
};
exampleEvent.on(foo);
exampleEvent.on(bar);
exampleEvent.emit(1, 2); //内部执行 foo(1,2); bar(1,2);
// 1,2
// 2,1
exampleEvent.off(foo);
exampleEvent.emit(1, 2);




class TaskPool {
  private task:Array<any>
  constructor () {
    this.task = []
  }
    // 设计 delayRun() 方法，支持链式操作，注意 delayTime 是间隔时长
    delayRun(delayTime:number, callback:Function) {
       console.log('register', delayTime, callback.name)
        this.task.push(
          ()=>{
            setTimeout(()=>{
              Promise.resolve().then(
                callback()
              )
            }, delayTime)
          }
        )
      return this
    }
  }

  const instance = new TaskPool();

  instance
    .delayRun(3000, function task1() {
      console.log("run log 1");
    })
    .delayRun(2000, function task2() {
      console.log("run log 2");
    })
    .delayRun(1000, function task3() {
      console.log("run log 3");
    });

  setTimeout(() => {
    instance.delayRun(10, function task4() {
      console.log("run log 4");
    });
  }, 4000);






