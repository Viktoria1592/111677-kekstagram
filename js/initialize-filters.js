'use strict';

(function () {
  window.initializeFilters = function (filterElement, callback) {
    var uploadEffectLevel = document.querySelector('.upload-effect-level');
    var effectLevelPin = document.querySelector('.upload-effect-level-pin');
    var effectLevelVal = document.querySelector('.upload-effect-level-val');

    var onEffectControlsClick = function (evt) {
      var target = evt.target;
      if (target.type === 'radio') {
        isImageHasFilter(target);
        resetEffectValue();
        callback.style = '';
        callback.classList = '';
        callback.classList.add('effect-' + target.value);
      }
    };

    var resetEffectValue = function () {
      effectLevelPin.style.left = '100%';
      effectLevelVal.style.width = '100%';
    };

    var isImageHasFilter = function (target) {
      if (target.value !== 'none') {
        return uploadEffectLevel.classList.remove('hidden');
      } else {
        return uploadEffectLevel.classList.add('hidden');
      }
    };

    filterElement.addEventListener('click', onEffectControlsClick);
  };
})();
