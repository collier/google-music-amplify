(function(global) {
  'use strict';

  var Metadata = (function() {

    return {
      //Adds styles, content, and listeners used as part of the Metadata
      init: function() {
        // Add styles
        Util.injectStylesheet('metadata/dialog/dialog');
        Util.injectStylesheet('metadata/find-btn/find-btn');
        Util.injectStylesheet('metadata/load-cover/load-cover');
        // Add event listener for the "Edit Info" drop down option. When
        // clicked, wait for popup to load, then add Find Metadata button
        $('#\\:i').click(function() {
          setTimeout(function() {
            var btnsContainer = $('.simple-dialog.edit-dialog .simple-dialog-buttons');
            Util.getView('metadata/load-cover/load-cover', function(html) {
              $('.simple-dialog-content .album-image').prepend(html);
            });
            if(btnsContainer.find('input[name="search-metadata"]').length === 0) {
              Util.getView('metadata/find-btn/find-btn', function(html) {
                btnsContainer.append(html);
                // angular.bootstrap(document,['GMA_Metadata']);
              });
            }
          }, 700);
        });
      }
    };
  })();

  global.Metadata = Metadata;

}(this));
