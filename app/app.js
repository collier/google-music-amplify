'use strict';

var gma = gma || {};

gma.util = {

  //Dynamically append the stylsheet into the head,
  //so that styles marked with !imporant can still be overridden
  injectStylesheet : function(pathToSheet) {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL(pathToSheet);
    link.type = "text/css";
    link.rel = "stylesheet";
    $("head").append(link);
  },

  wait: function(ms) {
    var defer = $.Deferred();
    setTimeout(function() { defer.resolve(); }, ms);
    return defer;
  }

};
