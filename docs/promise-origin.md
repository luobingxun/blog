# Promise 基础知识

## 一、

### 1、Promise 介绍

​ 1）

​ 异步编程：数据库操作、文件操作、AJAX、定时器

​ promise：promise 时 ES6 提出新的异步编程解决方法，以前的异步编程是通过回调函数的方式实现

​ 2）

​ promise 作用：支持链式调用，可以解决回调地狱问题

​ 回调地狱：回调函数层层嵌套，缺点：不便于阅读、不便于错误处理

### 2、Promise 基本写法

```typescript
//写法一
const p = new Promise((resolve, reject) => {
  if (a > 9) resolve(a);
  if (a < 8) reject(a);
});
p.then(
  res => {
    console.log(res);
  },
  rej => {
    console.log(rej);
  }
);

//写法二
const p = new Promise((resolve, reject) => {
  if (a > 9) resolve(a);
  if (a < 8) reject(a);
});
p.then(res => {
  console.log(res);
}).catch(rej => {
  console.log(rej);
});
```

### 3、Promise 封装 AJAX 请求

```typescript
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject('fail');
        }
      }
    };
  });
}
fetchJson('www.baidu.com')
  .then(res => {
    console.log(res);
  })
  .catch(rej => {
    console.log(rej);
  });
```

### 4、封装读取文件

```typescript
function readFileAs(path) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
}

readFileAs('./index.html')
  .then(res => {
    console.log(res);
  })
  .catch(rej => {
    console.log(rej);
  });
```

### 5、nodejs 中的 util.promisefy

```java
/*
	promisify该方法可以将一个异步的函数包装返回一个promise，在调用的时候只需要传递参数即可，回调会由该函数自动调用
*/

const fs = require('fs')

const readFile = require('util').promisify(fs.readFile)

readFile('./index.html').then(
  res => {
    console.log(res.toString())
  },
  rej => {
    console.log(rej)
  }
)
```

## 二、

### 1、promise 的状态改变

​ petting（等待状态）：当发送请求或者处于执行阶段，处于该状态

​ fulfilled（成功状态）：当调用 resolve 方法时处于该状态，并且会调用 then 方法回调

​ reject（拒绝状态）：当调用 reject 方法时处于该状态，并且回出发回调 catch 方法

### 2、promise 补充

​ 1）、then、catch 方法回调会返回一个新的 promise

​ 2）、promise 内部执行的代码属于同步执行的代码

### 3、Promise.resolve 方法

​ 1）、作用：

· a、能够快速的返回一个成功或者失败的 promise 对象。

​ b、能够将值封装成为 promise 对象放回。

​ 2）、返回状态的改变

```javascript
const result1 = Promise.resolve('limingwei'); //成功的promise对象，promise结果为limignwei
const result2 = Promise.resolve(
  new Promise((resolve, reject) => {
    // resolve('123')     //返回的promise对象状态由参数resolve决定
    reject('err'); //返回的promise对象状态由参数reject决定
  })
);
/*
    1、如果参数时一个非Promise类型的对象，则返回一个成功的promise，且结果为resolve参数
    2、如果参数是一个promise类型的对象，则参数promise决定resolve的结果
*/
```

### 4、Promise.reject 方法

​ 1）、作用：能够快速返回一个失败的 promise 对象

```javascript
const promise = Promise.reject('error');
const promise2 = Promise.reject(
  /*
         2、 不管返回的是否为非promise对象，都会烦会失败的promise
        */
  new Promise((resolve, reject) => {
    // resolve('promise2')
    reject('error');
  })
);
```

### 5、Promise.all 方法

```javascript
/*
   	Promise.all方法，参数为promise对象数组，返回一个新的promise对象，当数组中的每一个promise
    都成功，则返回一个成功的promise对象，并且在回调then方法中结果为成功的promise对象结果组成的数组
    当数组中有一个失败则返回失败的promise对象，失败的结果为数组中失败的promise对象的失败结果
    
    注：当参数为空，则返回一个pedding状态的promise
*/
const promise1 = new Promise((resolve, reject) => {
  resolve('success');
});
const promise2 = new Promise((resolve, reject) => {
  resolve('success');
});
const promises = Promise.all([promise1, promise2]);
```

### 6、Promise.race 方法

