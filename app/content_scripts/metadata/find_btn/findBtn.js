(function(global) {
  'use strict';

  Metadata.FindBtn = (function() {
    return {
      init: function() {
        rivets.bind($('.search-btn'), {
          FindBtn: Metadata.FindBtn
        });
      },

      sendClickEvent: function() {
        var song = {};
        song.name = $('.simple-dialog-content input[data-field="1"]')
          .attr('data-original');
        song.artist = $('.simple-dialog-content input[data-field="3"]')
          .attr('data-original');
        chrome.runtime.sendMessage({
          operation: "metdata.find",
          payload: song
        });
      }
    };
  })();

  global.Metadata.FindBtn = Metadata.FindBtn;

})(this);
