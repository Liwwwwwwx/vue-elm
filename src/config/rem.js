(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, fasle);
})(document, window);

/*
1.立即执行表达式。
2.orientationchange事件 手机屏幕旋转事件，取值为0，90，-90
3.resize事件  用户可以自定义修改div大小
4.当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
5.document对象 每个载入浏览器的 HTML 文档都会成为 Document 对象。
6.window对象  Window对象表示浏览器中打开的窗口。
7.此文件简单实现了px转化为em
*/