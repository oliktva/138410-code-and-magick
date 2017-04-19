'use strict';

window.load = (function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  return function (url, onLoad) {
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        window.showErrorWindow(xhr.status, xhr.statusText);
      }
    });
    xhr.send();
  };
})();
