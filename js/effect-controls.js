'use strict';

(function () {
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadEffectsControls = document.querySelector('.upload-effect-controls');
  var effectLevelLine = document.querySelector('.upload-effect-level-line');
  var effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelVal = document.querySelector('.upload-effect-level-val');
  var imagePreview = document.querySelector('.effect-image-preview');
  
  var shiftX; // Смещение пина по оси Х
  var lineCoords; // Кординаты линии уровня фильтра
  var pinCoords; // Кординаты пина
  
  var filtersParam = {
	chrome: 'grayscale',
	chromeMax: 1,
    sepia:	'sepia',
	sepiaMax: 1,
	marvin: 'invert',
	marvinMax: 100,
	phobos: 'blur',
	phobosMax: 3,
	heat: 'brightness',
	heatMax: 3
  };
  
  var onEffectControlsClick = function (evt) {
    var target = evt.target;
	isImageHasFilter(target);	
    if (target.type === 'radio') {
      imagePreview.classList = '';
      imagePreview.classList.add('effect-' + target.value);
	  imagePreview.style.filter = setEffectFilterValue(target.value, '100', filtersParam);
	  window.resetEffectValue();
    }
  };
  
  var isImageHasFilter = function (target) {
	if (target.value !== 'none') {
      return uploadEffectLevel.classList.remove('hidden');
    } else {
      return uploadEffectLevel.classList.add('hidden');
    }  
  };
  
  window.resetEffectValue = function () {
	effectLevelPin.style.left = '100%';
    effectLevelVal.style.width = '100%';	  
  };

  uploadEffectsControls.addEventListener('click', onEffectControlsClick);

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      right: box.right,
      left: box.left
    };
  };

  var getPercent = function (number, lengh) {
    return (number / lengh) * 100 ;
  };
  
  var getFilterValue = function (percent, lengh) {
    return (percent * lengh) / 100 ;
  };
  
   var getEffectFilterName = function (target) {
	return target.className.replace('effect-', '');
   };
  
  var setEffectFilterValue = function (filter, value, filtersArr) {
	var effect = filtersArr[filter];
	var effectMaxValue = filtersArr[filter + 'Max'];
	var currentEffectValue = getFilterValue(value, effectMaxValue);
	var effectValue = effect + '(' + currentEffectValue;
	if (effect === 'invert') {
	  return effectValue + '%' + ')';
	}
	if (effect === 'blur') {
	  return effectValue + 'px' + ')';
	}
	return effectValue + ')';
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

    effectLevelPin.style.left =  currentValue + '%';
    effectLevelVal.style.width = currentValue + '%';
	imagePreview.style.filter = setEffectFilterValue(filterEffect, currentValue, filtersParam);
	
  };

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', onPinLevelMoseMove);
  });

})();

