## 开发环境配置

### 1、webpack 五大核心概念

​ 1）、entry：打包的文件入口，在打包的时候需要提供一个入口文件，而入口文件之间的层级依赖 webpack 回去自动处理。

​ 2）、output：打包输出的文件目录位置。

​ 3）、loader：webpack 在打包的时候会将图片、js、css、less 等文件作为模块打包，而 loader 则是将这些模块翻译成为浏览器可识 别的资源，例如将 ES6 转化为 ES5，将 less 转换为 css。

​ 4）、plugins：对 webapck 打包工呢个的拓展、例如：代码压缩、代码优化等。

​ 5）、mode：当前的模式，可选值"development"、"production"。

​ development：将 process.env.NODE.ENV = "development"，默认开启：chunkNameplugin、chunkModuleplugin。

​ production：将 process.env.NODE.ENV = "production"，默认开启 uglifyjsplugin 插件。

### 2、webpack 基础

​ 1）、运行指令

​ 开发指令：webpack ./src/index.js -o ./build --mode=development

​ 生产指令：webpack ./src/index.js -o ./build --mode=production

​ 2）、结论

​ a：webpack 在默认情况下值能对 js 和 json 文件进行打包处理，不能处理其他的资源文件。

​ b：webpack 会将 ES6 模块转化成为浏览器可识别的 ES 模块。

​ c：webpack 的生产环境比开发环境多一个代码压缩的功能。

### 3、打包样式文件

​ 1）、webpack.config.js 文件基本结构

```javascript
const { resolve } = require('path');
module.exports = {
  //打包入口
  entry: './src/index.js',
  //输出路径
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  //配置loader
  module: {
    rules: []
  },
  //配置插件
  plugins: [],
  //当前模式
  mode: 'development'
};
```

​
​ 2）、打包文件样式

```javascript
const { resolve } = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      /*
        1、打包css样式
      */
      {
        test: /\.css$/,
        use: [
          //2、style-loader创建一个style标签，将js中的css样式以style标签的形式插入html的head中生效
          'style-loader',
          //1、css-loader将css样式以commonJS的方式引入js文件中
          'css-loader'
        ]
      },

      /*
        2、打包less文件样式
      */
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          //less-loader负责将less文件样式转化成为css文件样式
          'less-loader'
        ]
      }
    ]
  },
  plugins: [],
  mode: 'development'
};
```

### 4、打包 html 资源

```javascript
/*
	1、安装 npm i html-webpack-plugin
*/

const { resolve } = require('path');

/*
  2、引入
*/
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    /*
      3、html-webpack-plugin作用
          默认：会生成一个html文件，并且自动将打包之后的所有资源在html文件中引入
          template模版作用：指定一个html接口模版，打包的时候复制该html文件并且将打包后的资源文件引入
                          保留模版html结构
    */
    //
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
```

### 5、打包图片资源

```typescript
const { resolve } = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader',
        options: {
          /*
            1、limit的作用
                如果图片大小没有超过8kb则将图片转化成为base64编码
                如鬼哦图片带下超过8kb则将图片打包不进行转换
                优点：减少服务器压力
                缺点：打包的转换based64文件大
          */
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          /*
            3、同时使用url-loader和html-loader时，在打包后的html文件中通过img引入的图片
            会出现对象object module的情况
            原因：url-loader时以esModule的方式导入，html-loader则是commonJS的模块导入
            解决方法：url-loader中esModule:false关闭ES module
          */
          esModule: false
        }
      },
      {
        //   /*
        //     2、到包html中通过img引入的图片
        //   */
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
```

### 6、打包其他资源

```typescript
const { resolve } = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      /*
          打包其他资源
      */
      {
        exclude: /\.css$/,
        loader: 'file-loader',
        options: {
          outputPath: 'others'
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
```

### 7、webpack-dev-server 配置

```typescript
const { resolve } = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  /*
    配置devServer服务
  */
  devServer: {
    // contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3004,
    open: true
  },
  mode: 'development'
};
```

## 生产环境配置

### 1、提取 css 样式文件

```typescript
/*	
	1、安装插件：mini-css-extract-plugin
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
/*
  2、引入mini-css-extract-plugin插件
*/
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          miniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          /*
            3、由于提取css因此不需要使用style-loader创建style标签
               而是使用mini-css-extract-plugin自带的loader提取js代码中的css
          */
          // 'style-loader',
          miniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    /*
      3、配置：默认提出的css文件名称为mian.css
              可以使用filename重命名
    */
    new miniCssExtractPlugin({
      filename: 'css/index.css'
    })
  ],
  mode: 'production'
};
```

### 2、css 兼容性处理

```typescript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          /*
          	1、安装postcss、postcss-loader、postcss-preset-env
          */
          /*
            2、css兼容性配置
                对less坐兼容性处理时，需要在less-loader之后进行
          */
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          }
          /*
          	3、package.json中配置需要兼容的浏览器，browserslist更多配置查资料
          	"browserslist": {
              "development": [
                "last 1 chrome version",
                "last 1 ie version"
              ],
              "production": [
                "> 2%",
                "not dead"
              ]
            }
          */
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  mode: 'production'
};
```

### 3、css 压缩

```typescript
/*
	1、安装插件 optimize-css-assets-webpack-plugin
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/*
  2、引入插件
*/
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
    /*
      3、配置插件
    */
    new optimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production'
};
```

### 4、js 代码打包受 eslint 检查

```typescript
const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      /*
        1、安装eslint、eslint-loader 并配置eslint-loader
      */
      {
        test: /\.(js|ts)$/,
        exclude: /node_module/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
      /*
        2、安装eslint检查规则eslint、eslint-config-airbnb、eslint-plugin-import
          在pacjage.json中配置
           "eslintConfig":{
              "extends":"eslint-airbnb"
            }
      */
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production'
};
```

### 5、js 兼容性处理

```typescript
const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      /*
        1、安装babel-loader、@babel/core、@babel/preset-env，并配置babel-laoder
           此方法只能检查翻译一般的es语法，promise就不能转译成为浏览器识别的语法
      */
      // {
      //   test:/\.(js|ts)$/,
      //   exclude:/node_module/,
      //   loader:'babel-loader',
      //   options:{
      //     presets:['@babel/preset-env']
      //   }
      // }
      /*
        2、安装@babel/polyfill，全局引入
           这种方法能够对es6以上的所有语法兼容，但是打包产生的体积大
      */

      /*
        3、按需兼容处理，安装core-js
           只会对需要兼容的语法进行兼容处理
      */
      {
        test: /\.(js|ts)$/,
        exclude: /node_module/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  ie: '11'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production'
};
```

### 6、压缩 html、js 代码

```typescript
/*
	1、js代码生产环境下自动开启压缩
*/

/*
	2、压缩html代码
*/

 plugins:[
    new htmlWebpackPlugin({
      template:'./src/index.html',
      minify:{			//	开启压缩html代码
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
```
