(function(global) {
  'use strict';

  Metadata.FindBtn = (function() {
    return {
      init: function() {
        rivets.bind($('.search-btn'), {
          ModalFrame: Metadata.ModalFrame,
          FindBtn: Metadata.FindBtn
        });
      }
    };
  })();

  global.Metadata.FindBtn = Metadata.FindBtn;

})(this);
