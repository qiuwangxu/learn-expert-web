export {}

class Adder {
  constructor (public a: number) {
  }
  add = (b: number): number => {
    return this.a + b
  }
}

class Child extends Adder {
  // private superAdd  = this.add
  // add = (b: number):number => {
  //   return this.superAdd(b)
  // }
  callAdd (b: number) {
    return this.add(b)
  }
}
const child = new Child(1234)


class Component {
  constructor (public name: string) {}
}
class Component2 {
  constructor (name: string) {}
}
// console.log('public的作用', new Component('aa'), new Component2('aa'))

class Frame implements IterableIterator<Component> {
  private pointer = 0
  constructor (public name: string, public components: Component[]) {}
  [Symbol.iterator] () :IterableIterator<Component> {
    return this
  }
  next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true,
        value: null
      }
    }

  }
}

let frame = new Frame('door', [
  new Component('top'),
  new Component('right'),
  new Component('bottom'),
  new Component('left')
])

for ( let cmp of frame) {
  console.log(cmp)
}

// console.log(frame.next(), frame.next())

class fib implements IterableIterator<number> {
  protected fn1 = 0
  protected fn2 = 1
  constructor (protected maxValue?: number) {}
  [Symbol.iterator](): IterableIterator<number> {
    return this
  }
  public next(): IteratorResult<number> {
    var current = this.fn1
    this.fn1 = this.fn2
    this.fn2 = current + this.fn1
    if (this.maxValue != null && current >= this.maxValue) {
      return {
        done: true,
        value: null
      }
    }
    return {
      done: false,
      value: current
    }
  }
}

const fibMax20 = new fib(20)
// console.log(Array.from(fibMax20))

const promiseArray = [Promise.resolve(3), Promise.resolve(4)]
const p = Promise.race(promiseArray)
// console.log(p)

setTimeout(()=>{
  console.log('this stack is now empty')
  console.log(p)
})


interface Point {
  x: number,
  y: number,
  z: number
}

class Mypoint implements Point {
  x: number = 1
  y: number = 2
  z: number = 3
}
let foo:Point = new Mypoint()
// console.log('implements point', foo)

// 你可以使用接口声明所有“疯狂的”的JavaScript，
// 甚至可以安全地在TypeScript中使用它们。
// 但这并不意味着你可以使用TypeScript类来实现它们
// interface Crazy {
//   new () : {
//     hello: string
//   }
// }
// class CrazyClass implements Crazy {
//   constructor () {
//     return {
//       hello: 'zhangsan'
//     }
//   }
// }
// const crazy = new CrazyClass()

interface Complex {
  (foo: string): string
  (foo: number): number
  (foo: number, bar?: number, ...otherAgr: boolean[]): number
}

const complex:Complex = (foo: any, bar?: number, ...otherAgr: boolean[]): any => {
  if (typeof foo === 'string') {
    return `nihao ${foo}`
  } else if (typeof foo === 'number') {
    return foo * foo
  }else {
    return 2
  }
}
// console.log(complex(2))

interface NewTostring {
  new () : string
}

// declare const Foo:NewTostring
// const bar = new Foo()

interface Test {
  bar: string,
  bas: number
}
const test = <Test>{}  // 断言的一种写法，推荐使用 as

test.bar = '4'


const logName = (something: {name: string}) => {
  console.log(something.name)
}
const animal = { name: 'animal', age: 32}
logName(animal)

// 类型保护  之类型假设
declare let typefoo: {bar?: {baz: string}}
interface Callback {
  (): void
}
const immediate = (callback: Callback) => {
  callback()
}
// if (typefoo.bar) { // 类型假设   回调中不一定有效
//   console.log(typefoo.bar.baz)
//   const bar = typefoo.bar
//   immediate( ()=> {
//     // 此处不能直接获取typefoo.bar.baz
//     // ts不能假设类型保护在回调中一直有效
//     console.log(bar.baz)
//   })
// }

// 字面量类型
const iTakeFoo = (foo: 'foo') => {
  console.log(foo)
}
// const testFoo =  {
//   // prop: 'foo'  //此时testFoo被推断出 prop: string
//   prop: 'foo' as 'foo'  // 简单断言就能处理问题
// }
interface TestFoo {
  prop: 'foo'
}
const testFoo: TestFoo  = {
  prop: 'foo'
}

iTakeFoo(testFoo.prop)


// 类型移动  复制类型和值
namespace testImport {
  export class Foos {
  }
}

import Bar = testImport.Foos

let bars: Bar


// 捕获变量的类型
// 捕获类成员的类型
class Foo2 {
  foo!: number
}

declare let _foo2: Foo2

let bar2: typeof _foo2.foo

// 捕获字符串类型
// 对于第三方的库，可以用一个常量来捕获类型，然后用typeof使用类型

// 捕获键的名称  keyof


// 名义化类型

// 1. 字面量类型

type Id<T extends String>  = {
  type: T,
  value: number
}

type ZCard = Id<'zhangsan'>
type LCard = Id<'lisi'>

let creatZ = (card: number): ZCard => ({
  type: 'zhangsan',
  value: card
})

let creatL = (card: number): LCard => ({
  type: 'lisi',
  value: card
})

// console.log(creatZ === creatL)

// 2. 枚举与结构化结合
// 缺点：number类型和enum是兼容的，不能处理他们
enum FooIdBarnd {}
type FooId = FooIdBarnd & string

let foo3!: FooId

enum BarIdBarnd {}
type BarId = BarIdBarnd & string
let bar3!: BarId

// 3. 接口

// 状态函数
class TestStatic {
  static person:string = 'zhangsan'
  static getName = () => {
    return TestStatic.person
  }
}

// console.log(TestStatic.getName())

// 泛型的实例化类型
class Foo<T> {
  foo!: T
}
const FooNumber = Foo as { new ():Foo<number> }
const FooNumber2 = new Foo<number>()
// console.log(FooNumber, FooNumber2)

function id<T> (x:T) {
  return x
}

const idNum = id as { (x:number): number }
// console.log(idNum)

// 单例模式
class Singleton {
  private static instance: Singleton
  private constructor () {}
  public static getInstance () {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }
}

// console.log(Singleton.getInstance(), 2)