```javascript
/*
    Promise.all方法参数为一个promise组成的数组，当数组中哪一个promise状态先改变着返回一个一
    与之相同的状态promise对象，结果也与之相同。
*/
const promise1 = new Promise((resolve, reject) => {
  resolve('success');
});
const promise2 = new Promise((resolve, reject) => {
  reject('failed');
});
const promsie = Promise.race([promise2, promise1]);
console.log(promsie); //失败的promise对象，因为promise2先返回失败的，则race方法返回失败的promise
```

## 三、

### 1、promise 改变状态的方法

```javascript
const promise = new Promise((resolve, reject) => {
  /*
        1、调用resolve，promise状态由pedding=>fulfilled
        2、调用reject，promise状态由pedding=>reject
        3、throw 抛出错误，promise状态由pedding=>reject
      */
  throw 'error';
});
console.log(promise);
```

### 2、当为 promise 指定多个成功或者失败的回调时，当状态改变，所指定的成功或者失败的回调都会执行

```javascript
const p = new Promise((resolve, reject) => {
  resolve();
});
p.then(
  res => {
    console.log('a');
  },
  rej => {
    console.log('error');
  }
);

p.then(
  res => {
    console.log('b');
  },
  rej => {
    console.log('error');
  }
);

//控制台先后打印a、b
```

### 3、promise 状态先改变还是先执行回调函数

​ 先后顺序不定：

​ 当 resolve、reject 在同步代码执行时，则先改变状态，在执行回调函数

​ 当 resole、reject 方法在异步任务中执行时，执行 then 方法会先保存回调函数，当 resole、reject 执行之后状态改变在执行回调函数

## 四、

### 1、promise.then 方法返回的 promise 状态的改变

```javascript
const promise = new Promise((resolve, reject) => {
  const num = Math.random();
  if (num > 0.5) {
    resolve(num);
  } else {
    reject('error');
  }
});

const newPromise = promise.then(
  res => {
    /*
            1、当在then方法中返回一个非promise类型的对象，则then方法返回成功的promise
            2、当返回一个promise类型对象，则返回的then返回的promise状态由返回的promise决定
            3、throw 抛出错误，则then方法返回失败的promise对象
          */
    // console.log(res)
    return res;
  },
  rej => {
    // console.log(rej)
  }
);
console.log(newPromise);
```

### 2、串连多个异步任务

```javascript
/*
 		串连异步任务根据then方法返回失败或者成功的promise来实现
 		如果在中途then方法中没有return值或者promise，则也会返回成功的promise
 		同时在新的promise的then回调中res结果值为undefined
 */

const promise = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve('success');
  } else {
    reject('failed');
  }
});
const newPromise = promise.then(
  res => {
    return new Promise((resolve, reject) => {
      resolve(res + 'step2');
    });
  },
  rej => {
    return rej;
  }
);
newPromise.then(
  res => {
    console.log(res);
  },
  rej => {
    console.log(rej);
  }
);
```

### 3、异常穿透

```javascript
const promise = new Promise((resolve, reject) => {
  resolve('success');
});
/*
        异常穿透：只需要指定一个失败的回调来处理失败情况下的结果即可
                如果在中途then方法中返回失败的promise，不会继续执行后面的then回调，
                执行匹配catch回调
      */
promise
  .then(res => {
    console.log('step1');
  })
  .then(res => {
    console.log('step2');
    throw 'error'; //中途抛出错误打印结果step1、step2、error
  })
  .then(res => {
    console.log('step3');
  })
  .catch(error => {
    console.log(error);
  });

//打印结果step1、step2、step3
```

### 4、中断 promise

```javascript
const promise = new Promise((resolve, reject) => {
  resolve('success');
});

promise
  .then(res => {
    return res;
  })
  .then(res => {
    console.log(res);
    /*
            在某一个then回调中中断promise回调，只需要返回一个pedding状态的promise对象即可
            因为pedding状态的promise不会执行then或者catch回调
          */
    return new Promise(() => {}); //中断promise继续往后执行
  })
  .then(res => {
    console.log('ok');
  })
  .catch(error => {
    console.log(error);
  });
```

# Promise 源码实现

## 一、

### 1、promise 状态修改的实现

