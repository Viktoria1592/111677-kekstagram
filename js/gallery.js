'use strict';

(function () {

  var picturesList = document.querySelector('.pictures');
  var picturesTemplate = document.querySelector('#picture-template');
  //var userPictures = document.querySelector('.picture');

  var pictures = window.createPhotos();

  picturesList.appendChild(window.renderPhoto(pictures, picturesTemplate)); // Добавление клонированных из шаблона фотографий в контейнер

  var onPicturesListClick = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.parentNode.className === 'picture') {
      window.openGalleryOverlay(target.parentNode);
    }
  };

  picturesList.addEventListener('click', onPicturesListClick);

})();
