//Solutions for "Decorators and forwarding, call/apply" title



//Spy decorator

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