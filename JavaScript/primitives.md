# [Primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)

Also known as "primitive value" or a "primitive data type". They are the basic building blocks of a language. They are **immutable** unlike non-primitives. JavaScript has six primitives and I like to think of them as such:

- **B**oolean
- **U**ndefined
- **N**ull
- **N**umber
- **S**tring
- **S**ymbol

Yes, **BUNNSS**.

## [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) and [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)

`undefined` and `null` are both falsy values. `undefined` is found in the wild in JS whereas `null` is the intentional absence of a value. `undefined` happens when:

1. looking up a nonexistent property on an object
2. a function has no explicit return value
3. a variable is declared but not assigned

```js
let food = { cheese: "swiss" };
food["meat"]; // undefined

function eat() {
  console.log("I love eggs");
}

eat(); // logs to the console "I love eggs" and it returns undefined

let name;
console.log(name); // undefined
```

`null` is used to indicate something that doesn't have a value but could have one later on. A simplified example from my own code is:

```js
let menu =
  this.props.song.id === this.props.selectedSongId ? <DropdownMenu /> : null;
```

Specifically with React, `null` is an acceptable value to render, whereas `undefined` is not. Even if the menu should not be displayed and isn't assigned to be a component, it can still render anyway.

## What's a Symbol?

Great question. I'll quote directly from MDN about [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol):

> Every symbol value returned from Symbol() is unique. A symbol value may be used as an identifier for object properties; **this is the data type's only purpose.**

(emphasis is mine)

Example:

```js
const me = Symbol("andrew");
const doppleganger = Symbol("andrew");

me === doppleganger; // false
```

Even though both variables are `Symbol`s created from the same exact string, they are unique. I like to think of `Symbol`s as people's names because two people can have the same name but they are not equal.

One way they can be used is to have "duplicate" keys in an object. What if we wanted to do this?

```js
let people = { andrew: "gregory", andrew: "doe" };
```

Sadly, duplicate keys are not allowed and the second key will be the only key kept. The object would look like:

```js
{
  andrew: "doe";
}
```

instead of what we want. One way to accomplish this functionality is with `Symbol`s:

```js
let me = Symbol("andrew");
let doppleganger = Symbol("andrew");

let people = { [me]: "gregory", [doppleganger]: "doe" };

people[me]; // "gregory"
people[doppleganger]; // "doe"
```

(Why are the square braces needed around the keys?)

## [Immutability](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)

Primitives are **immutable**. Non-primitives are mutable. Consider an array as an example:

```js
const nums = [1, 5, 12];
nums.push(100);
console.log(nums); // [1, 5, 12, 100];
```

`nums` has been mutated and its value has been changed. The same is **not** possible with any primitive. Here is a string example:

```js
let name = "slim shady";
console.log(name.toUpperCase()); // "SLIM SHADY"
console.log(name); // "slim shady";
```

There exists no method that can be called on name such that the `console.log(name)` on the next line will be anything other than "slim shady". This is because strings are a primitive and therefore immutable.

NOTE: Immutablity doesn't mean we can't re-assign it. This is possible:

```js
let name = "bart simpson";
name = "lisa simpson";
console.log(name); // "lisa simpson"
```

This is _not_ mutating the value, just re-assigning the variable. This difference is **critical** to understand.
