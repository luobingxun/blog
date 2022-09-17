# TypeScript

## 一、安装、编译 ts、配置 VScode 自动编译

​ 1、安装：npm install typescript

​ 安装完毕之后可以使用 tsc --v 测试是否安装成功

​ 编译.ts 文件：使用使用 tsc + ts 文件.ts

​ 2、配置 VScode 自动完成编译

​ 在当前项目文件夹下面使用：tsc --init 指令生成 config 配置文件

​ 在配置文件中可以找到设置编入输出路径

```javascript
"outDir": "./js",
```

​ 在 VS code 终端找到运行任务，选择 typescript 项即可完成自动编译配置

## 二、typescript 中的数据类型

​ 注：变量的定义可以先声明后赋值，使用 typescript 定义变量和 javascript 定义变量和使用类似，只是需要加上变量类型限定，制定类型之后不可以去赋值其他类型的数据，使用和 javascript 中的使用相同

​ 1、boolean 类型

```typescript
var mark: boolean = true;
var mark: boolean = false;
```

​ 2、number 类型

```typescript
var a: number = 12;
var b: number = 1.22;
var c: number = 1.3424234;
```

注：number 类型包括整、浮

​ 3、string 类型

```typescript
var str: string = 'xiaolizi';
```

​ 注：单双引号生命字符串

​ 4、array 类型

​ 定义数组的三种方式

```typescript
// 方式一
var arr0: number[] = [1, 2, 3, 4];
// 方式二
var arr1: Array<string> = ['1', '2', '3'];
// 方式三
var arr2: any[] = ['1', 2, 'xiao'];

// 注：可更具不同的类型需求定义不同类型的数组。例如：
var arr3: string[] = ['1', '2', '3'];
```

​ 5、tuple 类型

```typescript
var tuple: [string, number, boolean, string] = ['123', 12, true, 'xiao'];
//注：可以根据元组元素类型自定义，但是赋值必须是制定类型的数据
```

​ 6、enum 类型

```typescript
//使用方式一：定义枚举类型、去定义变量，变量值只能在枚举类型中去取值
enum color {
  red = '#DC143C',
  blue = '#0000FF',
  green = '#008000'
}
var tag: color = color.red;
console.log(tag);

//使用方式二：可以直接打印和使用定义的枚举类型中的值
var str: string = color.blue;
console.log(str);

//使用三：如果在定义枚举的时候没有给枚举变量赋值，那么使用枚举变量时，默认为枚举类型下标
enum color {
  red,
  blue,
  green
}
console.log(color.red); //打印结果为0
```

​ 7、any 类型

```typescript
var a: any;
a = 0;
console.log(a); //输出0，number类型
a = 'xiao';
console.log(a); //输出xiao。string类型

//注：使用any类型定义变量，可以将变量赋不同的值，和js中的var变量类似，常常用来定义dom对象，如果不使用any来定义dom对象，回报红线
var div: any = document.getElementById('div');
```

​ 8、undefined 和 null 类型

​ undefined 类型

```typescript
//1、在定义变量时，可以先声明变量不赋值，但是后面使用需要赋值

//2、定义为undefined的变量，不能复制为其他类型的值，只能赋值为undefined，赋为其他类型会报错
var a: undefined;
a = 1; //报错
a = undefined; //不报错

//3、可以选择性的给变量定义类型，如果赋值则为制定类型的值，如果不赋值则为undefined
var a: number | undefined;
console.log(a); //结果为undefined
a = 12;
console.log(a); //打印12
```

​ null 类型

```typescript
//1、定义为null的变量，不能复制为其他类型的值，只能赋值为null，赋为其他类型会报错
var a: null;
a = 1; //报错
a = null; //不报错

//2、可以选择性的给变量定义类型，如果赋值则为制定类型的值，如果不赋值则为undefined,可以设置为null
var a: number | null | undefined;
console.log(a); //结果为undefined
a = 12;
console.log(a); //打印12
```

​ 9、void 类型

```typescript
//void无类型，通常用来定义无返回值的函数
function printName(name: string): void {
  console.log(name);
}

//typescript中定义函数方式，同上
//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
```

​ 10、never 类型

```typescript
//never类型表示的是那些永不存在的值的类型，例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
var a: never;
a = () => {
  throw new Error(message);
};
```

## 三、typescript 中的函数

1、只要 js 中允许的函数定义方式，在 typescript 中都允许，知识需要加上函数返回值类型和参数类型限制即可

