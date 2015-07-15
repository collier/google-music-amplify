'use strict';

$(function() {


  //Dynamically append the inject.css stylsheet into the head,
  //so that styles marked with !imporant can still be overridden
  var link = document.createElement("link");
  link.href = chrome.extension.getURL("styles/inject.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  $("head").append(link);


  //Add event listener for the "Edit Info" drop down option. When clicked, wait
  //for the Edit song info popup to load, then append the "Find Metadata"
  //button to form, if it hasn't already been added.
  $('#\\:i').click(function() {
    setTimeout(function() {
      var buttons = $('.simple-dialog.edit-dialog')
                      .find('.simple-dialog-buttons');
      if(buttons.find('button[name="search-metadata"]').length === 0) {
        buttons.append('<button name="search-metadata">Find Metadata</button>');
      }
    }, 500);
  });

});
