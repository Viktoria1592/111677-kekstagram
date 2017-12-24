'use strict';

(function () {
  var uploadImageForm = document.querySelector('#upload-select-image');
  var imagePreview = uploadImageForm.querySelector('.effect-image-preview');
  var uploadEffectControl = uploadImageForm.querySelector('.upload-effect-controls');
  var effectLevelLine = uploadImageForm.querySelector('.upload-effect-level-line');
  var effectLevelPin = uploadImageForm.querySelector('.upload-effect-level-pin');
  var effectLevelVal = uploadImageForm.querySelector('.upload-effect-level-val');
  var levelValue = uploadImageForm.querySelector('.upload-effect-level-value');
  var uploadEffectLevel = uploadImageForm.querySelector('.upload-effect-level');

  var shiftX; // Смещение пина по оси Х
  var lineCoords; // Кординаты области фильтра
  var pinCoords; // Кординаты пина
  var currentFilter; // Текущий фильтр

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

  var applyFilter = function (newFilter, oldFilter) {
    imagePreview.classList.remove('effect-' + oldFilter);
    imagePreview.classList.add('effect-' + newFilter);

    if (newFilter === 'none') {
      uploadEffectLevel.classList.add('hidden');
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }

    effectLevelPin.style.left = '100%';
    effectLevelVal.style.width = '100%';
    imagePreview.style.filter = '';

    effectLevelPin.addEventListener('mousedown', function (evt) {
      pinCoords = getCoords(effectLevelPin);
      lineCoords = getCoords(effectLevelLine);
      shiftX = evt.pageX - pinCoords.left;
      currentFilter = newFilter;

      document.addEventListener('mousemove', onPinLevelMoseMove);
    });
  };

  window.initializeFilters(uploadEffectControl, applyFilter);

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
    effectLevelPin.style.left = currentValue + '%';
    effectLevelVal.style.width = currentValue + '%';
    levelValue.value = Math.round(currentValue);
    imagePreview.style.filter = setEffectFilterValue(currentFilter, currentValue, filters);
  };

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', onPinLevelMoseMove);
  });
})();
