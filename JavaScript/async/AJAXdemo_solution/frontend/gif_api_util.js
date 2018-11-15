const appendGif = gifUrl => {
  $(".gif-display").empty();
  $(".gif-display").append($(`<img class="gif" src=${gifUrl} />`));
};

const GifAPIUtil = {
  XMLHttpRequest: {
    getNewGif: queryString => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const url = JSON.parse(xhr.response).data.image_url;
          appendGif(url);
        }
      };
      xhr.open(
        "GET",
        `https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`,
      );
      xhr.send();
    },

    saveGif: gif => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            $(".messages").html("successfully saved");
          } else {
            const errorMsgs = JSON.parse(xhr.response);
            $(".messages").html(errorMsgs.join(", "));
          }
        }
      };
      xhr.open("POST", "/gifs");
      const csrfToken = $('meta[name="csrf-token"]').attr("content");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("x-csrf-token", csrfToken);
      xhr.send(JSON.stringify({ gif }));
    },

    getSavedGif: title => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const res = JSON.parse(xhr.response);
          if (xhr.status === 200) {
            appendGif(res.url);
          } else {
            $(".messages").html(res.join(", "));
          }
        }
      };
      xhr.open("GET", `/gifs/${title}`);
      const csrfToken = $('meta[name="csrf-token"]').attr("content");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({ gif: { title } }));
    },
  },

  AJAX: {
    getNewGif: queryString => {
      return $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`,
        success: res => {
          const url = res.data.image_url;
          appendGif(url);
        },
      });
    },

    saveGif: gif => {
      return $.ajax({
        method: "POST",
        url: "/gifs",
        data: { gif },
        success: gif => {
          $(".messages").html("successfully saved");
        },
        error: res => {
          const errorMsgs = res.responseJSON;
          $(".messages").html(errorMsgs.join(", "));
        },
      });
    },

    getSavedGif: title => {
      return $.ajax({
        method: "GET",
        url: `/gifs/${title}`,
        data: { gif: { title } },
        success: gif => {
          appendGif(gif.url);
        },
        error: errors => {
          $(".messages").html(errors.responseJSON.join(", "));
        },
      });
    },
  },

  fetch: {
    getNewGif: queryString => {
      return fetch(
        `https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`,
      )
        .then(res => {
          return res.json();
        })
        .then(res => {
          const url = res.data.image_url;
          appendGif(url);
        });
    },

    saveGif: gif => {
      return fetch("/gifs", {
        method: "POST",
        body: JSON.stringify(gif),
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": $('meta[name="csrf-token"]').attr("content"),
        },
      })
        .then(res => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then(
          response => {
            $(".messages").html("successfully saved");
          },
          err => {
            err.json().then(errorMsgs => {
              $(".messages").html(errorMsgs.join(", "));
            });
          },
        );
    },

    getSavedGif: title => {
      return fetch(`/gifs/${title}`)
        .then(res => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then(
          res => {
            appendGif(res.url);
          },
          err => {
            err.json().then(errorMsgs => {
              $(".messages").html(errorMsgs.join(", "));
            });
          },
        );
    },
  },

  asyncAwait: {
    getNewGif: async queryString => {
      let res = await fetch(
        `https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`,
      );
      res = await res.json();
      const url = res.data.image_url;
      appendGif(url);
    },
  },
};

module.exports = GifAPIUtil;
