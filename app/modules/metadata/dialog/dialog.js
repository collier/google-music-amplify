(function(global) {
  'use strict';

  Metadata.DialogCtrl = (function() {

    return {
      init: function() {
        Util.getView('metadata/dialog/dialog', function(html) {
          $('.gma-metadata-btn').append(html);
          $('#metadata-modal').leanModal();
          rivets.bind($('#metadata-modal'), {
            DialogCtrl: Metadata.DialogCtrl
          });
        });
      }
    };
  })();

  global.Metadata.DialogCtrl = Metadata.DialogCtrl;

})(this);
