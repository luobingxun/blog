# javaScript 内置对象

# 一、Array

## Section A

### 1、Array.prototype.at()

1）作用：查询对应下标值的元素，如果下标不存在，返回 undefined。

2）当下标为正数，从 0 开始，为负数，则从-1 开始，从数组末尾开始查询。

### 2、Array.prototype.concat()

1）作用：合并两个或者多个数组，并返回合并后的新数组。

2）当不传参数的时候，相当于数组自身浅复制。

3）如果合并的数组中存在引用类型的元素，则在调用 concat 方法的时候是将引用地址复           制一份，新引用和旧引用还是指向同一个地址内存，如果是非引用类型的元素，则是直           接将值复制一份到新数组中。

```javascript
const newArr = [1, 3, 4, 5].concat([4, 5, 6]);
```

### 3、Array.prototype.copyWithIn()

1）作用：复制数组中的一部分元素到另一个位置，此方法会改变原数组，但不会改变长度

2）copyWithIn(target, start, end)

当参数为负数的时候，表示从数组末尾向前开始，值从-1 开始，为正数则是从头部开             始，值从 0 开始。

### 4、Array.prototype.entries()

1）作用：返回数组的可迭代对象。

```javascript
const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]
//next中有两个属性，value，done(表示该迭代是否被调用)
```

2）配合 for...of...使用

```javascript
var arr = ['a', 'b', 'c'];
var iterator = arr.entries();
// undefined

for (let e of iterator) {
  console.log(e);
}

// [0, "a"]
// [1, "b"]
// [2, "c"]
```

### 5、Array.prototype.every()

1）作用：判断数组中每一个元素是否满足回调函数中的条件。

2）该方法中的回调函数只会在有值的索引上被调用，在从未赋值或者被删除的值上面不会           调用。

3）在回调函数被调用之前，往数组汇总添加新的元素，该元素不会被访问，改变元素的          值，则新值会被回调函数调用，删除元素，则删除的元素不会被回调函数访问。

4）如果调用 every 的数组是一个空数组，则会返回 true

## Section B

### 1、Array.prototype.fill()

1）给数组指定范围内填充值，返回填充后的数组，会改变原数组。

2）fill(value, start, end)

如果 start、end 为负数中数组末尾开始，从下标 0 开始，为正数从头开始，从负 1 开          始。

```javascript
var newArr = [1, 3].fill(0, 0, 2);
//newArr = [0, 0, 0]
//注：不包含end位置
```

### 2、 Array.prototype.filter()

1）作用：过滤掉数组中不满足条件的元素，创建并返回新数组

2）参数     var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

3）回调函数只会在有值的索引上被调用，在那些从未被赋值或者使用 delete 删除的元素上           不会被调用。

4）在回调函数被调用之前，添加元素，添加的元素不会被访问，修改元素，最新的元素会           被会被回调函数访问，删除元素，该元素不会被访问。

```javascript
const arr = [1, 2, 3, 4, 5, 6];
//过滤掉大于5的元素
const newArr = arr.filter(item => item < 4);
```

### 3、Array.prototype.find()

1）作用：找到数组中第一个满足条件的元素，没有则返回 undefined。

2）参数     var newArray = arr.find(callback(element[, index[, array]])[, thisArg])

3）回调函数会在每一个索引上被调用不管有没有被赋值。

4）在回调函数被调用之前，添加元素，新添加的元素不会被访问，修改元素，最新的元素          值会被访问，删除元素，该元素的位置也会被访问，只是值变为 undefined。

```javascript
var inventory = [
  { name: 'apples', quantity: 2 },
  { name: 'bananas', quantity: 0 },
  { name: 'cherries', quantity: 5 }
];

function findCherries(fruit) {
  return fruit.name === 'cherries';
}
console.log(inventory.find(findCherries));
// { name: 'cherries', quantity: 5 }
```

### 4、Array.prototype.findIndex()

1）作用：返回数组中第一个满足回调函数的索引，否则返回-1。

