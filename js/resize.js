'use strict';
(function () {
  var resizeValueField = document.querySelector('.upload-resize-controls-value');
  var resizeDecBnt = document.querySelector('.upload-resize-controls-button-dec');
  var resizeIncBnt = document.querySelector('.upload-resize-controls-button-inc');
  var effectImagePreview = document.querySelector('.effect-image-preview');

  var changeScale = function (sizeValue) {
    effectImagePreview.style.transform = 'scale(' + (sizeValue / 100) + ')';
  };

  window.initializeScale(resizeValueField, resizeDecBnt, resizeIncBnt, changeScale);

})();