2、可选参数

```typescript
function get(name: string, age?: number): string {
  if (age) {
    return name + age;
  } else {
    return name;
  }
}
// console.log(get('limingwei'));  结果limingwei
console.log(get('limingwei', 18)); // 结果limingwei18

//注：参数列表第一个参数不能设置为默认参数
```

3、默认参数

```typescript
function get(name: string = 'xiaolizi', age: number = 18): string {
  if (age) {
    return name + age;
  } else {
    return name;
  }
}
console.log(get('limingwei')); //结果xiaolizi18
/*
	注：1、如果给函数参数设置默认值，在调用的时候可以不用传递参数
		 2、如果给函数第一个参数设置默认值，而后面的参数没有设置默认值,则第一个参数设置的默认值相当于无效，在调用的时候不许给第一个参数传值
*/
```

4、剩余参数

```typescript
function get(...args: any[]): string {
  return args[0] + args[1];
}
console.log(get('xiaolizi', 89));

//注：如果第一个参数需要独立传递，剩余参数需要放在参数列表最后面，如果不放在最后，传递的所有参数都会被剩余参数接受，则后面设置的参数无效，如下：
function get(...args: any[], num: number): string {
  return args[0] + args[1] + num;
}
console.log(get(78, 'xiaolizi', 89));
//以上方式会编译不通过
```

5、函数的重载

```typescript
function get(name: string): string;
function get(age: number, sex: string): number;
function get(param1: any, param2?: any): any {
  if (param2) {
    return param1 + param2;
  } else {
    return param1;
  }
}
console.log(get(12, '男')); //结果12男
console.log(get('xiaolizi')); //结果xiaolizi

//注：在从在时需要重参数最少的函数开始适配，参数最少的为实体参数，后面参数多的函数在重载方法参数列表中的可选参数，可在重载方法中去对可选参数判断，决定调用哪一个函数
```

## 四、类的定义、继承、访问修饰符

1、累的定义

```typescript
class person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  setInfo(name: string, age: number): void {
    this.name = name;
    this.age = age;
  }
  getinfo(): string {
    return this.name + this.age;
  }
}
var p = new person('limingwei', 18);
console.log(p.getinfo());

//累的定义和es6相同，知识加上类型限定
```

2、类的继承

```typescript
class person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getinfo(): string {
    return this.name + this.age;
  }
}
class XLZ extends person {
  sex: string;
  constructor(name: string, age: number, sex: string) {
    super(name, age); //super初始化
    this.sex = sex;
  }
  showXLZ(): void {
    console.log(this.getinfo()); // 调用父类中的方法
    console.log(this.sex);
  }
}
var p = new XLZ('limingwei', 18, '男');
p.showXLZ(); //结果limingwei18 男

/*
		注：1、继承父类，需要在子类中使用super()来初始化从父类中继承的属性
			 2、继承父类，可以在子类中使用this去调用父类中的属性和方法
			 3、如果子类和父类具有相同的同名方法，子类在调用该方法时，会优先调用子类中的同名方法，如果子类中没有该方法，再到父类中去寻找。
*/
```

he3、权限访问修饰符

```typescript
/*
	1、private：使用private修饰的变量和方法，只能在当前类中访问
	2、public：使用public修饰的属性和方法可以在子类，父类，类外部访问
	3、protected：protected修饰的属性和方法只能在父类和子类中去访问，不能在类外进行访问
*/
```

## 五、静态方法和静态属性、多态、抽象类

1、静态方法和静态属性的定义

```typescript
class person {
  name: string;
  age: number;
  static num: string = '123123'; //静态属性
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  static getNum(): string {
    //静态方法
    return person.num;
  }
  getinfo(): string {
    return this.name + this.age;
  }
}
var per = new person('xiaolizi', 18);
console.log(person.num + person.getNum());
/*
	1、静态方法只能访问静态属性
	2、静态方法和静态属性直接最好直接使用类名去调用
*/
```

2、类的多态

同一个类的不同子类的多种形态，方法的重载

3、抽象类

```typescript
abstract class person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  abstract show(): void; //抽象方法
}
class XLZ extends person {
  //实现抽象类
  constructor(name: string, age: number) {
    super(name, age);
  }
  show(): void {
    console.log(this.name + this.age);
  }
}
var p = new XLZ('xiaolizi', 12);
p.show();
/*
	1、抽象类不能实例化对象
	2、抽象类可以有属性和构造函数
	3、子类去实现抽象类必须是想抽象方法
	4、抽象类可以没有抽象方法
*/
```

