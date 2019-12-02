const {expect} = require('chai')
const intervalCall = require('../src/index')

describe('intervalCall', () => {
  it('should not call 2nd function within interval', (done) => {
    let flag = 0
    const inc = () => {
      flag = flag + 1
    }
    const inc20 = intervalCall(20)(inc)    
    inc20()
    setTimeout(() => {
      inc20()
      expect(flag).to.be.equal(1)
      done()
    }, 10)
  })
  it('should call 2nd function over interval', (done) => {
    let flag = 0
    const inc = () => {
      flag = flag + 1
    }
    const inc20 = intervalCall(20)(inc)    
    inc20()
    setTimeout(() => {
      inc20()
      expect(flag).to.be.equal(2)
      done()
    }, 30)
  })
  it('should create new context every time when intervalCall function created #1', () => {
    const intervalCall20 = intervalCall(20)
    let flag = 0
    const inc = () => {
      flag = flag + 1
    }
    const inc1 = intervalCall20(inc)
    const inc2 = intervalCall20(inc)
    inc1()
    inc2()
    expect(flag).to.be.equal(2)
  })  
})