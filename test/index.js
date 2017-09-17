import test from 'tape'
import Viewport from '../src/viewport.js'

const a = result => () => {
  result.push('a')
}

const b = result => () => {
  result.push('b')
}

test('set delay', t => {
  Viewport.setDelay(1000)
  t.equal(Viewport._tests.delay(), 1000)
  Viewport.reset()
  t.end()
})

test('resize start', t => {
  let result = []
  const fn1 = a(result)
  const fn2 = b(result)
  Viewport.setDelay(0)
  Viewport.onResizeStart(fn1)
  Viewport.onResizeStart(fn2)
  runAll()
  t.equal(result.length, 2)
  Viewport.reset()
  t.end()
})

test('resize end', t => {
  let result = []
  const fn1 = a(result)
  const fn2 = b(result)
  Viewport.setDelay(0)
  Viewport.onResizeEnd(fn1)
  Viewport.onResizeEnd(fn2)
  runAll()
  t.equal(result.length, 2)
  Viewport.reset()
  t.end()
})

test('resize start remove', t => {
  let result = []
  const fn1 = a(result)
  const fn2 = b(result)
  Viewport.setDelay(0)
  Viewport.onResizeStart(fn1)
  Viewport.onResizeStart(fn2)
  Viewport.onResizeStart.remove(fn1)
  runAll()
  t.equal(result.length, 1)
  Viewport.reset()
  t.end()
})

test('resize end remove', t => {
  let result = []
  const fn1 = a(result)
  const fn2 = b(result)
  Viewport.setDelay(0)
  Viewport.onResizeEnd(fn1)
  Viewport.onResizeEnd(fn2)
  Viewport.onResizeEnd.remove(fn1)
  runAll()
  t.equal(result.length, 1)
  Viewport.reset()
  t.end()
})

test('resize show', t => {
  let result = []
  const fn1 = a(result)
  const fn2 = b(result)
  Viewport.setDelay(0)
  Viewport.onShow(fn1)
  Viewport.onShow(fn2)
  runAll()
  t.equal(result.length, 2)
  Viewport.reset()
  t.end()
})

test('resize show remove', t => {
  let result = []
  const fn1 = a(result)
  const fn2 = b(result)
  Viewport.setDelay(0)
  Viewport.onShow(fn1)
  Viewport.onShow(fn2)
  Viewport.onShow.remove(fn1)
  runAll()
  t.equal(result.length, 1)
  Viewport.reset()
  t.end()
})

test('resize hide', t => {
  let result = []
  const fn1 = a(result)
  const fn2 = b(result)
  Viewport.setDelay(0)
  Viewport.onHide(fn1)
  Viewport.onHide(fn2)
  runAll()
  t.equal(result.length, 2)
  Viewport.reset()
  t.end()
})

test('resize hide remove', t => {
  let result = []
  const fn1 = a(result)
  const fn2 = b(result)
  Viewport.setDelay(0)
  Viewport.onHide(fn1)
  Viewport.onHide(fn2)
  Viewport.onHide.remove(fn1)
  runAll()
  t.equal(result.length, 1)
  Viewport.reset()
  t.end()
})

test('reset', t => {
  let result = []
  const fn1 = a(result)
  Viewport.setDelay(0)
  Viewport.onResizeStart(fn1)
  Viewport.onResizeEnd(fn1)
  Viewport.onShow(fn1)
  Viewport.onHide(fn1)
  runAll()
  t.equal(result.length, 4)
  Viewport.reset()
  result = []
  runAll()
  t.equal(result.length, 0)
  t.end()
})

function runAll() { 
  Viewport._tests.startFns.run()
  Viewport._tests.endFns.run()
  Viewport._tests.visibleFns.run()
  Viewport._tests.hiddenFns.run()
}
