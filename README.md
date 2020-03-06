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
// import intervalCall from 'interval-call'

let flag = 0
const inc = () => {
  flag = flag + 1
}
const inc20 = intervalCall(20)(inc) // inc20 will never be called repeatedly within 20ms

inc20() // increase flag +1
setTimeout(() => {
  inc20() // this call is skipped called within 20ms
  console.log(flag) // will print 1 as flag value
}, 10)
```

<br>

### useRootContext option

`useRootContext` is whether sharing context

```
default: false
```

<br>

```javascript
const intervalCall = require('interval-call')

let flag = 0

const addOne = () => {
  flag = flag + 1
}
const addTwo = () => {
  flag = flag + 2
}

/*
 * intervalInc1, intervalInc2 is works Independently
 */
const interval100 = intervalCall(100)
const interval100addOne = interval100(addOne)
const interval100addTwo = interval100(addTwo)
interval100addOne() // call immediateley
interval100addTwo() // call immediateley
console.log(flag) // print 3

flag = 0
/*
 * intervalInc1, intervalInc2 share the context when 2nd parameter is true
 */

const interval200 = intervalCall(200, { useRootContext: true })
const interval200addOne = interval200(addOne)
const interval200addTwo = interval200(addTwo)

interval200addOne() // call immediateley
interval200addTwo() // ignore call
console.log(flag) // print 1
```

<br>

### logCancelMessage option

`logCancelMessage` is whether to print cancel message or not

```
default: false
```

<br>

```javascript
const fn = () => 'hello'
const fn2 = intervalCall(20, { logCancelMessage: true })(fn)
fn2() // return 'hello'
fn2() // canceled, and printed console log '`inc` is canceled by intervalCall`'
```
