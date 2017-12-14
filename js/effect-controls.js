'use strict';

(function () {
  var effectLevelLine = document.querySelector('.upload-effect-level-line');
  var effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelVal = document.querySelector('.upload-effect-level-val');
  var imagePreview = document.querySelector('.effect-image-preview');

  var shiftX; // Смещение пина по оси Х
  var lineCoords; // Кординаты области фильтра
  var pinCoords; // Кординаты пина

  var filters = {
    chrome: {
      filterName: 'grayscale',
      filterLength: 1,
      unit: ''
    },
    sepia: {
      filterName: 'sepia',
      filterLength: 1,
      unit: ''
    },
    marvin: {
      filterName: 'invert',
      filterLength: 100,
      unit: '%'
    },
    phobos: {
      filterName: 'blur',
      filterLength: 3,
      unit: 'px'
    },
    heat: {
      filterName: 'brightness',
      filterLength: 3,
      unit: ''
    }
  };

  var getPercent = function (number, lengh) {
    return (number / lengh) * 100;
  };

  var getFilterValue = function (percent, lengh) {
    return (percent * lengh) / 100;
  };

  var getEffectFilterName = function (target) {
    return target.className.replace('effect-', '');
  };

  var setEffectFilterValue = function (elem, value, filtersArr) {
    var filterParams = filtersArr[elem];
    var effectName = filterParams.filterName;
    var effectMaxValue = filterParams.filterLength;
    var currentEffectValue = getFilterValue(value, effectMaxValue);

    return effectName + '(' + currentEffectValue + filterParams.unit + ')';
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      right: box.right,
      left: box.left
    };
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    pinCoords = getCoords(effectLevelPin);
    lineCoords = getCoords(effectLevelLine);
    shiftX = evt.pageX - pinCoords.left;

    document.addEventListener('mousemove', onPinLevelMoseMove);
  });

  var onPinLevelMoseMove = function (evt) {
    var currentPinCoords = evt.pageX - shiftX - lineCoords.left;

    if (currentPinCoords < 0) {
      currentPinCoords = 0;
    }
    var lineWidth = effectLevelLine.offsetWidth;

    if (currentPinCoords > lineWidth) {
      currentPinCoords = lineWidth;
    }

    var currentValue = getPercent(currentPinCoords, lineWidth);
    var filterEffect = getEffectFilterName(imagePreview);

    effectLevelPin.style.left = currentValue + '%';
    effectLevelVal.style.width = currentValue + '%';
    imagePreview.style.filter = setEffectFilterValue(filterEffect, currentValue, filters);

  };

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', onPinLevelMoseMove);
  });
})();

