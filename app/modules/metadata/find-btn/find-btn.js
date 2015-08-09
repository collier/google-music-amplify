(function(global) {
  'use strict';

  Metadata.FindBtnCtrl = (function() {

    return {
      init: function() {
        rivets.bind($('input[name="search-metadata"]'), {
          FindBtnCtrl: Metadata.FindBtnCtrl
        });
      },

      showDialog: function() {
        Metadata.DialogCtrl.init();
      }
    };
  })();

  global.Metadata.FindBtnCtrl = Metadata.FindBtnCtrl;

})(this);
