'use strict';

window.draggable = (function () {
  var element;
  var handle;

  var startCoords = null;

  var coordsState = {};

  var saveStartCoords = function (evt) {
    startCoords = {
      x: element.offsetLeft,
      y: element.offsetTop
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

    element.style.top = (element.offsetTop - shift.y) + 'px';
    element.style.left = (element.offsetLeft - shift.x) + 'px';
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
    element.style.top = startCoords.y + 'px';
    element.style.left = startCoords.x + 'px';
  };

  var setDraggable = function (_element, _handle) {
    element = _element;
    handle = _handle;
    startCoords = {
      x: element.offsetLeft,
      y: element.offsetTop
    };
    handle.addEventListener('mousedown', onWindowDrag);
  };

  return {
    saveStartCoords: saveStartCoords,
    setStartPositionWindow: setStartPositionWindow,
    setDraggable: setDraggable
  };
})();
