'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var NUM_OF_HASHTAGS = 5;
  var LENGTH_OF_HASHTAGS = 20;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  var uploadInput = document.querySelector ('.upload-input');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadOverlayForm = document.querySelector('.upload-overlay');
  var uploadOverlayCloseBtn = document.querySelector('.upload-form-cancel');
  var uploadFormDescr = document.querySelector('.upload-form-description');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadHashTagsForm = document.querySelector('.upload-form-hashtags');
  var isFormDescrBusy = false;

  var closeOverlayForm = function () {
    uploadOverlayForm.classList.add('hidden');
  };

  uploadInput.addEventListener('change', function () {
    uploadOverlayForm.classList.remove('hidden');
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadOverlayForm.classList.remove('hidden');
        effectImagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

    uploadOverlayCloseBtn.addEventListener('click', function () {
      closeOverlayForm();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE && !isFormDescrBusy) {
        closeOverlayForm();
      }
    });
    uploadFormDescr.addEventListener('focus', function () {
      isFormDescrBusy = true;
    });
    uploadFormDescr.addEventListener('blur', function () {
      isFormDescrBusy = false;
    });
  });

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
