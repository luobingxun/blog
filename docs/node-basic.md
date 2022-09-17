# node.js

##

## oneDay

### 1、http、url 的基本使用

（1）http 模块的基本使用

```javascript
//加载http模块
const http = require('http');
//创建服务
http
  .createServer((request, respons) => {
    //打印访问地址url
    console.log(request.url);
    //设置响应头
    respons.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    //设置浏览器的编码
    respons.write("<head><meta charset='UTF-8'></head>");
    //返回给请求方
    respons.write('<h1>hello nodeJS</h1>');
    //结束响应
    respons.end();
  })
  .listen(8081);
//8081位当前服务监听的端口号

//注：可以在end 方法中直接返回数据
respons.end('hello node');
```

（2）url 模块的简单使用

```javascript
const url = require('url');
var URL = 'http://www.baidu.com?name=xiao&age=18';
console.log(url.parse(URL));
/*
使用parse解析之后的数据格式，可以通过query来获取解析之后的数据
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?name=xiao&age=18',
  query: 'name=xiao&age=18',
  pathname: '/',
  path: '/?name=xiao&age=18',
  href: 'http://www.baidu.com/?name=xiao&age=18'
}
*/

//重点掌握
var query = url.parse(URL, true).query;
console.log(query);
/*结果：
[Object: null prototype] { name: 'xiao', age: '18' }
*/
```

（3）http、url 模块结合使用

```javascript
const http = require('http');
const url = require('url');
http
  .createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    response.write('<head><meta charset="UTF-8"></head>');
    //注重：每次请求都会发起一次图标请求和url请求，需要对url过滤
    if (request.url !== '/favicon.ico') {
      //注重：需要重点掌握
      var info = url.parse(request.url, true).query;
      console.log(`姓名：${info.name},年龄：${info.age}`);
    }
    //   response.write('hello')
    response.end();
  })
  .listen(8081);
```

### 2、supervisor 工具的使用

该工具的作用：修改代码，无需再次执行，保存即可实时监听

（1）全局安装 supervisor

​ npm install - g supervisor

（2）supervsor 文件.js 监听

### 3、CommonJS 导入导出自定义模块

(1)、使用 module.exports/exports 导出

```javascript
exports.add = obj; //此方法导出add将其加入到一个对象中，如果导出多个，在导入的的													//时候统一加入一个对象中
module.exports = function add() {}; //此方法导出，为什么则导入即为什么类型
```

(2)、require 导入模块

```javascript
const http = require('module/http'); //导入模块，括号中可以写具体的路径、可以只用写模块文件夹名称
const http = require('http'); //写模块文件夹的模块需要放在node_module目录下面，此方式会自动去改http模块文件夹下面去找index.js文件

//注：模块下面没有index.js文件，可以在改模块下面npm init 生成package.json即可只用导入模块文件夹的名称
```

### 4、npm 的使用

注：如果需要使用什么包，就到 npmjs.com 去使用查找使用 npm 安装、例如:md5、日期格式化等包都可以去安装

常用 npm 命令：

npm install/unstall

npm list 查看目录下文件

npm info 模块 查看模块版本

nom init 生成 package.json 在项目需要生成该文件

nom install jequery@4.5.3 指定版本安装

注：可以使用淘宝镜像去安装包

使用 cnpm 去替代 npm

安装 cpm npm install -g cnpm --registry=https://registry.npm.taobao.org

两个必备网站：npmjs.org/npm.taobao.rog

在 package.json 中的依赖版本

^ 表示版本号第一个数字不变，后面每次安装都安装最新

～表示前两位不变，最后一位保持最新

- 表示前部安装最新版本

### 5、fs 模块

```
fs.stat    				检测是文件还是目录
fs.mkdir   				创建目录
fs.writeFile  		写入文件
fs.appendFile     在文件末尾追加内容
fs.readFile       读取文件内容
fs.readDir        读取文件目录
fs.rename         重命名和移动文件
fs.rmdir          删除目录
fs.unlink         删除文件
```

