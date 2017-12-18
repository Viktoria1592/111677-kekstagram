'use strict';

(function () {
  var pictureElement = document.querySelector('.upload-form-preview img');
  var uploadEffectControl = document.querySelector('.upload-effect-controls');

  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelVal = document.querySelector('.upload-effect-level-val');

  var applyFilter = function (newFilter, oldFilter) {
    pictureElement.classList.remove('effect-' + oldFilter);
    pictureElement.classList.add('effect-' + newFilter);
    if (newFilter === 'none') {
      uploadEffectLevel.classList.add('hidden');
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }
    effectLevelPin.style.left = '100%';
    effectLevelVal.style.width = '100%';
  };

  window.initializeFilters(uploadEffectControl, applyFilter);

})();