## 六、接口的定义、属性接口

```typescript
interface person {
  name: string;
  age: number;
}
function XLZ(info: person): void {
  console.log(info.name + info.age);
}
var obj: any = {
  sex: '男',
  name: 'xiaolizi',
  age: 18
};
// XLZ({name: 'xiaolizi',age: 18})
//XLZ({name: 'xiaolizi',age: 18,sex: '男'})  //错误写法
// XLZ(obj)

/*
	1、可以在使用函数的时候将传递的参数对象单独抽取出来，在这个对象中，只要包含接口中定义的变量，在使用的时候就不会报错
	2、如果在使用的时候，不抽成一个对象，在使用的时候传递参数对象，只能包含接口中规定的属性，不能包含其他属性
	3、抽成一个单独的对象传递参数，在方法中不能获取传递的多余参数，否则报错
	4、使用属性接口去规范方法，传递对象参数时只能包含接口中的属性。
	5、可以使用接口去规范多个属性
*/
```

## 七、函数接口

```typescript
interface functionInter {
  (name: string, age: number): string;
}
var show: functionInter = function (name: string, age: number): string {
  return name + age;
};
console.log(show('limingwei', 12));

/*
函数接口通常如此定义，也可以批量进行规范
*/
```

## 八、索引接口、类类型接口

```typescript
//1、可索引接口
//重要注释：如果接口规范数组，则使用数组方法和length属性时需要在接口中声明餐可以使用，方法中有函数也需要在函数中声明
interface inter {
  [index: number]: string; //规范数组的接口，index下标值，string数组元素值
}
var arr: inter = ['xiao', 'li', 'zi'];
console.log(arr);
interface interobj {
  [index: string]: string; //规范对象类型接口，index索引属性值，string属性值类型
}
var obj: interobj = { name: 'xiaolizi', age: '18' };
console.log(obj);

//2、类类型接口
interface classInter {
  name: string;
  age: number;
  show(name: string, age: number): void;
}
class XLZ implements classInter {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  show() {
    console.log(this.name + this.age);
  }
}
/*
	注：类类型接口，去实现该接口的类必须包含接口中定义的属性可方法，接口中的方法的参数和返回值可以不同甚至可以没有，但是必须要有这个方法
*/
```

## 九、接口的拓展

```typescript
//1、接口继承接口
interface inter1 {
  name: string;
}
interface inter2 {
  age: number;
}
interface inter3 extends inter1, inter2 {}
/*
1、可以使用extends关键字实现接口继承接口
2、可以多继承
*/

//2、一个类可以同时继承抽象类和接口
interface inter1 {
  name: string;
}
abstract class per {
  abstract show(): void;
}
class person extends per implements inter1 {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
  show(): void {}
}
```

## 十、范型函数和范型类

```typescript
//1、范型函数的定义
function show<T>(name: T, age: T): T {
  return name;
}
console.log(show<string>('xiaozili', '18'));
//注：在函数中需要传递什么类型或者传递不同类型，都可以在方法声明时声明

//2、范型类的定义
class person<T, Z> {
  name: T;
  age: Z;
  constructor(name: T, age: Z) {
    this.name = name;
    this.age = age;
  }
  get(): T {
    return this.name;
  }
}
var per = new person<string, number>('xiaolizi', 18);
console.log(per.get());
```

## 十一、范型接口的定义

```typescript
//范型接口的两种定义方法
//方法一
interface inter {
  <T>(name: T, sex: T): T;
}
var get: inter = function <T>(name: T, sex: T): T {
  return name;
};
console.log(get<string>('xiaozili', 'xiao'));

//方法二
interface inter<T> {
  (name: T, sex: T): T;
}
var get: inter<string> = function <T>(name: T, sex: T): T {
  return name;
};
console.log(get('xiaozili', 'xiao'));
```

## 十二、范型作为函数对象参数

```typescript
class sql<T> {
  select(use: T): void {
    console.log(use);
  }
}
//T可以代表一个对象，而sql类可以为多个类进行查询操作
```

## 十三、typescript 中的模块化

​ 1、使用 export 和 import 导出导入模块

​ 2、默认导入和导出

​ 3、统一使用对象导出

## 十四、typescript 中的命名空间

