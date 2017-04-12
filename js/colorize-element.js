'use strict';

window.colorizeElement = (function () {
  /**
   * @param  {Element}   element
   * @param  {Array}   data
   * @param  {Function} callback
   */
  var colorizeElement = function (element, data, callback) {
    var color = data[window.utils.getRandom(0, data.length)];
    callback(element, color);
  };

  return colorizeElement;
})();
