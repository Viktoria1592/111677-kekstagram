'use strict';

(function () {

  var photoSelectors = {
    image: '.picture img',
    likes: '.picture-likes',
    comments: '.picture-comments'
  };

  var fillPhotoData = function (element, selector, photoArr) {
    element.querySelector(selector.image).src = photoArr.url;
    element.querySelector(selector.likes).textContent = photoArr.likes;
    element.querySelector(selector.comments).textContent = photoArr.comments;

    return element;
  };

  window.renderPhoto = function (photoArr, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoArr.length; i++) {
      var picturelSelector = template.content.cloneNode(true);
      fragment.appendChild(fillPhotoData(picturelSelector, photoSelectors, photoArr[i]));
    }
    return fragment;
  };

})();
