Object.defineProperty(exports, '__esModule', { value: true })
module.exports.default = function intervalCall(
  interval = 1000,
  useRootContext = false,
) {
  let globalElapsed = true
  return fn => {
    // interval 시간 안에 다시 호출된 함수 콜은 무시한다
    let elapsed = true
    return function(...args) {
      if (useRootContext ? !globalElapsed : !elapsed) {
        // console.warn((fn.name || 'anonymous function') + ' is canceled by intervalCall')
        return // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
      }
      if (useRootContext) {
        globalElapsed = false
      } else {
        elapsed = false
      }

      setTimeout(() => {
        if (useRootContext) {
          globalElapsed = true
        } else {
          elapsed = true
        }
      }, interval)
      return fn.call(this, ...args)
    }
  }
}
