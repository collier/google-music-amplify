'use strict';

gma.metadata = {

  init : function() {
    this.injectCSS();
    this.injectDOM();
  },

  injectCSS : function() {
    gma.util.injectStylesheet('modules/metadata/metadata.css');
    gma.util.injectStylesheet('modules/metadata/dialog.css');
  },

  //Add event listener for the "Edit Info" drop down option. When clicked, wait
  //for the Edit song info popup to load, then append the "Find Metadata"
  //button to form, if it hasn't already been added.
  injectDOM : function() {
    $('#\\:i').click(function() {
      gma.util.wait(400).then(function() {
        var buttons = $('.simple-dialog.edit-dialog .simple-dialog-buttons');
        if(buttons.find('input[name="search-metadata"]').length === 0) {
          buttons.append('<div class="gma-metadata"></div>');
          var view = chrome.extension.getURL('modules/metadata/metadata.html');
          $('.gma-metadata').load(view, function(){
            angular.bootstrap(document, ['metadata']);
          });
        }
      });
    });
  }
};
