# Learning goals

- Be familiar with different ways of making HTTP requests
- Understand how to use callbacks and promises
- Manipulate the DOM with vanilla JS
- Simplify a callback hell situation

# INSTRUCTIONS

`async_demo_skeleton` has a rails backend connected to a JavaScript frontend. Inspect the frontend folder and you will see two files: `gifomatic` and `gif_api_util`. Your job is to use different ways of making HTTP requests to accomplish three things:

- Querying a giphy api endpoint for a gif
- Saving a gif to the database (check out the `gif` model and `gif` controller)
- Searching the database for a gif and then displaying that gif on the page

In `gifomatic`, there are three ways to make HTTP requests: `XMLHttpRequest`, `$.ajax`, and `fetch`. There will be lots of searching for information, reading docs, and mistakes when learning all of these. That's normal and totally expected! You learn by doing, not by reading.

The workflow for this should be as follows:

0.

- Git clone this repo
- `bundle install`
- `npm i`
- `rails db:setup`
- `npm run webpack`
- `rails s`

1. Start with `getNewGif` and `XMLHttpRequest`. After writing the code for `getNewGif`, you'd use it as such in the `gifomatic` file:

```js
const getNewGif = () => {
  const $input = $("#new-gif-query");
  const queryString = $input.val();
  $input.val("");

  GifApiUtil.XMLHttpRequest.getNewGif(queryString);
};
```

Make sure it works! Then, write the code for `getNewGif` and `$.ajax`. You'd change the last line to the following:

```js
GifApiUtil.AJAX.getNewGif(queryString);
```

Same thing for `fetch`. After finishing `getNewGif` for `fetch`, then you would start the same process again with `saveGif` and `XMLHttpRequest`.

## BONUSES

In order of importance ad time commitment::

- Finish `callbackHell` in the bottom of `gif_api_util`. Do **not** use promises, only callbacks.
- Convert all of the jQuery DOM manipulation to vanilla JS.
- Utilize `async` and `await` to perform the same three actions in `gif_api_util`, using `fetch`.
- Convert all of your `$.ajax` requests in your full stack to `fetch` and drop jQuery entirely.

## Resources

- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [\$.ajax](http://api.jquery.com/jquery.ajax/)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
