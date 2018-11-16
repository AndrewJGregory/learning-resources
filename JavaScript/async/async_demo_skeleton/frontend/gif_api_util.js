const appendGif = gifUrl => {
  $(".gif-display").empty();
  $(".gif-display").append($(`<img class="gif" src=${gifUrl} />`));
};

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
