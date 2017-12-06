'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var RESIZE_STEP = 25;
var INCREASE = 1;
var DECREASE = 0;

var MAX_SIZE_PICTURE = 100;
var MIN_SIZE_PICTURE = 25;
var NUM_OF_HASHTAGS = 5;
var LENGTH_OF_HASHTAGS = 20;

var getRandom = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomArrayItem = function (arr) {
  return arr[getRandom(0, arr.length - 1)];
};

var commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var createPhotos = function () {
  var photoArr = [];

  for (var i = 0; i <= 25; i++) {
    var photo = {};
    photo.url = 'photos/' + (i + 1) + '.jpg';
    photo.likes = getRandom(15, 200);

    var numberOfComments = getRandom(1, 2);
    var comment = '';
    var commentSum = '';
    for (var j = 0; j < numberOfComments; j++) {
      comment = getRandomArrayItem(commentsList) + ' ';
      commentSum += comment;
    }
    photo.comments = commentSum;
    photoArr[i] = photo;
  }
  return photoArr;
};

var pictures = createPhotos(); // Создание массива с фотографиями

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

var renderPhoto = function (photoArr, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoArr.length; i++) {
    var picturelSelector = template.content.cloneNode(true);
    fragment.appendChild(fillPhotoData(picturelSelector, photoSelectors, photoArr[i]));
  }
  return fragment;
};

var picturesList = document.querySelector('.pictures');
var picturesTemplate = document.querySelector('#picture-template');

picturesList.appendChild(renderPhoto(pictures, picturesTemplate)); // Добавление клонированных из шаблона фотографий в контейнер

var gallerySelectors = {
  image: '.gallery-overlay-image',
  likes: '.likes-count',
  comments: '.comments-count'
};

var userPictures = document.querySelectorAll('.picture');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryCloseBtn = document.querySelector('.gallery-overlay-close');

var copyDataFromTarget = function (element, target, elementSelectors, targetSelectors) {
  element.querySelector(elementSelectors.image).src = target.querySelector(targetSelectors.image).src;
  element.querySelector(elementSelectors.likes).textContent = target.querySelector(targetSelectors.likes).textContent;
  element.querySelector(elementSelectors.comments).textContent = target.querySelector(targetSelectors.comments).textContent;
};

var openGalleryOverlay = function (targetPicture) {
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
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGalleryOverlay();
  }
});

var onGalleryOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeGalleryOverlay();
  }
};

userPictures.forEach(function (picture) {
  picture.addEventListener('click', function (evt) {
    evt.preventDefault();
    openGalleryOverlay(picture);
  });
});

// modele4-task2

var uploadImageForm = document.querySelector('#upload-select-image');
var uploadOverlayForm = document.querySelector('.upload-overlay');
var uploadOverlayCloseBtn = document.querySelector('.upload-form-cancel');
var uploadFormDescr = document.querySelector('.upload-form-description');
var resizeValueField = document.querySelector('.upload-resize-controls-value');
var resizeDecBnt = document.querySelector('.upload-resize-controls-button-dec');
var resizeIncBnt = document.querySelector('.upload-resize-controls-button-inc');
var effectImagePreview = document.querySelector('.effect-image-preview');
var uploadEffectsControls = document.querySelector('.upload-effect-controls');
var imagePreview = document.querySelector('.effect-image-preview');
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
  }
  if (!(isMaxSize(currentResizeValue, step) || isMinSize(currentResizeValue, step))) {
    currentResizeValue += step;
    resizeValueField.value = currentResizeValue + '%';
    effectImagePreview.style = 'transform: scale(' + currentResizeValue / 100 + ')';
  }
};

resizeDecBnt.addEventListener('click', function () {
  resizeImage(DECREASE);
});

resizeIncBnt.addEventListener('click', function () {
  resizeImage(INCREASE);
});

var onEffectControlsClick = function (evt) {
  var target = evt.target;
  if (target.type === 'radio') {
    imagePreview.classList = '';
    imagePreview.classList.add('effect-' + target.value);
  }
};

uploadEffectsControls.addEventListener('click', onEffectControlsClick);

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