2）参数     var newArray = arr.findIndex(callback(element[, index[, array]])[, thisArg])

3）回调函数会在每一个索引上被调用不管有没有被赋值。

4）在回调函数被调用之前，添加元素，新添加的元素不会被访问，修改元素，最新的元素          值会被访问，删除元素，该元素的位置也会被访问，只是值变为 undefined。

```javascript
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```

### 5、 Array.prototype.flat()

1）作用：用于数组的扁平化处理。

2）参数 var newArray = arr.flat([depth]) depth 默认值为 1，该参数表示需要扁平化的深            度。

3）如果扁平化的数组中存在空元素，则扁平化的新数组中剔除空值。

```javascript
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

## Section C

### 1、Array.prototype.flatMap()

1）作用：将数组中的值先 map 一遍，类似调用 map 方法，然乎对返回的新数组进行 flat 扁                        平化处理。

2）参数 var new_array = arr.flatMap(function callback(currentValue[, index[, array]])                     {}[, thisArg])

```javascript
var arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// only one level is flattened
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]
```

### 2、Array.prototype.forEach()

1）作用：遍历数组

2）参数 arr.forEach(callback(currentValue [, index [, array]])[, thisArg])

3）回调函数只会在有值的索引上被调用，在那些从未被赋值或者使用 delete 删除的元素上           不会被调用。

4）在回调函数被调用之前，添加元素，添加的元素不会被访问，修改元素，最新的元素会           被会被回调函数访问，删除元素，该元素不会被访问。

5）forEach 无法被中断循环。

### 3、Array.from()

1）作用：将一个类似数组或者可迭代对象转化成为一个数组，这里的可迭代对象指的是可                        以遍历的对象，包括 set、map、string 等

2）参数     Array.from(_arrayLike_[, _mapFn_[, *thisArg*]])。可以是一个回调函数也可以是一个                      类似数组。

```javascript
const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);
// [ "foo", "bar", "baz" ]
```

### 4、Array.prototype.includes()

1）作用：判断数组中是否包含指定的值。

2）参数  arr.includes(valueToFind[, fromIndex])，formIndex 表示从那个位置开始判断

3）如果 fromIndex 值大于等于数组长度，则该数组不会被搜索。

4）如果 fromIndex 为负数，通过数组长度 length+formIndex 计算搜索的位置，如果结果          小于 0 则整个数组都会被搜索。

5）0 的值将全部视为相等，与符号无关（即 -0 与 0 和 +0 相等），但 `false` 不被认为与           0 相等。

### 5、Array.prototype.indexOf()

1）作用：返回数组中指定元素的索引，没有返回-1

2）参数：arr.indexOf(searchElement[, fromIndex])

3）如果 fromIndex 为负数，通过数组长度 length+formIndex 计算搜索的位置，如果结果          小于 0 则整个数组都会被搜索。

## Section D

### 1、Array.isArray()

1）作用：判断给定的对象是否是一个数组。



### 2、Array.prototype.join()

1）作用：以指定的分隔符将数组元素拼接成为字符串， 默认分隔符为字符串。

### 3、Array.prototype.keys()

1）作用： `**keys()**` 方法返回一个包含数组中每个索引键的`**Array Iterator**`对                         象。

```javascript
var arr = ['a', , 'c'];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys); // [0, 1, 2]
```

### 4、Array.prototype.lastIndexOf()

1）作用：返回数组中指定元素最后一次出现的索引，没有则返回-1

2）参数：arr.lastIndexOf(searchElement[, fromIndex])

3）formIndex 为正数，如果大于等于数组长度，整个数组都不会被搜索，为负数，               length+fromIndex 计算出来的值小于 0 则整个数组都会被搜索。

```javascript
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, 2);
// index is 0
index = array.lastIndexOf(2, -2);
// index is 0
index = array.lastIndexOf(2, -1);
// index is 3
```

### 5、Array.prototype.map()

1）作用：返回一个新数组，新数组的元素为回调函数返回的值。

2）参数：var new_array = arr.map(function callback(currentValue[, index[, array]]) {
                    // Return element for new_array
                    }[, thisArg])

3）该方法的回调函数只会在有值的索引上被调用，在那些从未被赋值或者被删除的元素上           的不会被调用。

4）在回调函数调用之前，如果添加新的元素，该元素不会被访问，如果修改元素，被反问          的是修改之后的最新值，如果删除元素，该元素不会被访问。

5）回调函数接受多少个参数，则 map 方法就会给回调函数按顺序注入参数

```javascript
// parseInt(string, radix) -> map(parseInt(value, index))
/*  first iteration (index is 0): */ parseInt('1', 0); // 1
/* second iteration (index is 1): */ parseInt('2', 1); // NaN
/*  third iteration (index is 2): */ parseInt('3', 2); // NaN

