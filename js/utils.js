'use strict';

window.utils = (function () {
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var exchangeArrayElements = function (array, i, j) {
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  };

  // Fisher–Yates shuffle (The modern algorithm)
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = getRandom(0, i + 1);
      exchangeArrayElements(array, i, j);
    }
  };

  return {
    getRandom: getRandom,
    exchangeArrayElements: exchangeArrayElements,
    shuffleArray: shuffleArray
  };
})();
