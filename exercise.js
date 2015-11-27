(function(){

"use strict"

Spotify.Searcher = function() {
};

Spotify.Searcher.prototype.song_search = function(search_val) {
  
  var response = $.ajax({
    url: 'https://api.spotify.com/v1/search?type=track&q=' + search_val,
    success: function(response) {
      var track = response.tracks.items[0];
      $(".title").text(track.name);
      $(".author").text(track.artists[0].name);
      $(".author").data("url", track.artists[0].href);
      $("#cover-img").attr("src", track.album.images[0].url);
      $("#js-player").attr("src", track.preview_url);
    }
  })
}

Spotify.Searcher.prototype.artist_search = function(search_url) {

  var response = $.ajax({
    url: search_url,
    success: function(response) {
      $(".modal-title").text(response.name);
      $(".modal-img").attr("src", response.images[0].url);
      $(".js-modal").modal("show");
    }
  })

}

})();

$(document).on("ready", function() {

  $(".js-modal").modal("hide");

  $("#search").on('click', function() {

    var search_val = $('#input-form').val();
    var searcher = new Spotify.Searcher();
    searcher.song_search(search_val);

  })

  $(".btn-play").on('click', function() {

    if($(".btn-play").hasClass("playing")) {
      $('#js-player').trigger("pause");
    } else {
      $('#js-player').trigger("play");
    }
    $(".btn-play").toggleClass("playing");
    $(".btn-play").toggleClass("disabled");

  })

  $("#js-player").on("timeupdate", printTime);

  $(".author").on("click", function(event) {
    event.preventDefault();

    var search_url = $('.author').data("url");
    var searcher = new Spotify.Searcher();
    searcher.artist_search(search_url);
  })

})

function printTime() {
  var current = $("#js-player").prop("currentTime");
  $("#progress-bar").attr("value", current);
}

