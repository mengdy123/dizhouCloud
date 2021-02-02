export default function newSize (size) {   // <-- 原作者这里使用的是module.exports
  return new Promise((resolve, reject) => {
    var num = Number(size) * 8 / 40
    return num
  })
}