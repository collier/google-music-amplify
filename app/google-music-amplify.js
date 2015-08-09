/*
* Google Music Amplify
* https://goo.gl/eDSTo2
* (c) 2015 DJ Collier (https://djcollier.com)
* Google Music Amplify may be freely distributed under the MIT license
*/

(function(global) {
  'use strict';

  var GoogleMusicAmplify = (function() {

    return {
      // Initiates all enabled modules
      init:  function() {
        // Template delimiters for text bindings
        rivets.configure({
          templateDelimiters: ['{{', '}}'],
        });
        Metadata.init();
      }
    };
  })();

  // Kicks off extension
  $(function() {
    GoogleMusicAmplify.init();
  });

  // Expose module to global object
  global.GoogleMusicAmplify = GoogleMusicAmplify;

}(this));
