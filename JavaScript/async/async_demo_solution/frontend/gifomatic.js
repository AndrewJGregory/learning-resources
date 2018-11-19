import { GifApiUtil, appendGif } from "./gif_api_util";
const setEventHandlers = () => {
  const elements = [
    {
      id: "new-gif-form",
      callback: getNewGif,
    },
    {
      id: "save-gif-form",
      callback: saveGif,
    },
    {
      id: "old-gif-form",
      callback: getSavedGif,
    },
    {
      id: "callback-hell-form",
      callback: callbackHell,
    },
  ];

  elements.forEach(element => {
    document.getElementById(element.id).addEventListener("submit", e => {
      e.preventDefault();
      element["callback"]();
    });
  });

  document.querySelector(".clear").addEventListener("click", () => {
    document.querySelector(".gif-display").innerHTML = "";
    document.querySelector(".messages").innerHTML = "";
  });
};

document.addEventListener("DOMContentLoaded", setEventHandlers);

// ------------- GIF ACTIONS - fetchNew, save, and fetchSaved ---------------

const getNewGif = () => {
  const input = document.getElementById("new-gif-query");
  const queryString = input.value;
  input.value = "";

  // TODO: Initiate request to giphy api endpoint, add gif to the the DOM
  GifApiUtil.fetch.getNewGif(queryString);
};

const saveGif = e => {
  const input = document.getElementById("save-gif-title");
  const title = input.value;
  input.value = "";
  const gif = {
    title,
    url: document.querySelector(".gif-display > img").src,
  };

  // TODO: Initiate AJAX request to Rails backend, give a message if successful
  GifApiUtil.fetch.saveGif(gif);
};

const getSavedGif = () => {
  const input = document.getElementById("old-gif-query");
  const title = input.value;
  input.value = "";

  // TODO: Initate AJAX request to Rails backend, add gif to the DOM if successful
  GifApiUtil.fetch.getSavedGif(title);
};

// ------------- CALLBACK HELL ---------------

const callbackHell = () => {
  const $input = $("#callback-hell-query");
  const title = $input.val();
  $input.val("");
  return $.ajax({
    method: "GET",
    url: `/gifs/${title}`,
    dataType: "json",
    success: gif => {
      // gif exists in DB
      appendGif(gif.url);
    },
    error: response => {
      // gif doesn't exist
      $(".messages").text(`${response.responseJSON[0]} Fetching new gif...`);
      return $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/random?tag=${title}&api_key=9IfxO6R6fpEZMAdqdw66QUgQdPejVIAW&rating=G`,
        success: (
          gif, // giphy call is successful
        ) => {
          const url = gif.data.image_url;
          appendGif(url);
          gif = { title: title, url: url };
          return $.ajax({
            // save gif to db
            method: "POST",
            url: "/gifs",
            data: {
              gif: gif,
            },
            success: savedGif => {
              $(".messages").text("Successfully saved!");
            },
          });
        },
      });
    },
  });
  // TODO:
  // Search our database for a gif with a certain query
  // If the gif exists, display the gif
  // If no gif exists, query giphy for a new gif and display appropiate message
  // Display the gif on the page
  // Save new gif to database and display success message if successful
};
