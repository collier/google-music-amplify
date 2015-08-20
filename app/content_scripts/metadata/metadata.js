(function(global) {
  'use strict';

  var Metadata = (function() {
    return {
      //Adds styles, content, and listeners used as part of the Metadata
      init: function() {
        // Add styles
        Util.injectLinks([
          'metadata/find_btn/findBtn',
          'metadata/edit_song/downloadCover',
          'metadata/modal_frame/modalFrame'
        ]);
        // Append metadata modal iframe to body
        Util.getView('metadata/modal_frame/modalFrame', function(html) {
          $('body').append(html);
          Metadata.ModalFrame.init();
        });
        /**
        * Add event listener for the "Edit Info" drop down option. When
        * clicked, wait for popup to load, then add Find Metadata button,
        * and download album link
        */
        $('.goog-menuitem-content:contains("Edit info")').parent()
          .click(function() {
            setTimeout(function() {
              var $btnsContainer = $('.edit-dialog .simple-dialog-buttons');
              var $albumImgContainer = $('.edit-dialog .album-image');
              var $searchMetadataBtn = $btnsContainer.find('.search-btn');
              var $downloadCoverArt = $albumImgContainer.find('.download');
              if($downloadCoverArt.length === 0) {
                Util.getView('metadata/edit_song/downloadCover', function(html) {
                  $albumImgContainer.prepend(html);
                  Metadata.EditSong.init();
                });
              }
              if($searchMetadataBtn.length === 0) {
                Util.getView('metadata/find_btn/findBtn', function(html) {
                  $btnsContainer.append(html);
                  Metadata.FindBtn.init();
                });
              }
            }, 700);
        });
      }
    };
  })();

  global.Metadata = Metadata;

}(this));
