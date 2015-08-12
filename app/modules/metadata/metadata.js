(function(global) {
  'use strict';

  var Metadata = (function() {
    return {
      //Adds styles, content, and listeners used as part of the Metadata
      init: function() {
        // Add styles
        Util.injectStylesheet('metadata/find-btn/find-btn');
        Util.injectStylesheet('metadata/load-cover/load-cover');
        /**
        * Add event listener for the "Edit Info" drop down option. When
        * clicked, wait for popup to load, then add Find Metadata button
        */
        $('#\\:i').click(function() {
          setTimeout(function() {
            var $btnsContainer = $('.simple-dialog.edit-dialog .simple-dialog-buttons');
            var $albumImgContainer = $('.simple-dialog-content .album-image');
            var $searchMetadataBtn = $btnsContainer.find('input[name="search-metadata"]');
            Util.getView('metadata/load-cover/load-cover', function(html) {
              $albumImgContainer.prepend(html);
            });
            if($searchMetadataBtn.length === 0) {
              Util.getView('metadata/modal/modal', function(html) {
                $btnsContainer.append(html);
                Metadata.Modal.init();
              });
            }
          }, 700);
        });
      }
    };
  })();

  global.Metadata = Metadata;

}(this));
