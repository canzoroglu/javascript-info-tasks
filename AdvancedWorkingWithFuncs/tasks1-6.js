//Solutions for "Decorators and forwarding, call/apply" title



//Spy Decorator

//returns a wrapper function which has a property named "calls"
//calls is an array which includes arguments of past invations
//of the wrapper function 
function spy(fn){
  wrapper.calls = [];
  function wrapper(...args){
    wrapper.calls.push(args);
    return fn.apply(null, arguments);
  }
  return wrapper;
}


//Delaying Decorator

//takes a func and a delay, returns a function which will be delayed with the given amount of time when it is run
function f(x) {
  console.log(this.a);
  console.log(x);
}

function delay(fn, ms){
  return function(){
    setTimeout(() => fn.apply(this, arguments), ms)
  };
}
// tests for the delaying func
let obj1 = {a: 2};
var a = 3;
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);
f1000.call(obj1, "test1"); // shows "test" after 1000ms
f1500("test2"); // shows "test" after 1500ms


//Debounce Decorator

/*debounce will take a func and ms 
it will return a decorated func
which couldn't be called in earlier than ms time from its last run */
function debounce(fn, ms){
  let startTime = 0;
  return function(){
    if (!startTime){ //run in the first call
      fn.apply(null, arguments);
      startTime = Date.now();
    }
    else if (Date.now() - startTime >= ms){ //check if ms amount time passed from the last call
      fn.apply(null, arguments);
      startTime = Date.now();
    }
    else {
      return;
    }
  } 
}
let f = debounce(alert, 1000);

f(1); // runs immediately
f(2); // ignored

setTimeout( () => f(3), 100); // ignored ( only 100 ms passed )
setTimeout( () => f(4), 1100); // runs
setTimeout( () => f(5), 2100); // runs 


//Throttle Decorator

//This decorator similar to previous one
//But last ignored call will be called after ms amount of time passed
function throttle(fn, ms){
  let isCoolDown = false;
  let prevArg, prevThis;
  return function bounced(){
    if (isCoolDown){
      prevArg = arguments;
      prevThis = this
      return;
    }
    fn.apply(this, arguments);
    isCoolDown = true;
    setTimeout(() => {
      isCoolDown = false;
      if (prevArg) {
        bounced.apply(prevThis, prevArg);
        prevArg = prevThis = null;
        }
    }, ms);
 }
}
let f1000 = throttle(alert, 1000);
f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)


//------End of "Decorators and forwarding, call/apply"-------