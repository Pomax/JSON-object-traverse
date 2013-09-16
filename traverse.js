(function() {

  function traverse(reference, route, fallback) {
    var obj = reference,
        steps = route.split(".").map(function(e) { return e.trim(); }),
        step,
        bo_pos, bc_pos,
        index;
    while(steps.length > 0) {
      step = steps.splice(0,1)[0];
      bo_pos = step.indexOf("[");
      bc_pos = step.indexOf("]");
      if (bo_pos>-1 && bc_pos > bo_pos) {
        index = step.substring(bo_pos+1, bc_pos).trim();
        step = step.substring(0,bo_pos);
      }
      try {
        obj = obj[step];
        if(index) {
          obj = obj[index];
        }
      } catch (e) {
        return fallback;
      }
    }
    return obj || fallback;
  }

  function extend(obj) {
    if(typeof obj !== "object") {
      throw new Error("Cannot extend non-object in traverse.js");
    }
    obj.traverse = function(route, fallback) {
      if(!route) {
        throw new Error("No route passed for object traversal.");
      }
      return traverse(obj, route, fallback);
    };
  };

  // AMD style modules
  if(typeof define === "function" && define.amd) {
    define(function() {
      return extend;
    });
  }

  // Node.js
  else if (typeof module === "object" &&  module.exports) {
    module.exports = extend;
  }

  // browser global scope
  else if (typeof window === "object" && !window.extend) {
    window.extend = extend;
  }

  // total failure.
  else {
    console.error("extend() could not be bound as module or global.");
  }
 }());
