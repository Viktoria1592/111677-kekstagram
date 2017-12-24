'use strict';

(function () {
  var NUM_OF_HASHTAGS = 5;
  var LENGTH_OF_HASHTAGS = 20;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadInput = uploadImageForm.querySelector('.upload-input');
  var iconImage = uploadImageForm.querySelector('.upload-file');
  var uploadOverlayForm = uploadImageForm.querySelector('.upload-overlay');
  var uploadOverlayCloseBtn = uploadImageForm.querySelector('.upload-form-cancel');
  var uploadFormDescr = uploadImageForm.querySelector('.upload-form-description');
  var effectImagePreview = uploadImageForm.querySelector('.effect-image-preview');
  var uploadHashTagsForm = uploadImageForm.querySelector('.upload-form-hashtags');
  var imagePreview = uploadImageForm.querySelector('.effect-image-preview');
  var uploadEffectLevel = uploadImageForm.querySelector('.upload-effect-level');

  var formData = new FormData(uploadImageForm);
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
    if (evt.target === iconImage) {
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
      formData.append('filename', droppedFiles, droppedFiles.name);
      uploadImage(droppedFiles);
    }
  });

  uploadInput.addEventListener('change', function () {
    var imageFile = uploadInput.files[0];
    formData.append('filename', imageFile, imageFile.name);
    uploadImage(imageFile);
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
        formData.append('filename', imageFile, imageFile.name);
        effectImagePreview.src = reader.result;
      });

      reader.readAsDataURL(imageFile);
    }

    uploadOverlayCloseBtn.addEventListener('click', function () {
      overlayFormToDefaults();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.escKeycode && !isFormDescrBusy) {
        overlayFormToDefaults();
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
    var uploadHashTags = uploadHashTagsForm.value.toLowerCase().trim().split(' ');
    var isValid = true;
    var errorMessage = '';

    if (uploadHashTags.length > NUM_OF_HASHTAGS) {
      errorMessage = 'Можно использовать только ' + NUM_OF_HASHTAGS + ' хэш-тегов.';
      isValid = false;
    }

    uploadHashTags.forEach(function (value, index) {
      for (var i = index + 1; i < uploadHashTags.length; i++) {
        if (uploadHashTags[index] === uploadHashTags[i]) {
          errorMessage = 'Нельзя использовать один и тот же хэш-тег несколько раз.';
          isValid = false;
        }
      }
      if (value.slice(-1) === ',' || value.slice(-1) === ';') {
        errorMessage = 'Разделять хэш-теги нужно одним пробелом.';
        isValid = false;
      }
      if (value.charAt(0) !== '#') {
        errorMessage = 'Хэш-тег должен начинаться с #';
        isValid = false;
      }
      if ((value.charAt(0) === '#') && (value.length === 1)) {
        errorMessage = 'После # напишите название хэш-тега';
        isValid = false;
      }
      if (value.length > LENGTH_OF_HASHTAGS) {
        errorMessage = 'Максимальная длинна хэш-тега должна быть ' + LENGTH_OF_HASHTAGS + ' символов.';
        isValid = false;
      }
    });

    var isEmptyHashTags = window.util.checkEmptyElements(uploadHashTags);

    if (isEmptyHashTags) {
      errorMessage = 'Хэш-тег не должен быть пустым.';
      isValid = false;
    }

    if (uploadHashTagsForm.value === '') {
      errorMessage = '';
      isValid = true;
    }

    uploadHashTagsForm.setCustomValidity(errorMessage);
    return isValid;
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
    imagePreview.removeAttribute('style');
    imagePreview.classList = 'effect-image-preview';
    uploadEffectLevel.classList.add('hidden');
    uploadImageForm.reset();
    uploadHashTagsForm.style.borderColor = 'rgb(169, 169, 169)';
    uploadHashTagsForm.value = '';
    uploadFormDescr.value = '';
  };

  var onUploadPhotoFormClick = function (evt) {
    evt.preventDefault();
    if (checkHashTags()) {
      window.backend.save(new FormData(uploadImageForm), overlayFormToDefaults, window.onError);
    }
  };

  uploadHashTagsForm.addEventListener('input', checkHashTags);
  uploadImageForm.addEventListener('submit', onUploadPhotoFormClick);

})();
