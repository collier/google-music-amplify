'use strict';

$(function() {

  $('#\\:i').click(function(){
    setTimeout(function() {
      $('.simple-dialog.edit-dialog')
        .find('.simple-dialog-buttons')
        .append('<button name="search-metadata">Find Metadata</button>');
    }, 300);
  });
  // console.log($('#\\:i'));

});

// document.getElementById(':i').addEventListener('click', function(){
//   document.getElementsByClassName('simple-dialog edit-dialog')[0];
// });

console.log('\'Allo \'Allo! Content script');
