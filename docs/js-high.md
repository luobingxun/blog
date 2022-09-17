# javaScript 高级

# 第一部分

## 1、数据类型及判断

1）数据类型

基本数据类型：string、number、boolean、null、undefined、symbol

对象（引用）数据类型： Object、Function  、Array

2）判断类型方式

typeof：基本数据类型中除了 null 判断为 object，其余基本判断为自身，引用数据类型                          中除了 Function 判断为 function，其余均判断为 object

instanceof：判断 A 是否是 B 的实例

===：用来做为精准判断，只能判断 null、undefined

## 2、null、undefined 的区别

1）undefined 表示定义未初始化

2）null 表示定义并赋值未 null，将一个变量赋值未 null 表示这个变量将要赋值成为一个对           象。

3）将一个对象赋值未 null，标识该对象未一个垃圾对象，将会被垃圾回收器回收、释放内           存。

4）如何区分变量和引用类型：变量在栈中存储的是变量值，引用类型存储的是地址值。

## 3、xxx.xxx 访问对象

如果通过'.'去访问对象属性，表示点前面是一个地址，会通过该地址去堆中查找对应的对      象，再去读取对象中的属性。

## 4、相关问题

1）let a = xxx 中 a 存储的是什么

如果 xxx 是一个基本数据类型，则存储数据值。

如果 xxx 是一个引用类型，则存储的值是一个地址

2）引用之间的赋值

引用之间的赋值，实际上是地址之间的赋值，a 的地址赋值一份给 b，此时 a 和 b 指向同              一个对象，如果其中的一个引用改变对象中的值，其他引用都会反应出来。

```javascript
var a = { name: 'iii' };
var b = a;
//在这里a、b指向同一个对象
```

3）函数调用时传递引用

```javascript
//情景一
var a = { name: 'iiii' };
function setName(obj) {
  obj.age = 18;
}
setName(a);
//此时调用函数之后，会将a对象的地址复制一份给obj，a和obj指向同意快内存区域。在函数中
//obj.age = 18, 则表示往相同的内存区域中添加属性age

//情景二
function setObj(obj) {
  obj = { test: true };
}
setObj(a);
/*
     此时obj和a指向同意快内存区域，但是在函数中obj引用指向了另外的一个内存对象，不存在
 一个改变另外一个也改变的情况
 */
```

4）栈中存储的一般是全局变量和局部变量，堆中存储的是对象

## 5、js 函数调用的时候传递参数，是值传递还是引用传递

都是值传递，如果传递的是引用类型，则传递的是一个地址值，

如果是非引用类型，传递的则是数据值。

## 6、js 如何管理内存

1）周期：分配内存=>操作内存=>释放内存

2）释放内存：

函数中分配的变量和存储空间，在函数调用结束之后会被自动释放。

引用类型的变量需要先标识成为垃圾对象，由垃圾回收器自动回收。

# 第二部分

### 1、对象

1）

```javascript
var obj = {
    name:'iii'
    age:18,
    setName: function (name){
    this.name = name;
    }
    setAge: funciton (age){
        this.age = age;
    }
}

//对象中可以设置任意的类型和变量，函数、对象、数组可以层层嵌套

```

2）访问属性的两种方法区别

a、通过点访问属性

b、通过[]访问属性

通过点访问：属性名固定

通过[]访问：需要通过变量来访问属性，或者字符串方式

### 2、函数

1）定义函数的两种方式

```javascript
//声明式
function name() {}

//表达式
const name = function () {};
```

2）调用函数的方式

a、name()

b、obj.name()

c、name.apply/call(obj)

d、new name()

### 3、自执行函数(匿名函数)

```javascript
//自执行函数定义，不需要手动调用，而是自动调用
(function () {
  console.log('name');
})();

/*
    自执行函数用途：
    1、隐藏实现
    2、避免污染全局变量
    3、js模块化
*/
```

### 4、函数中的 this

当前调用函数的谁，this 就指向谁

```javascript
function person (name){
    this.name = name;
    this.setName = function (name){
        this.name = name;
    }
}

const p = new person('iii')
person('fff')  //此时this为window
p.setName('ggg') //此时this为实例对象的this
[].prototype.call(name)  //此时的this为name


const test = person.setName
test() //此时的this为window对象
```

# 第三部分

### 1、函数原型 prototype

### 2、显示原型和隐式原型

### 3、原型链

### 4、原型补充

## 5、instanceof
