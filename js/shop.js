'use strict';

window.shop = (function () {
  var CELL_CLASS = 'setup-artifacts-cell';
  var BG_CLASS = 'yellow';
  var OUTLINE_CLASS = 'red-outline';

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifactsElementList = artifactsElement.querySelectorAll('.setup-artifacts-cell');
  var draggedItem = null;
  var draggingFromStore = false;

  var saveArtifactsState = function () {
    for (var i = 0; i < artifactsElementList.length; i++) {
      artifactsElementList[i].dataset.empty = artifactsElementList[i].children.length === 0;
    }
  };

  var resetArtifacts = function () {
    for (var i = 0; i < artifactsElementList.length; i++) {
      if (artifactsElementList[i].children.length > 0 && artifactsElementList[i].dataset.empty) {
        artifactsElementList[i].removeChild(artifactsElementList[i].children[0]);
      } else if (artifactsElementList[i].children.length === 0 && artifactsElementList[i].dataset.empty === false) {
        artifactsElementList[i].appendChild(draggedItem.cloneNode(true));
      }
    }
  };

  var onShowElementDragstart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.classList.add(OUTLINE_CLASS);
      draggingFromStore = evt.target.parentNode.parentNode === shopElement;
    }
  };

  var onArtifactsElementDrop = function (evt) {
    if (evt.target.childNodes.length === 0 && evt.target.classList.contains(CELL_CLASS)) {
      evt.target.classList.remove(BG_CLASS);
      if (draggingFromStore) {
        evt.target.appendChild(draggedItem.cloneNode(true));
      } else {
        evt.target.appendChild(draggedItem);
      }
    }
    artifactsElement.classList.remove(OUTLINE_CLASS);
  };

  var onArtifactsElementDragenter = function (evt) {
    if (evt.target.childNodes.length === 0 && evt.target.classList.contains(CELL_CLASS)) {
      evt.target.classList.add(BG_CLASS);
      evt.preventDefault();
    }
  };

  var onArtifactsElementDragleave = function (evt) {
    if (evt.target.childNodes.length === 0 && evt.target.classList.contains(CELL_CLASS)) {
      evt.preventDefault();
      evt.target.classList.remove(BG_CLASS);
    }
  };

  var initShop = function () {
    shopElement.addEventListener('dragstart', onShowElementDragstart);
    artifactsElement.addEventListener('dragstart', onShowElementDragstart);
    artifactsElement.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });
    artifactsElement.addEventListener('drop', onArtifactsElementDrop);
    artifactsElement.addEventListener('dragenter', onArtifactsElementDragenter);
    artifactsElement.addEventListener('dragleave', onArtifactsElementDragleave);
    shopElement.addEventListener('dragend', function () {
      artifactsElement.classList.remove(OUTLINE_CLASS);
    });
  };

  return {
    saveArtifactsState: saveArtifactsState,
    resetArtifacts: resetArtifacts,
    initShop: initShop
  };
})();
