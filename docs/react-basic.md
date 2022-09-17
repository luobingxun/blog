# React

## 一、react 入门

### 1、react 的基本使用

```html
<!-- 1、创建容器 -->
<div id="app"></div>
<!-- 2、引入核心文件 -->
<!-- 核心源码 -->
<script src="../react-17.0.1/react.development.js"></script>
<!-- react库中操作DOM的源码 -->
<script src="../react-17.0.1/react-dom.development.js"></script>
<!-- 使用JSX必备 -->
<script src="../react-17.0.1/babel.js"></script>
<!-- 3、使用babel格式，才能解析JSX格式 -->
<script type="text/babel">
  // 4、创建虚拟dom
  const dom = <h1>基本使用</h1>;
  // 5、渲染虚拟DOM
  ReactDOM.render(dom, document.getElementById('app'));
</script>
```

### 2、创建 DOM 的两种方式

```javascript
//1、使用JSX方式创建虚拟DOM
const dom = (
  <div>
  <h1>创建虚拟DOM方式</h1>
  </div>
)
ReactDOM.render(dom, document.getElementById('app'))

//2、使用React.createElement创建
const dom = React.createElement('div',{id:'ni'},'你好')//使用方式1
const dom = React.createElement('div',{id:'ni'},React.createElement('div',{id:'ni'},)		//使用方式二，第一个参数为创建的DOM，第二个为DOM属性，第三个个DOM内容
ReactDOM.render(dom, document.getElementById('app'))

//3.使用JSX创建的虚拟DOM最终会被使用React.createElement创建，然后转换成为真实DOM
```

### 3、真实 DOM 和虚拟 DOM

​ 1、虚拟 DOM 是一个 object 对象

​ 2、虚拟 DOM 比真实 DOM 轻小，一位虚拟 DOM 只需要在 React 中操作，不需要那么多属性

​ 3、虚拟 DOM 最终对转换成为真实的 DOM，渲染在页面上面

### 4、JSX 的语法规则

​ 1、使用 JSX 创建 DOM 不需要使用单双引号

​ 2、在 JSX 中通过{}来使用 JS 表达式

​ 3、在 JSX 中给元素添加样式类通过 className

​ 4、在 JSX 中给 style 添加内联样式需要使用 style="{{color:red}}"方式

​ 5、JSX 中只允许有一个根标签

​ 6、JSX 中的标签必须要闭合

​ 7、JSX DOM 元素大小写

​ 小写：如果 JSX 中的元素小写，则会将元素转换成为 html 的同名标签，如果在 html 中没有同 名的标签，则会报错

​ 大写：JSX 中的元素首字母大写，则会去找到对应的组件，如果没有，则会报错

​

```html
<div id="app"></div>
<script src="../react-17.0.1/react.development.js"></script>
<script src="../react-17.0.1/react-dom.development.js"></script>
<script src="../react-17.0.1/babel.js"></script>
<script type="text/babel">
  const dom = (
    <div className="bg">
      <h1>创建虚拟DOM方式</h1>
      <div style={{ color: 'green' }}>{Math.max(12, 34, 12)}</div>
    </div>
  );
  ReactDOM.render(dom, document.getElementById('app'));
</script>
```

​

### 5、遍历列表展示

使用数组方法一次返回一 li 即可

```javascript
<script type="text/babel">
  let bookInfo = ['西游记','红楼梦','水浒传'] const DOM = (
  <ul>
    {bookInfo.map(item => {
      return <li>{item}</li>;
    })}
  </ul>
  ) ReactDOM.render(DOM, document.getElementById('app'))
</script>
```

## 二、创建组件的方式

### 1、react-devtools 工具安装使用

### 2、函数式组件

```javascript
 <script type="text/babel">
     function FunctionDOM() {
     return (
       <div>
       <h1>函数式组件</h1>
       </div>
     )
   }
  // 1、使用FunctionDOM方式的标签会出错，<functionDOM/>组件和函数必须要大写，<FunctionDOM/>正确写法
  // ReactDOM.render(FunctionDOM, document.getElementById('app'))
  // ReactDOM.render(<functionDOM/>, document.getElementById('app'))
  ReactDOM.render(<FunctionDOM/>, document.getElementById('app'))

  //2、在函数式组件中的this初始为undefined，原因是因为JSX启用局部严格模式

  /*3、执行ReactDOM.render(<FunctionDOM/>, document.getElementById('app'))发生了什么？
  		1、react回去解析组件标签，并找到对应的组件
  		2、如果发现组件是函数定义的，回去调用函数，将函数返回的虚拟DOM转换成为真实的DOM并渲染				 的页面上。
  */
 </script>
```

### 3、类式组件（常用）

```javascript
<script type="text/babel">
    //基本使用
        class ClassComponent extends React.Component {
            render() {
                console.log(this)
                return (
                    <h1>类式组件</h1>
                )
            }
        }
        ReactDOM.render(<ClassComponent/>, document.getElementById('app'))
    /*
        1、组件默认从React.Component类中继承
        context: {}
        props: {}
        refs: {}
        state: null
    */

    /*
        2、render方法为组件默认调用的方法，属于组件实例的方法
            类中的this代表当前组件实例对象
    */

    /*
        3、执行ReactDOM.render(<ClassComponent/>, document.getElementById('app'))发生了什么
            1、react会解析组件，并找到对应的组件
            2、发现组件是类定义的，创建组件的对象实例，调用render方法
            3、将render方法返回的虚拟DOM转换成为真实的DOM，并且渲染到页面上面
    */
    </script>
```

## 三、React 三大属性- state

### 1、类式组件中的事件

```javascript
<script type="text/babel">
        class MyComponent extends React.Component {

            //1、使用构造函数必须使用super传递props
            constructor(props){
                super(props)
            }

            clickHandle(){
                console.log('类中事件注册使用');
            }
            render() {
                //3、事件绑定方式如下
                return (
                    <div>
                        <button id="btn" onClick={this.clickHandle}>点击事件</button>
                    </div>
                )
            }
        }

        ReactDOM.render(<MyComponent/>, document.getElementById('app'))

        //2、可以在外部获取并注册事件的方法
        // let btn = document.getElementById('btn')
        // btn.onclick = ()=>console.log('获取并注册事件一')

        // btn.addEventListener('click',()=>{
        //     console.log('获取并注册事件二');
        // })

    </script>
```

### 2、类式组件中的 this 问题

```javascript
<script type="text/babel">
        class MyComponent extends React.Component {

            constructor(props){
                super(props)

                //2、将事件函数的this改变，在组件实例中添加clickHandle方法，触发事件时即调用实例下面的事件处理函数
                this.clickHandle = this.clickHandle.bind(this)
            }

            state = {
                books:['西游记','红楼梦','水浒传']
            }

            clickHandle(){
                // console.log(this.state.books); //报错，错误写法
                console.log(this); //结果为undefined
            }
            render () {
                return (
                    <div>

                        <button onClick={this.clickHandle}>类组件中的this问题</button>
                        {/*
                            1、
                            使用此方法注册的事件，因为{}为表达式，JSX中启用局部严格模式，事件函数中的this即														为undefined
                            所一在该事件函数中无法使用组件实例this定义的变量，解决方式见2
                        */}
                    </div>
                )
            }
        }

        ReactDOM.render(<MyComponent/>, document.getElementById('app'))
    </script>
```

### 3、setState 方法的使用

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandle = this.clickHandle.bind(this);
  }
  state = {
    num: 0,
    books: ['西游记', '红楼梦', '水浒传']
  };
  clickHandle() {
    this.state.num = 4;
    // this.setState({num: 4})
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandle}>类组件中的this问题</button>
        <h1>{this.state.num}</h1>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));

