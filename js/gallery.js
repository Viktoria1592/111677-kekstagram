'use strict';

(function () {

  var picturesList = document.querySelector('.pictures');
  var picturesTemplate = document.querySelector('#picture-template');
  var picturesOrder = document.querySelector('.filters');
  var originalPictures;
  var sortPictures;

  var successHandler = function (pictures) {
    picturesOrder.classList.remove('filters-inactive');
    originalPictures = pictures;
    setPicturesOrder(pictures);
    renderGallary(pictures);
  };

  window.errorHandler = function (errorMessage) {
    var errorViewer = document.createElement('div');
    errorViewer.style = 'z-index: 100; margin: 0 auto; width: auto; height: 50px; text-align: center;' +
      ' background-color: rgba(255, 231, 82, 0.3); color: #ffe753';
    errorViewer.style.position = 'absolute';
    errorViewer.style.top = 0;
    errorViewer.style.left = 0;
    errorViewer.style.right = 0;
    errorViewer.style.fontSize = '30px';
    errorViewer.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorViewer);
  };

  window.backend.load(successHandler, window.errorHandler);

  var renderGallary = function (pictures) {
    clearGallery();
    picturesList.appendChild(window.renderPhoto(pictures, picturesTemplate));

    var onPicturesListClick = function (evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.parentNode.className === 'picture') {
        window.openGalleryOverlay(target.parentNode);
      }
    };
    picturesList.addEventListener('click', onPicturesListClick);
  };

  var clearGallery = function () {
    while (picturesList.firstChild) {
      picturesList.removeChild(picturesList.firstChild);
    }
  };

  var setPicturesOrder = function (pictures) {
    picturesOrder.addEventListener('click', function (evt) {
      var target = evt.target;
      switch (target.value) {
        case 'popular':
          sortPictures = originalPictures.slice().sort(function (first, second) {
            return second.likes - first.likes;
          });
          break;
        case 'discussed':
          sortPictures = originalPictures.slice().sort(function (first, second) {
            return second.comments.length - first.comments.length;
          });
          break;
        case 'random':
          sortPictures = originalPictures.slice().sort(function () {
            return Math.random() - 0.5;
          });
          break;
        default:
          sortPictures = originalPictures;
          break;
      }
      renderGallary(sortPictures);
    });
  };

})();