```typescript
//使用命名空间是为类防止函数名称重复
//1、基本定义方式
namespace A {
  export class person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  export class XLZ {
    sex: string;
    constructor(sex: string) {
      this.sex = sex;
    }
  }
  export function get() {}
}
// 实例化对象
var a = new A.person('xiaoliz');
A.get();
//注：如果需要命名空间中的方法或者变量暴露，则需要使用export将其暴露，才能通过命名空间使用
//2、可以将其封装成为一个单独的ts文件，在需要使用的地方导入即可
```

## 十五、类装饰器、属性装饰器

```typescript
/*
1、装饰器作用：用来拓展函数、类、属性、参数的功能
2、装饰器的种类：类装饰器、方法装饰器、参数装饰器、属性装饰器
3、定义装饰器的方式：普通装饰器（不能传递参数）、装饰器工厂（可以传递参数）
*/

//类装饰器
//1、类装饰器的普通定义方式
function classLog(param: any) {
  console.log(param.prototype); ///注：此处的param极为person类对象
  //可以通过该类对象去动态给类添加属性和方法
}
@classLog
class person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
//2、类装饰器的工厂定义方式
function classLog(param: any) {
  return function (target: any) {
    console.log(target); //此处的target为类对象，param为穿时期传递的参数
  };
}
@classLog('xiaolizi')
class person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
var p = new person('xiaozili');
//3、使用类装饰器重载构造函数和方法
function classLog(param: any) {
  return class extends person {
    //使用类继承充血构造方法和函数
    name = 'xiaoliz';
    show(): void {
      console.log('sadsd');
    }
  };
}
@classLog
class person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  show(): void {}
}
var p = new person('xiaozili');

//属性装饰器
//1、属性装饰器的普通定义方式

function propertyLog(param: any, attr: any) {
  console.log(param + attr); //属性装饰器param表示当前类对象，attr表示当前装饰的																	//属性
}
class person {
  @propertyLog
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  show(): void {}
}
var p = new person('xiaozili');
//2、属性装饰器的工厂定义方式
function propertyLog(param: any) {
  return function (target: any, attr: any) {
    //param表示属性装饰器传递过来的参数，target表示类的原型对象，attr表									//示装饰的对象属性
  };
}
class person {
  @propertyLog('xiaolizi')
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  show(): void {}
}
var p = new person('xiaozili');
```

1.

## 十六、方法装饰器、参数装饰器、装饰器的执行顺序

```typescript
//方法装饰器用来动态修改替换方法
//替换方法
function methodLog(param: any) {
  return function (target: any, methodName: any, methodDes: any) {
    methodDes.value = function () {
      //target表示类对象、methodName表示方法名称，methodDes表示方法描述
      //methodDes.value即为该方法名称，通过value即可替换类中的方法
    };
  };
}
class person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @methodLog('xiaolizi')
  show(): void {
    console.log(this.name);
  }
}
var p = new person('xiaozili');

//修改方法
function methodLog(param: any) {
  return function (target: any, methodName: any, methodDes: any) {
    var omethod = methodDes.value;
    methodDes.value = function () {
      //此处对方法修改
      omethod.apply(this); //改变this指向完成方法的修改
    };
  };
}
class person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @methodLog('xiaolizi')
  show(): void {
    console.log(this.name);
  }
}
var p = new person('xiaozili');

//参数装饰器
function paramLog(param: any) {
  return function (target: any, methodName: any, paranIndex: any) {};
} //target类对象，methodName方法名、paranIndex参数下标
class person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  show(@paramLog('12') name: string): void {
    console.log(this.name);
  }
}
var p = new person('xiaozili');

//装饰器执行顺序
//属性装饰器<方法装饰器<参数装饰器<类装饰器
//同一个类、方法、属性、参数有多个装饰器时，从最下面的装饰器开始执行
```

# typescript 补充学习

## 第一个四

### 1、数据类型

​ 1、js 中的数据类型在 typescript 中同样可以用来做类型的限定，包括 Function、object 等

```typescript
enum COLOR {
  RED,
  BLACK
}
interface Demo {
  age: number;
  name: string;
  tag: boolean;
  book: Array<string>;
  teachers: string[];
  run: Function;
  chidren: object;
  someone: [string, number, boolean];
  close: COLOR;
  parent: any;
  son: never;
  wife: undefined | null;
  love: void;
}
```

​ 2、ts 中定义函数的方法

```typescript
let getInfoO: (name: string, age: number) => string;
```