/*	
        	1、不能直接使用this.state.num = 4  方式去更改
        	2、setState是从React.Component继承而来
        	3、修改state数据必须通过this.setState({num: 4})
        	4、修改数据是通过合并的方式，如果原state数据和修改数据不同则修改
        	5、构造函数只执行一次，render函数没调用一次setstate则执行一次，事件函数触发一次执行一次
        */
```

### 4、state 的简写

```javascript
class MyComponent extends React.Component {
  //1、shate简写，state为实例对象的属性
  state = {
    num: 0,
    books: ['西游记', '红楼梦', '水浒传']
  };

  /*2、事件函数的简写，以后都需要写成箭头函数的方式，将函数添加到实例对象原型下面，将头函数中的可以使
            用this，因为箭头函数中的this指向上一层*/
  clickHandle = () => {
    this.setState({ num: 4 });
  };
  render() {
    return (
      <div>
        <button onClick={this.clickHandle}>类组件中的this问题</button>
        <h1>{this.state.num}</h1>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

## 四、React 三大属性- props

### 1、props 的基本使用

```javascript
<script type="text/babel">
        class MyComponent extends React.Component {
            render () {
                const {name,age,sex} = this.props
                return (
                    <div>
                      <h1>{name}</h1>
                      <h1>{age}</h1>
                      <h1>{sex}</h1>
                    </div>
                )
            }
        }
        //1、传递的数据react会自动收集到对象之中，在组件中直接通过this.props去使用
        ReactDOM.render(<MyComponent name="李明卫" age={18} sex="男"/>, 		  document.getElementById('app'))
    </script>
```

### 2、批量数据传递

```javascript
//1、复制对象
let person = { name: '李明卫', age: 18, sex: '男' };
let personCopy = { ...person };

class MyComponent extends React.Component {
  render() {
    const { name, age, sex } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <h1>{age}</h1>
        <h1>{sex}</h1>
      </div>
    );
  }
}
//2、通过babel和...运算见对象展开传递，{}为JSX中写表达式的方式
//3、使用如下方式批量传递数据
ReactDOM.render(<MyComponent {...person} />, document.getElementById('app'));
```

### 3、对 props 进行类型限定

```javascript
 <script type="text/babel">

        class MyComponent extends React.Component {
            render () {
                const {name,age,sex} = this.props
                return (
                    <div>
                      <h1>{name}</h1>
                      <h1>{age}</h1>
                      <h1>{sex}</h1>
                    </div>
                )
            }
        }

        MyComponent.propTypes = {
            name: PropTypes.string.isRequired,  //组件传递的name必须为string类型并且必须传递
            age: PropTypes.number,
            sex: PropTypes.string,
            cb:propTypes.func   //对函数类型限定
        }

        MyComponent.defaultProps = {
            sex: '男'     //指定默认值
        }

        let person = {name:"李明卫", age:18, sex:"男"}
        ReactDOM.render(<MyComponent name="李明卫" age={18} cb={()=>console.log('cb')}/>, document.getElementById('app'))
    </script>
```

### 4、props 简写

将类型限定写成静态函数方式即可

```javascript
class MyComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, //组件传递的name必须为string类型并且必须传递
    age: PropTypes.number,
    sex: PropTypes.string,
    cb: propTypes.func //对函数类型限定
  };
  static defaultProps = {
    sex: '男' //指定默认值
  };
  render() {
    const { name, age, sex } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <h1>{age}</h1>
        <h1>{sex}</h1>
      </div>
    );
  }
}
let person = { name: '李明卫', age: 18, sex: '男' };
ReactDOM.render(<MyComponent name="李明卫" age={18} cb={() => console.log('cb')} />, document.getElementById('app'));
```

### 5、construct 中的 props

​ 使用构造函数的场景

​ 1、给组件实例添加使用 bind 添加实例对象

​ 2、给 state 初始化

​ 3、需要在构造函数中使用 this.props

​ 4、如果使用构造函数必须使用 super 传递 props，否则在构造函数中使用 this.props 值为 undefined

### 6、函数组件中时使用 props

```javascript
 function MyComponent(props){
            //1、使用props
            let {name,age,sex} = props
            return (
                <ul>
                    <li>{name}</li>
                    <li>{age}</li>
                    <li>{sex}</li>
                </ul>
            )
        }
        //2、对props类型限定
        MyComponent.propTypes = {
            name: PropTypes.string.isRquied,
            age: PropTypes.number,
            sex: PropTypes.string,
            cb: PropTypes.func
        }
        MyComponent.defaultProps = {
            sex :'男'
        }
        let person = {name:"李明卫", age:18, sex:"男"}
        ReactDOM.render(<MyComponent name="李明卫" age={18} cb={()=>console.log('cb')}/>, document
```

## 五、React 三大属性- refs

### 1、字符串 refs

```javascript
class MyComponent extends React.Component {
  clickHandle = () => {
    //2、react会将标记为ref的DOM元素收集存放在refs属性中，可以通过该属性去获取DOM元素的值
    console.log(this.refs); //打印结果{username: input, pass: input, btn: button}
    console.log(this.refs.username.value);
  };
  render() {
    return (
      <div>
        {/*1、ref标记DOM元素*/}
        账号： <input type="text" ref="username" />
        <br />
        密码： <input type="password" ref="pass" />
        <br />
        <button ref="btn" onClick={this.clickHandle}>
          点击
        </button>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

### 2、回调式 refs

```javascript
class MyComponent extends React.Component {
  clickHandle = () => {
    //获取DOM
    console.log(this.inputUsername); //结果<input type="text">
    console.log(this.inputPass); //结果<input type="password">
    console.log(this.btn); //结果<button>点击</button>
  };
  render() {
    return (
      <div>
        {/* 1、使用方式，标记元素，在需要使用的地方视同this.DOM去获取
         */}
        {/*
                            2、使用回调函数的方式，react在解析的时候会将ref后面的函数执行，将该DOM元素作为																回调函数的参数
                           		 保存到当前的组件实例对象下面，在需要使用DOM的地方通过this组件实例去访问获取															 DOM节点
                        */}
        账号： <input type="text" ref={current => (this.inputUsername = current)} />
        <br />
        密码： <input type="password" ref={current => (this.inputPass = current)} />
        <br />
        <button ref={current => (this.btn = current)} onClick={this.clickHandle}>
          点击
        </button>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

### 3、回调式 refs 中的问题

如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

```javascript
class MyComponent extends React.Component {
  clickHandle = () => {
    //获取DOM
    console.log(this.user); //结果<input type="text">
    console.log(this.pass); //结果<input type="password">
    console.log(this.btn); //结果<button>点击</button>
  };
  saveUser = current => {
    this.user = current;
  };
  savePass = current => {
    this.pass = current;
  };
  saveBtn = current => {
    this.btn = current;
  };
  render() {
    return (
      <div>
        {/*Class绑定回调函数方式*/}
        账号： <input type="text" ref={this.saveUser} />
        <br />
        密码： <input type="password" ref={this.savePass} />
        <br />
        <button ref={this.saveBtn} onClick={this.clickHandle}>
          点击
        </button>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

### 4、React.createRefs 的使用

```javascript
class MyComponent extends React.Component {
  /*  
                2、React.createRef()返回一个容器，用来存储，被ref标记的DOM元素，并且是专人专用，即一个DOM元素
                需要去对应一个容器，需要获取多个DOM，就需要创建对歌容器
            */

  /*
                1、基本使用，标记1、2、3
            */

  //1.使用步骤一
  userNameRef = React.createRef();
  passRefs = React.createRef();
  btnRefs = React.createRef();
  render() {
    return (
      <div>
        {/*2使用步骤二*/}
        账号： <input type="text" ref={this.userNameRef} />
        <br />
        密码： <input type="password" ref={this.passRefs} />
        <br />
        <button ref={this.btnRefs} onClick={this.clickHandle}>
          点击
        </button>
      </div>
    );
  }

  clickHandle = () => {
    //3、使用步骤三
    console.log(this.userNameRef.current); //结果<input type="text">
    console.log(this.passRefs.current); //结果<input type="password">
    console.log(this.btnRefs.current); //结果<button>点击</button>
  };
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

## 六、生命周期函数

### 1、生命周期函数（旧）

![](/Users/xlz/Desktop/截屏 2021-03-18 下午 2.35.29.png)

### 2、生命周期函数（新）

![](/Users/xlz/Desktop/截屏 2021-03-18 下午 4.13.03.png)

## 七、React 中的事件

### 1、react 中的事件

​ 1、React 中对 JavaScript 中的事件重新封装，封装成为 onClick 形式---------重新封装为六更好的兼容性

​ 2、React 中的事件使用事件委托的方式，即使用事件冒泡委托给根元素-----------为六更高的性能

​ 3、可以使用 event.target 去获取 DOM 节点

### 2、非受控组件

特点：现用现取，即在使用的地方才获取表单 DOM 元素值

```javascript
class MyComponent extends React.Component {
  clickHandle = () => {
    //在事件函数如果需要使用表单元素值，既可以获取，现用现取，非受控组件
    console.log(this.inputUsername.value);
    console.log(this.inputPass.value);
  };
  render() {
    return (
      <div>
        账号： <input type="text" ref={current => (this.inputUsername = current)} />
        <br />
        密码： <input type="password" ref={current => (this.inputPass = current)} />
        <br />
        <button onClick={this.clickHandle}>点击</button>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

### 3、受控组件

特点：将表单的值先存储到 state 中，在冲 state 中取出来进行数据的展示

```javascript
class MyComponent extends React.Component {
  state = { name: '', pass: '' };
  clickHandle = () => {
    //1、将表单数据存储state中
    this.setState({ name: this.inputUsername.value, pass: this.inputPass.value });
  };
  render() {
    return (
      <div>
        账号： <input type="text" ref={current => (this.inputUsername = current)} />
        <br />
        密码： <input type="password" ref={current => (this.inputPass = current)} />
        <br />
        <button onClick={this.clickHandle}>点击</button>
        //2、通过state去获取显示数据
        <div>{this.state.name}</div>
        <div>{this.state.pass}</div>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

### 4、React 中事件参数传递和高阶函数组件函数柯里化

​ 1、高阶函数：将函数作为参数护着返回值是一个函数称为高阶函数

​ 2、函数柯里化：将接受多个参数的函数转换成为一次只接受一个参数的函数

​ 3、React 中事件传递参数

```javascript
class MyComponent extends React.Component {
  state = {};
  clickHandle = () => {
    return (uaername, password) => {
      //通过事件函数传递过来的参数存储数据
      this.setState({ uaername: this.username.value, password: this.password.value });
    };
  };
  render() {
    return (
      <div>
        账号： <input ref={c => (this.username = c)} type="text" />
        <br />
        密码： <input ref={c => (this.password = c)} type="password" />
        <br />
        {/*通过click事件见参数传递过去给事件函数存储*/}
        <button onClick={this.clickHandle('uaername', 'password')}>点击</button>
        <div>{this.state.uaername}</div>
        <div>{this.state.password}</div>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

#### 5、不用函数柯里化事件传递参数

```javascript
class MyComponent extends React.Component {
  state = {};
  clickHandle = (uaername, password) => {
    //通过事件函数传递过来的参数存储数据
    this.setState({ uaername: this.username.value, password: this.password.value });
  };
  render() {
    return (
      <div>
        账号： <input ref={c => (this.username = c)} type="text" />
        <br />
        密码： <input ref={c => (this.password = c)} type="password" />
        <br />
        {/*使用箭头函数，执行箭头函数将，返回一个函数，触发事件时执行该函数*/}
        <button onClick={() => this.clickHandle('uaername', 'password')}>点击</button>
        <div>{this.state.uaername}</div>
        <div>{this.state.password}</div>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

## 八、脚手架目录、案例、proxy 代理

### 1、脚手架目录组织

​ 1、安装 react 脚手架：npm install create-react-app

​ 创建 react 项目：create-react-app 名称

​ 运行：npm start

​ 2、组件一半需要在 src 目录下面创建 component 文件夹，每一个组件在 component 下面定义成为一个名称首字母大写 的文件夹

​ 3、组件中一般都有 index.jsx 来编写组件，也可以上样式 index.css，App.js 一般不写成 jsx 形式

​

### 2、样式模块化

​ 样式模块化主要是为了样式组件重叠，因为组件下面的样式名称可能会相同

​ 模块化步骤：

​ 1、将 index.css 命名为 index.module.css

​ 2、组件中引入方式：**import** index **from** './index.module.css'

​ 3、使用 <h1 className**=**{index.h1}>Home 组件</h1>

​ 注：使用样式模块化，会将 index.css 中定义的样式类，组装成为一个对象，存放在引入的 index 中，但是只能将样式类 存放，其他类型选择弃不能

### 3、案例

​ 子组件如果需要修改父组件的 state，则可以在父组件中定义相应的方法，并将该方法作为参数传递给子组件，子组 件在通过相应的事件触发，调用传递分方法并将参数传递回父组件，回调父组件的方法修改 state 中的数据，从给 更新组件

### 4、proxy 单个服务代理

​ 1、产生跨域的原因，解决跨域方法

​ 原因：浏览器中当发送 ajax 跨域请求，服务器能够收到请求，并且能够将数据返回给客户端，但是被客户端的 ajax 引擎拦截，报同源策略错误

​ 解决方法：在客户端和服务器之间建立一个代理，客户端将请求发送给代理（代理和客户端运行在统一端口下 面），代理将请求转发给服务器，服务器将数据返回给代理，由于代理没有 ajax 引擎，所以将服务器返回的数据转 发给客户端

​

​ 2、实现 proxy 代理方式

​ 在 package.json 中配置，即可

```javascript
"proxy":"http://localhost:5000"
//在代码中发送ajax请求
  axios({url:'http://localhost:3000/student'}).then(data=>{console.log(data)},err=>{console.log(err)})
//由于代理和请求处于同一个端口下面，所以发送请求则是和代理服务器同端口，有代理转发请求
```

​ 3、原理、优缺点

​ 原理：发送 ajax 跨域请求，如果 public 中没有请求资源，则会将请求转发给代理，代理设置服务器地址，通过代理 来转发请求，如果请求资源在本地 public 中存在，则不会转发代理，从本地获取

​ 优点：实现简单

​ 缺点：1、如果请求资源在本地 public 中存在，则不会转发代理，从本地获取

​ 2、不能代理多个服务器

### 5、proxy 多个服务代理

​ 1、实现 proxy 多个服务代理方式

需要在 src 文件下面，新建一个名称为 setupProxy.js 的文件，当运行时，webpack 回去找该文件,配置多个服务代理需要安装 http-proxy-middleware

```javascript
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api1', {
      target: 'http://localhost:5000', //转发代理的服务器
      changeOrigin: true, //值为true，服务其获取的地址为http://localhost:5000，欺骗服务器
      pathRewrite: { '^/api1': '' } //将api1前缀取消
    }),
    proxy('/api2', {
      target: 'http://localhost:5001', //转发代理的服务器
      changeOrigin: true, //值为true，服务其获取的地址为http://localhost:5000，欺骗服务器
      pathRewrite: { '^/api1': '' } //将api1前缀取消
    })
  );
};

//发送ajax请求
axios({ url: 'http://localhost:3000/api1/student' }).then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);
```

​ 2、原理、优缺点

​ 原理：发送 ajax 跨域请求，如果 public 中没有请求资源，则会将请求转发给代理，通过请求中的 api1/api2 来寻找代 理的服务器地址，找到对应的服务地址，转发请求

​ 优点：可以代理多个服务

​ 缺点：1、实现繁琐

​ 2、如果请求资源在本地 public 中存在，则不会转发代理，从本地获取

## 九、github 搜索案例、发布订阅通信、fetch 请求

### 1、github 搜索案例、使用 node 配置中间服

​ 在一般情况下面，需要配置中间服，通过中间服去请求数据，在从中间服将数据发送给客户端，如果客户端请求不到 数据，还可以通过中间服转发模拟的数据

### 2、结构赋值、三木运算符

​

```javascript
let person = { name: 'lisi', hobie: { laniu: true, yumao: false }, age };
let {
  name,
  hobie: { lanqiu }
} = person;
//可以实现多重解构
```

三木运算符可以前套使用

```javascript
a ? b : c ? d : l;
```

### 3、消息发布订阅

​ 需要安装 pubsub-js 库

​ 1、pubsub 中的 API

```javascript
import PubSub from 'pubsub-js';
OR;
const PubSub = require('pubsub-js');

var mySubscriber = function (msg, data) {
  console.log(msg, data);
};
//订阅消息，mySubscriber订阅消息的回调函数，如果发布消息之后，订阅消息的地方就会触发回调函数，类似于自定义事件抛发
var token = PubSub.subscribe('MY TOPIC', mySubscriber);

//发布消息
PubSub.publish('MY TOPIC', 'hello world!');

//同步方法发布消息
PubSub.publishSync('MY TOPIC', 'hello world!');

//取消消息订阅
PubSub.unsubscribe(token);
```

2、基本使用过程

```javascript
//About组件发消息
import React, { Component } from 'react'
import pubsub from 'pubsub'

export default class index extends Component {
    clickHandle = ()=>{
        pubsub.publish('ME_MSG',{name:'lis',age:18})
    }
    render() {
        return (
            <div>
                <button onClick={this.clickHandle}>点我发布消息</button>
            </div>
        )
    }
}


//Home组件订阅消息
import React, { Component } from 'react'
import pubsub from 'pubsub'

export default class index extends Component {
    clickHandle = ()=>{
        pubsub.pubscribe('ME_MSG', (err,data)=>{
            console.log('订阅消息-收到订阅数据',data);
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.clickHandle}></button>
            </div>
        )
    }
}


```

3、注：发布订阅，可以用来实现不同组件组件之间的通信，可以通过该方式直接通信

​ 可以同时发布多个消息，传递多个数据，在需要使用的地方使用消息订阅即可获得数据。可以在任何组件中订阅，即 可获取数据

### 4、fetch 请求使用

```javascript
//fetch是基于promise，是浏览器自带，和ajax同级别，注重关注分离

//1、基本使用
fetch('http://localhost:3000/student')
  .then(
    response => response,
    reject => reject
  )
  .then(
    response => console.log(response),
    reject => console.log(reject)
  );
//2、优化版本
fetch('http://localhost:3000/student')
  .then(
    response => response.json(), //调用json方法返回一个Promise
    reject => new Promise(() => {})
  )
  .then(
    data => console.log(data),
    error => console.log(error)
  );
//3、使用async、await优化
let pro = await fetch('http://localhost:3000/student');
let data = await pro.json();
```

## 十、路由基础（一）

### 1、路由的基本使用

​ 1、安装 react-router-dom 路由库

```javascript
npm install react-router-dom --save
```

​ 2、引入

​ 3、使用

​ 4、包裹管理路由

```javascript
import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom'; //2、引入路由
import Home from './component/Home';
import About from './component/About';

export default class App extends Component {
  render() {
    return (
      <div>
        <Link to="/home">home</Link> //3、使用路由
        <Link to="/about">about</Link>
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
        <Route path="/home" component={Home} /> //3、匹配路由显示组件
        <Route path="/about" component={About} />
      </div>
    );
  }
}

//在index.js中
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    {' '}
    //4、引入BrowserRouter，包裹管理路由，必须使用 //BrowserRouter来包裹，对所有使用的路由进行统一的管理
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

### 2、一般组件和路由组件的区别

​ 1、存放的位置不同

​ 一般组件：在 src 目录下面创建一个 component 文件夹存放一般组件

​ 路由组件：一般在 src 目录下面创建一个 page 文件夹存放路由组件

​ 2、写法的不同

​ 一般组件： <_App_/>

​ 路由组件： <_Route_ path**=**"/home" component**=**{Home}/>

​ 3、传递的 props 不同

​ 一般组件：默认不传递数值，props 为空

​ 路由组件：默认路由组件，有以下属性 （列出常用属性）

```javascript
      history:
            go: ƒ go(n)
            goBack: ƒ goBack()
            goForward: ƒ goForward()
            length: 19
            listen: ƒ listen(listener)
      location: {pathname: "/home", search: "", hash: "", state: undefined, key: "f0qprw"}
            push: ƒ push(path, state)
            replace: ƒ replace(path, state)
            pathname: "/home"
            search: ""
            state: undefined
      match:
            params: {}
            path: "/home"
            url: "/home"
```

​

### 3、NavLink 组件的使用

```javascript
//1、使用在react-router-dom中引入NavLink
    <NavLink activeClassName="active" to="/home">home</NavLink>
    <NavLink activeClassName="active" to="/about">about</NavLink>
//2、当点击哪一个NavLink时候，组件就会自动加上activeClassName="active"样式类名
```

### 4、封装 NavLink 组件

```javascript
import React, { Component } from 'react'

import {Link, Route, NavLink} from 'react-router-dom'
import Home from './component/Home'
import About from './component/About'
import MynavLink from './page/MyNavLink'
export default class App extends Component {
    render() {
        return (
            <div>
          /*
          				1、组件中的文本内容会被收集到组件中的props属性当中，存放在pros组件中的children属性中
          */
                <MynavLink to="/home">home</MynavLink>
                <MynavLink to="/about">about</MynavLink>
                <ul>
                    <li>1</li>
                    <li>2</li>
                </ul>
                <Route path="/home" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        )
    }
}


//封装的/page/MyNavLink'组件
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MynavLink extends Component {
    render() {
        return (
            <div>
          /*
          					2、可以将所有传递过来的props属性，展开成为NavLink的属性，NavLink中有一个children可以											 设置文本内容
          */
                <NavLink {...this.props} children={this.props.children}/>
            </div>
        )
    }
}

```

### 5、Switch 组件的使用

```javascript
//需要在react-router-dom中引入Switch组件
//1、使用
<Switch>
  <Route path="/home" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/about" component={Home} />
</Switch>

//2、作用：如果路由中设置相同的路由，从上到下一次匹配，如果没有使用Switch组件，则会显示匹配到的路由，使用Switch					 组件，匹配到第一个路由，则不会再向下匹配，性能高
```

## 十一、路由基础（二）

### 1、路由样式丢失问题

​ 1、http://localhost:3000 对应的是 public 文件夹资源，如果请求的资源在 public 中不存在，则默认返回 public 中的 index.html 文件

​ 2、产生样式丢失问题条件：在 index.html 文件中，使用<link rel="stylesheet" href="./css/style.css/>使用相对路径

​ 路由嵌套使用

​ 刷新页面

​ 3、丢失的原因：因为使用相对路径引入的样式，在刷新时会将路由器的嵌套路由地址替换.路径，请求的资源在 public 文件中不存在，就会返回 index.html

​ 4、解决方法：

```javascript
		//1、去掉先对路径"."
				<link rel="stylesheet" href="/css/style.css">
    //2、使用绝对路径
 				<link rel="stylesheet" href="%PUBLIC_URL%/css/style.css">
    //3、使用HashRouter包裹路由
        <HashRouter>
            <App/>
        </HashRouter>
```

​

### 2、路由模糊匹配和路由精准匹配

​ 1、模糊匹配

```javascript

//1、只要to后面的路由地址开头，和route中的path匹配上即可，匹配路由组件
<NavLink to="/home/style/a/b">home</NavLink>
<NavLink to="/about/style/a/d">about</NavLink>
<Switch>
  	<Route path="/home" component={Home}/>
    <Route path="/about" component={About}/>
</Switch>

//2、如果to="/n/home/style/a/b"和 path="/home"开头不匹配，则不能匹配路由组件
   <NavLink to="/home/style/a/b">home</NavLink>

//3、to="/home/style/a/b和 path="/a/home" 这种方式不能匹配路由组件
```

​ 2、精准匹配

```javascript
<Route exact={true} path="/home" component={Home}/>
<Route exact={true} path="/about" component={About}/>]
//1、使用exact属性来决定是否开启精准匹配，如果开启则无法，匹配二级路由，to和path必须相同
```

### 3、Redirect 重定向组件的使用

```javascript
//1、使用
<Switch>
  <Route path="/home" component={Home} />
  <Route path="/about" component={About} />
  <Redirect to="/home" component={Home} />
</Switch>

//2、路由从上到下匹配，如果没有匹配到，则交给Redirect，组件匹配，显示组件，即为路由重定向，即当浏览器地址，				 为"/"匹配
```

### 4、嵌套路由的使用

```javascript
//1、嵌套路由的使用
	//Home路由组件下使用List路由组件
	//Home组件
import React, { Component } from 'react'
import {NavLink, Route} from 'react-router-dom'
import List from '../../page/List'
export default class Home extends Component {
    render() {
        return (
            <div>
          			//使用二级路由
                <NavLink to="/home/list">显示Home组件下显示列表组件</NavLink>
                <Route path="/home/list" component={List}></Route>
            </div>
        )
    }
}

//List组件
import React, { Component } from 'react'
export default class List extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>1</li>
                    <li>2</li>
                </ul>
            </div>
        )
    }
}
//注：即需要在哪一个组件中使用嵌套路由即在那个组件中再次使用NavLink、Route

/*
		2、匹配顺序
			 路由时按先后注册的顺序匹配，比如：http://192.168.1.101:3000/home/list 地址，则会去先匹配“/home”路				由组件，保留Home组件，再去home组件中匹配List路由组件，如果home路由使用exact精准匹配，则无法进行二级匹				 配，不能匹配到List路由组件。
*/

```

### 5、路由传递 Params 参数

```javascript
//App.js组件，跳转时向Home路由组件传递params参数
import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'

import Home from './page/Home'
import About from './page/About'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 1、to属性后面残敌参数 */}
                <NavLink to="/home/limingwei/age">Home</NavLink>
                <NavLink to="/about/">About</NavLink>

                {/* 2、声明传递参数 */}
                <Route path="/home/:name/:age" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        )
    }
}

//Home组件接受Params参数
import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return (
            <div>
          	//3、使用this.props.match.params接受使用的参数
                <span>{this.props.match.params.name}</span>
                <span>{this.props.match.params.age}</span>
            </div>
        )
    }
}

```

## 十二、路由基础（三）

### 1、传递 search 参数，需要安装 querystring 来获取 search 传值

```javascript
//App.js
import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'

import Home from './page/Home'
import About from './page/About'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 1、to属性后面残敌参数 */}
                <NavLink to="/home/?name=limingwei&age=18">Home</NavLink>
                <NavLink to="/about/">About</NavLink>

                {/* 2、不需要声明传递参数 */}
                <Route path="/home/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        )
    }
}

