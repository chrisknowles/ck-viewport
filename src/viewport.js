import FunctionBatcher from 'function-batcher'

let timer
let started = false
let delay = 400
let startFns
let endFns
let visibleFns
let hiddenFns

reset()

function reset() {
  startFns = FunctionBatcher()
  endFns = FunctionBatcher()
  visibleFns = FunctionBatcher()
  hiddenFns = FunctionBatcher()
}

const onResizeStart = startFns.add
onResizeStart.remove = startFns.remove
onResizeStart.reset = () => startFns = FunctionBatcher()

const onResizeEnd = endFns.add
onResizeEnd.remove = endFns.remove
onResizeEnd.reset = () => endFns = FunctionBatcher()

const onShow = visibleFns.add
onShow.remove = visibleFns.remove
onShow.reset = () => visibleFns = FunctionBatcher()

const onHide = hiddenFns.add
onHide.remove = hiddenFns.remove
onHide.reset = () => hiddenFns = FunctionBatcher()

function setDelay(duration) {
  if (/^[0-9][0-9]*$/.test(duration.toString())) {
    delay = duration
  }
}

function sizeChange() {
  if (!started) {
    startFns.run()
    started = true
  }
  clearTimeout(timer)
  delay > 0
    ? timer = setTimeout(runEndFns, delay)
    : runEndFns()
}

function runEndFns() { 
  endFns.run()
  started = false
}

function visibilityChange() {
  document.hidden
    ? hiddenFns.run()
    : visibleFns.run()
}

function listen() { 
  document.addEventListener('visibilitychange', visibilityChange)
  window.addEventListener('resize', sizeChange)
  window.addEventListener('orientationchange', sizeChange)
}

// expose stuff for testing
const _tests = {
    delay: () => delay
  , startFns
  , endFns
  , visibleFns
  , hiddenFns
}

export default {
    onResizeStart
  , onResizeEnd
  , onShow
  , onHide
  , setDelay
  , listen
  , reset
  , _tests
}