​ 3、undefined 和 null 是所有类型的子类型，可以赋值给所有类型

### 2、枚举类型

```typescript
//1、数字枚举类型：数字枚举可以通过key和value来进行索引
enum DEMO {
  A, //A=1
  B, //B=2
  C //C=3
}
console.log(DEMO.A); //痛殴key来索引，索引值1
console.log(DEMO[1]); //痛殴key来索引，索引值A

//2、字符串枚举：只能通过key来进行索引
enum TYPE {
  NUMBER = 'number',
  STRING = 'string'
}
console.log(TYPE.NUMBER);

//3、异构枚举：数字美剧枚举和字符串枚举
enum MIX_TYPE {
  NUMBER,
  STRING = 'string'
}

//4、含有非常量的枚举

/*
    	1、枚举类型为只读属性，不能赋值，例如：MIX.name = 's' 会提示错误
      	2、在没有确定值成员的枚举中，该成员的值在编译阶段不会被计算出来，只有到执行阶段才会将该值计算
     	3、在非常量的枚举变量之后的成员必须要赋值，否则报错
    */
enum MIX {
  name,
  age = 'age',
  height = Math.random()
}

//5、常量枚举：常量枚举类型在编译阶段会被移除，在使用该枚举值的地方会被计算出值，例如下面A，在编译阶段值计算出来
//之后，TEST枚举类型就会被移除，常量枚举的好处就是减少编译产生的代码量
const enum TEST {
  some = ' string'
}

let A: TEST = TEST.some; //编译阶段A的值已经被算出来String
```

### 3、对象接口

```typescript
// 1、对接口返回的额外数据进行类型的约束
//一下height为借口返回的往外的数据
// 1、通过可选属性约束
interface UserInfo {
  name: string;
  age: number;
  height?: number;
}
const getUserData = (): Promise<UserInfo> => {
  return new Promise((res, rej) => {
    res({
      name: 'xiaoming',
      age: 12,
      height: 56
    });
  });
};

//2、通过字符串索引签名约束
interface UserInfo2 {
  name: string;
  age: number;
  [index: string]: any; //注意数字签名的类型要兼容上面的name、age的类型
}
const getUserData2 = (): Promise<UserInfo2> => {
  return new Promise((res, rej) => {
    res({
      name: 'xiaoming',
      age: 12,
      hieght: 89
    });
  });
};

//3、通过类型断言来约束
const getUserData3 = () => {
  return new Promise((res, rej) => {
    res({
      name: 'xiaoming',
      age: 12,
      hieght: 89
    });
  });
};
const dao = getUserData3() as Promise<UserInfo>;

//2、使用readOnly关键字将一个属性标记为只读属性
interface Y {
  readonly hieght: number;
}
//  此时的height属性为只读属性

//3、字符串索引签名和数字索引签名可以同时使用
interface mixIterface {
  [index: string]: number;
  [index: number]: number;
}
/*
      注：数字索引签名的返回的类型必须为字符串索引签名返回类型的子类型，例如上面的
      数字索引[index:number]:number返回值number类型为 [index:string]:number返回值类型的字类型
    */
```

### 4、函数类型接口

```typescript
//1、函数的四种类型定义方式
//1、方式一
function toArr(arr: number[], info: string): string[] {
  return [''];
}

//2、方式二
let toNumber: (count: number) => number;
toNumber = (count: number): number => {
  return 0;
};

//3、方式三
type toUp = (str: string) => string;
const test: toUp = () => {
  return '';
};

//4、方式四
interface testI {
  (params: string[]): string;
}
const YOU: testI = (params: string[]) => string;

//注：在其他地方定义接口都可以这四种方法去定义，包括接口中定义函数都可以使用这四种方法

//2、使用混合接口做函数的断言使用
interface Inter {
  name: string;
  run: () => void;
}

let getDisplay: Inter = (() => {}) as Inter;
getDisplay.name = '';
getDisplay.run = () => {};
```

## 第二个四

### 1、类型继承补充

```typescript
//1、构造方法私有化，该类不能被继承也不能被实例化
class Dog {
  name: string | undefined;
  private constructor(name: string) {
    this.name = name;
  }
}
//  const RedDog = new Dog('xiaohong')  报错提示只能在能中访问

//2、构造方法使用protected，该类只能被继承不能实例化对象

//3、在构造函数的参数列表中使用public去声明一个变量，则该变量会自动声明为该类的成员属性
class Dog2 {
  constructor(public name: string) {
    this.name = name;
  }
}
//这个地方name为类的数据成员
```

