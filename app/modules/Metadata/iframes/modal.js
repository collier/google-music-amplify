(function(global) {
  'use strict';

  var Modal = (function() {
    return {
      /**
      * Sets up rivets binding for the view, and create shadow root element
      * using the modal template.
      */
      init: function() {
        rivets.bind($('.gma-metadata'), {
          Modal: Modal
        });
        $('.modal').openModal();
      },

      // Show find metadata modal
      show: function() {
        $('.modal').openModal();
      },

      // Show find metadata modal
      hide: function() {
        $('.modal').closeModal();
      }
    };
  })();

  global.Modal = Modal;

})(this);

$(function() {
  Modal.init();
});