//此时不需要map给回调函数传递第二个参数，这个时候产生意向不到的情况
//解方法：对函数进行函数柯里化
function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// Actual result is an array of numbers (as expected)

// Same as above, but using the concise arrow function syntax
['1', '2', '3'].map(str => parseInt(str));
```

6）当回调函数没有 return 值时或者返回 undefined 时，新数组中对应位置的值是                           undefined

```javascript
var numbers = [1, 2, 3, 4];
var filteredNumbers = numbers.map(function (num, index) {
  if (index < 3) {
    return num;
  }
});
//index goes from 0,so the filterNumbers are 1,2,3 and undefined.
// filteredNumbers is [1, 2, 3, undefined]
// numbers is still [1, 2, 3, 4]
```

## Section E

### 1、Array.of()

1）作用： 将给定的参数组装成为一个数组并返回，和 new Array(3)不同，该方法不论给                        多少个参数都会当作数组元素处理，而 new Array(3)如果只传一个参数则表示                         创建长度为几的空数组。

### 2、Array.prototype.pop()

1）作用：获取并删除数组末尾元素。数组为空则返回 undefined

2）pop 方法是根据 length 属性来确定最后一个元素，如果调用对象没有 length 属性或者               length 属性无法转化成为数值。则 length 会被置为 0，并返回 undefined。

注：可以通过改变 length 属性的值来决定删除获取的元素。

### 3、Array.prototype.push()

1）作用：将一个或者多个元素追加到数组末尾并返回数组的长度。

2）`push` 方法根据 `length` 属性来决定从哪里开始插入给定的值。如果 `length` 不能被              转成一个数值，则插入的元素索引为 0，包括 `length` 不存在时。当 `length` 不存              在时，将会创建它.

注：可以通过改变 length 属性的值来决定在那个位置添加的元素。

```javascript
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
// expected output: 4
console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows"]

