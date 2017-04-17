'use strict';

window.load = (function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  var createErrorElement = function () {
    var error = document.createElement('div');
    var message = document.createElement('div');
    var btnWrapper = document.createElement('div');
    var btn = document.createElement('a');

    btn.textContent = 'Печаль';
    btn.classList.add('error-btn');

    btnWrapper.classList.add('error-btn-wrapper');
    btnWrapper.appendChild(btn);
    message.textContent = 'Загрузка произошла с ошибкой ' + xhr.status + ' ' + xhr.statusText;

    error.classList.add('error-window');
    error.appendChild(message);
    error.appendChild(btnWrapper);
    document.body.appendChild(error);

    var setElementHidden = function (evt) {
      evt.preventDefault();
      error.classList.add('hidden');

      btn.removeEventListener('click', setElementHidden);
    };

    btn.addEventListener('click', setElementHidden);
  };

  var load = function (url, onLoad) {
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        createErrorElement(xhr.status);
      }
    });
    xhr.send();
  };

  return load;
})();
