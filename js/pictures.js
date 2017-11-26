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

var pictures = [];

for (var i = 0; i < 25; i++) {
  pictures[i] = {
    url: 'photos/' + (1 + i) + '.jpg',
    likes: getRandom(15, 200),
    comments: getRandomArrayItem(commentsList)
  }
}

var picturesList = document.querySelector('.pictures');
var picturesTemplate = document.querySelector('#picture-template').content;

var createPictureNode = function (arr, template, img, likes, comment) {
  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector(img).src = arr.url;
  pictureElement.querySelector(likes).textContent = arr.likes;
  pictureElement.querySelector(comment).textContent = arr.comments;

  return pictureElement;
};

var fillPictureData = function (arr, element, img, likes, comment) {
  element.querySelector(img).src = arr.url;
  element.querySelector(likes).textContent = arr.likes;
  element.querySelector(comment).textContent = arr.comments;
  return element;
};

var createPictures = function (arr, template, element, img, likes, comment) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(createPictureNode(pictures[j], template, img, likes, comment));
  }
  return element.appendChild(fragment);
};

createPictures(pictures, picturesTemplate, picturesList, 'img' , '.picture-likes','.picture-comments');

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

fillPictureData(pictures[0], galleryOverlay, '.gallery-overlay-image' , '.likes-count', '.comments-count');
