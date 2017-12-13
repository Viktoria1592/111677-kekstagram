'use strict';

window.initializeScale = function (scaleElement, callback) {
  var MAX_SIZE_PICTURE = 100;
  var MIN_SIZE_PICTURE = 25;
  var RESIZE_STEP = 25;
  var INCREASE = 1;
  var DECREASE = 0;

  var resizeIncBnt = document.querySelector('.upload-resize-controls-button-inc');
  var resizeValueField = document.querySelector('.upload-resize-controls-value');

  var isMaxSize = function (value, step) {
    return value === MAX_SIZE_PICTURE && step > 0;
  };

  var isMinSize = function (value, step) {
    return value === MIN_SIZE_PICTURE && step < 0;
  };

  var step;

  var resizeValue = function (type) {
    var currentResizeValue = parseInt(resizeValueField.value.replace('%', ''), 10);
    switch (type) {
      case DECREASE:
        step = -RESIZE_STEP;
        break;
      case INCREASE:
        step = RESIZE_STEP;
        break;
    }
    if (!(isMaxSize(currentResizeValue, step) || isMinSize(currentResizeValue, step))) {
      currentResizeValue += step;
      resizeValueField.value = currentResizeValue + '%';
      callback(currentResizeValue);
    }
  };
  scaleElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target === resizeIncBnt) {
      resizeValue(INCREASE);
    } else {
      resizeValue(DECREASE);
    }
  });
};