### 2、类与接口的关系

```typescript
// 1、接口不能约束类的非公有成员和构造函数
    interface In {
        new(name:string):void;
        name:string;
    }
    class one implements In {
        private name:string；
        constructor(name:string){
            this.name = name；
        }
    }
    //这种方式会提示：类one错误的实现了接口In

//2、接口可以继承类：将类的所有属性和方法作为接口类型声明的方式添加给接口中
  class M {
    name:string | undefined;
  }
  interface K extends M{}
  const P:K = {}  //提示：类型 "{}" 中缺少属性 "name"，但类型 "M" 中需要该属性
```

### 3、范型函数与接口

```typescript
/*
  1、定义范型函数的四种方法
*/

//NO.1
function findDataFormObj1<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key]);
}

//NO.2
let Fc: <T, K extends keyof T>(obj: T, keys: K[]) => T[K][];
Fc = (obj, keys) => {
  return keys.map(key => obj[key]);
};

//NO.3
type NO = <T, K extends keyof T>(obj: T, keys: K[]) => T[K][];
let findDataFormObj2: NO = function (obj, keys) {
  return keys.map(key => obj[key]);
};

//NO.4
interface NO4 {
  <T, K extends keyof T>(obj: T, keys: K[]): T[K][];
}
// 或者
// interface NO4<T,K extends keyof T>{
//     (obj:T,keys:K[]) : T[K][]
// }
let findDataFormObj4: NO4 = function (obj, keys) {
  return keys.map(key => obj[key]);
};

/*
    2、给类型添加默认的类型，使用函数调用不传递数据类型，使用类型推断调用
*/
let testFc: <T>(a: T, b: T) => string;
testFc = (a, b) => {
  return `${a}--${b}`;
};
//调用,使用默认类型推断
testFc(12, 45);
//调用,使用默认类型
let testFc2: <T = number>(a: T, b: T) => string;
```

### 4、范型类与范型约束

```typescript
/*
    1、范型类中不能给静态方法和静态属性使用范型约束
*/
```

## 第三个四

### 1、类型推断

```typescript
/*  
    类型推断
*/
// 1、从右到左的推断
let num = 34; //num被推断为number类型，相当于let num:number = 34
let arr = [45, '']; //arr被推断为 let arr: (string | number)[]

//2、从左到右的推断
window.onsubmit = event => {}; //event被推断为window提交类型的submit类型

//3、类型断言
let a: any;
let b = <number>a;
let c = a as number;
```

### 2、类型兼容

```typescript
/*
    类型兼容
*/

/*
    1、接口属性类型兼容
        类型成员多的可以赋值给类型成员少的
*/
interface AA {
  name: string;
}
interface BB {
  name: string;
  age: number;
}
let AASimple: AA = {
  name: 'AA'
};
let BBSimple: BB = {
  name: 'BB',
  age: 18
};
//类型少的兼容类型多的
AASimple = BBSimple;

/*
    2、函数类型兼容性
*/
//NO.1：函数作为参数：参数类型多的函数兼容参数类型少的函数
type PFC = (name: string, age: number) => void;
function AFc(name: string) {}
function testFAB(fc: PFC) {}
//多兼容少
testFAB(AFc);

//NO.2：固定、可选、剩余参数的兼容性
let f1 = (name: string, age: number) => {};
let f2 = (name?: string, age?: number) => {};
let f3 = (...args) => {};
//固定参数兼容可选和剩余
f1 = f2;
f1 = f3;
//可选不兼容固定和剩余
//剩余参数兼容固定和可选
f3 = f1;
f3 = f2;

//NO.3：函数参数类型兼容：函数兼容对应的参数类型需要相同

//NO.4：函数返回值兼容：函数返回值少的函数兼容返回值多的函数
let demoFc1 = (name: string): { name: string; age: number } => {
  return { name: '', age: 89 };
};
let demoFc2 = (name: string): { name: string } => {
  return { name: '' };
};
demoFc2 = demoFc1;

//NO.5：函数重载的兼容性：重载函数兼容，重载函数的参数列表必须为函数定义的参数列表最大项
function demoFc3(name: string, age: number): void;
function demoFc3(name: string): void;
function demoFc3(name: string, age: number): void {} //参数列表参数为最多项

/*
    3、枚举类型的兼容性
*/

//NO.1：字符、数字枚举成员和string、number类型兼容
enum Str {
  STRING = 'string',
  NUMBER = 1
}
let N: number = Str.NUMBER;
let S: string = Str.STRING;

//NO.2：枚举类型和枚举类型相互不兼容
enum T {
  NAME
}
let G: Str = T; //不兼容

/*
    4、类的兼容性
*/
//NO.1：在只有共有且相同的属性和方法的两个类相互兼容,若其中一个有非公有属性则必须要为可选属性
class W {
  name: string;
  age?: number;
  constructor(name: string) {
    this.name = name;
  }
  run(a: number) {}
}
class R {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  run(a: number) {}
}
let w = new W('');
let r = new R('');
w = r; //相互兼容

//NO.2：静态属性和静态方法不参与兼容性判断

//NO.3：子类和父类之间相互兼容

/*
    5、泛型之间的兼容性：定义的两个泛型接口，如果没有执行具体类型，则相互兼容
*/
```

