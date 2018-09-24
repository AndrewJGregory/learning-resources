# [== and ===](https://developer.mozilla.org/en-us/docs/web/javascript/equality_comparisons_and_sameness)

`==` performs an "abstract" or "loose" equality comparison, while `===` performs a "strict" equality comparison.

`==` will perform type conversions _then_ check if the two values are equal. `===` will first check if the `typeof` each value is equal. If they are, then check if the value is the same. If the types differ, `===` will immediately return false.

This [table](https://dorey.github.io/JavaScript-Equality-Table) sums up the differences between `==` and `===` nicely. To avoid unexpected results, use `===` unless you really have a great reason to use `==`.

```js
1 == "1"; // true
1 === "1"; // false, types differ
typeof "1"; // "string"
typeof 1; // "number"
```

There are articles that go into depth on specifically how these type conversions happen, but memorizing them isn't worth your time. For a hilariously in-depth analysis, check out [this repo](https://github.com/denysdovhan/wtfjs).
