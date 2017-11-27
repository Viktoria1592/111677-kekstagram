'use strict';

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

var fillPhotoData = function (element, photoSelectors, photoArr) {
  element.querySelector(photoSelectors.image).src = photoArr.url;
  element.querySelector(photoSelectors.likes).textContent = photoArr.likes;
  element.querySelector(photoSelectors.comments).textContent = photoArr.comments;

  return element;
};

var renderPhoto = function (photosArr, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosArr.length; i++) {
    var picturelSelector = template.content.cloneNode(true);
    fragment.appendChild(fillPhotoData(picturelSelector, photoSelectors, photosArr[i]));
  }
  return fragment;
};

var picturesList = document.querySelector('.pictures');
var picturesTemplate = document.querySelector('#picture-template');

picturesList.appendChild(renderPhoto(pictures, picturesTemplate)); // Добавление клонированных из шаблона фотографий в контейнер

var galleryOverlay = document.querySelector('.gallery-overlay');

var gallerySelectors = {
  image: '.gallery-overlay-image',
  likes: '.likes-count',
  comments: '.comments-count'
};

fillPhotoData(galleryOverlay, gallerySelectors, pictures[0]); // Добавление данных в форму галереи

galleryOverlay.classList.remove('hidden');
