(function(global) {
  'use strict';

  var Modal = (function() {

    // Define all the programmatically set strings
    var strings = {
      noInput: 'search by track or artist',
      error: 'sorry, we encountered an errorg. try again later',
      emptySet: 'no matching songs found :('
    };

    // Create instance of spotify javascript api object
    var spotify = new SpotifyWebApi();

    // Construct the Spotify track query string
    var buildQuery = function() {
      var query = 'track:"' + Modal.song.name + '"';
      if(Modal.song.artist) {
        query += '+artist:"' + Modal.song.artist + '"';
      }
      return query;
    };

    // Load songs from search into metaList
    var loadMetadata = function() {
      if(!Modal.song.name && !Modal.song.artist) {
        Modal.message = strings.noInput;
      } else {
        var query = buildQuery();
        spotify.searchTracks(query, function(err, data) {
          if(err) {
            Modal.message = strings.error;
          } else if (data.tracks.items.length === 0) {
            Modal.message = strings.emptySet;
          } else {
            /**
             * For some reason, Rivets.js does not support referencing
             * array indecies inside of data objects. To address this,
             * references needed are teased out and stored in new data objects
             * without array indecies.
             */
            data.tracks.items.forEach(function(item) {
              item.album.imageUrl = item.album.images[2].url;
              item.album.artist = item.artists[0].name;
              Modal.metaList.push(item);
            });
          }
        });
      }
    };

    // Reset all parameters back to their empty states
    var reset = function() {
      Modal.message = '';
      Modal.metaList = [];
      Modal.song.artist = '';
      Modal.song.name = '';
    };

    var sendExitMessage = function() {
      chrome.runtime.sendMessage({
        operation: 'metadata.exit'
      });
    };

    var sendUpdateMetadataMessage = function(data) {
      chrome.runtime.sendMessage({
        operation: 'metadata.update',
        payload: data
      });
    };

    return {

      // Initialize song data object and metadata array
      message: '',
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
          // Pass all public methods into binding
          Modal: Modal
        });
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.operation === 'metdata.find') {
              reset();
              Modal.song = request.payload;
              loadMetadata();
              Modal.show();
              $('.lean-overlay').click(function() {
                sendExitMessage();
              });
            }
          }
        );
      },

      // Refresh metalist with new search results
      reloadMetadata: function() {
        Modal.metaList = [];
        Modal.message = '';
        loadMetadata();
      },

      // Create payload containing track and album info, and send message
      setMetadata: function(e, model) {
        var payload = {};
        payload.track = Modal.metaList[model.index];
        spotify.getAlbum(payload.track.album.id, function(err, data) {
          payload.album = data;
          sendUpdateMetadataMessage(payload);
          Modal.hide();
        });
      },

      // Show find metadata modal
      show: function() {
        // Fix for labels that are not active for prefilled inputs
        $('.input-field label').addClass('active');
        $('.modal').openModal();
      },

      // Hide find metadata modal
      hide: function() {
        $('.modal').closeModal({
          complete: function() {
            sendExitMessage();
          }
        });
      }

    };
  })();

  global.Modal = Modal;

})(this);

$(function() {
  'use strict';
  Modal.init();
});
