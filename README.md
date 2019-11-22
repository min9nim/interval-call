# interval-call
`interval-call` is a function that returns a function that prevents the same function called repeatedly within a certain interval time.

<br>

### Install
```
npm i interval-call
```

<br>

### Usage
```javascript
const intervalCall = require('interval-call')

let flag = 0
const inc = () => {
  flag = flag + 1
}
const inc20 = intervalCall(20)(inc)     // inc20 will never be called repeatedly within 20ms

inc20()   // increase flag +1
setTimeout(() => {
  inc20()   // this call is skipped called within 20ms
  console.log(flag) // will print 1 as flag value
}, 10)
```

