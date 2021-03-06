const GifApiUtil = require("./gif_api_util");

const setEventHandlers = () => {
  $("#new-gif-form").on("submit", e => {
    e.preventDefault();
    fetchNewGif();
  });

  $("#save-gif-form").on("submit", e => {
    e.preventDefault();
    saveGif();
  });

  $("#old-gif-form").on("submit", e => {
    e.preventDefault();
    fetchSavedGif();
  });

  $("#callback-hell-form").on("submit", e => {
    e.preventDefault();
    callbackHell();
  });

  $(".clear").on("click", () => {
    $(".gif-display").empty();
    $(".messages").empty();
  });
};

$(() => {
  setEventHandlers();
});

// ------------- GIF ACTIONS - fetchNew, save, and fetchSaved ---------------

const getNewGif = () => {
  const $input = $("#new-gif-query");
  const queryString = $input.val();
  $input.val("");

  // TODO: Initiate request to giphy api endpoint, add gif to the the DOM
};

const saveGif = e => {
  const $input = $("#save-gif-title");
  const title = $input.val();
  $input.val("");
  const gif = {
    title: title,
    url: $(".gif-display > img").attr("src"),
  };

  // TODO: Initiate request to Rails backend, give a message if successful, otherwise display error message(s)
};

const getSavedGif = () => {
  const $input = $("#old-gif-query");
  const title = $input.val();
  $input.val("");

  // TODO: Initate request to Rails backend, add gif to the DOM if successful. Otherwise, display error message(s)
};

// ------------- CALLBACK HELL ---------------

const callbackHell = () => {
  const $input = $("#callback-hell-query");
  const title = $input.val();
  $input.val("");
  // TODO:
  // Search our database for a gif with a certain query
  // If the gif exists, display the gif
  // If no gif exists, query giphy for a new gif and display appropiate message
  // Display the gif on the page
  // Save new gif to database and display success message if successful
};