```javascript
const fs = require('fs');

// fs.stat用法
fs.stat('./http-url.js', (err, status) => {
  if (err) {
    console.log(文件检测错误);
    return;
  }
  if (status.isDirectory()) {
    console.log('属于目录');
  }
  if (status.isFile()) {
    console.log('属于文件');
  }
});

// fs.mkdir用法,如果已经存在改目录则会创建失败
fs.mkdir('./node', err => {
  if (err) {
    console.log('创建目录失败');
  } else {
    console.log('创建目录成功');
  }
});

// fs.writeFile用法，如果文件存在则将原有内容删除，在加入新的内容
fs.writeFile('./node/index.html', '<body></<body>', err => {
  if (err) {
    console.log('写入文件失败');
  } else {
    console.log('写入文件成功');
  }
});

// fs.appendFile用法，在文件内容末尾追加内容
fs.appendFile('./node/index.html', '<head></head>\n', err => {
  if (err) {
    console.log('追加内容失败');
  } else {
    console.log('追加内容成功');
  }
});

// fs.readFile用法，文件不存在则读取失败,读取的data为buffer字节码，需要将其使用toString方法转换成为字符串
fs.readFile('./node/index.html', (err, data) => {
  if (err) {
    console.log('读取文件失败');
  } else {
    console.log(data.toString());
  }
});

// fs.readdir用法，读取目录，data为目录数组，会将目录下面的文件和目录一起读取带data数组中，当时只能读取该目录下面的一级目录和文件
fs.readdir('./node/text', (err, data) => {
  if (err) {
    console.log('读取目录失败');
  } else {
    console.log(data);
  }
});

// fs.rename 使用，第一个参数为文件路径，第二个参数为新名字
重命名操作;
fs.rename('./node/index.html', './node/you.html', err => {
  if (err) {
    console.log('重名名失败');
  } else {
    console.log('重命名成功');
  }
});
// 移动文件操作,当前两个参数的文件名称一致则为移动文件操作
fs.rename('./node/you.html', './node_module/you.html', err => {
  if (err) {
    console.log('移动文件失败');
  } else {
    console.log('移动文件成功');
  }
});

// fs.rmdir删除目录，只能删除空目录，如果目录中有文件则不能删除该目录,第一个参数路径只能为一级，不能潜逃路径
fs.rmdir('./y', err => {
  if (err) {
    console.log('删除目录失败');
  } else {
    console.log('删除目录成功');
  }
});

// fs.unlink 删除文件,路径只能为一级路径，不能嵌套路径，删除制定文件，需要进如只能目录
fs.unlink('./j.html', err => {
  if (err) {
    console.log('删除文件失败');
  } else {
    console.log('删除文件成功');
  }
});
```

### 6、fs 模块的文件操作作业

（1）查看当前目录下面有没有 upload 目录，如果没有则创建该目录，如果有则不做操作

```javascript
const fs = require('fs');
fs.stat('./upload', (err, status) => {
  if (err) {
    console.log('不存在该目录');
    fs.mkdir('./upload', err => {
      if (!err) {
        console.log('创建成功');
      } else {
        console.log('创建失败');
      }
    });
  } else {
    if (status.isDirectory()) {
      console.log('不做操作');
    }
  }
});
```

（2）读取目录下面的目录和文件，如果是目录将其加入数组输出，文件则不加入

```javascript
let dirArr = [];
fs.readdir('./', (err, data) => {
  console.log(data);
  if (!err) {
    (function add(i) {
      if (i === data.length) {
        console.log(dirArr);
      }
      fs.stat('./' + data[i], (err, status) => {
        if (!err) {
          if (status.isDirectory()) {
            dirArr.push(data[i]);
          }
        }
        add(i + 1);
      });
    })(0);
  } else {
    console.log('读取错误');
  }
});
```

### 7、async、await 异步操作

async 声明一个异步方法、await 等待一个异步方法执行完毕，通常在 await 使用在 async 声明的异步方法当中

```javascript
//1、async声明一个异步方法，返回结果为一个Promise对象
async function add() {
  return 'NN';
}
console.log(add()); ///   结果 Promise { 'NN' }
//await等待一个async异步方法执行完毕，通常和async配合使用，使用await等待一步方法执行，await会将返回的Promise数据直接提取出来
async function add() {
  return 'NN';
}
async function getName() {
  let name = await add();
  console.log(name); //打印结果为NN
}

//2、async、await通常配合promise使用
async function add() {
  return new Promise((resolve, reject) => {
    let a = 3;
    let b = a + 4;
    resolve(b);
  });
}
async function get() {
  let number = await add();
  console.log(number); //打印结果为7
}
get();
```

### 8、fs 中的流、管道流和读取复制文件

