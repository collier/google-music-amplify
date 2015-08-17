(function(global) {
  'use strict';

  Metadata.DownloadCover = (function() {
    return {
      init: function() {
        console.log('download cover initialized!');
      }
    };
  })();

  global.Metadata.DownloadCover = Metadata.DownloadCover;

})(this);
