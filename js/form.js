'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var NUM_OF_HASHTAGS = 5;
  var LENGTH_OF_HASHTAGS = 20;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadInput = document.querySelector('.upload-input');
  var iconImage = document.querySelector('.upload-file');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadOverlayForm = document.querySelector('.upload-overlay');
  var uploadOverlayCloseBtn = document.querySelector('.upload-form-cancel');
  var uploadFormDescr = document.querySelector('.upload-form-description');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadHashTagsForm = document.querySelector('.upload-form-hashtags');
  var effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelVal = document.querySelector('.upload-effect-level-val');
  var resizeValueField = document.querySelector('.upload-resize-controls-value');
  var imagePreview = document.querySelector('.effect-image-preview');
  var isFormDescrBusy = false;
  var reader; // Загрузка FileReader

  document.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  document.addEventListener('dragenter', function (evt) {
    if (evt.target === iconImage) {
      evt.target.style.background = 'url(img/icon-photo-upload.png) no-repeat center';
      uploadImageForm.style.opacity = '0.9';
    }
  });

  document.addEventListener('dragleave', function (evt) {
    if (event.target === iconImage) {
      evt.target.removeAttribute('style');
      uploadImageForm.removeAttribute('style');
    }
  });

  document.addEventListener('drop', function (evt) {
    evt.preventDefault();
    if (evt.target === iconImage) {
      evt.target.removeAttribute('style');
      uploadImageForm.removeAttribute('style');
      var droppedFiles = evt.dataTransfer.files[0];
      uploadImage(droppedFiles);
      overlayFormToDefaults();
    }
  });

  uploadInput.addEventListener('change', function () {
    var imageFile = uploadInput.files[0];
    uploadImage(imageFile);
    overlayFormToDefaults();
  });

  var uploadImage = function (imageFile) {
    uploadOverlayForm.classList.remove('hidden');

    var fileName = imageFile.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadOverlayForm.classList.remove('hidden');
        effectImagePreview.src = reader.result;
      });

      reader.readAsDataURL(imageFile);
    }

    uploadOverlayCloseBtn.addEventListener('click', function () {
      uploadOverlayForm.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE && !isFormDescrBusy) {
        uploadOverlayForm.classList.add('hidden');
      }
    });
    uploadFormDescr.addEventListener('focus', function () {
      isFormDescrBusy = true;
    });
    uploadFormDescr.addEventListener('blur', function () {
      isFormDescrBusy = false;
    });
  };

  var checkHashTagsValidity = function () {
    var uploadHashTags = uploadHashTagsForm.value.toLowerCase().split(', ');

    if (uploadHashTags.length > NUM_OF_HASHTAGS) {
      return false;
    }

    for (var i = 0; i < uploadHashTags.length; i++) {
      if ((uploadHashTags[i][0] !== '#' && uploadHashTags[i].length > 0) || uploadHashTags[i].length > LENGTH_OF_HASHTAGS) {
        return false;
      }
      for (var j = i + 1; j < uploadHashTags.length; j++) {
        if (uploadHashTags[i] === uploadHashTags[j]) {
          return false;
        }
      }
    }
    return true;
  };

  var checkHashTags = function () {
    if (checkHashTagsValidity()) {
      uploadHashTagsForm.style.borderColor = 'rgb(169, 169, 169)';
      return true;
    } else {
      uploadHashTagsForm.style.borderColor = 'red';
      return false;
    }
  };

  var overlayFormToDefaults = function () {
    uploadOverlayForm.classList.add('hidden');
    effectImagePreview.style.transform = 'scale(1.0)';
    effectLevelPin.style.left = '100%';
    effectLevelVal.style.width = '100%';
    resizeValueField.value = '100%';
    imagePreview.removeAttribute('style');
    imagePreview.classList = 'effect-image-preview';
  };

  var onUploadPhotoFormClick = function (evt) {
    if (checkHashTags() === true) {
      window.backend.save(new FormData(uploadImageForm), overlayFormToDefaults, window.onError);
    } else {
      evt.preventDefault();
    }
  };

  uploadHashTagsForm.addEventListener('input', checkHashTags);
  uploadImageForm.addEventListener('submit', onUploadPhotoFormClick);

})();
