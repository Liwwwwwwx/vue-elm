import {
    baseUrl
} from './env'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase(); //转换成大写
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; // 数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'; //为什么要加&在字符串的末尾，然后在去掉
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));//去除dataStr的‘&’符号
            url = url + '?' + dataStr;  //为什么要加？
        }
    }

    if (window.fetch && method == 'fetch') {
        let requstConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'appliaction/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'force-cache'
        }
        if (type == 'POST') {
            Object.defineProperty(requstConfig, 'body', {
                value: JSON.stringify(data)
            }) //Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
        }
    
        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((res,rej) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject; //什么是ActiveXObject
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }
            requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);
            
            requestObj.onreadystatechange = () => {
                if (requestObj.readState == 4) {
                    if(requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        res(obj)
                    } else {
                        rej (requestObj)
                    }
                }
            }
        })
    }
}

/**
 * substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符
 * Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的object上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致，一般情况下是从小到大排序
 * credentials 用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。
 *    omit: 从不发送cookies.
 *    same-origin: 只有当URL与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息.(浏览器默认值,在旧版本浏览器，例如safari 11依旧是omit，safari 12已更改)
 *    include: 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.
 *
 * mode 用于确定跨域请求是否能得到有效的响应，以及响应的哪些属性是可读的。
 *    same-origin — 如果使用此模式向另外一个源发送请求，显而易见，结果会是一个错误。你可以设置该模式以确保请求总是向当前的源发起的。
 *    no-cors — 保证请求对应的 method 只有 HEAD，GET 或 POST 方法，并且请求的 headers 只能有简单请求头 (simple headers)。如果 ServiceWorker 劫持了此类请求，除了 simple header 之外，不能添加或修改其他 header。另外 JavaScript 不会读取 Response 的任何属性。这样将会确保 ServiceWorker 不会影响 Web 语义(semantics of the Web)，同时保证了在跨域时不会发生安全和隐私泄露的问题。
 *    cors — 允许跨域请求，例如访问第三方供应商提供的各种 API。预期将会遵守 CORS protocol  。仅有有限部分的头部暴露在 Response ，但是 body 部分是可读的。
 *    navigate — 表示这是一个浏览器的页面切换请求(request)。 navigate请求仅在浏览器切换页面时创建，该请求应该返回HTML。
 *
 * cache 作为Request 接口只读属性包含着请求的缓存模式。它控制着请求以何种方式与浏览器的  HTTP 缓存进行交互
 *    default — 浏览器从HTTP缓存中寻找匹配的请求。
 *      如果缓存匹配上并且有效（ fresh）, 它将直接从缓存中返回资源。
 *      如果缓存匹配上但已经过期 ，浏览器将会使用传统（ conditional request ）的请求方式去访问远程服务器 。如果服务器端显示资源没有改动，它将从缓存中返回资源。否则，如果服务器显示资源变动，那么重新从服务器下载资源更新缓存。
 *      如果缓存没有匹配，浏览器将会以普通方式请求，并且更新已经下载的资源缓存。
 *    no-store — 浏览器直接从远程服务器获取资源，不查看缓存，并且不会使用下载的资源更新缓存。
 *    reload — 浏览器直接从远程服务器获取资源，不查看缓存，然后使用下载的资源更新缓存。
 *    no-cache — 浏览器在其HTTP缓存中寻找匹配的请求。
 *      如果有匹配，无论是新的还是陈旧的，浏览器都会向远程服务器发出条件请求。如果服务器指示资源没有更改，则将从缓存中返回该资源。否则，将从服务器下载资源并更新缓存。
 *      如果没有匹配，浏览器将发出正常请求，并使用下载的资源更新缓存。
 *    force-cache — 浏览器在其HTTP缓存中寻找匹配的请求。
 *      如果有匹配项，不管是新匹配项还是旧匹配项，都将从缓存中返回。
 *      如果没有匹配，浏览器将发出正常请求，并使用下载的资源更新缓存。
 *    only-if-cached — 浏览器在其HTTP缓存中寻找匹配的请求。
 *      如果有匹配项(新的或旧的)，则从缓存中返回。
 *      如果没有匹配，浏览器将返回一个错误。
 */