```javascript
//1、读取流和写入流的基本使用

//读取流,以流的方式读取，需要拼接
const fs = require('fs');
let chunk = '';
let conut = 0; //用来记录读取多少次
let readStream = fs.createReadStream('./text.txt');
readStream.on('data', data => {
  chunk += data;
  conut++;
});
readStream.on('end', () => {
  console.log(chunk);
  console.log(conut);
});
readStream.on('error', err => {
  console.log(err);
});

//写入流
let writeStream = fs.createWriteStream('./you.txt');
writeStream.write('今天心情不好');
writeStream.end();
writeStream.on('finish', () => {
  console.log('finished');
});
writeStream.on('error', err => {
  console.log(err);
});

//2、管道流的使用
let readStream = fs.createReadStream('./color.css');
let writeStream = fs.createWriteStream('./style.txt');
readStream.pipe(writeStream);

//注：可以使用读取流和写入流、管道流实现各种文件的复制
```

## towDay

### 1、fs、url、path、http 模块实现静态 web 服务器

```javascript
//使用模块搭建静态服务思想：
/*
根据res.url的请求获取请求的资源名称，判断请求的文件不是/favirive.ico图标请求，不是图标请求在使用fs模块去读取响应的文件，响应给前端，在使用fs读取相应文件时需要判断请求的资源文件是否存在，如果不存在（即读取文件失败），则返回404
*/
//记住下表模版代码
//记忆点：1、代码实现  2、如下记忆点1  3、记忆点2
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const resolveExt = require('./resolveExt');
http
  .createServer(function (req, res) {
    let pathName = url.parse(req.url).pathname;
    pathName = pathName == '/' ? '/index.html' : pathName; //记忆点1，设置默认访问的文件
    let ext = path.extname(pathName.replace('/', '')); //记忆点2，替换url中的/
    if (req.url != '/favicon.ico') {
      fs.readFile('./static' + pathName, (err, data) => {
        if (!err) {
          res.writeHead(200, { 'Content-type': '' + resolveExt(ext) + ';charset="utf-8"' });
          res.end(data);
        } else {
          res.writeHead(404, { 'Content-type': '' + resolveExt(ext) + ';charset="utf-8"' });
          res.end('访问页面不存在');
        }
      });
    }
  })
  .listen(8081);

//resolveExt.js自定义模块,根据url请求的后缀返回返回content-type对应的类型格式，方便浏览器解析请求
let ext = function resolveExt(ext) {
  let ET = '';
  switch (ext) {
    case '.html':
      ET = 'text/html';
      break;
    case '.css':
      ET = 'text/css';
      break;
    case '.js':
      ET = 'text/javascript';
      break;
  }
  return ET;
};
module.exports = ext;
```

注：在一个 html 文件中可能包含很多个请求（例如 a、img 等标签的请求），需要对请求过滤判断，返回相应的响应头，方便浏览器解析

### 2、读取文件，设置响应类型，处理异步

记忆点 1:mine 文件实现，响应类型

以及电 2:await、async 实现异步操作，readFileSync 实现同步操作

```javascript
//1、对resolveExt.js模块改造
//使用mime.json,根据req.url中的文件后缀，从mime.json中读取后缀对应的响应类型返回
//2、处理resolveExt.js中的异步和同步实现
//异步实现，读取文件readFile方法是异步的，需要配合async、await来实现异步读取mime.json文件
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const resolveExt = require('./resolveExt')
http.createServer(function(req,res){
    let pathName = url.parse(req.url).pathname;
    pathName = pathName == '/' ? '/index.html' : pathName;
    let ext = path.extname(pathName.replace('/',""));
    if(req.url != '/favicon.ico'){
        fs.readFile('./static'+pathName,async (err,data)=>{
            if(!err){
                res.writeHead(200,{'Content-type':''+await resolveExt(ext)+';charset="utf-8"'});
                res.end(data);
            }else{
                res.writeHead(404,{'Content-type':''+await resolveExt(ext)+';charset="utf-8"'});
                res.end('访问页面不存在');
            }
        })
    }
}).listen(8081)

//resolveExt.js模块
const fs = require('fs')
let ext = async function resolveExt(ext){
    return new Promise((resolve,reject)=>{
        fs.readFile('./resource/mime.json',(err,data)=>{
            if(err){
                reject(err);
                return;
            }else {
                let mime = JSON.parse(data);
                resolve(mime[ext]);
            }

        })
    })
}
module.exports = ext

//同步实现，resolveExt.js模块，在create server方法中不需要使用async、await,该实现属于同步实现
const fs = require('fs'）
let ext = function resolveExt(ext){
    let data = fs.readFileSync('./resource/mime.json');
    return JSON.parse(data.toString())[ext];
}
module.exports = ext
```

