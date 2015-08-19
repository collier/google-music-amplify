(function(global) {
  'use strict';

  var Modal = (function() {
    return {
      // Initialize song data object and metadata array
      metaList: [],
      song: {
        artist: '',
        name: ''
      },
      /**
      * Sets up rivets binding for the view, and create shadow root element
      * using the modal template.
      */
      init: function() {
        rivets.configure({
          templateDelimiters: ['{{', '}}'],
        });
        rivets.bind($('.gma-metadata'), {
          Modal: Modal
        });
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.operation === "metdata.find") {
              Modal.song = request.payload;
              Modal.loadMetadata();
              $('.input-field label').addClass('active');
              $('.modal').openModal();
            }
          }
        );
      },

      // Load songs from search into metaList
      loadMetadata: function() {
        var spotify = new SpotifyWebApi();
        var query = 'track:"' + Modal.song.name + '"';
        if(Modal.song.artist) {
          query += '+artist:"' + Modal.song.artist + '"';
        }
        spotify.searchTracks(query, function(err, data) {
          data.tracks.items.forEach(function(item) {
            item.album.imageUrl = item.album.images[2].url;
            item.album.artist = item.artists[0].name;
            Modal.metaList.push(item);
          })
        });
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
