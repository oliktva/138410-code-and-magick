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

  /**
   * @param  {number} status
   * @param {string} text
   */
  return function (status, text) {
    var errorWindow = renderWindow();

    errorWindow.querySelector('.error__btn').textContent = 'Печалька';
    var message = errorWindow.querySelector('.error__message').textContent;
    errorWindow.querySelector('.error__message').textContent = message.replace('status', status).replace('text', text);

    document.body.appendChild(errorWindow);

    errorWindow.querySelector('.error__btn').addEventListener('click', function () {
      document.body.removeChild(errorWindow);
    });
  };
})();
