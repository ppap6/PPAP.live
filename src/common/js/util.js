class util {
  // 当前距离顶部的滚动值
  static getScrollTop(){
    let scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
        scrollTop = document.body.scrollTop
    }
    return scrollTop
  }

  // 屏幕的高度值
  static getClientHeight(){
    let clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    }
    return clientHeight
  }

  // 滚动条的长度
  static getScrollHeight(){
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
  }
}

export default util