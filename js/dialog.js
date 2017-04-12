'use strict';

window.dialog = (function () {
  var setup = document.querySelector('.setup');
  var dialogHandle = setup.querySelector('.setup-user-pic');

  var startCoords = {
    x: setup.offsetLeft,
    y: setup.offsetTop
  };

  var coordsState = {};

  var saveStartCoords = function (evt) {
    startCoords = {
      x: setup.offsetLeft,
      y: setup.offsetTop
    };
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: coordsState.x - moveEvt.clientX,
      y: coordsState.y - moveEvt.clientY
    };

    coordsState = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onWindowDrag = function (evt) {
    evt.preventDefault();

    coordsState = {
      x: evt.clientX,
      y: evt.clientY
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var setStartPositionWindow = function () {
    setup.style.top = startCoords.y + 'px';
    setup.style.left = startCoords.x + 'px';
  };

  var setWindowDrag = function () {
    dialogHandle.addEventListener('mousedown', onWindowDrag);
  };

  return {
    saveStartCoords: saveStartCoords,
    setStartPositionWindow: setStartPositionWindow,
    setWindowDrag: setWindowDrag
  };
})();
