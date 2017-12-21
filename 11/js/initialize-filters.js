'use strict';

(function () {
  window.initializeFilters = function (filterElement, callback) {
    var oldFilter = 'none';
    var newFilter;
    filterElement.addEventListener('change', function (evt) {
      newFilter = evt.target.value;
      callback(newFilter, oldFilter);
      oldFilter = evt.target.value;
    });
  };
})();
