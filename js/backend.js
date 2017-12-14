'use strict';
(function (){
	
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';

  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
	
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(errorList(xhr.status));
      }
    });
	
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
	
	var errorList = function (status) {
	  switch (status) {
	    case 400:
	      return status = 'Неверный запрос';
	    case 401:
	      return status = 'Пользователь не авторизован';
	    case 404:
	      return status = 'Ничего не найдено';
	      	
	    default:
	      return status = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
		}	
	};

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = initXHR(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = initXHR(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
  
})();


