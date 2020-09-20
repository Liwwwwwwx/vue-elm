/**配置编译环境和线上环境之间的切换
*
* baseUrl: 域名地址
* routerMode：路由模式
* imgBaseUrl：图片所在域名地址
*
*/

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';

if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = '/img/';
}else if (process.env.NODE_ENV == 'production') {
    baseUrl = '//elm.cangdu.org';
    imgBaseUrl = '//elm.cangdu.org/img/';
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
}

/*
* process对象是全局变量，它提供当前node.js的有关信息，以及控制当前node.js的有关进程
* 主要是用来判断当前项目所处的开发环境，通常情况下本地开发环境（development），测试环境，生产环境（production）
*/