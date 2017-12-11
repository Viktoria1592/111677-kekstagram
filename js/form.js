'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var INCREASE = 1;
  var DECREASE = 0;
  var MAX_SIZE_PICTURE = 100;
  var MIN_SIZE_PICTURE = 25;
  var NUM_OF_HASHTAGS = 5;
  var LENGTH_OF_HASHTAGS = 20;
  var RESIZE_STEP = 25;

  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadOverlayForm = document.querySelector('.upload-overlay');
  var uploadOverlayCloseBtn = document.querySelector('.upload-form-cancel');
  var uploadFormDescr = document.querySelector('.upload-form-description');
  var resizeValueField = document.querySelector('.upload-resize-controls-value');
  var resizeDecBnt = document.querySelector('.upload-resize-controls-button-dec');
  var resizeIncBnt = document.querySelector('.upload-resize-controls-button-inc');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadHashTagsForm = document.querySelector('.upload-form-hashtags');
  var isFormDescrBusy = false;

  var closeOverlayForm = function () {
    uploadOverlayForm.classList.add('hidden');
  };

  uploadImageForm.addEventListener('change', function () {
    uploadOverlayForm.classList.remove('hidden');

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

  var isMaxSize = function (value, step) {
    return value === MAX_SIZE_PICTURE && step > 0;
  };

  var isMinSize = function (value, step) {
    return value === MIN_SIZE_PICTURE && step < 0;
  };

  var resizeImage = function (type) {
    var currentResizeValue = parseInt(resizeValueField.value.replace('%', ''), 10);
    var step;
    switch (type) {
      case DECREASE:
        step = -RESIZE_STEP;
        break;
      case INCREASE:
        step = RESIZE_STEP;
		break;
    }
    if (!(isMaxSize(currentResizeValue, step) || isMinSize(currentResizeValue, step))) {
      currentResizeValue += step;
      resizeValueField.value = currentResizeValue + '%';
      effectImagePreview.style = 'transform: scale(' + currentResizeValue / 100 + ')';
	  window.resetEffectValue();
    }
  };

  resizeDecBnt.addEventListener('click', function () {
    resizeImage(DECREASE);
  });

  resizeIncBnt.addEventListener('click', function () {
    resizeImage(INCREASE);
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

  var onUploadPhotoFormClick = function () {
    if (checkHashTags() === true) {
      overlayFormToDefaults();
    } else {
      event.preventDefault();
    }
  };

  uploadHashTagsForm.addEventListener('input', checkHashTags);
  uploadImageForm.addEventListener('submit', onUploadPhotoFormClick);

})();

