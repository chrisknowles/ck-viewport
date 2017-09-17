# Viewport

A utility for batch executing functions when the viewport resizes and when it changes visibility.

## How it works

### Resize 

The module listens to the window events: ```resize``` and ```orientationchange``` and immediately runs all functions added with ```Viewport.onResizeStart``` and then after the default delay of ```400ms``` runs all functions added with ```Viewport.onResizeEnd```. 

The delay can be changed with the ```Viewport.setDelay``` function.

### Visibility

It also listens to the ```document``` event ```visibilitychange```. When the browser or browser tab is not in focus then the functions set with ```Visibility.onHide``` are run and when focus is regained the functions set with ```Visibility.onShow``` are run.

One event handler is attached for each event type and all functions are batched together. It also handles debouncing of the resize event.

## Usage

```javascript
import Viewport from 'viewport';
```

```javascript
<script type='text/javascript' src='/dist/viewport.js'></script>
<script type='text/javascript' src='/dist/viewport.min.js'></script>
```

```javascript
// initialise the module to listen to viewport events
// (resize, orientationchange, visibilitychange)
Viewport.listen();

// set the delay for resize end functions to 1 second
Viewport.setDelay(1000);

// define some functions to use
function a() {
  console.log('start a');
}
function b() {
  console.log('start b');
}
const x = y => () => {
  console.log(y)
};

// execute a function at the beginning of the viewport resize event
Viewport.onResizeStart(a, b); // add multiples (a, b, ...)
Viewport.onResizeStart(x(123));

// remove a function from the beginning of the viewport resize event
Viewport.onResizeStart.remove(a);      // must be a named function to work
Viewport.onResizeStart.remove(x(123)); // won't work

// clear all functions from a given event
Viewport.onResizeStart.reset();

// clear all added functions to all events
Viewport.reset();

// this pattern works the same for all events and is variadic
Viewport.[onResizeStart|onResizeEnd|onShow|onHide][.remove|.reset](fn1, fn2, ...)
```

## License

MIT - see LICENSE.md