### 3、封装静态 web 服务、nodejs 路由

```javascript
//1、静态封装web服务

const fs = require('fs');
const url = require('url');
const path = require('path');

let app = {
  static: (staticPath, req, res) => {
    let pathName = url.parse(req.url).pathname;
    pathName = pathName == '/' ? '/index.html' : pathName;
    let ext = path.extname(pathName);
    if (req.url != '/favicon.ico') {
      try {
        let data = fs.readFileSync(staticPath + pathName);
        if (data) {
          let mime = resolveExt(ext);
          res.writeHead(200, { 'Content-Type': '' + mime + ';charset="utf-8"' });
          res.end(data);
          return true;
        }
      } catch (error) {}
    }
  }
};
function resolveExt(ext) {
  let data = fs.readFileSync('./resource/mime.json');
  let obj = JSON.parse(data.toString());
  return obj[ext];
}
module.exports = app;

//2、nodejs路由，根据访问的url判断访问的是静态资源还是动态、对url进行路由设置
const http = require('http');
const url = require('url');
const app = require('./resolveExt');

// 异步操作，配合async和await使用
http
  .createServer(function (req, res) {
    let tag = app.static('./static', req, res);
    //如果访问的是静态资源，static方法放回true，不是则为false，再往下执行判断
    if (!tag) {
      let pathName = url.parse(req.url).pathname;
      //路由配置
      if (pathName == '/doLogin') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
        res.end('doLogin');
      } else if (pathName == '/doRegister') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
        res.end('doRegister');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
        res.end('页面不存在');
      }
    }
  })
  .listen(8081);
```

### 4、EJS 模版引擎、get、post 请求获取传值

```javascript
//1、EJS模版引擎的使用
//（1）安装
//npm init 生成package.json
//npm install ejs --save
//（2）引入
const ejs = require('ejs');
//（3）使用
ejs.renderFile('./views/login.ejs', { msg: '处理login' }, (err, data) => {
  //./views/login.ejs  为渲染的ejs模版，第二个参数为传递给模版渲染的数据
  if (err) {
    console.log(err);
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
  res.end(data);
});
//注：ejs属于后端渲染，渲染完成之后通过回调函数将渲染的页面data返回，在将data响应给前端
//ejs渲染的数据的方式，参考npmjs.com

//2、获取get、post请求传递的数据
//获取get传值方式和前面使用url模块是一样
//获取post传值
let str = '';
req.on('data', chunk => {
  str += chunk;
});
req.on('end', () => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
  res.end(str);
});
```

### 5、nodejs 封装一个类似 express 框架的路由

```javascript
//1、模仿封装思想：将路由封装成一个对象，在访问的时候根据url执行相应的方法
const http = require('http');
const url = require('url');
const routes = require('./routes');
const ejs = require('ejs');

http
  .createServer(function (req, res) {
    let tag = routes.static('./static', req, res);
    if (!tag) {
      let pathName = url.parse(req.url).pathname.replace('/', '');
      if (routes[pathName]) {
        routes[pathName](req, res); //重要，记忆点
      } else {
        routes['err'](req, res);
      }
    }
  })
  .listen(8081);

//routes模块

// 异步操作
const fs = require('fs');
const url = require('url');
const path = require('path');
const ejs = require('ejs');
let app = {
  //访问静态资源的方法，同上面的静态资源访问函数
  static: (staticPath, req, res) => {},
  //处理登录
  login: (req, res) => {
    ejs.renderFile('./views/login.ejs', { msg: '处理login' }, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(data);
    });
  },
  //注册
  register: (req, res) => {
    ejs.renderFile('./views/register.ejs', {}, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(data);
    });
  },
  //处理注册访问
  doRegister: (req, res) => {
    let str = '';
    req.on('data', chunk => {
      str += chunk;
    });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(str);
    });
  },
  //路由找不到资源，返回404页面
  err: (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end('页面不存在');
  }
};
module.exports = app;
```

