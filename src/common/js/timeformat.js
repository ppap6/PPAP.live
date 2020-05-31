//时间转换，天数，小时，分钟
export function formatTime(timespan) {
  //获取GMT时间
  var timeStamp = new Date(timespan)
  var year = timeStamp.getFullYear()
  var month = timeStamp.getMonth() + 1
  var day = timeStamp.getDate()
  var hour = timeStamp.getHours()
  var minute = timeStamp.getMinutes()
  var second = timeStamp.getSeconds()
  //获取当前GMT时间
  var now = new Date()
  var milliseconds = 0
  var timeSpanStr
  //计算时间差（时间戳格式）
  milliseconds = now - timeStamp

  if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚'
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 8) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 8 && year == now.getFullYear()) {
      timeSpanStr = (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
  } else {
      timeSpanStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
  }
  return timeSpanStr
}