//Home路由组件接受search传值
import React, { Component } from 'react'
import qs from 'querystring'

export default class index extends Component {
    state = {name:'liming',age:18}
    componentDidMount(){
        //3、this.props.location.search.slice(1))来获取search传值，search传递过来的是一个字符串
        console.log(qs.parse(this.props.location.search.slice(1)));//parse解析search传值
        console.log(qs.stringify(this.state)); //将对象转换成为字符串
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}

```

### 2、传递 state 参数

```javascript
import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'

import Home from './page/Home'
import About from './page/About'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 1、to属性后面使用对象传递参数 */}
                <NavLink to={{pathname:'/home',state:{name:'limingwei',age:18}}}>Home</NavLink>
                <NavLink to="/about/">About</NavLink>

                {/* 2、不需要声明传递参数 */}
                <Route path="/home/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        )
    }
}

//home路由组件接受参数
import React, { Component } from 'react'

export default class index extends Component {

    render() {
        return (
            <div>
          {/*   3、通过this.props.location.state.name来获取sytate传递参数*/}
                <span>{this.props.location.state.name || ''}</span>
                <span>{this.props.location.state.age || ''}</span>
            </div>
        )
    }
}

```

注：state 传递参数方式，不会在浏览器地址栏中显示，二 params 和 search 会显示，而且 state 页面刷新也不会丢失数据

​ state 有浏览器 history 来保存

### 3、通过代码跳转路由并传递参数

```javascript
import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'

