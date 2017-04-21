'use strict';

window.showErrorWindow = (function () {
  /**
   * @return {Element}
   */
  var renderWindow = function () {
    var errorTemplate = document.querySelector('#error-template').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    return error;
  };

  var onCloseErrorClick = function () {
    document.querySelector('.error__btn').removeEventListener('click', onCloseErrorClick);
    document.body.removeChild(document.querySelector('.error'));
  };

  /**
   * @param  {number} status
   * @param {string} text
   */
  return function (status, text) {
    var errorWindow = renderWindow();

    var btn = errorWindow.querySelector('.error__btn');
    btn.textContent = 'Печалька';
    var message = errorWindow.querySelector('.error__message').textContent;
    errorWindow.querySelector('.error__message').textContent = message
                                                                 .replace('status', status)
                                                                 .replace('text', text);

    document.body.appendChild(errorWindow);

    btn.querySelector('.error__btn').addEventListener('click', onCloseErrorClick);
  };
})();
