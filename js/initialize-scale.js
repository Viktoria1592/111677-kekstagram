'use strict';

window.initializeScale = function (input, increaseBtn, decreaseBtn, action) {
  var MAX_SIZE_PICTURE = 100;
  var MIN_SIZE_PICTURE = 25;
  var RESIZE_STEP = 25;
  var INCREASE = 1;
  var DECREASE = 0;
  var step;

  var isMaxSize = function (value, step) {
    return value === MIN_SIZE_PICTURE && step > 0;
  };

  var isMinSize = function (value, step) {
    return value === MAX_SIZE_PICTURE && step < 0;
  };
  var resizeValue = function (type) {
    var currentResizeValue = parseInt(input.value.replace('%', ''), 10);
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
      input.value = currentResizeValue + '%';
      action(currentResizeValue);
    }
  };

  increaseBtn.addEventListener('click', resizeValue(INCREASE));
  decreaseBtn.addEventListener('click', resizeValue(DECREASE));

};


