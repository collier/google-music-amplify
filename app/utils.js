(function(global) {
 'use strict';

  var Util = (function() {

    return {
      /**
      * Appends new link tag to head which contains location of an extension
      * stylesheet. Allows override of page styles with !important marker.
      */
      injectStylesheet: function(location) {
        var head = document.head;
        var link = document.createElement('link');
        var sheetPathName = 'modules/' + location + '.css';
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = chrome.extension.getURL(sheetPathName);
        head.appendChild(link);
      },

      // Requests view from within chrome extension.
      getView: function(location, callback) {
        var viewPathName = 'modules/' + location + '.html';
        var extLocation = chrome.extension.getURL(viewPathName);
        $.get(extLocation, function(html) {
          callback(html);
        });
      }
    };
  })();

  // Expose module to the global object
  global.Util = Util;

})(this);