### 3、类型保护

```typescript
/*
		类型保护：使用typeof、instanceof、in、和自定义类型保护作为类型保护的实现
*/
```

### 4、交叉类型和联合类型

```typescript
/*
    交叉类型和联合类型
*/

//1、交叉类型：属性类型的合并，分为同名基础属性合并，非同名基础属性合并
type union = {
  age: number;
} & {
  name: string;
};
let per: union = { age: 67, name: '' };

//2、联合类型：两个之中其一，或
type OR = string | number;

//3、字面量类型
type DD = 'age' | 'name'; //字面量字符类型
type NN = 3 | 6 | 2; //字面量数字类型
type OBJ = { name: 'X' } | { age: 89 }; //紫米纳凉对象类型

//4、根据多个接口中的共有属性形成不同的处理区块,可以利用该方法，来处理不同的逻辑
interface AAA {
  name: 'AAA';
  sex?: string;
  height: number;
}
interface BBB {
  name: 'BBB';
  num: number;
}
function getUInfo(per: AAA | BBB) {
  switch (per.name) {
    case 'AAA':
      return per.name + per.sex + per.height;
      break;
    case 'BBB':
      return per.name + per.num;
      break;
    default:
      return (e => new Error(e))(per);
  }
}
```

## 第四个四

### 1、可索引类型

```typescript
/*
    1、可索引类型
*/

function getObjData<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key]);
}

//接口可以当作对象来进行访问
type keys = keyof AAA; //key类型为AAA接口key的联合类型
type key = AAA['height']; //key的类型为number类型
```

### 2、映射类型

```typescript
/*
    2、映射类型：例如omit、recored、include、exclude、pick、require、partial、returnType
        Readonly、Extract、NonNullable等;
*/
```

### 3、条件类型

```typescript
/*
	T extends K ？ T : never. 如果类型T可以赋值给类型K，则返回类型T否者返回never类型
	类似 A｜B extends T ？T：never
	可分开 A extends T ？T：never
				B extends T ？T：never
*/
type O = string extends AAA ? never : string;
```

## 第五个四

### 1、ES6 与 common JS 的模块化系统

```typescript
/*
	1、ES6的模块化
	三种倒入到处方式
*/
//模块到导出
export default  somemodule
export {a,b} from moduleA
export const a = a;

//模块导入
import some as one from 'somemodule'
import {a,b} from 'moduleA'
import a from 'a'


/*
	2、commonjs模块化
	三种导出，一种导入
*/
//导入
const path = require('path')

//导出
export.a = 8
module.export = {}
export obj	//顶级导出，使用该方式导出之后不允许有其他的导出方式


```

### 2、命名空间

```typescript
//1、定义方式
namespace A {
	export function AA(){}
  	export aa = 8
}

//2、ts中引入声明模块：三斜杠指令
  /// <referance path='./a.ts'>
```

### 3、声明合并

