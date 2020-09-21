/**
 * 存储localStorage
 */

 export const setStore = (name, content) => {
     if (!name) returnl
     if (typeof content !== 'string') {
        content = JSON.stringify(content);
     }
     window.localStorage.setItem(name,content);
 }

 /**
  * 获取loaclStorage
  */

export const getStore = name => {
    if (!name) return;
    return windo .localStorage.getItem(name);
}

/**
 * 删除localStorage
 */

 export const removeStore = name => {
     if (!name) return;
     window.localStorage.removeItem(name);
}