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
	photo.comments = []
	var numberOfComments = getRandom(1, 2);
	for (var j = 0; j < numberOfComments; j++) {
		photo.comments[j] = getRandomArrayItem(commentsList);
	}
	photoArr[i] = photo;
  }
  return photoArr;
}

var pictures = createPhotos();


var photoSelectors = {
  image: '.picture img',
  likes: '.picture-likes',
  comments: '.picture-comments'
};

var fillPhotoData = function (selector, photoSelectors, photoArr) {
  selector.querySelector(photoSelectors.image).src = photoArr.url;
  selector.querySelector(photoSelectors.likes).textContent = photoArr.likes;
  selector.querySelector(photoSelectors.comments).textContent = photoArr.comments;

  return selector;
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

picturesList.appendChild(renderPhoto(pictures, picturesTemplate));

var galleryOverlay = document.querySelector('.gallery-overlay');

var gallerySelectors = {
  image: '.gallery-overlay-image',
  likes: '.likes-count',
  comments: '.comments-count'
};

fillPhotoData(galleryOverlay, gallerySelectors, pictures[0]);

galleryOverlay.classList.remove('hidden');
