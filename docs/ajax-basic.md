# Ajax

### 一、

### 1、发送 ajax 的两种写法

```javascript
/*
        写法一
 */
function fetchJson() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8000/user');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
      }
    }
  };
}
/*
        写法二
*/
function fetchJson() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8000/user');
  xhr.send();
  xhr.addEventListener('load', function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
      }
    }
  });
}
```

### 2、异步和同步的 Ajax

```javascript
/*
        1、同步的ajxa只需要在open第三个参数设置false,并且不需要指定事件监听函数，
        	 直接通过xhr.response获取
        	
*/
function fetchJson() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8000/user', false);
  xhr.send();
  console.log(xhr.response);
}

/*
        1、异步的ajxa只需要在open第三个参数设置true，并且需要指定请求完成之后的监听函数
*/
function fetchJson() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8000/user', true);
  xhr.send();
  xhr.addEventListener('load', function () {
    if (xhr.readyState === 4) {
      if (xhr.status < 300 && xhr.status >= 200) {
        console.log(xhr.response);
      }
    }
  });
}
```

### 3、xhr 的属性

#### secession A

#### 1）onreadystatechange

​ 注：a、不能使用在同步的 ajax 中

​ b、请求被 [abort()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort) 中断之后不会被触发

#### 2）readystate

​ XMLHttpRequest 代理当前所处的状态，分别为一下四种：

​ 0： 创建 XMLHttpRequest

​ 1：`open()` 方法已经被调用。

​ 2：`send()` 方法已经被调用，并且头部和状态已经可获得。

​ 3：下载中； `responseText` 属性已经包含部分数据。

​ 4：下载操作已完成

#### section B

#### 1）response

​ 请求响应体的内容，取决于 responseType

#### 2）responseText

​ 后端返回的文本内容

​ 如果后端返回的是一个 html，则可以通过使用正则去筛选出对应的片段，放在 fragment 中去像操作 DOM 一样去操作这些数据

​

#### 3）responseType

​ 设置响应的数据类型，必须在 open 之前设置

​ 可选值：json、''/text、arraybuffer、blob、document、ms-stream

```javascript
function fetchJson() {
  const xhr = new XMLHttpRequest();
  //1、 xhr.responseType = 'json'  //将返回的数据格式化为json格式
  //2、xhr.responseType = '' //将返回的数据格式化为text格式, 可取值''/text
  //xhr.responseType = 'text' //将返回的数据格式化为text格式
  //3、 xhr.responseType = 'arraybuffer' //将返回的数据格式化为二进制数据对象ArrayBuffer
  //4、 xhr.responseType = 'blob' //将返回的数据格式化为blob二进制数据对象
  //5、 xhr.responseType = 'document' //将返回的数据格式化为HTML Document 或 XML XMLDocument格式
  //6、 xhr.responseType = 'ms-stream' //是流式下载的一部分；此响应类型仅允许用于下载请求
  xhr.open('GET', 'http://localhost:8000/user');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
      }
    }
  };
}
```

​

#### 4）responseURL

返回响应的 url 字符串，如果 url 为空，则返回空字符串，url 有锚点，删除#之后的内容，如果有重定向操作，则返回重定向之后的 url

#### 5）responseXML

返回的类型为 html/xml 的文件数据，可以通过该属性去获取 xml 的内容，之后可以像操作 DOM 一样去操作 xml 中的标签

#### section C

#### 1）status

请求响应的状态码

#### 2）statusText

请求响应的状态文本信息

#### 3）timeout

设置请求的超时时间，超时属性可能只能在调用 [open()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open) 方法之后且在调用 [send()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send) 方法之前设置。

#### 4）upload

**返回一个** `XMLHttpRequestUpload`对象，用来监听文件上传的进度

可以被绑定在 upload 对象上的事件监听器如下：onloadstart、onprogress、onload、onloadend、onabort、onerror、ontimeout

#### 5）withCredentials

