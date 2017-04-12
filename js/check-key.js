'use strict';

window.checkKey = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var isEnter = function (evt) {
    return evt.keyCode === ENTER_KEY_CODE;
  };

  var isEsc = function (evt) {
    return evt.keyCode === ESC_KEY_CODE;
  };

  return {
    isEnter: isEnter,
    isEsc: isEsc
  };
})();
