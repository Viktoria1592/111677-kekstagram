'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.util = {
    escKeycode: 27,
    enterKeycode: 13,
    debounce: function (func, wait) {
      wait = wait || DEBOUNCE_INTERVAL;
      var timeout;

      function wrapper() {
        var args = arguments;
        var later = function () {
          timeout = null;
          func.apply(wrapper, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      }
      return wrapper;
    },
    checkEmptyElements: function (arr) {
      var isWithEmptyElements = false;

      arr.forEach(function (value) {
        if (value === '') {
          isWithEmptyElements = true;
        }
      });

      return isWithEmptyElements;
    }
  };
})();
