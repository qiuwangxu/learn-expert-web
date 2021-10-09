/**
 * 1.足够多的水和两个水杯（7L和17L），如何得到9L水
 * 思路： 17l的水倒入7l的杯子，然后倒掉7l的杯子，依次重复,直到取到2l水
 * 即 17x - 7y = 2
 * 17 mod 7 = 3
 * 3 * 3 mod 7 = 2
 * x = 3 , y = 7
 */

// 7x - 5y = 1
// 7 mod 5 = 2
// 2 * 3 mod 5 = 1
// x = 3 y = 4

/**16个球，一个异常球，一个天平多少次可以找出
 * 1.异常球不知道是轻重，则需要五次
 * 2.异常球知道轻重，则需要三次（8 8然后在正常里面拿一个球9---》 3 3 3--》 1 1 1）
 */



/**鸡兔同笼算法
 * 鸡两条腿，兔四条腿，鸡兔总数n,腿数m
 * 思路: 先每个减两条腿，那么就只剩兔子了,假设兔子为x,鸡为y,则 x=(m-2n)/2; y= (4n-m)/2
 */

export const jitu = (n:number, m:number): {tu: number, ji: number} => {
  return {
    tu: (m - 2*n)/2,
    ji: (4*n - m)/2
  }
}

console.log(jitu(20, 50))


interface NumberArray {
  (arr: Array<number>): Array<number>
}
type Sort = (arr:number[]) => number[]
/**冒泡排序
 * 冒泡排序是依次对比相邻的两个数字，大的往后
 * 优化，因为每一次最大都在最后面，所以后面的不需要比较就是 j-i-1次比较就行了
 * 时间复杂度 O(n) - O(n2)
 */
export const bubuleSort:NumberArray = (arry) => {
  const len = arry.length
  for (let i = 0; i< len -1; i++) {
    for (let j = 0; j < len - i -1; j++) {
      if (arry[j] > arry[j+1]) {
        let temp = arry[j]
        arry[j] = arry[j+1]
        arry[j+1] = temp
      }
    }
  }
  return arry
}

export const bubuleSort2:NumberArray = (arr) => {
  let len = arr.length -1
  while (len) {
    let i = 0
    while (i < len) {
      if (arr[i] > arr[i+1]) [arr[i], arr[i+1]] = [arr[i+1], arr[i]]
      i++
    }
    len--
  }
  return arr
}

/**快速排序
 *从数组中选定一个基数，然后把数组中的每一项与此基数做比较，
 小的放入一个新数组，大的放入另外一个新数组。然后再采用这样的方法操作新数组。
 直到所有子集只剩下一个元素，排序完成。
 时间复杂度O(nlogn)-O(n2)
 */

export const quickSort:Sort = (arr) => {
  if (arr.length < 2) return arr
  const left = []
  const rigth = []
  const index = Math.floor(arr.length/2)
  const pivod = arr.splice(index, 1)[0]
  for (let i = 0; i< arr.length; i++) {
    if (arr[i] < pivod) {
      left.push(arr[i])
    }else{
      rigth.push(arr[i])
    }
  }
  return quickSort(left).concat([pivod], quickSort(rigth))
}

export const quickSort2:Sort = (arr) => {
  let len = arr.length
  if (len < 2) return arr
  const left = []
  const right = []
  const pivod = arr[0]
  let index = 1
  while ( index < len) {
    if (arr[index] < pivod) {
      left.push(arr[index])
    } else {
      right.push(arr[index])
    }
    index++
  }
  return quickSort2(left).concat([pivod], quickSort2(right))
}



/**二叉排序树实现
 * todo
 */


