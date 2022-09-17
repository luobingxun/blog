# ES6-ES12

# ES6

### 五点

#### 一、let 关键字

1. 使用 let 声明变量具有块级作用域

2. let 不可以重复声明变量

3. 不能在声明变量之前访问

4. 不具有声明提升

5. 不影响作用域链

#### 二、const 关键字

1. 声明变量具有块级作用域

2. 定义必须初始化

3. 不能重复赋值

4. const 定义的引用类型明知要地址不变，可以赋值成员值

#### 三、解构赋值

1. 数组的解构赋值

```javascript
let [first, second] = [1, 2];
//first:1
//second:2
```

2. 对象的解构赋值

```javascript
let { name, age } = { name: 'xiao', age: 18 };
//name:xiao
//age:18
```

#### 四、模版字符串

模版字符串允许用户以定义的格式按原样输出，包括换行、多个空格

```javascript
const str = `<div>    </div>`;
```

#### 五、对象的简便写法

```javascript
let name = 'xiao', age:19;
let person = {
    name,
    age,
    run: function(){}
    sleep: function(){}
}
```

### 六点

#### 一、箭头函数

1. 箭头函数的 this 值为当前函数定义所在作用域的 this 值

2. 箭头函数不能当作构造函数实例化对象

3. 箭头函数不能使用 arguments 变量

4. 箭头函数的简写

   ```javascript
   let fn = () => {};
   //1、只有一个参数简写（）
   //2、返回一个对象或者只有一条执行语句，简写{}
   ```

#### 二、默认值

1. 函数默认值

   ```javascript
   function getName(age = 18, name = 'xiao') {}
   ```

2. 解构赋值默认值

   ```javascript
   const { name = 'xiao', age } = person;
   ```

#### 三、rest 参数

```javascript
function getName(name, age, ...rest) {}
const { name, age, ...rest } = person;
```

#### 四、Symbol

1. Symbol 类型表示独一无二的值

2. Symbol 类型不能用作算数运算

3. Symbol 的创建

   ```javascript
   //方式一
   let one = new Symbol();
   let one1 = new Symbol();
   //one和one1不相等

   //方式二
   let two = new Symbol('two');
   let two1 = new Symbol('two');
   //two和two1不相等

   //方式三
   let three = Symbol.for('three');
   let three1 = new Symbol('three');
   //three和three1相等
   ```

#### 五、Symbol 的应用

给对象添加属性和方法: Symbol 是独一无二的值，因此就算 methods 中的名称和 request 中的名称相同，也不算做重复

```javascript
const methods = {
    get:new Symbol(),
    put:new Symbol()
}

const request  {
    url:'https://127.0.0.0',
    [put]:function (){}
    [get]:function (){}
    [new Symbol('1')]:'get'
    get:function (){}
}
//因为Symbol数动态的，因此不同使用request[new Symbol('1')]()去调用


//以下这种方式可以调用
let get = new Symbol();
const request = {
    [get]:function (){}
}
request[get]();
```

#### 六、Symbol 属性

1. Symbol.hasInstance

   ```javascript
   //该属性主要用来自定义 a instanceOf b的判断结果

   class Person {
     /*
           param参数为instanceof前面的对象，可以通过下面方法决定instanceof的判断结果,
           如果判断是否为person的实例，则会调用下面的方法，并将instanceof前面的对象作用函数的
           参数
         */
     static [Symbol.hasInstance](param) {
       return param.name === 'me';
     }
   }
   const Me = { name: 'me' };
   console.log(Me instanceof Person); // 结果为true
   ```

2. Symbol.isConcatSpreadable

   ```javascript
   //该属性用来决定数组调用concat方法时，是否展开十周再合并
   const arr = [1, 2, 3];
   arr[Symbol.isConcatSpreadable] = false;
   const newArr = [4, 5, 6].concat(arr);
   //newArr 结果为【4，5，6， Array(3)]
   ```

### 六点

#### 一、迭代器

1. 迭代器主要是为 for...of...消费的，只要某一个对象实现迭代器，就可以使用 for...of...遍历。

   迭代器原理：

   1. 创建一个指针对象，该指针对象自动指向解构的起始位置。

   2. 调用 next 方法，指针会指向数据解构的第一个元素

   3. 后面再次调用 next，指针继续指向结构的下一个元素，知道数据结构末尾

   4. 每一次调用 next 方法都会返回一个{value:3, done：false}对象，done 为 true 的时候遍历结束。