import Msg from './Msg'
//1、通过push方法传值跳转
export default class index extends Component {
    clickHandle=()=>{
        //通过push传递params值
        // this.props.history.push('/home/msg/limingwei')
        //通过push传递search值
        // this.props.history.push('/home/msg/?name=limingwei&age=18')
        //通过push传递state值
        this.props.history.push('/home/msg/',{name:'limingwei',age:18})
    }
    render() {
        return (
            <div>
                <button onClick={this.clickHandle}>代码传递参数params、search、state</button>
                {/* 传递params值需要声明 */}
                {/* <Route path="/home/msg/:name" component={Msg}></Route> */}
                <Route path="/home/msg" component={Msg}></Route>
            </div>
        )
    }
}

//msg路由组件
import React,{Component} from 'react'
import qs from 'querystring'

export default class Msg extends Component{
    componentDidMount(){
        //获取params传值
        // console.log(this.props.match.params.name);

        //获取search传值
        // console.log(qs.parse(this.props.location.search.slice(1)))

        //获取state传值
        // console.log(this.props.location.state);
    }
    render(){
        return (
            <div>

            </div>
        )
    }
}

//2、通过replace跳转传值和push方法一样，知识将push替换成为replace而已

```

### 4、WithRouter 的使用

作用：将普通组件加工成为路由组件，给 props 添加 history、props、state，在返回加工后的路由组件

```javascript
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class index extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <div></div>;
  }
}
export default withRouter(index);
```

### 5、BrowserRouter 和 HashRouter 的区别

​ 1、实现原理不一样

​ BrowserRouter：基于 H5 的 history 实现

​ HashRouter： 基于 hash 实现

​ 2、表现形式不一样

​ BrowserRouter：http://localhost:3000/home/msg/

​ HashRouter： http://localhost:3000/#/home/msg/

​ 3、页面刷新对 state 的印象

​ BrowserRouter：页面刷新对 state 没有影响，state 通过 history 存储

​ HashRouter： 页面造成 state 值的丢失

​ 4、HashRouter 可以解决一些路径相关的事情：例如路由样式丢失问题

## 十三、Redux 基础（一）

### 1、Redux 介绍

​ Redux 介绍

​ 1、Redux 属于第三方的库，可以在 Vue、React、Angular 中使用

​ 2、Redux 主要用来对多个组件的共同状态进行管理

​ 使用场景

​ 1、需要让其他组件使用另一个组件的状态

​ 2、修改其他组件的状态

​

### 2、Redux 原理

![截屏2021-03-24 下午2.43.47](/Users/xlz/Desktop/Code/学习笔记/截屏 2021-03-24 下午 2.43.47.png)

### 3、求和案例 Redux 的基本使用

1、准备 store

```javascript
//1、在src目录下创建redux文件夹，创建为Count组件服务的reducer.js，编写需要维护状态的reducer状态处理代码

