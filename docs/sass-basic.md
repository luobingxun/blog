# sass

## 一、sass 基本命令使用

1、安装

npm install sass

2、编译 sass 文件

sass sass/style.scss:css/style.css

3、自动监听编译

sass --watch sass:css //sass,css 为监视的目录

## 二、sass 编译之后的输出格式

1、嵌套编译

![截屏2021-03-14 下午1.59.16](/Users/xlz/Desktop/截屏 2021-03-14 下午 1.59.16.png)

2、紧凑格式

编译时使用指令 sass --watch sass:css --style compact，常用格式

3、压缩格式

编译时使用指令 sass --watch sass:css --style compressed

![](/Users/xlz/Desktop/截屏 2021-03-14 下午 2.19.50.png)

4、展开格式

编译时使用指令 sass --watch sass:css --style expanded

![](/Users/xlz/Desktop/截屏 2021-03-14 下午 2.21.42.png)

## 三、基本语法（一）

1、定义变量使用变量

使用$来定义变量，在样式属性需要使用变量的地方引用即可

2、嵌套

![](/Users/xlz/Desktop/截屏 2021-03-14 下午 2.29.38.png)

3、嵌套属性

![](/Users/xlz/Desktop/截屏 2021-03-14 下午 2.33.29.png)

4、嵌套使用父选择器

![](/Users/xlz/Desktop/截屏 2021-03-14 下午 2.35.16.png)

5、Mixin 混合的使用

![](/Users/xlz/Desktop/截屏 2021-03-14 下午 2.36.53.png)

## 四、基本语法（二）

1、Mixin 传递参数

![](/Users/xlz/Desktop/截屏 2021-03-14 下午 2.47.10.png)

2、继承

继承选择器样式会将选择器和后代选择器都继承

![截屏2021-03-14 下午2.49.16](/Users/xlz/Desktop/截屏 2021-03-14 下午 2.49.16.png)

3、@import 引入

可以在 scss 中使用@import 引入其他的 scss 文件，但是引入的 scss 文件命名需要在开头使用\_命名

4、注释

/\*\*/ 多行注释

//单行注释

注：注释一半会在编译的 css 文件中，但是如果使用 compressed 格式编译则不存在，可以在注释中加！，例如：/_ !_/ 会被编译进 css 文件中

## 五、数据类型

1、number 类型

可以进行数字的加减乘除

加减时：如果两个数都有 px，则结果有 px，如果只有一个操作数有 px 单位，则结果有 px，结果为数据加减的结果

乘除时：乘法时，如果只有一个乘数有 px 单位，结果为数字相乘，单位 px，如果两个数都有 px，则结果为数字相乘，单位 px\*px

​ 除法时，如果两个数都有 px，则结果不含有 px，如果只有其中一个有，则结果含有 px

​ number 类型常用函数

```scss
$W:16.6px;
abs(-10px)  //结果10px
round($W)   //结果17px
ceil($W)    //结果17px
floor($W)		//结果16px
percentage(560px / 19px) //结果2947.3684210526%
min(1,2,4) //1
max(2,3,5) //5
```

2、string 类型

$bg = red //string 类型

常用函数

```scss
>> $string:"hello world"
"hello world"
>> to-upper-case($string)     //转大些
"HELLO WORLD"
>> to-lower-case($string)    //转小写
"hello world"
>> str-length($string)				//获取长度
11
>> str-index($string,"he")		//查找i字符串下标
1
>> str-insert($string,"uu",4)  //插入字符串
"heluulo world"
```

3、颜色类型

#000000、red、rgb 等都是颜色类型数据

常用函数

