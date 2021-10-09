1. 手写new 的过程
手写下列代码
bind/call/apply
class与原形链实现继承
promise的简单版
深拷贝实现
节流与防抖函数
函数柯里化
new的原理实现

1，数组乱序
2，数组二分查找
3， 数组去重（item为一维对象）
4，深拷贝函数

2. js实现map

3. 实现一个批量请求函数 multiRequest(urls, maxNum)，要求最大并发数 maxNum，每当有一个请求返回，就留下一个空位，可以增加新的请求，所有请求完成后，结果按照 urls 里面的顺序依次打出

4. 阻止事件冒泡和阻止默认事件

5. 数字转格式，前面加上，三位拆分添加一个",",小数点后保留两位，不需要考虑四舍五入，例如1234578.7889，输出，三位拆分添加一个",",小数点后保留两位，不需要考虑四舍五入，例如1234578.7889，输出1,234,578.78

6. js 插入大量dom优化，渲染1万条数据

7. 原型链

8. typescript泛型的理解，内置方法的具体实现，具体怎么实现的

9. promise then怎么实现的链式调用，怎么优雅的实现链式调用，一个类，怎么去添加链式调用方法

10. 手写promise

11. async/await 实现原理

12. 数组合并方法

13. 用递归的方法实现fibonicc(n)函数，输入数字n,输出波菲那契数列第n项数字，并给该函数加缓存功能

14. 请用尽可能少的代码实现一个函数，用于计算用户一个月共计交费多少港元（代码请清晰简洁，我们希望能看到你的编码风格和习惯）。

用户在富途平台上进行交易，需要交平台使用费。平台使用费的梯度收费方案如下：
订单数  每笔价格
1-5    30
6-20   15
21-50  10
51-100  9
101-500 8
501-1000 7
1001-2000 6
2001-3000  5
3001-4000  4
4001-5000  3
5001-6000  2
6001及以上  1
假设一个用户，一个月交易了6笔订单，则在梯度1交费共计：30港元 * 5 = 150港元，在第二梯度交费：15港元，一共交费165港元。

15. 下列执行顺序
let date = new Date(); 
setTimeout(()=>{
  console.log(new Date() - date); 
},1000)
let a = 0;
while((new Date()-date)<3000){
a++; 
}

16. 如何改变能够按期望输出0 1 2 3 4，为什么
for (var i = 0; i < 5; i++) {

    setTimeout(function() {

      console.log(i);

    }, i * 1000);
}

17. 原型继承和class继承的区别

18. 为什么class继承会要调用 super()，super()的使用场景有哪些

19. 防抖和节流的实现，主要区别是什么

20. 深拷贝和浅拷贝的区别，怎么实现深拷贝和浅拷贝

21. 实现一个观察者类observe

22. Map 和 WeakMap的区别,跟对象的区别

23. for in 和 for of的区别

24. 装饰器

25. let const var 区别 const可以声明不赋值吗

26. import()是如何实现异步加载的

// 1.找出字符串中重复次数最多的元素
const str = "abcaasddsaaaaasds";
function longestStr(str) {
}
longestStr(str); // a

// 2请用 es6 实现发布订阅模式
// 代码提示
class Event {
  on(cb) {}
  emit(...args) {}
  off(cb) {}
}

// 需要通过以下测试
const exampleEvent = new Event();
const foo = (x, y) => {
  console.log(x, y);
};
const bar = (x, y) => {
  console.log(y, x);
};
exampleEvent.on(foo);
exampleEvent.on(bar);
exampleEvent.emit(1, 2); //内部执行 foo(1,2); bar(1,2);
// 1,2
// 2,1
exampleEvent.off(foo);
exampleEvent.emit(1, 2);
// 2,1

// 请设计一个 TaskPool 类如下
class TaskPool {
  // 设计 delayRun() 方法，支持链式操作，注意 delayTime 是间隔时长
  delayRun(delayTime, callback) {
     console.log('register', delayTime, callback.name)
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

// 需要按照如下顺序打印
//打印 register 3000 task1
//打印 register 2000 task2
//打印 register 1000 task3
//过 3 秒打印 run log 1
//打印 register 10 task4
//间隔2秒打印 run log 2
//又间隔1秒打印 run log 3
//又间隔10毫秒打印 run log 4


// 请实现 listToTree 函数，根据 parentId 的关系把数组转换成树形结构，要求时间复杂度不能为 n^2

// 原始数据：
const data = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 2, name: "部门B", parentId: 0 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 1 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 7, name: "部门G", parentId: 5 },
  { id: 8, name: "部门H", parentId: 4 }
];

// 转换后的结果：
const result = [
  {
    id: 1,
    name: "部门A",
    parentId: 0,
    children: [
      {
        id: 3,
        name: "部门C",
        parentId: 1,
        children: [{ id: 6, name: "部门F", parentId: 3 }]
      },
      {
        id: 4,
        name: "部门D",
        parentId: 1,
        children: [{ id: 8, name: "部门H", parentId: 4 }]
      }
    ]
  },
  {
    id: 2,
    name: "部门B",
    parentId: 0,
    children: [
      { 
      id: 5, 
      name: "部门E", 
      parentId: 2，
      children: [{ id: 7, name: "部门G", parentId: 5 }]
      },
    ]
  }
];


// 观察者
let observe = {
  // 订阅集
  subscribes: [],

  // 订阅
  subscribe: function (type, fn) {
    if (!this.subscribes[type])  this.subscribes[type] = []
    typeof fn === 'function' && this.subscribes[type].push(fn)
  },

  // 发布
  publish: function () {
    let type = Array.prototype.shift.call(arguments)
    let fns = this.subscribes[type]

    if (!fns || !fns.length) {
      return
    }

    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments)
    }
  },

  // 移除订阅
  remove: function (type, fn) {
    if (type === 'undefined') {
      this.subscribes = []
    }

    let fns = this.subscribes[type]
    if (!fns || !fns.length) {
      return
    }

    if (typeof fn === 'undefined') {
      this.subscribes[type] = []
    }

    for (let i = 0; i < fns.length; i++) {
      if (fns[i] === fn) {
        fns.splice(i, 1)
      }
    }
  }
}

let subscribeA = function (jobs) {
  console.log('A', jobs)
}
let subscribeB = function (jobs) {
  console.log('B', jobs)
}

observe.subscribe('job', subscribeA)
observe.subscribe('job', subscribeB)

observe.subscribe('scoreA', function (score) { console.log(score) })
observe.subscribe('scoreB', function (score) { console.log(score) })

observe.publish('job', ['前端', '后端', '测试'])

