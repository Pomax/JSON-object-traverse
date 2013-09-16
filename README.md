Route-based polling for JSON objects.

Require or load traverse.js, and call extend(obj) for any object
you want to give the `.traverse(route, [option default value])` to.

example:

```
var a = { b: { c: [{ d: { "4" : "kittens"}}] }};
extend(a);
var data = a.traverse("b.c[ 0 ].d[ 4 ]", "not found");
console.log("correct? " + (result === "kittens") );
```