```javascript
/*
2、模仿express封装express.get('/login',function(req,res){})
	express.post('/login',function(req,res){})、put、delete等方法
*/
//app.js 注册:get、post等处理方法
const http = require('http');
const app = require('./routes');
//有于app模块导出的是一个匿名函数，请求时可以执行
http.createServer(app).listen(8081);
//静态web服务
app.static('static');

//配置get请求路由login
app.get('/login', function (req, res) {
  res.send('get请求');
});

//配置post请求register
app.post('/register', function (req, res) {
  res.send('post请求');
});

//配置404页面
app.err(function (req, res) {
  res.send('页面不存在');
});

/*
routes模块，重点记忆get、post、静态服务的实现思想
实现思想：在发起请求时，执行app.js模块，就会执行该模块中app.get/post等方法，则会将get\post参数和回调函数，存储到注册存储到必报变量对象G中(更具get或者post请求将方法存储到G对象中的对应变量)，当发起请求时，执行app函数，则会根据req.url去，判断G中存储的get/post请求是否存在，如果存在则执行相应的请求方法。
*/

const url = require('url');
const fs = require('fs');
const path = require('path');

function resolveExt(ext) {
  let data = fs.readFileSync('./resource/mime.json');
  return JSON.parse(data.toString())[ext];
}
//静态web服务
let staticServer = function (req, res, staticPath) {
  let pathName = url.parse(req.url).pathname;
  pathName = pathName == '/' ? '/index.html' : pathName;
  let ext = path.extname(pathName.replace('/', ''));
  if (req.url != '/favicon.ico') {
    try {
      let data = fs.readFileSync('./' + staticPath + pathName);
      if (data) {
        res.writeHead(200, { 'Content-type': '' + resolveExt(ext) + ';charset="utf-8"' });
        res.end(data);
        return true; //告诉外部该请求是静态资源请求
      }
    } catch (error) {}
  }
};

let routes = function () {
  let G = {
    G_get: {}, //存储get请求的方法
    G_post: {}, //存储post请求的方法
    staticPath: 'static'
  };
  //发起请求时执行app函数
  let app = function (req, res) {
    //给res拓展send()方法，方便给前端返回数据
    res.send = function (data) {
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(data);
    };
    //静态web服务
    let tag = staticServer(req, res, G.staticPath);

    //如果不是静态请求，则属于动态路由的请求方式
    if (!tag) {
      let pathN = url.parse(req.url).pathname;
      //如果该url在get请求方法集中注册过方法，则执行该方法
      if (G.G_get[pathN] && req.method.toLowerCase() == 'get') {
        G.G_get[pathN](req, res);
      } else if (G.G_post[pathN] && req.method.toLowerCase() == 'post') {
        //获取post请求的数据存储在req.body，方便读取
        let postData = '';
        req.on('data', chunk => {
          postData += chunk;
        });
        req.on('end', () => {
          req.body = postData;
        });
        G.G_post[pathN](req, res);
      } else {
        G['err'](req, res);
      }
    }
  };

  //静态web服务
  app.static = function (staticPath) {
    G.staticPath = staticPath;
  };

  app.get = function (pathName, doGetMethod) {
    //注册get方法
    G.G_get[pathName] = doGetMethod;
  };

  app.post = function (pathName, doPostMethod) {
    //注册post方法
    G.G_post[pathName] = doPostMethod;
  };

  //注册404方法
  app.err = function (errMethod) {
    G['err'] = errMethod;
  };
  return app;
};
module.exports = routes();
```

## threeDay

### 1、nodejs 简单操作 mysql 数据库，更高级用法参考文档

```javascript
/*
1、安装mysql模块
	npm i mysql --save
2、引入mysql模块
3、配置连接设置
4、创建连接
5、连接数据库
6、使用query方法执行sql语句
*/

//2
const mysql = require('mysql');
//3
let option = {
  host: 'locahost',
  post: '3306',
  user: 'root',
  password: '773747129li',
  database: 'users'
};
//4
let con = mysql.createConnection(option);
//5
con.connect();
//6
con.query('select * from user', (err, result, fileds) => {
  console.log(result);
});

//注：增删改查都可以使用query方法，query方法还有一种使用,使用占位符?，传递参数时使用数组依次传递
let str = 'select * from user where age = ?';
con.query(str, ['18'], (err, result, fileds) => {
  console.log(result);
});
```

### 2、mysql 中的内连接、左连接、右连接的区别