```javascript
function Promise(executor) {
  /*
    1、promise内部有PromiseState、PromiseResult
    分别用来存储状态和promise结果
  */
  this.PromiseState = 'pedding';
  this.PromiseResult = null;
  const _this = this;
  //成功的回调
  function resolve(data) {
    /*
      2、修改状态的同时存储结果状态值
    */
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;
  }
  //失败的回调
  function reject(data) {
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
  }
  //promise中的回调需要同步执行，所以需要调用
  /*
    3、需要对throw 抛出错误返回reject的promise实现
  */
  try {
    executor(resolve, reject);
  } catch (e) {
    //throw抛出错误状态rejected
    reject(e);
  }
}

Promise.prototype.then = function () {};
```

```javascript
const promise = new Promise((resolve, reject) => {
  // resolve('success')
  // reject('failed')
  throw 'error';
});
console.log(promise);
```

### 2、promise 状态只能改变一次

由 petting 变为 fulfilled 或者 rejected 后状态不能在改变

```javascript
function Promise(excutor) {
  this.PromiseState = 'pedding';
  this.PromiseResult = null;
  const _this = this;
  function resolve(data) {
    /*
      如果promise状态不是petting则不在对状态进行改变
      即可实现状态的修改一次
    */
    if (_this.PromiseState !== 'pedding') return;
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;
  }
  function reject(data) {
    if (_this.PromiseState !== 'pedding') return;
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
  }
  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
```

```javascript
const promise = new Promise((resolve, reject) => {
  /*
          状态只修改一次，因此不管调用多少次都以第一次调用的状态修改为准
        */
  resolve('success');
  reject('error');
  // reject('error')
});
console.log(promise); //状态为成功的promise
```

### 3、then 方法的初步实现

```javascript
Promise.prototype.then = function (onSucess, onFail) {
  /*
    根据成功或者失败的状态执行对应的回调函数并且把结果值传递
  */
  if (this.PromiseState === 'fulfilled') {
    onSucess(this.PromiseResult);
  }
  if (this.PromiseState === 'rejected') {
    onFail(this.PromiseResult);
  }
};
```

```javascript
const promise = new Promise((resolve, reject) => {
  resolve('success');
  reject('error');
});
console.log(promise);

promise.then(
  res => {
    console.log(res);
  },
  rej => {
    console.log(rej);
  }
);
```

### 4、异步情况下 promise 状态的修改

```javascript
/*
        1、异步情况下修改状态，由于resolve、reject方法还没执行
        此时返回的是petting状态的promise
        then方法同步执行,在then方法的实现中没有对pedding状态
        进行处理
      */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('success')
    reject('error');
  }, 1000);
});
promise.then(
  res => {
    console.log(res);
  },
  rej => {
    console.log(rej);
  }
);
```

```javascript
function Promise(excutor) {
  this.PromiseState = 'pedding';
  this.PromiseResult = null;
  //保存异步状态修改的成功或者失败的函数
  this.callback = {};
  const _this = this;
  function resolve(data) {
    if (_this.PromiseState !== 'pedding') return;
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;
    /*
      异步方法中调用resolve修改状态后，执行保存的成功的回调函数
    */
    if (_this.callback.onSuccess) {
      _this.callback.onSuccess(_this.PromiseResult);
    }
  }
  function reject(data) {
    if (_this.PromiseState !== 'pedding') return;
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
    /*
      异步方法中调用reject修改状态后，执行保存的失败的回调函数
    */
    if (_this.callback.onFail) {
      _this.callback.onFail(_this.PromiseResult);
    }
  }
  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onSuccess, onFail) {
  if (this.PromiseState === 'fulfilled') {
    onSuccess(this.PromiseResult);
  }
  if (this.PromiseState === 'rejected') {
    onFail(this.PromiseResult);
  }
  /*
    2、异步状态修改的解决
    状态还没有修改时执行then方法，先把成功或者失败的回调存储
    在当前对象下面，当在异步任务中调用resolve、reject之后在执行
    保存的回调函数
  */
  if (this.PromiseState === 'pedding') {
    /*
      保存成功或者失败的回调函数到当前对象中
    */
    this.callback = {
      onSuccess,
      onFail
    };
  }
};
```

### 5、为返回的 promise 指定多个回调函数的处理