2. 数组迭代器的获取

   ```javascript
   const arr = [1, 2, 4, 3];
   const iterator = arr[Symbol.iterator]();
   console.log(iterator.next());
   console.log(iterator.next());
   console.log(iterator.next());
   console.log(iterator.next());
   /*
    输出结果
    {value: 1, done: false}
    {value: 2, done: false}
    {value: 4, done: false}
    {value: 3, done: false}
    {value: undefined, done: true}
    */
   //没调用一次next就返回value,done的一个对象，value为当前迭代的值，done表示是否
   //迭代完成
   ```

#### 二、自定义迭代器

如果想要使用 for...of...去遍历某个对象，并且每次遍历的结果由自己定义，可以自定义迭代器

```javascript
const person = {
  name: 'xiao',
  smallName: ['xiaoming', 'xiaohong', 'xiaotian'],
  [Symbol.iterator]: function () {
    //需要返回一个对象，并且该对象中有next方法
    let index = -1;
    return {
      next: () => {
        index++;
        //next方法需要返回value,done的对象
        return index === this.smallName.length
          ? { value: undefined, done: true }
          : {
              value: this.smallName[index],
              done: false
            };
      }
    };
  }
};

for (let val of person) {
  console.log(val);
}
//输出结果为 xiaoming xiaohong xiaotian

//注：如果遍历结束value值为undefined， done为true
```

#### 三、生成器

生成器其实就是一个函数

```javascript
//1、yield属性相当于代码分隔符，没调用一次next，才会执行下一个区域代码
//如下：将代码分割为四个区域
function* gen() {
  console.log('区域一');
  yield '111';
  console.log('区域二');
  yield '222';
  console.log('区域三');
  yield '333';
  console.log('区域四');
}

/*2、没调用一次next方法，执行一个区域的代码，例如：第一次调用next,执行区域一到
yield '111' 执行， yield属性后面的值作为next方法返回的结果值，包含value和done
的对象，每一次调用皆如此，当执行到最后一个区域的代码，返回{value:undefiend, done:true}
*/
执行;
const iterator = gen();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

#### 四、生成器的参数传递

```javascript
function* gen(name) {
  console.log(name); //xiao
  const bbb = yield '111';
  console.log(bbb); //bbb
  const ccc = yield '222';
  console.log(ccc); //ccc
  const ddd = yield '333';
  console.log(ddd); //ddd
}
//1、生成器可以传递参数
const iterator = gen('xiao');
console.log(iterator.next());
//2、从第二次调用next方法传递的参数为上一次yield语句的返回值， 例如bbb为第一yield
//的返回值
cosole.log(iterator.next('bbb')); //{value:'111', done:fasle}
console.log(iterator.next('ccc')); //{value:'222', done:fasle}
console.log(iterator.next('ddd')); //{value:'333', done:fasle}
```

#### 五、生成器应用（一）

异步变成的新解决方案之一，可以避免回调地狱

```javascript
function timer1() {
  setTimeout(() => {
    console.log('异步任务1');
    iterator.next();
  }, 1000);
}
function timer2() {
  setTimeout(() => {
    console.log('异步任务2');
    iterator.next();
  }, 1000);
}
function timer3() {
  setTimeout(() => {
    console.log('异步任务3');
    iterator.next();
  }, 1000);
}
function* gen() {
  yield timer1();
  yield timer2();
  yield timer3();
}
const iterator = gen();
iterator.next();

/*注：当调用iterator.next()，会先执行第一个yield语句，执行timer1，在timer1中又再次
调用iterator.next()，再次执行第二个yield语句，在timer2中又调用next,再次执行第三个yield
语句，一次类推，一次执行*/
```

#### 六、生成器应用（二）

当多个请求相互依赖，则可以使用生成器

```javascript
function getUser() {
  setTimeout(() => {
    iterator.next({
      name: 'xiao',
      age: 18
    });
  }, 1000);
}
function getInfo(user) {
  setTimeout(() => {
    iterator.next({
      hobby: 'footboll'
    });
  }, 1000);
}

function getJob(hobby) {
  setTimeout(() => {
    iterator.next({
      job: 'progremer'
    });
  }, 1000);
}

