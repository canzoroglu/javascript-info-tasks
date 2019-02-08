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