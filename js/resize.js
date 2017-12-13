'use strict';
(function () {
  var resizeValueField = document.querySelector('.upload-resize-controls-value');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var scaleElement = document.querySelector('.upload-resize-controls');

  var changeScale = function (sizeValue) {
    effectImagePreview.style.transform = 'scale(' + (sizeValue / 100) + ')';
  };

  window.initializeScale(scaleElement, changeScale);

})();