let initState = 0; // 初始化状态
export function countReducer(previousState = initState, action) {
  //默认参数
  let { type, data } = action; //action的动作对象，从store中传递而来，previousState为处理之前的状																			态值
  switch (type) {
    case 'increament':
      return previousState + data; //reducer返回一个新的状态给store
    case 'deincreament':
      return previousState - data;
    default:
      return previousState;
  }
}
```

```javascript
//2、在redux文件下创建store来使用redux，进行状态管理
//1、安装redux：npm install redux
//2、引入redux
import { createStore } from 'redux';
//引入reducer
import { countReducer } from './Count_reducer';
//3、创建store
let store = createStore(countReducer); //将对应状态的reducer处理，传入store
//4、导出store
export default store;
```

2、使用 redux，store

​ 在对应组件中使用 store

```javascript
import React, { Component } from 'react';

import store from '../../redux/store';

export default class Count extends Component {
  //3、store.subscribe订阅store中的数据，如果store中的状态发生改变，就会触发回调函数，调用this.setState({})去触发render渲染
  componentDidMount() {
    store.subscribe(() => {
      this.setState({});
    });
  }
  // 2、使用store.dispatch将action传递给store
  increament = () => {
    let baseCount = this.selectValue.value * 1;
    store.dispatch({ type: 'increament', data: baseCount });
  };

