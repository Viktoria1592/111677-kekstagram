'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