简单来说，当跨域请求时，需要将这个值设为 true 才可在请求头中携带 cookie 信息，后端也需要 Access-Control-Allow-Credentials:true

如果没有跨域请求时，请求头中会自动携带 cookie，不需要设置该值为 true

### 4、监测请求进度

```javascript
var oReq = new XMLHttpRequest();
/*
onloadstart、onprogress、onload、onloadend、onabort、onerror
*/
oReq.addEventListener('progress', updateProgress);
oReq.addEventListener('load', transferComplete);
oReq.addEventListener('error', transferFailed);
oReq.addEventListener('abort', transferCanceled);
req.addEventListener('loadend', loadEnd);

oReq.open();
```

### 5、表单提交和文件上传

提交表单数据可以使用 formData API 来提交表单数据

​ 1）一个 html 的 form 表单可以用以下四种方式发送：

- 使用 `POST` 方法，并将 `enctype` 属性设置为 `application/x-www-form-urlencoded` (默认)
- 使用 `POST` 方法，并将 `enctype` 属性设置为 `text/plain`
- 使用 `POST` 方法，并将 `enctype` 属性设置为 `multipart/form-data`
- 使用 `GET` 方法（这种情况下 `enctype` 属性会被忽略）

## 二、缓存

### 1、获取最后的修改时间

```javascript
var oReq = new XMLHttpRequest();
oReq.open('HEAD' /* 仅需要头部信息(headers)时请使用 HEAD! */, 'yourpage.html');
oReq.onload = function getHeaderTime() {
  console.log(this.getResponseHeader('Last-Modified')); /* 一个合法的 GMTString 日期或 null */
};
oReq.send();
```

### 2、绕过缓存

```javascript
/*
	方法一：这个方法只工作于基于 Gecko内核的软件, 也就是通道属性是 Gecko-specific.
*/
var req = new XMLHttpRequest();
req.open('GET', url, false);
req.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
req.send(null);

/*
	方法二：为请求添加时间戳
*/
var oReq = new XMLHttpRequest();

oReq.open('GET', url + (/\?/.test(url) ? '&' : '?') + new Date().getTime());
oReq.send(null);
```

## 三、XMLHttpRequest 方法

#### 1、abort()

#### 2、 getAllResponseHeaders

#### 3、getResponseHeader

#### 4、setRequestHeader

​ 需要在 open 和 send 之间调用，如果同时对同一个额请求头设置，则会最后一个设置的为准

#### 5、send

​ 如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才回。

#### 6、open

​ xhrReq.open(method, url, async, user, password)

#### 7、overrideMimeType

​ 指定一个 MIME 类型用于替代服务器指定的类型，使服务端响应信息中传输的数据按照该指定 MIME 类型处理

​ 强制指定返回的数据类型，XMLHttpRequest.overrideMimeType(mimeType)

## 四、XMLHttpRequest 事件

### 1、XMLHttpRequest 事件

loadstart、loadprogress、loadend、load、abort、error、timeout、onreadystatechange

### 2、XMLHttpRequestEventTarget

为请求的事件函数的事件对象，该对象上 onloadstart、onloadprogress、onloadend、onload、onabort、onerror、ontimeout 等事件

### 3、FormData

**`FormData`** 接口提供了一种表示表单数据的键值对 `key/value` 的构造方式，并且可以轻松的将数据通过[`XMLHttpRequest.send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send) 方法发送出去，本接口和此方法都相当简单直接。如果发送出时的编码类型被设为 `"multipart/form-data"`，它会使用和表单一样的格式。

```javascript
const formData = new FormData(formElement);
```

- FormData.append(). 添加新元素，重名也不覆盖
- FormData.delete() 删除指定的元素
- FormData.set() 设置键值
- FormData.get(). 通过 key 获取数据
- FormData.getAll() 获取所有的 key- values
- FormData.has() 通过 key 来判断是否有每个 key
- FormData.keys()
- FormData.values()
- FormData.entries() 返回数据实体数组
