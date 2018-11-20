export const appendGif = gifUrl => {
  const gifDisplay = document.querySelector(".gif-display");
  gifDisplay.innerHTML = "";
  const img = document.createElement("img");
  img.classList.add("gif");
  img.src = gifUrl;
  gifDisplay.appendChild(img);
};

const setMessageText = msg => {
  document.querySelector(".messages").innerHTML = msg;
};

const displaySuccessMsg = () => {
  const successMsg = "successfully saved";
  setMessageText(successMsg);
};

const findCsrfToken = () =>
  document.querySelector('meta[name="csrf-token"]').content;

const makeUrl = queryString =>
  `https://api.giphy.com/v1/gifs/random?tag=${queryString}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`;

export const GifApiUtil = {
  XMLHttpRequest: {
    getNewGif: queryString => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const url = JSON.parse(xhr.response).data.image_url;
          appendGif(url);
        }
      };
      xhr.open("GET", makeUrl(queryString));
      xhr.send();
    },

    saveGif: gif => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            displaySuccessMsg();
          } else {
            const errorMsgs = JSON.parse(xhr.response);
            setMessageText(errorMsgs.join(", "));
          }
        }
      };
      xhr.open("POST", "/gifs");
      const csrfToken = findCsrfToken();
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
            setMessageText(res.join(", "));
          }
        }
      };
      xhr.open("GET", `/gifs/${title}`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({ gif: { title } }));
    },
  },

  AJAX: {
    getNewGif: queryString => {
      return $.ajax({
        method: "GET",
        url: makeUrl(queryString),
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
          displaySuccessMsg();
        },
        error: res => {
          const errorMsgs = res.responseJSON;
          setMessageText(errorMsgs.join(", "));
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
          setMessageText(errors.responseJSON.join(", "));
        },
      });
    },
  },

  fetch: {
    getNewGif: queryString => {
      return fetch(makeUrl(queryString))
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
          "x-csrf-token": findCsrfToken(),
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
            displaySuccessMsg();
          },
          err => {
            err.json().then(errorMsgs => {
              setMessageText(errorMsgs.join(", "));
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
              setMessageText(errorMsgs.join(", "));
            });
          },
        );
    },
  },

  asyncAwait: {
    getNewGif: async queryString => {
      let res = await fetch(makeUrl(queryString));
      res = await res.json();
      const url = res.data.image_url;
      appendGif(url);
    },

    saveGif: async gif => {
      let res = await fetch("/gifs", {
        method: "POST",
        body: JSON.stringify(gif),
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": findCsrfToken(),
        },
      });
      res = await res.json();
      setMessageText(res.join(" "));
    },

    getSavedGif: async title => {
      let res = await fetch(`/gifs/${title}`);
      res = await res.json();
      res.url ? appendGif(res.url) : setMessageText(res.join(" "));
    },
  },
};
