const intervalCall = require('./dist/index').default

let flag = 0

const addOne = () => {
  flag = flag + 1
}

/*
 * intervalInc1, intervalInc2 is works Independently
 */
const interval100 = intervalCall(100)
const interval100addOne = interval100(addOne)
interval100addOne() // call immediateley
interval100addOne() // call immediateley
interval100addOne() // call immediateley
interval100addOne() // call immediateley
interval100addOne() // call immediateley
console.log(flag) // print 3
