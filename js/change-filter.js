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
    changeVisibility(pictureElement, uploadEffectLevel);
    resetEffectValue();
  };

  window.initializeFilters(uploadEffectControl, applyFilter);

  var resetEffectValue = function () {
    effectLevelPin.style.left = '100%';
    effectLevelVal.style.width = '100%';
  };

  var changeVisibility = function (element, target) {
    return target.value !== 'none' ? target.classList.remove('hidden') : target.classList.add('hidden');
  };

})();
