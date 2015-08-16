(function(global) {
  'use strict';

  var Metadata = (function() {
    return {
      //Adds styles, content, and listeners used as part of the Metadata
      init: function() {
        // Add styles
        Util.injectLinks([
          'modules/Metadata/content/find_btn/findBtn.css',
          'modules/Metadata/content/download_cover/downloadCover.css',
          'modules/Metadata/content/modal_frame/modalFrame.css'
        ]);
        // Append metadata modal iframe to body
        Util.getView('Metadata/content/modal_frame/modalFrame', function(html) {
          $('body').append(html);
          Metadata.ModalFrame.init();
        });
        /**
        * Add event listener for the "Edit Info" drop down option. When
        * clicked, wait for popup to load, then add Find Metadata button,
        * and download album link
        */
        $('#\\:i').click(function() {
          setTimeout(function() {
            var $btnsContainer = $('.edit-dialog .simple-dialog-buttons');
            var $albumImgContainer = $('.edit-dialog .album-image');
            var $searchMetadataBtn = $btnsContainer.find('.search-btn');
            var $downloadCoverArt = $albumImgContainer.find('.download');
            if($downloadCoverArt.length === 0) {
              Util.getView('Metadata/content/download_cover/downloadCover', function(html) {
                $albumImgContainer.prepend(html);
                Metadata.DownloadCover.init();
              });
            }
            if($searchMetadataBtn.length === 0) {
              Util.getView('Metadata/content/find_btn/findBtn', function(html) {
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