```javascript
function Promise(excutor) {
  this.PromiseState = 'pedding';
  this.PRomiseResult = null;
  //存储指定的付哦哥then回调函数
  this.callbacks = [];
  const _this = this;
  function resolve(data) {
    if (_this.PromiseState === 'pedding') return;
    _this.PromiseState = 'fulfilled';
    _this.PRomiseResult = data;
    /*
      2、遍历执行指定的多个then的回调函数
    */
    _this.callbacks.forEach(cb => {
      cb.onSuccess(_this.PromiseResult);
    });
  }
  function reject(data) {
    if (_this.PromiseState === 'pedding') return;
    _this.PromiseState = 'rejected';
    _this.PRomiseResult = data;
    _this.callbacks.forEach(cb => {
      cb.onFail(_this.PromiseResult);
    });
  }
  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onSuccess, onFail) {
  if (this.PromiseState === 'fulfilled') {
    onSuccess(this.PRomiseResult);
  }
  if (this.PromiseState === 'rejected') {
    onFail(this.PRomiseResult);
  }
  /*
    1、将指定的多个then回调函数保存，当状态修改时在resolve、reject
    方法中遍历执行
    使用数组来存储所有指定的then回调函数
    注：同步情况下不需要对成功或者失败的函数存储
        同步情况下的状态修改没吊用一次then就会进行上面
        两个判断
  */
  if (this.PromiseState === 'pedding') {
    this.callbacks.push({
      onSuccess,
      onFail
    });
  }
};
```

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});

promise.then(
  res => {
    console.log('first promise:' + res);
  },
  rej => {
    console.log('first promise:' + rej);
  }
);

