(function(global) {
  'use strict';

  Metadata.DialogCtrl = (function() {

    return {
      init: function() {
        var dialog = new Vue({
          el: '.gma-metadata-btn'
        });
      }
    };
  })();

  global.Metadata.DialogCtrl = Metadata.DialogCtrl;

})(this);
