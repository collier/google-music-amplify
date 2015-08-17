(function(global) {
  'use strict';

  var Util = (function() {
    return {
      /**
       * Appends new link tags to head which contain locations of extension
       * stylesheets. Allows override of page styles with !important marker.
       */
      injectLinks: function(locations) {
        locations.forEach(function(location){
          var head = document.head;
          var link = document.createElement('link');
          link.type = 'text/css';
          link.rel = 'stylesheet';
          link.href = chrome.extension.getURL(
            'content_scripts/' + location + '.css');
          head.appendChild(link);
        });
      },

      // Requests view from within chrome extension.
      getView: function(location, callback) {
        var viewPathName = '/content_scripts/' + location + '.html';
        var extLocation = chrome.extension.getURL(viewPathName);
        var request = new XMLHttpRequest();
        request.open('GET', extLocation, true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            callback(request.responseText);
          } else {
            console.log('Unable to get resource from Google Music Amplify' +
              'extension');
          }
        };
        request.onerror = function() {
          console.log('Unable to contact Google Music Amplify extension');
        };
        request.send();
      }

    };
  })();

  // Expose module to the global object
  global.Util = Util;

})(this);