  deincreament = () => {
    let baseCount = this.selectValue.value * 1;
    store.dispatch({ type: 'deincreament', data: baseCount });
  };

  increamentOdd = () => {
    let baseCount = this.selectValue.value * 1;
    if (store.getState() % 2 === 0) return;
    store.dispatch({ type: 'deincreament', data: baseCount });
  };

  increamentAsync = () => {
    setTimeout(() => {
      this.increament();
    }, 500);
  };

  render() {
    return (
      <div>
        {/* 1、使用store.getState()获取状态数据 */}
        <div>
          <span>当前求和为: </span>
          <span>{store.getState()}</span>
        </div>
        <br />
        <select name="baseCount" ref={c => (this.selectValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increament}>+</button>&nbsp;
        <button onClick={this.deincreament}>-</button>&nbsp;
        <button onClick={this.increamentOdd}>奇数+</button>&nbsp;
        <button onClick={this.increamentAsync}>异步+</button>
      </div>
    );
  }
}

//订阅store状态变化的另一种方法
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';

import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
// 4、也可移栽入口文件index.js中去订阅，如果发生变化，调用迁居的render重新渲染
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
```

​ 注：store 工作流程：通过 store.getstate 获取 store 中的状态，修改张泰通过 store.dispatch 方法将 action 对象发送给 store，store 再去调用对用的 reducers 处理对应的状态，reducer 将处理后返回一个新的 state 状态给 store，如果使用 store,subscribe 订阅 store 中的状态，store 中的状态改变就会的执行订阅器的回调函数，重新渲染页面。

### 4、Redux 的完整使用

1、完整使用，就是在 redux 下面创建一个为组件服务的 action，让这个文件返回，一个 action 对象的方法，在 dispatch 的时候在调用该方法，将数据传递个 action 中第一的方法，组装一个 action 对象，发送给 store

```javascript
//count_action.js为Count组件服务的action
export let incrementAction = data => ({ type: 'increament', data: data });
export let deincreamentAction = data => ({ type: 'deincreament', data: data });
```

```javascript
//使用action
import React,{ Component } from 'react'

import store from '../../redux/store'
import { incrementAction, deincreamentAction } from '../../redux/Count_action'  //1、引入

export default class Count extends Component {

    increament = () => {
        let baseCount = this.selectValue.value * 1
        store.dispatch(incrementAction(baseCount))   ///2、重点记忆使用
    }

    deincreament = () => {
        let baseCount = this.selectValue.value * 1
        store.dispatch(deincreamentAction(baseCount))
    }

    increamentOdd = () => {
        let baseCount = this.selectValue.value * 1
        if(store.getState()%2===0)return
        store.dispatch(deincreamentAction(baseCount))
    }

    increamentAsync = () => {
        setTimeout(() => {
            this.increament()
        }, 500);
    }

    render(){
        return （
        )
    }
}
```

2、定义一个常量文件，开对 type 类型进行统一的管理维护

在 redux 文件夹下面创建 constant.js 常量文件，在 reducer、和 action 里面引入，替换"increament"、"deincreament"等自负常量，方便后期的管理维护

```javascript
export const INCREAMENT = 'increament';
export const DEINCREAMENT = 'deincreament';
```

### 5、异步 action

异步 action：在 action 文件中调用方法，返回的 action 是一个函数，通过 store.dispatch(incrementAction(baseCount))将，incrementAction(baseCount)返回的函数，提交给 store,store 去使用 redux-thunk 库去调用处理函数，在函数中再次使用 store.dispatch()方法，通过 redux-thunk 库将 action 再次提交给 store，store 进行处理

```javascript
//1、action中编写异步action
import { INCREAMENT, DEINCREAMENT } from './constant';
export let incrementAction = data => ({ type: INCREAMENT, data: data });
export let deincreamentAction = data => ({ type: DEINCREAMENT, data: data });

export let increamentAyncAction = (data, time) => {
  //给使用increamentAyncAction处返回一个异步的函数，参数dispatch提交给store，调用时由store调用
  return dispatch => {
    setTimeout(() => {
      dispatch(incrementAction(data));
    }, time);
  };
};

//2、使用异步action
increamentAsync = () => {
  let baseCount = this.selectValue.value * 1;
  //将返回的异步action提交给store
  store.dispatch(increamentAyncAction(baseCount, 500));
};

//3、编写store处理
//注：需要安装redux—thunk库，和引入redux中的applyMiddleware函数

import { createStore, applyMiddleware } from 'redux';
//引入redux-thunk
import thunk from 'redux-thunk';
import { countReducer } from './Count_reducer';
let store = createStore(countReducer, applyMiddleware(thunk));
//3、导出store
export default store;
```

## 十四、Redux 基础（二）

### 1、react- redux 的原理

![截屏2021-03-25 下午4.49.19](/Users/xlz/Desktop/Code/学习笔记/截屏 2021-03-25 下午 4.49.19.png)

注：使用 react-redux，不让组件直接和 redux 通信，而是给组件包裹一层父容器，让该父容器去和 redux 通信，父容器通过 props 将 redux 中的数据传递给组件

### 2、react- redux 联机容器与 UI 组件

```javascript
//1、需要在src目录下面，创建container容器目录，用来存放容器组件，UI组件一般存放在component文件夹中，UI组件名		 一般和容器名称对应

//2、通过容器组件连接UI组件和redux

		//容器组件中编写代码
			1、安装react-redux
      2、引入UI组件
      	import CountUI from '../../component/Count'
      3、引入connect连接方法
      	import { connect } from 'react-redux'
      4、调用connect方法返回一个容器组件
      	export default connect()(CountUI)

		 在使用组件的时候不需要去使用UI组件，只需要润乳容器组件使用即可

//3、使用容器组件并传递redux
     import React, { Component } from 'react'
      import CountContaner from './container/Count'  //引入容器组件
      import store from './redux/store'				//引入store

      export default class App extends Component {
          render (){
              return (
                  <div>
                			//将store传递给容器组件，即完成容器组件连接ui组件和redux
                      <CountContaner store={store}/>
                  </div>
              )
          }
      }
