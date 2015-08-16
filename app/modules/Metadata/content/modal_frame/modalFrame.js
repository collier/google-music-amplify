(function(global) {
  'use strict';

  Metadata.ModalFrame = (function() {
    return {
      // Set source of modal frame to background html
      src: chrome.runtime.getURL('/modules/Metadata/iframes/modal.html'),

      // Setup rivets binding
      init: function() {
        rivets.bind($('.metadata-modal'), {
          ModalFrame: Metadata.ModalFrame
        });
      },

      hide: function() {
        $('.metadata-modal').removeClass('show-frame');
      },

      show: function() {
        $('.metadata-modal').addClass('show-frame');
      }
    };
  })();

  global.Metadata.ModalFrame = Metadata.ModalFrame;

})(this);
