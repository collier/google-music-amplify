(function(global) {
  'use strict';

  Metadata.DownloadCover = (function() {
    return {
      url: '',
      fileName: '',
      init: function() {
        rivets.bind($('.album-image .download'), {
          artwork: Metadata.DownloadCover
        });
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.operation === "metadata.update") {
              var songName = request.payload.track.name;
              var artistName = request.payload.track.artists[0].name;
              Metadata.DownloadCover.url = request.payload.album.images[0].url;
              Metadata.DownloadCover.fileName = songName +
                ' - ' + artistName + '.jpg';
            }
          }
        );
      }
    };
  })();

  global.Metadata.DownloadCover = Metadata.DownloadCover;

})(this);