```

### 3、react-redux 的基本使用

```javascript
需要在容器组件中传递store和操作store的方法，二UI组件只通过props接受即可
//容器组件
//引入UI组件
import CountUI from '../../component/Count'

//4、引入action
import { incrementAction, deincreamentAction, increamentAyncAction } from '../../redux/Count_action'
//引入connect连接方法
import { connect } from 'react-redux'
//调用connect方法返回一个容器组件


/*2、mapStateToProps该方法由react-redux调用，返回一个对象，对象的key、value作为UI组件Props的key、value
在被调用的时候，react-redux会将市容容器组件时传递的store作为该方法的参数*/
const mapStateToProps = (state) => {
    return {count:state}
}
/*3、mapDispatchToProps该方法由react-redux调用，返回一个对象，对象的key、value作为UI组件Props的key、value
在被调用的时候，react-redux会将市dispatch作为参数，该方法返回的对象为操作store转台的方法*/
const mapDispatchToProps = (dispatch) => {
    return {
        increament:(data)=>{dispatch(incrementAction(data))},
        deincreament:(data) => {dispatch(deincreamentAction(data))},
        increamentAsync:(data, time) => {dispatch(increamentAyncAction(data,time))},
    }
}
//1、使用
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
```

​

### 4、redux 的优化

​ 1、mapDispatchToProps、mapStateToProps 方法优化

```javascript
//简写一
export default connect(
    state => ({count:state}),
    dispatch => (
    {
        increament:(data)=>{dispatch(incrementAction(data))},
        deincreament:(data) => {dispatch(deincreamentAction(data))},
        increamentAsync:(data, time) => {dispatch(increamentAyncAction(data,time))},
    })
    )(CountUI)

//简写二
export default connect(
    state => ({count:state}),
    {
        increament:incrementAction,
        deincreament:deincreamentAction,
        increamentAsync:increamentAyncAction,
    }
    )(CountUI)
//注：mapDispatchToProps的优化，不需要手动去调用dispatch，交给react-redux去调用，只需要传递action即可
```

​ 2、使用 react-redux，会自动去检测 store 中状态的该变，自动刷新

```javascript
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

//使用react-redux之后，不需要使用//使用react-redux之后，不需要使用去舰艇变换，react-redxu 会自动监听
ReactDOM.render(<App />, document.getElementById('root'));
```

​ 3、合并 UI 组件和容器组件

```javascript
import React, { Component } from 'react';
import { incrementAction, deincreamentAction, increamentAyncAction } from '../../redux/Count_action';

import { connect } from 'react-redux';

class Count extends Component {
  increament = () => {
    let baseCount = this.selectValue.value * 1;
    this.props.increament(baseCount);
  };

  deincreament = () => {
    let baseCount = this.selectValue.value * 1;
    this.props.deincreament(baseCount);
  };

  increamentOdd = () => {
    let baseCount = this.selectValue.value * 1;
    if (this.props.count % 2 === 0) return;
    this.props.increament(baseCount);
  };

  increamentAsync = () => {
    let baseCount = this.selectValue.value * 1;
    this.props.increamentAsync(baseCount, 500);
  };

  render() {
    return (
      <div>
        {/* 1、使用store.getState()获取状态数据 */}
        <div>
          <span>当前求和为: </span>
          <span>{this.props.count}</span>
        </div>
        <br />
        <select name="baseCount" ref={c => (this.selectValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increament}>+</button>&nbsp;
        <button onClick={this.deincreament}>-</button>&nbsp;
        <button onClick={this.increamentOdd}>奇数+</button>&nbsp;
        <button onClick={this.increamentAsync}>异步+</button>
      </div>
    );
  }
}

export default connect(state => ({ count: state }), {
  increament: incrementAction,
  deincreament: deincreamentAction,
  increamentAsync: increamentAyncAction
})(Count);
```

### 5、Provider 组件的使用

​ Provider 组件，可以让被其包裹的组件，都默认传递 store 个容器组件

```javascript
import React, { Component } from 'react';

import CountContaner from './container/Count';
import store from './redux/store';
import { Provider } from 'react-redux';

export default class App extends Component {
  render() {
    return (
      <div>
        //有多个容器组件都要使用store的时候可以将store交给provider，provider会自动给包裹的容器组件传递store
        <Provider store={store}>
          <CountContaner />
          <CountContaner />
          <CountContaner />
          <CountContaner />
          <CountContaner />
        </Provider>
      </div>
    );
  }
}

//一般是使用在index.js如果文件中包裹App组件
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## 十五、Redux 基础（三）

### 1、redux-devtools 工具的使用

​ 观看线上教学

### 2、纯函数

​ 1、纯函数：多次调用的情况下，传递相同的参数，返回相同的结果

​ 2、纯函数不修改参数数据

​ 3、纯函数不能使用随机函数

​ 4、reducer 中的方法就是一个纯函数，如果返回的对象地址和没修改之前一样，则不会更新界面

​

### 3、多个组件共享状态

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { personReducer } from './reducer/Person_reducer';
import { countReducer } from './reducer/Count_reducer';

let allReducer = combineReducers({
  person: personReducer,
  count: countReducer
});

export default createStore(allReducer, applyMiddleware(thunk));
```

注：多个组件之间状态的共享，编写各自的 reducer，action，，在 store 中合并 reducer，如上，需要不同组件的 state 时，只需要在 mapStateToProps 中的 state 参数获取对方组件状态即可，如果要修改丢房租将状态需要，引入对方的 action，将去传入组件，即可

## 十六、react Hook 拓展

hooks 主要是解决函数式组件中不能使用 state，生命周期等问题

### 1、setState 的拓展

```javascript
/*
 			1、对象方式修改，setState方法修改数据是异步的，执行该函数之后，没有立刻更新state数据，而是先执行		   setState后面的代码,当state数据更行，重新调用render之后，会触发回调函数
  */
this.setState({ count: this.state.count + 1 }, () => {
  console.log('更新完成');
});

//2、函数式写法，这种写发能够获取state，props在函数中进行操作之后，返回更新的状态，更新完成之后触发回调函数
this.setState(
  (state, props) => {
    return { count: state.count + 1 };
  },
  () => {
    console.log('state更新完成');
  }
);
```

### 2、Lazyload 路由懒加载

```javascript
/*
    1、组件懒加载和Vue思想类似，用法如下
*/
import React, { Component, lazy, Suspense } from 'react';
import { Link, Route } from 'react-router-dom';

const SetState = lazy(() => import('./component/SetState'));
const Lazy = lazy(() => import('./component/Lazy'));
export default class App extends Component {
  render() {
    return (
      <div>
        <Link to="/SetState">SetState</Link>
        <Link to="/lazy">lazy</Link>
        //2、Suspense的使用，fallback当加载不出来显示的组件，里面的组件一般不使用懒加载的组件
        <Suspense fallback={<h2>77</h2>}>
          <Route path="/SetState" component={SetState}></Route>
          <Route path="/lazy" component={Lazy}></Route>
        </Suspense>
      </div>
    );
  }
}
```

### 3、stateHook 的使用

```javascript
/*
        1、useState方法返回一个数组，数组第一个为状态值，第二个为修改状态的方法
           当修改一次，函数执行一次，let [count,setCount] = useState(1)初始化语句也执行一次，
           但是状态值不会被初始化，因为第一次初始化的数据已经被缓存，后面在执行该语句不会覆盖该状态值
    */
let [count, setCount] = useState(1);

/*
        2、setCount 的两种写法
    */
setCount(45); //直接传递新值
setCount(state => {}); //获取旧值返回新的值

//3、没添加一个状态，就需要使用一次useState
```

### 4、EffectHook 的使用

```javascript
useEffect(() => {
  return () => {};
}, []);

/*
	1、不传递数组的时候，默认监听所有的state Hook创建的状态，初次渲染的时候会调用一次相当于componentDidMount
		当所有的state状态有一个改变就会回调执行一次相当于componentDidUpdate
	useEffect(()=>{
    return ()=>{}
  })
  2、如果传递数组，数组中指明监听的state状态，只会针对count状态，只有count状态更新时才执行回调
  useEffect(()=>{
        return ()=>{}
    },[count])
  3、返回的函数相当于componentWillUnmount，卸载时触发执行
*/
```

### 5、RefHook 的使用

```javascript
import React, { useState, useRef } from 'react';

export default function EffectHook(props) {
  let [count, setCount] = useState(2);
  //  1、使用useRef，创建容器
  let span = useRef();

  function clickHandle() {
    //3、获取节点
    console.log(span.current);
  }
  return (
    <div>
      //2、标记ref
      <span ref={this.span}>{count}</span>
      <button onClick={clickHandle}>点我+1</button>
    </div>
  );
}

//注：和createRef一样专人专用
```

## 十七、React 拓展

### 1、fragment 的使用

​ 1、fragment 能够替换根标签，渲染时被去除，不会存在页面上

```java
//1、引入
import React, { Component, Fragment } from 'react'

export default class index extends Component {
    render() {
        return (
          //2、替换
            <Fragment>

            </Fragment>
        )
    }
}

```

​ 2、根标签也可也写成一个空标签

​ 3、fragment 和空标签替换根标签的区别：fragment 可以带一个 key 的属性，空标签不允许

### 2、context 通信

这种通信方法可以在父组件和子孙组件之间进行通信，可以传递回调函数通信等

```javascript
import React, { Component } from 'react';

//1、创建context
const Context = React.createContext();
export default class Parent extends Component {
  state = { count: 4 };
  render() {
    return (
      <div>
        <div>parent</div>
        /*2、包裹需要使用Context的组件，只要被包裹的组件的子孙后代组件都可已使用传递的数据 使用value属性传递数据，Context.Provider进行包裹*/
        <Context.Provider value={this.state.count}>
          <A />
        </Context.Provider>
      </div>
    );
  }
}

class A extends Component {
  render() {
    return (
      <div>
        <div>A</div>
        <B />
      </div>
    );
  }
}

class B extends Component {
  //3、在需要使用祖先组件传递的数据，需要先声明，这样在该组件中才能使用传递过来的数据，使用this.context获取传递的数据
  static contextType = Context;
  // render(){
  //     return (
  //         <div>
  //             <div>B</div>
  //获取数据的第一种方法
  //             <span>从parent组件获取state数据{this.context}</span>
  //         </div>
  //     )
  // }
  //4、获取传递数据的第二种方法
  render() {
    return (
      <div>
        <div>B</div>
        <Context.Consumer>
          {value => {
            return this.context;
          }}
        </Context.Consumer>
      </div>
    );
  }
}
```

### 3、Component 带来的问题

```javascript
1、继承Component组件带来的问题
		1、如果this.setState({}) 传递的是一个空的对象，没有更新数据，也会调用render方法渲染，不因该
    2、如果子组件没有使用父组件的state和props,父组件调用render子组件也会调用render，不因该，性能低

2、解决方法一，在父组件和子组件中使用shouldComponentUpdate来控制，是否重新渲染，实现如下
		import React, { Component } from 'react'

export default class Parent extends Component {
    state = {count:4,a:3}
    clickHandle = () => {
        this.setState({a:8})
    }
    //1、在父组件中对state进行判断，看更新之后和更新之前的状态是否相同相同不做更新操作
    //nextProps，nextProps更新在后的state和更新之后的props
    shouldComponentUpdate(nextProps,nextProps){
        return !this.state.count === nextState.count
    }

