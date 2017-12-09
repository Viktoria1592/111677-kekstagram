'use strict';

(function () {

  var picturesList = document.querySelector('.pictures');
  var picturesTemplate = document.querySelector('#picture-template');
  var userPictures = document.querySelectorAll('.picture');

  picturesList.appendChild(window.renderPhoto(window.pictures, picturesTemplate)); // Добавление клонированных из шаблона фотографий в контейнер

  userPictures.forEach(function (picture) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.openGalleryOverlay(picture);
    });
  });

})();
