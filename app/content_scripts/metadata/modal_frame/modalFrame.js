(function(global) {
  'use strict';

  Metadata.ModalFrame = (function() {
    return {
      // Set source of modal frame to background html
      src: chrome.runtime.getURL('/iframes/modal.html'),

      // Setup rivets binding, add event listeners
      init: function() {
        rivets.bind($('.metadata-modal'), {
          ModalFrame: Metadata.ModalFrame
        });
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.operation === 'metdata.find') {
              Metadata.ModalFrame.show();
            }
            if (request.operation === 'metadata.exit') {
              Metadata.ModalFrame.hide();
            }
          }
        );
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
