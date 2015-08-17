/**
 * Google Music Amplify
 * https://goo.gl/eDSTo2
 * (c) 2015 DJ Collier (https://djcollier.com)
 * Google Music Amplify may be freely distributed under the MIT license
 */
(function(global) {
  'use strict';

  var GoogleMusicAmplify = (function() {
    return {
      init:  function() {
        // Template delimiters for text bindings
        rivets.configure({
          templateDelimiters: ['{{', '}}'],
        });
        // Initiates all enabled modules
        Metadata.init();
      }
    };
  })();

  // Expose module to global object
  global.GoogleMusicAmplify = GoogleMusicAmplify;

}(this));

// Kicks off extension on document ready
$(function() {
  GoogleMusicAmplify.init();
});