```scss
//1、rgb和rgba
body {
  background-color: rgb(234, 234, 234);
  color: rgba(3, 5, 6, 0.1);
}
//2、hsl和hsla
body {
  background-color: hsl(45, 60%, 70%);
  color: hsla(45, 60%, 70%, 0.6); //参数分别为色相、饱和度、明度、透明度
}
//3、adjust-hue 调整色相
$bg: #ffffff;
body {
  background-color: adjust-hue($bg, 34deg); //第二个参数为deg
  color: hsla(45, 60%, 70%, 0.6);
}
//4、saturate和desaturate  调整饱和度，增加和减少饱和度
$bg: #ffffff;
body {
  background-color: saturate($bg, 10%); //增加10%饱和
  color: desaturate($bg, 10%); //减少10%饱和度
}
//5、lighten和darken   调整明度 增加和减少明度
$bg: #ffffff;
body {
  background-color: lighten($bg, 10%); //增加10%饱和
  color: darken($bg, 10%); //减少10%饱和度
}
//6、opacify和transparentize   减少和增加透明度
$bg: #ffffff;
body {
  background-color: opacify($bg, 0.4); //减少透明度
  color: transparentize($bg, 0.6); //增加透明度
}
```

4、list 列表类型

```scss
>> $color:("#000000" "#123123" "#453231")
"#000000" "#123123" "#453231"
>> length($color)  				//1、获取长度
3
>> nth($color,2)					//2、返回下标字符串
"#123123"
>> index($color,"#000000") 	//3、返回查找序号
1
>> append($color,("#234234"))	//4、列表追加
"#000000" "#123123" "#453231" "#234234"
>> join($color,("#342342"))		//5、合并列表
"#000000" "#123123" "#453231" "#342342"
>>
```

5、map 类型

```scss
>> $color:("o":"#231232","d":"#124353")
("o": "#231232", "d": "#124353")
>> length($color)			//1、获取长度
2
>> map-get($color,"o")  //2、获取值
"#231232"
>> map-keys($color) 		//3、获取键
"o", "d"
>> map-values($color)		//4、获取值
"#231232", "#124353"
>> map-has-key($color,"o")	//5、是否存在键值
true
>> map-merge($color,("u":"#234234"))	//6、合并
("o": "#231232", "d": "#124353", "u": "#234234")
>> map-remove($color,"u")	//7、删除
("o": "#231232", "d": "#124353")
>>
```

## 六、控制语法（一）

1、boolean 类型

在 scss 中也可以使用< > <= >= not and 等运算符。

2、interpolation 在指定位置插入变量

```scss
$bg: #ffffff;
$name: 'yyyy';
body {
  background-color: opacify($bg, 0.4); //减少透明度
  color: transparentize($bg, 0.6); //增加透明度
  h1-#{$name} {
    color: $bg;
  }
}
```

3、@条件判断的使用

```scss
$mark: true;
body {
  background-color: turquoise;
  @if $mark {
    color: violet;
  }
  @if $mark {
    font-size: large;
  } @else {
    font-size: medium;
  }
  @if $mark {
    font-size: large;
  } @else if() {
    font-size: medium;
  }
}
```

4、@for 循环的使用

```scss
$num: 5;
@for $i from 0 through $num {
  info-#{$i} {
    font-size: 12px * $i;
  }
}
//编译产生的结果
info-0 {
  font-size: 0px;
}
info-1 {
  font-size: 12px;
}
info-2 {
  font-size: 24px;
}
info-3 {
  font-size: 36px;
}
info-4 {
  font-size: 48px;
}
info-5 {
  font-size: 60px;
}
```

5、@each 便利使用

```scss
$msg: warn error success;
@each $info in $msg {
  info-#{$info} {
    color: 12px;
  }
}
//编译产生的结果
info-warn {
  color: 12px;
}
info-error {
  color: 12px;
}
info-success {
  color: 12px;
}
/*# sourceMappingURL=style.css.map */
```

## 七、控制语法（二）

1、@while 的使用

```scss
$num: 3;
@while $num>0 {
  color-#{$num} {
    color: $num * 12px;
  }
  $num: $num - 1;
}
//结果
color-3 {
  color: 36px;
}
color-2 {
  color: 24px;
}
color-1 {
  color: 12px;
}
```

2、@function 函数的使用

```scss
@function getColor($bg) {
  @return $bg;
}
body {
  background-color: getColor(#123123);
}
//结果
body {
  background-color: #123123;
}
```

3、警告和错误@warn 和@error

```scss
$mark: true;
@if $mark {
  @warn "warn";
} @else {
  @error "error";
}
```
