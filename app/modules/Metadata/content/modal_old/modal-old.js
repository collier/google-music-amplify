(function(global) {
  'use strict';

  Metadata.Modal = (function() {
    // Select from within modal shadow dom
    var shadowSelect = function(selector) {
      return document
        .querySelector('.gma-metadata .modal-shadow')
        .shadowRoot
        .querySelector(selector);
    };

    return {
      /**
      * Sets up rivets binding for the view, and create shadow root element
      * using the modal template.
      */
      init: function() {
        rivets.bind($('.gma-metadata'), {
          Modal: Metadata.Modal
        });
        var shadow = document
          .querySelector('.gma-metadata .modal-shadow')
          .createShadowRoot();
        var template = document.querySelector('.gma-metadata .modal-template');
        var clone = document.importNode(template.content, true);
        shadow.appendChild(clone);
        Util.injectShadowStylesheets(shadow, [
          'bower_components/materialize/dist/css/materialize.min.css',
          'modules/utils/utils.css',
          'modules/metadata/modal/modal.css'
        ]);
      },

      // Show find metadata modal
      show: function() {
        $(shadowSelect('.modal')).openModal();
      },

      // Show find metadata modal
      hide: function() {
        $(shadowSelect('.modal')).closeModal();
      }
    };
  })();

  global.Metadata.Modal = Metadata.Modal;

})(this);
