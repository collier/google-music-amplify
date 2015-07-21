'use strict';

gma.metadata = {

  resources : {
    btnStyles : 'modules/metadata/metadata.css',
    dialogStyles : 'modules/metadata/dialog.css',
    btnView : 'modules/metadata/metadata.html',
    closeIcon : 'images/ic_clear_white_24px.svg'
  },

  init : function() {
    this.injectCSS();
    this.injectDOM();
  },

  injectCSS : function() {
    gma.util.injectStylesheet(this.resources.btnStyles);
    gma.util.injectStylesheet(this.resources.dialogStyles);
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
          var view = chrome.extension.getURL('modules/metadata/metadata.html'),
            exitIco = chrome.extension.getURL('images/ic_clear_white_24px.svg');
          $('.gma-metadata').load(view, function(){
            $('md-icon[aria-label="Close dialog"]').attr('md-svg', exitIco);
            angular.bootstrap(document, ['metadata']);
          });
        }
      });
    });
  }
};
