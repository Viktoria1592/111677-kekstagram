'use strict';

(function () {

  var commentsList = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var getRandom = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomArrayItem = function (arr) {
    return arr[getRandom(0, arr.length - 1)];
  };

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

  window.pictures = createPhotos();

})();
