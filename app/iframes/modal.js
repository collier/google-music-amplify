(function(global) {
  'use strict';

  var Modal = (function() {
    return {
      // Initialize song data object
      song : {
        name: '',
        artist: '',
        album: '',
        year: '',
        genre: '',
        trackNo: '',
        discNo: '',
        albumTrackCount: '',
        albumDiscCount: ''
      },
      /**
      * Sets up rivets binding for the view, and create shadow root element
      * using the modal template.
      */
      init: function() {
        rivets.bind($('.gma-metadata'), {
          Modal: Modal
        });
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.operation === "metdata.find") {
              Modal.song = request.payload;
              Modal.loadSongs();
              $('.modal').openModal();
            }
          }
        );
      },

      loadSongs: function() {
        var spotifyApi = new SpotifyWebApi();
      }

      // Show find metadata modal
      show: function() {
        $('.modal').openModal();
      },

      // Show find metadata modal
      hide: function() {
        $('.modal').closeModal({
          complete: function() {
            chrome.runtime.sendMessage({
              operation: "metadata.exit"
            });
          }
        });
      }
    };
  })();

  global.Modal = Modal;

})(this);

$(function() {
  Modal.init();
});
