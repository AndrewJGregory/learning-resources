# Pass by value, pass by reference

Pass by reference happens when:

1. another variable is assigned to a non-primitive
2. non-primitives are passed as arguments when a function is invoked

(What's the difference between arguments and parameters?)

The first case is demonstrated here:

```js
const nums = [1, 2, 3];
const copy = nums;
copy.push(44);
console.log(nums); // [1, 2, 3, 44];
console.log(copy); // [1, 2, 3, 44];

const name = "andrew";
const copy = name;
console.log(copy.toUpperCase()); // "ANDREW"
console.log(copy); // "andrew";
```

The second case is demonstrated here:

```js
const nums = [10, 20, 30];
function addOne(arr) {
  const copy = arr;
  copy.push(100);
  return copy;
}

console.log(nums); // [10, 20, 30]
addOne(nums); // returns [10, 20, 30, 100]
console.log(nums); // [10, 20, 30, 100]
```

That's not what we wanted! The original variable, `nums` was _mutated_ by the function `addOne` because `nums` is a non-primitive and was passed by reference as an argument to the function and passed by reference when it was assigned to `copy`. What does the following output and why?

```js
const nums = [1, 2, 3];
let copy = nums;
copy = [100, 200];
console.log(nums); // ???
```

Read over the primitives reading if you are unsure!

To avoid this, `slice` can be used:

```js
const nums = [10, 20, 30];
function addOne(copy) {
  const copy = nums.slice();
  copy.push(100);
  return copy;
}

console.log(nums); // [10, 20, 30]
addOne(nums); // returns [10, 20, 30, 100]
console.log(nums); // [10, 20, 30]
```

`slice` returns a new copy of the array.
