'use strict';

var $         = require('jquery'),
    angular   = require('angular'),
    loadCss   = require('load-css-file'),
    metadata  = require('./modules/metadata/metadata.js');

//Load html templates
var fs        = require('fs');
var loadCover = fs.readFileSync(__dirname + '/modules/metadata/load-cover.html', 'utf8');
var findBtn   = fs.readFileSync(__dirname + '/modules/metadata/find-btn.html', 'utf8');

//Inject stylesheets at bottom of head to prevent overrides
loadCss(chrome.extension.getURL('modules/metadata/dialog.css'));
loadCss(chrome.extension.getURL('modules/metadata/find-btn.css'));
loadCss(chrome.extension.getURL('modules/metadata/load-cover.css'));

//Add event listener for the "Edit Info" drop down option. When clicked, wait
//for the Edit song info popup to load, then append the "Find Metadata"
//button to form, if it hasn't already been added.
$(function() {

  $('#\\:i').click(function() {

    setTimeout(function() {

      $('.simple-dialog-content .album-image').prepend(loadCover);
      var buttons = $('.simple-dialog.edit-dialog .simple-dialog-buttons');
      if(buttons.find('input[name="search-metadata"]').length === 0) {
        buttons.append(findBtn);
        angular.bootstrap(document, ['GMA_Metadata']);
      }

    },400);
  });
});
