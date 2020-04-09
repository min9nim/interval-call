import {expect} from 'chai'
import intervalCall, {debounce} from '../src'

describe('intervalCall', () => {
  it('should not call 2nd function within interval', done => {
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
  it('should call 2nd function over interval', done => {
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
  it('should share context when useRootContext is true', () => {
    const intervalCall20 = intervalCall(20, {useRootContext: true})
    let flag = 0
    const inc = () => {
      flag = flag + 1
    }
    const inc1 = intervalCall20(inc)
    const inc2 = intervalCall20(inc)
    inc1()
    inc2()
    expect(flag).to.be.equal(1)
  })
  it('should be bound this object', () => {
    const intervalCall20 = intervalCall(20)
    const obj = {
      flag: 0,
      inc: intervalCall20(function(this: any) {
        this.flag = this.flag + 1
      }),
    }
    obj.inc()
    obj.inc()
    expect(obj.flag).to.be.equal(1)
  })
  it('should be printed cancel message when logCancelMessage is true', done => {
    const origin = console.warn
    let called = false
    console.warn = () => {
      called = true
    }
    const inc = () => 'hello'
    const inc20 = intervalCall(20, {logCancelMessage: true})(inc)
    expect(inc20()).to.be.equal('hello')
    setTimeout(() => {
      expect(inc20()).to.be.equal(undefined)
      expect(called).to.be.equal(true)
      done()
      console.warn = origin
    }, 10)
  })
  it('should not be printed cancel message when logCancelMessage is false', done => {
    const origin = console.warn
    let called = false
    console.warn = () => {
      called = true
    }
    const inc = () => 'hello'
    const inc20 = intervalCall(20, {logCancelMessage: false})(inc)
    expect(inc20()).to.be.equal('hello')
    setTimeout(() => {
      expect(inc20()).to.be.equal(undefined)
      expect(called).to.be.equal(false)
      done()
      console.warn = origin
    }, 10)
  })
  it('should be called once when continuous called', done => {
    let count = 0
    let inc = () => {
      count++
    }
    inc()
    inc()
    expect(count).to.be.equal(2)
    inc = debounce(inc, 10)
    inc()
    inc()
    expect(count).to.be.equal(2)
    setTimeout(() => {
      expect(count).to.be.equal(3)
      done()
    }, 20)
  })
  it('should be bound this object', done => {
    const obj = {
      num: 1,
      func1() {
        this.num = this.num + 1
      },
    }
    obj.func1()
    expect(obj.num).to.be.equal(2)
    obj.func1 = debounce(obj.func1, 10)
    obj.func1()
    setTimeout(() => {
      expect(obj.num).to.be.equal(3)
      done()
    }, 20)
  })
})
