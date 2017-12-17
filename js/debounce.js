'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (func, wait) {
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
  };
})();