promise.then(
  res => {
    console.log('seconed promise:' + res);
  },
  rej => {
    console.log('seconed promise:' + rej);
  }
);
```

## 二、

### 1、同步情况下对 then 方法返回的 promise 状态修改的实现

```javascript
function Promise(excutor) {
  this.PromiseState = 'pedding';
  this.PromiseResult = null;
  this.callbacks = [];
  const _this = this;
  function resolve(data) {
    if (_this.PromiseState !== 'pedding') return;
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;
    _this.callbacks.forEach(cb => {
      cb.onSuccess(_this.PromiseResult);
    });
  }
  function reject(data) {
    if (_this.PromiseState !== 'pedding') return;
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
    _this.callbacks.forEach(cb => {
      cb.onSuccess(_this.PromiseResult);
    });
  }
  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onSuccess, onFail) {
  const _this = this;
  return new Promise((resolve, reject) => {
    //公共的方法
    function commonFunction(onMethod) {
      /*
        then方法调用后返回一个新的Promise，这个返回的promise的状态
        由then方法成功或者失败的回调的返回值决定，
        1、如果返回非promise数值则返回成功promise，
        2、返回promise类型，则有该promise决定then方法返回的promise的状态
        3、如果在回调中抛出错误，则then方法返回失败的promise
      */
      try {
        const result = onMethod(_this.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            res => {
              resolve(res);
            },
            rej => {
              reject(rej);
            }
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }

    switch (this.PromiseState) {
      case 'fulfilled':
        commonFunction(onSuccess);
        break;
      case 'rejected':
        commonFunction(onFail);
        break;
      case 'pedding':
        this.callbacks.push({
          onSuccess,
          onFail
        });
        break;
      default:
        return;
    }
  });
};
```

```javascript
const promise = new Promise((resolve, reject) => {
  resolve('success');
});
const p = promise.then(
  res => {
    // return 'suscess'
    // throw 'error'
    return new Promise((resolve, reject) => {
      // resolve('success')
      reject('error');
    });
  },
  rej => {
    console.log(rej);
  }
);
```

### 2、同步情况下对 then 方法返回的 promise 状态修改的实现

```javascript
function Promise(excutor) {
  this.PromiseState = 'pedding';
  this.PromiseResult = null;
  this.callbacks = [];
  const _this = this;
  function resolve(data) {
    if (_this.PromiseState !== 'pedding') return;
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;
    _this.callbacks.forEach(cb => {
      cb._onSuccess(_this.PromiseResult);
    });
  }
  function reject(data) {
    if (_this.PromiseState !== 'pedding') return;
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
    _this.callbacks.forEach(cb => {
      cb._onSuccess(_this.PromiseResult);
    });
  }
  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onSuccess, onFail) {
  const _this = this;
  return new Promise((resolve, reject) => {
    //公共的方法
    function commonFunction(onMethod) {
      try {
        const result = onMethod(_this.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            res => {
              resolve(res);
            },
            rej => {
              reject(rej);
            }
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }

    switch (this.PromiseState) {
      case 'fulfilled':
        commonFunction(onSuccess);
        break;
      case 'rejected':
        commonFunction(onFail);
        break;
      case 'pedding':
        /*
          异步情况下，当第一个Promise状态还没有改变的时候将毁掉函数存储
          当真正调用状态改变函数的时候，在根据返回值决定then返回值决定返回的promise
          状态
        */
        this.callbacks.push({
          _onSuccess: function () {
            commonFunction(onSuccess);
          },
          _onFail: function () {
            commonFunction(onFail);
          }
        });
        break;
      default:
        return;
    }
  });
};
```

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000);
});

const p = promise.then(
  res => {
    // return 'suscess'
    // throw 'error'
    return new Promise((resolve, reject) => {
      // resolve('success')
      setTimeout(() => {
        reject('error');
      }, 3000);
    });
  },
  rej => {
    console.log(rej);
  }
);
console.log(p);
```

### 3、catch 方法实现、异常穿透、值传递

```javascript
Promise.prototype.then = function (onSuccess, onFail) {
  const _this = this;
  /*
      2、如果没有在then中传递失败的回调，则继续放回失败的promise
      给下一个then方法，如果下一个then还是没有制定失败的回调
      继续往后传递，直到匹配到失败的回调
  */
  return new Promise((resolve, reject) => {
    if (!onFail) {
      onFail = function (data) {
        throw data;
      };
    }
    /*
      3、如果没有在then方法中传递成功的回调函数，则继续将返回成功的promise，
      并肩个结果往后传递，直到then方法有成功的回调函数
    */
    if (!onSuccess) {
      onSuccess = function (data) {
        return data;
      };
    }
    //公共的方法
    function commonFunction(onMethod) {
      try {
        const result = onMethod(_this.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            res => {
              resolve(res);
            },
            rej => {
              reject(rej);
            }
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }

    switch (this.PromiseState) {
      case 'fulfilled':
        commonFunction(onSuccess);
        break;
      case 'rejected':
        commonFunction(onFail);
        break;
      case 'pedding':
        this.callbacks.push({
          _onSuccess: function () {
            commonFunction(onSuccess);
          },
          _onFail: function () {
            commonFunction(onFail);
          }
        });
        break;
      default:
        return;
    }
  });
};
/*
  1、catch方法的封装
  异常穿透，只需要指定一个失败的回调，如果在链式调用中，中途
  失败，则直接匹配失败的回调
*/
Promise.prototype.catch = function (onFail) {
  this.then(undefined, onFail);
};
```

```javascript
const promise = new Promise((resolve, reject) => {
  resolve('success');
  // reject('error')
});

promise
  .then()
  .then(res => {
    console.log('b');
    throw 'fail';
  })
  .then(res => {
    console.log('c');
  })
  .then(res => {
    console.log('d');
  })
  .catch(e => {
    console.log(e);
  });
```

### 4、Promise.resolve 方法的实现

```javascript
Promise.resolve = function (params) {
  return new Promise((resolve, reject) => {
    if (params instanceof Promise) {
      params.then(
        res => {
          resolve(res);
        },
        rej => {
          reject(rej);
        }
      );
    } else {
      resolve(params);
    }
  });
};
```

```javascript
const promise = Promise.resolve(
  new Promise((resolve, reject) => {
    resolve('123');
    reject('123');
  })
);
console.log(promise);
```

### 5、Promise.reject 方法的实现

```javascript
Promise.reject = function (params) {
  return new Promise((resolve, reject) => {
    reject(params);
  });
};
```

```javascript
const promise = Promise.reject(
  '345'
  // new Promise((resolve, reject) => {
  //   resolve('123')
  // })
);
console.log(promise);
```

## 三、

### 1、Promise.all 方法的实现

```javascript
Promise.all = function (promiseArr) {
  return new Promise((resolve, reject) => {
    /*
      只有传递的promise数组都成功才会返回成功的回调，并把结果返回
      如果其中一个失败则返回失败的promise，并把失败的结果返回
    */
    const results = [];
    let returnSignel = 0;
    promiseArr.forEach(promise => {
      promise.then(
        res => {
          results.push(res);
          returnSignel++;
          if (returnSignel === promiseArr.length) {
            resolve(results);
          }
        },
        rej => {
          reject(rej);
        }
      );
    });
  });
};
```

### 2、Promise.race 方法的实现

```javascript
Promise.race = function (promiseArr) {
  /*  
    promise数组中哪一个promise的状态先改变，则返回改变的
    promise状态和结果
  */
  return new Promise((resolve, reject) => {
    promiseArr.forEach(promise => {
      promise.then(
        res => {
          resolve(res);
        },
        rej => {
          reject(rej);
        }
      );
    });
  });
};
```

```javascript
const p1 = Promise.resolve('123');
const p2 = new Promise((resolve, reject) => {
  // resolve('ok')
  setTimeout(() => {
    reject('error');
  }, 3000);
});
const promise = Promise.race([p2, p1]);
console.log(promise);
```

### 3、处理 then 方法中的代码属于异步

```javascript
/*
	then方法中的代码属于异步，只需要在成功或者失败的回调套上setTimeout即可
*/

Promise.prototype.then = function (onSuccess, onFail) {
  const _this = this
  return new Promise((resolve, reject) => {
    if (!onFail) {
      onFail = function (data) {
        throw data
      }
    }
    if (!onSuccess) {
      onSuccess = function (data) {
        return data
      }
    }
    //公共的方法
    function commonFunction(onMethod) {
      try {
        const result = onMethod(_this.PromiseResult)
        if (result instanceof Promise) {
          result.then(
            res => {
              resolve(res)
            },
            rej => {
              reject(rej)
            }
          )
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }

    switch (this.PromiseState) {
      case 'fulfilled':
        setTimeout(() => {
          commonFunction(onSuccess)
        })
        break
      case 'rejected':
        setTimeout(() => {
          commonFunction(onFail)
        })
        break
      case 'pedding':
        this.callbacks.push({
          _onSuccess: function () {
            setTimeout(() => {
              commonFunction(onSuccess)
            })
          },
          _onFail: function () {
            setTimeout(() => {
              commonFunction(onFail)
            })
          }
        })
        break
      default:
        return
    }
  })
```

### 4、async 的使用

```javascript
/*
        async介绍
        1、作用：声明一个函数属于异步函数
        2、返回一个promise，更具返回的内容决定是成功还是失败的promise，返回非Promise类型，成功
            放回promise类型对象，由promise状态决定失败或者成功
        3、throw 抛出错误返回失败的promise
      */
const fetchJson = async url => {
  const promise = new Promise((resolve, reject) => {
    //发送请求...
    resolve('ok');
  });
  const result = await promise;
  console.log(result);
  return result;
};
fetchJson('www.baidu.com');
```

### 5、await 的使用

```javascript
const fetchJson = async url => {
  const promise = new Promise((resolve, reject) => {
    //发送请求...
    resolve('ok');
  });
  /*
          await介绍使用
          1、只能在async函数中使用,async函数可以没有await
          2、await后面可以根任何类型的数值，如果后面为promise类型数据，则直接解构出promise的结果值
        */
  const result = await promise;
  console.log(result);
  return result;
};
fetchJson('www.baidu.com');
```

## Promise 补充学习

### 1、Promise.any

```javascript
/*
	该方法返回一个promise对象，参数为一个promise组成的数组，当数组中的哪一个promise先执行成功，则返回成功的promise，数组后面的	 promise都不会被执行，当所有的promise都没有执行成功则返回一个失败的promise对象
	
	注： 1、当参数为空时返回一个失败的promise对象。
		  2、参数不为空，并且不包含promise，则返回一个失败的promise对象。
		  3、参数不为空，或则参数是promise对象和非promise对象组成的数组，则安通常的处理。
*/
```

### 2、promise.allSelected

```javascript
/*
	该方法返回一个新的promise对象，参数为promise组成的数组，该方法回执行每一个promise，并将该promise对象返回的结果保存，当左右	的promise对象对执行完毕，返回一个成功的promise，结果为数组中的每个promise对象执行的结果集。
	
	注：该方法和all不同在于，该方法通常用于promise数组中的promise成员的相关性不强，all中promise成员的相关性比较强
*/
```

### 3、Promise.prototype.finally

```javascript
/*
该方法返回一promise，不论promise状态为什么，只要创建promise，都会执行该方法，

注：如果finally方法返回一个失败的promise，则以返回的promise为准，
    如果返回成功的promise，则以调用者的promise状态和结果为准
*/
```
