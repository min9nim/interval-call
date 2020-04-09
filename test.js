const { debounce } = require('./dist/index')

let count = 0
let inc = () => {
  count++
}
inc = debounce(inc, 50, true)
inc()
console.log(count) // print 1
inc()
console.log(count) // print 1
setTimeout(() => {
  console.log(count) // print 2
}, 100)