animals.push('chickens', 'cats', 'dogs');
console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
```

### 4、Array.prototype.reduce()

1）作用：将数组中的每一个元素执行一遍提供的回调函数，并将结果汇总成为单个结果返                   回。

2）参数： arr.reduce(callback(accumulator, currentValue[, index[, array]])[,                                      initialValue]

3）回调函数只会在有值的索引上被调用，在从未赋值或者被删除的元素上不会被调用。

4）当没有提供 initialValue 值，则 accumulator 初始值为数组中的第一个元素，并且           currentValue 的值从数组的第二个元素开始，如果提供 initialValue 值，则           currentValue 从数组的第一个元素开始。

5）如果没有提供初始值，并且调用 reduce 方法的数组为空，则会抛 TypeError 错误，如果          调用方法的数组只有一个元素，并且没有提供初始值或者提供的初始值为空数组，则会          返回唯一一个元素，回调函数不会被执行。

6）按顺序执行 promise

```javascript
/**
 * Runs promises from array of functions that can return promises
 * in chained manner
 *
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
function runPromiseInSequence(arr, input) {
  return arr.reduce((promiseChain, currentFunction) => promiseChain.then(currentFunction), Promise.resolve(input));
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200
```

7）功能型函数管道

```javascript
// Building-blocks to use for composition
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

// Function composition enabling pipe functionality
const pipe =
  (...functions) =>
  input =>
    functions.reduce((acc, fn) => fn(acc), input);

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
```

8）使用 reduce 实现 map 方法

```javascript
Array.prototype.map = function (callback, thisArg) {
  return this.reduce(function (accumulator, currentValue, index, array) {
    return (accumulator[index] = callback.call(thisArg, currentvalue, index, array));
  }, []);
};
```

### 5、Array.prototype.reduceRight()

1）该方法和 reduce 类似，只是该方法所有的操作都是从右边开始而 reduce 是从左面开          始，两者只是操作方向上的不同而已。

## Section F

### 1、Array.prototype.reverse()

1）作用：将原数组反转之后返回该数组的一个引用，会改变原数组。

### 2、Array.prototype.unshift()

1）作用：删除并返回数组的第一个元素。如果数组为空，返回 undefined。



### 3、Array.prototype.slice()

1）作用：将数组指定范围内的元素浅拷贝，并返回一个新数组

2）[].slice(start, end) 如果 start 为正，则从头开始，为负则从尾部开始，end 也一样，如          果省略 start 表示从 0 开始，省略 end 则表示，一直截取到末尾。

3）如果拷贝的数组中存在引用类型，则拷贝的是引用类型的地址，新旧引用指向同一个内          存，如果是非引用类型的数组，则会拷贝一份新的值。

### 4、Array.prototype.some()

1）作用：监测数组中是否存在一个满足回调函数的元素，如果检测到立即返回 true，否则            返回 false。

2）参数 arr.some(callback(element[, index[, array]])[, thisArg])

3）回调函数只会在有值的索引上被调用，在那些从未被赋值或者使用 delete 删除的元素上           不会被调用。

4）在回调函数被调用之前，添加元素，添加的元素不会被访问，修改元素，最新的元素会           被会被回调函数访问，删除元素，该元素不会被访问。

### 5、Array.ptototype.sort()

1）对数组进行快速排序，参数为一个可选值，不传则按照 ascll 码值大小进行排序，传比较          函数则按照比较函数的规则排序。

## Section G

### 1、Array.prototype.splice()

1）作用：删除、插入、替换、删除并插入元素

2）参数：splice(start, delCount, elment.....element)，start 为正数并且超过数组长度，                       表示从数组最后一个位置添加元素，为负数，当绝对值大于数组长度表示从 0 位                      置开始删除。

delCount 表示删除的元素个数，当省略该参数或者该值大于等于 length-start                      表示从 start 到数组末尾的元素都会被删除，为负数或者为 0 时表示添加插入元                      素。

3）删除、插入、替换、删除并插入元素的用法

```javascript
[1, 2, 3, 4]
  .splice(0, 2) //表示从0位置开始删除两个元素
  [(1, 2, 3, 4)].splice(1, 0, 6, 7) //表示在2的前面插入6，7插入后为1，6，7，2，3，4
  [(1, 2, 3, 4)].splice(1, 1, 6) //表示先将2删除在插入6
  [(1, 2, 3, 4)].splice(1, 2, 6, 7); //表示先从2开始删除2个元素在插入6，7，结果为1，6，7，4
```

### 2、Array.prototype.toLocalString()

1）作用：数组中的每个元素调用各自的 toLocalString 方法，在以逗号拼接成为字符串返回

### 3、Array.prototype.toString()

1）作用：将数组以逗号拼接成为字符串返回

### 4、Array.prototype.unshift()

1）作用：在数组的头部添加一个或者多个元素

2）如果添加多个元素，多个元素或当成一个整体添加，不会按照先后顺序添加，因此得到            的数组顺序和理想不一致。

### 5、Array.ptototype.values()

1）作用：获取一个可迭代的对象

2）同 entyies 方法一样可以使用 next 或者 for...of...遍历。

# 二、Object

### 1、
