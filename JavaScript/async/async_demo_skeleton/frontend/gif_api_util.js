const appendGif = gifUrl => {
  $(".gif-display").empty();
  $(".gif-display").append($(`<img class="gif" src=${gifUrl} />`));
};

const makeUrl = queryString =>
  `https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`;

const GifAPIUtil = {
  XMLHttpRequest: {
    getNewGif: queryString => {},
    saveGif: gif => {},
    getSavedGif: title => {},
  },

  AJAX: {
    getNewGif: queryString => {},
    saveGif: gif => {},
    getSavedGif: title => {},
  },

  fetch: {
    getNewGif: queryString => {},
    saveGif: gif => {},
    getSavedGif: title => {},
  },

  asyncAwait: {},
};

module.exports = GifAPIUtil;