```typescript
/*
  1、普通接口属性的声明合并
*/

interface IA {
  name: string;
  age: number;
}

interface IA {
  sex: string;
}

//NO.1：如果定义了相同名称的接口，那么该名称约束数据的时候，数据需要包含所这个同名接口的所有属性
/*
            此时mockData约束IA接口中有name、age、sex三个属性，等同于
            interface IA {
              name: string;
              age: number;
              sex: string;
            }
    */

//NO.2：如果两个同名接口含有相同的属性，该同名属性的类型必须要相同，否则报红
const mockData: IA = {
  name: 'X',
  age: 89,
  sex: 'sex'
};

/*
    2、接口中函数的声明合并
      同属性一样，同名的接口去约束数据的时候，该数据需要包含所有的接口方法
*/
interface FC {
  run(): void;
  infoP: (a: 'age') => string;
  getNumber(num: number): number;
}
interface FC {
  eat: () => void;
  info: (a: 'age') => string;
  getNumber(a: number, b: number): number;
}
// NO.1：此时的P需要包含所有的接口方法
const P: FC = {
  run: function (): void {},
  eat: function (): void {},
  info: function (a): string {
    return a;
  },
  infoP: function (a): string {
    return a;
  },
  getNumber: function (a: any, b?: any): any {
    return a + b;
  }
};
//NO.2：当遇到同名的函数时，在约束数据的需要在该数据中定义重载函数去兼容改同名的函数
//NO.3：函数的合并顺序为从下到上、从字面量到非字面量
//例如上面：FC接口合并之后为
interface FC {
  info: (a: 'age') => string;
  infoP: (a: 'age') => string;
  eat: () => void;
  getNumber(a: number, b: number): number;
  run(): void;
  getNumber(num: number): number;
}

/*
    3、命名空间的声明合并
      在定义同名的命名空间的时候，会对同名的命名空间属性和方法进行合并，
      但是不能在同名的命名空间中含有相同的属性和函数
*/

/*
    4、命名空间和函数的声明合并
      命名空间中函数同名的时候会发生声明合并，但是前提是，同名的命名空间是定义在函数之后
      相当于子函数的原型上面添加属性和方法
*/
//此时的命名空间相当于给方法namespaceFc添加命名空间中的属性和方法
function namespaceFc() {}
namespace namespaceFc {
  export function getSum() {}
  export const a = 0;
}

/*
    5、命名空间和类同名时发生声明合并
        命名空间和类发生声明合并的前提是，命名空间需要定义在类之后，相当于给类添加命名空间中的属性和方法
        相当于在类的原型上面添加属性个方法
*/
//此时的namespaceClass中含有name属性个run方法
class namespaceClass {}
namespace namespaceClass {
  export const name: string | undefined = '0';
  export function run() {}
}
namespaceClass.run();

/*
    6、命名空间和枚举同名发生声明合并：命名空间在前在后定义都会发生声明合并
    相当于在枚举中添加属性成员和方法
*/

enum namespaceEnum {}
namespace namespaceEnum {
  export const NUMB = 9;
  export function run() {}
}
namespaceEnum.NUMB;
namespaceEnum.run();
```

### 4、编写声明文件

1、编写声明文件：为单个文件、类库、模块编写声明文件

```typescript
/*
	1、为单个文件编写类型声明文件，需要开启js的类型检查
	此时给$编写声明文件，$这个函数文件没有对应的@types/$类型声明文件，因此需要手动的去添加声明文件，否者在使用的时候会爆红线，
	ts不知道$.get等
*/
declare function $(){}
declare namespace ${
  export function get():void
  export const find = () => any
}


/*
	2、为模块编写声明文件，前提该模块没有对应的@types/**类型文件，需要开启ts中检查js
	导出方式 export = React;
*/

export = React;
export as namespace React;
declare namespace React {
  //react中的方法
}

 /*
	3、为模块编写声明文件，前提该模块没有对应的@types/**类型文件，需要开启ts中检查js
	导出方式  export as namespace moment;
*/

  declare function moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;
declare function moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;

declare namespace moment {

  type CalendarSpecVal = string | ((m?: MomentInput, now?: Moment) => string);

    // any additional properties might be used with moment.calendarFormat
    [x: string]: CalendarSpecVal | undefined;
  }
  //......
}

export = moment;
export as namespace moment;

```

2、声明文件插件

用来给一些类库、模块添加自定义的方法和属性

```typescript
/*
  1、给模块添加自定义的方法和属性
*/

import moment from 'moment';
declare module 'moment' {
  export function addNum(a: number): number;
  export const b: number;
}
moment.addNum = function (a: number) {
  return a + moment.b;
};

/*
  2、给全局的变量添加自定义的方法和属性
*/

declare global {
  namespace $ {
    export function aa(): void;
  }
}
$.aa();
```

3、声明文件依赖

```typescript
/// <reference types="sizzle" />			//模块依赖
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;
```
