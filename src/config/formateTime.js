export const formateTime = (time) => {
  if(!time) {
    return ''
  }
  let date = new Date(time)

  let year,month,day,hour,minute,second
  //获取年
  year = date.getFullYear()
  //获取月
  month = date.getMonth() +1  //(0-11)
  //获取日
  day = date.getDate()
  //获取时
  hour = date.getHours() <10? '0'+date.getHours():date.getHours()
  //获取分钟
  minute = date.getMinutes() <10? '0'+date.getMinutes():date.getMinutes()
  //获取秒
  second = date.getSeconds() <10? '0'+date.getSeconds():date.getSeconds()

  return `${year}-${month}-${day}  ${hour}:${minute}:${second}`
}