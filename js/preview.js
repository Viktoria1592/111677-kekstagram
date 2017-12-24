'use strict';

(function () {
  var gallerySelectors = {
    image: '.gallery-overlay-image',
    likes: '.likes-count',
    comments: '.comments-count'
  };

  var photoSelectors = {
    image: '.picture img',
    likes: '.picture-likes',
    comments: '.picture-comments'
  };

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryCloseBtn = document.querySelector('.gallery-overlay-close');

  var copyDataFromTarget = function (element, target, elementSelectors, targetSelectors) {
    element.querySelector(elementSelectors.image).src = target.querySelector(targetSelectors.image).src;
    element.querySelector(elementSelectors.likes).textContent = target.querySelector(targetSelectors.likes).textContent;
    element.querySelector(elementSelectors.comments).textContent = target.querySelector(targetSelectors.comments).textContent;
  };

  window.openGalleryOverlay = function (targetPicture) {
    copyDataFromTarget(galleryOverlay, targetPicture, gallerySelectors, photoSelectors); // Копируем данные переданной фотографии
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayEscPress);
  };

  var closeGalleryOverlay = function () {
    galleryOverlay.classList.add('hidden');
  };

  galleryCloseBtn.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  galleryCloseBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      closeGalleryOverlay();
    }
  });

  var onGalleryOverlayEscPress = function (evt) {
    if (evt.keyCode === window.util.escKeycode) {
      closeGalleryOverlay();
    }
  };

})();
