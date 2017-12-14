'use strict';

(function () {

  var picturesList = document.querySelector('.pictures');
  var picturesTemplate = document.querySelector('#picture-template');
  
  var successHandler = function (pictures) {
	  
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

  
})();
