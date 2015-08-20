(function(global) {
  'use strict';

  Metadata.EditSong = (function() {

    // Populate all Edit Song Info fields with selected metadata
    var updateForm = function(payload) {
      var track = payload.track;
      var album = payload.album;
      var $dialog = $('.simple-dialog-content');
      $dialog.find('input[data-field="1"]').val(track.name);
      $dialog.find('input[data-field="3"]').val(track.artists[0].name);
      $dialog.find('input[data-field="5"]').val(track.artists[0].name);
      $dialog.find('input[data-field="4"]').val(track.album.name);
      $dialog.find('input[data-field="14"]').val(track.track_number);
      $dialog.find('input[data-field="16"]').val(track.disc_number);
      $dialog.find('input[data-field="15"]').val(album.tracks.total);
      $dialog.find('input[data-field="11"]').val(album.genres[0]);
      $dialog.find('input[data-field="18"]')
        .val(album.release_date.substring(0,4));
      updateDownloadCover(payload);
    };

    // Set the download link and file name of the album cover
    var updateDownloadCover = function(payload) {
      var songName = payload.track.name;
      var artistName = payload.track.artists[0].name;
      Metadata.EditSong.url = payload.album.images[0].url;
      Metadata.EditSong.fileName = songName +
        ' - ' + artistName + '.jpg';
    };

    // Reset state back to empty
    var reset = function() {
      Metadata.EditSong.url = '';
      Metadata.EditSong.fileName = '';
    };

    return {
      // Set initial state
      url: '',
      fileName: '',

      init: function() {
        reset();
        rivets.bind($('.album-image .download'), {
          artwork: Metadata.EditSong
        });
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.operation === "metadata.update") {
              updateForm(request.payload);
            }
          }
        );
      },
    };
  })();

  global.Metadata.EditSong = Metadata.EditSong;

})(this);
