'use strict';

(function () {

  var SERVER_URL = 'https://1510.dump.academy/kekstagram';

  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(getErrorMsg(xhr.status));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    var getErrorMsg = function (status) {
      switch (status) {
        case 400:
          status = 'Неверный запрос';
          break;
        case 401:
          status = 'Пользователь не авторизован';
          break;
        case 404:
          status = 'Ничего не найдено';
          break;

        default:
          status = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
      return status;
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


