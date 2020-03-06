interface IOptions {
  useRootContext?: boolean
  logCancelMessage?: boolean
}

export default function intervalCall(interval = 1000, options?: IOptions) {
  let globalElapsed = true
  return fn => {
    // interval 시간 안에 다시 호출된 함수 콜은 무시한다
    let elapsed = true
    return function(this: any, ...args) {
      if (options?.useRootContext ? !globalElapsed : !elapsed) {
        if(options?.logCancelMessage){
          const fnName = (fn.name || 'anonymous function')
          console.warn('`' + fnName + '` is canceled by intervalCall')
        }
        return // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
      }
      if (options?.useRootContext) {
        globalElapsed = false
      } else {
        elapsed = false
      }

      setTimeout(() => {
        if (options?.useRootContext) {
          globalElapsed = true
        } else {
          elapsed = true
        }
      }, interval)
      return fn.call(this, ...args)
    }
  }
}