    render() {
        console.log('parent---render');
        return (
            <div>
                <span>{this.state.count}</span><br/>
                <span>{this.state.a}</span><br/>
                <button onClick={this.clickHandle}>click</button>
               <A count={this.state.count}/>
            </div>
        )
    }
}

class A extends Component {
  //1、在子组件中对父组件传递的props进行判断，看更新之后和更新之前的状态是否相同相同不做更新操作
    //nextProps，nextProps更新在后的state和更新之后的props
    shouldComponentUpdate(nextProps,nextState){
        return !this.props === nextProps
        return true
    }

    render(){
        console.log('A---render');
        return (
            <div>
                <div>{this.props.count}</div>
            </div>
        )
    }
}




3、解决方法二
在react库中引入PureComponent类，让组件去继承这个类，继承这个类的组件，不需要去实现shouldComponentUpdate生命周期方法，如果state或者props没有发生变化，不会调用render方法

此方法存在一个问题：如果setState更新的引用类型数据地址相同，旧不会调用render方法，就算因类类型i面的属性值不同也不会调用


```

### 4、renderProps 的使用

​ 次 renderProps 的使用详单于 React 中的插槽，react 中没有插槽的概念，但是这种使用相当于插槽

```javascript
/*
			1、组件结构嵌套，<A><B/></A>不需要在A组件中去使用B组件，可以在父组件中使用这种嵌套的方式去嵌套组件，这种方式需要在B被收集到A中的this.props.children属性中，需要在A组件中使用this.props.children去使用展示B组件的结构
*/
import React, { Component } from 'react'

export default class Parent extends Component {
    state = {count:4}
    clickHandle = () => {
        this.setState({})
    }
    render() {
        return (
            <div>
                <span>{this.state.count}</span><br/>
                <button onClick={this.clickHandle}>click</button>
///					A组件中嵌套使用B组件
               <A>
                   <B/>
               </A>
            </div>
        )
    }
}

class A extends Component {
    render(){
        return (
            <div>
                <div>我是A组件</div>
          //   在A组件中展示B组件的结构
                {this.props.children}
            </div>
        )
    }
}
class B extends Component {

    render(){
        return (
            <div>
                <div>我是B组件</div>
            </div>
        )
    }
}


/*
			2、结构嵌套（插槽）
			<A render={(count)=><B count={count}/>}/>  在A组件中使用函数，react去调用这个函数返回B组件，
			而在A组件中 {this.props.render(this.state.count)}，则是使用B组件，并将A组件中的值，传递给B组件，
			 {this.props.render(this.state.count)}这种方法相当于在A组件中的对应位置预留一个插槽
*/

		import React, { Component } from 'react'

export default class Parent extends Component {
    state = {count:4}
    clickHandle = () => {
        this.setState({})
    }
    render() {
        return (
            <div>
                <span>{this.state.count}</span><br/>
                <button onClick={this.clickHandle}>click</button>
//							传递B组件
               <A render={(count)=><B count={count}/>}/>
            </div>
        )
    }
}

class A extends Component {
    state = {count:3}
    render(){
        return (
            <div>
                <div>我是A组件</div>

          //   为B组件预留插槽位置
                {this.props.render(this.state.count)}
            </div>
        )
    }
}
class B extends Component {

    render(){
        return (
            <div>
                <div>我是B组件</div>
                <span>从A组件获取的count{this.props.count}</span>
            </div>
        )
    }
}

```

### 5、ErrorBoundary 错误边界

错误边界：如果子组件发生错误，将错误控制在子组件中，不影响父组件的展示呈现

![截屏2021-03-27 下午7.02.30](/Users/xlz/Desktop/截屏 2021-03-27 下午 7.02.30.png)

React 组件之间通信方式的总结

1、通过 props 和回调函数 ----------父子、后代组件之间

2、通过 pubsub 的发布订阅 --------任何组件之间

3、redux 集中式管理 ---------所有状态共享

4、context 通信 ------------祖先组件和后代组件
