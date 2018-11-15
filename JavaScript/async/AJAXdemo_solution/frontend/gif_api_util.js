const appendGif = gifUrl => {
  $(".gif-display").empty();
  $(".gif-display").append($(`<img class="gif" src=${gifUrl} />`));
};


const GifAPIUtil = {
  XMLHttpRequest: {
    getNewGif: queryString => {
      const req = new XMLHttpRequest();
      req.addEventListener("load", e => {
        const url = JSON.parse(e.currentTarget.response).data.image_url;
        appendGif(url);
      });
      req.open("GET", `https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`);
      req.send();
    },
    saveGif: gif => { },
    getSavedGif: title => { }
  },

  AJAX: {
    getNewGif: queryString => {
      return $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`,
      });
    },
    saveGif: gif => { },
    getSavedGif: title => { },
  },

  fetch: {
    newGifFetch: queryString => {
      return fetch(`https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`)
    },
    saveGif: gif => { },
    getSavedGif: title => { },
  },

};

module.exports = GifAPIUtil;