function* gen() {
  const user = yield getUser();
  const info = yield getInfo(user);
  const job = yield getJob(info);
  console.log(job);
}

const iterator = gen();
iterator.next();
```

### 六点

#### 一、Set 集合

```javascript
const set = new Set();
set.add(1); //增
set.delete(1); //删
set.has(1); //查
set.size(); //查
set.clear(); //清
for (const el of set) {
  //遍历
  console.log(el);
}
```

#### 二、Map

map 的可以不限类型，可以是对象，可以是 undefined

```javascript
const map = new Map();
map.set('1', 'xiao'); //增
map.delete('1'); //删
map.set('1', '2'); //改
map.has('1'); //查
map.size(); //查
map.clear(); //清

for (const el of map) {
  //遍历
  console.log(el);
}
```

#### 三、class

1. class 关键字声明类

2. static 关键字声明静态成员和静态方法（静态方法只能访问静态成员）

3. 重写父类中的方法，调用的是谁取决于当前的调用对象

4. 使用 extends 继承，super 关键字调用父类

5. getter、setter

   ```javascript
   class person {
     get name() {
       return 'xiao';
     }
     set name(name) {
       this.name = name;
     }
   }

   const p = new person();
   p.name = 'oo'; //调用setter
   const p = p.name; //调用getter
   ```

#### 四、数字的拓展

1. Number.EPSILON : 浮点数精度值

2. Number.isFinite() : 判断一个数是否为有限数

3. Number.isNaN() : 判断一个值是否是非数值

4. Number.isInteger() : 判断一个数是否为整数

5. Number.parseInt() : 格式化为整数

6. Number.parseFloat() : 个数化为浮点数

7. Math.trunc() : 将数字的小数部分抹掉

8. Math.sign() ： 判断一个是是正数 0 负数

#### 五、对象拓展

1. Object.is() : 判断两个值是否相等，同===不同的是，NaN 等于 NaN

2. Object.assign() : 合并多个对象，如果后面对象的同名属性会覆盖前面的同名属性值

3. Object.setPrototypeOf() : 设置对象的原型

4. Object.getPrototypeOf() : 获取对象的原型

#### 六、模块化

1. 导出模块

   ```javascript
   export default {}; //默认导出
   export const a = 1; //分别导出
   export { a }; //统一导出
   ```

2. 导入模块

   ```javascript
   import a from 'a'; //默认导出的引入方式
   import * as a from 'a'; //默认导入并取别名
   import { a } from 'a'; //分别导出的导入方式
   ```

# ES7

#### 一、[].includes()

判断数组中是否存在某个元素

### 二、 a \*\* b 幂运算

直接可以做幂运算，不需要使用 Math.pow()

# ES8

#### 一、async、await

## 二、对象方法拓展

1. Object.keys() : 获取对象的 key 数组

2. Object.values() ： 获取对象的 value 组成的数组

3. Object.entries() ： 获取键值对组成的数组

4. Object.entries() ： 获取键值对组成的数组

5. Object.getOwnPropertyDescriptor() : 获取属性的描述对象

# ES9

#### 一、拓展运算符和 rest 参数

#### 二、正则

1. 命名分组

2. 正向断言

3. 反向断言

4. . 表示任意字符

# ES10

#### 二、新增方法

1. 对象新增方法

   Object.fromEntries() : 参数可以是一个包含两个元素的数组或者而为数组，第一个元素作为 key，第二个元素作为 value

2. 数组新增方法

   Array.prototype.flat() : 扁平化数组

   Array.ptototype.flatMap() : flat 和 map 方法的组合

3. 字符串新增方法

   String.prototype.trimStart() : 剔除字符串开头的空格

   String.prototype.trimEnd() ：剔除字符串结尾的空格

4. Symbol 新增属性

   Symbol.prototype.description : 获取 Symbol 的字符串描述（创建 Symbol 变量的时候括号里面传递的值

# ES11

#### 一、私有属性

```javascript
class person {
  #name;
  #age;
}
```

#### 二、allSettled

promise 新增加的方法：始终返回一个成功的 promise，结果为参数数组 promise 中每一个的结果值

#### 三、replaceAll

替换所有匹配到的字符串

#### 四、动态 import

```javascript
import('a').getname();
```

#### 五、可选链

#### 六、globalThis

可以在 node 或者其他 js 中使用的 window 对象，包含 window 中的方法属性
