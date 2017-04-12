'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var openSetup = document.querySelector('.setup-open-icon');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupName = setup.querySelector('.setup-user-name');
  var submitSetup = setup.querySelector('.setup-submit');
  var closeSetup = setup.querySelector('.setup-close');

  var wizardCoat = setup.querySelector('.setup-wizard-appearance .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard-appearance .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  var wizardState = {
    coat: 'rgb(101, 137, 164)',
    eyes: 'black',
    fireball: '#ee4830'
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizardsList = function (number) {
    var fragment = document.createDocumentFragment();
    var wizards = window.data.createWizards(number);
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var saveWizardProperties = function () {
    wizardState = {
      coat: wizardCoat.style.fill,
      eyes: wizardEyes.style.fill,
      fireball: wizardFireball.style.background
    };
  };

  var resetWizardProperties = function () {
    wizardCoat.style.fill = wizardState.coat;
    wizardEyes.style.fill = wizardState.eyes;
    wizardFireball.style.background = wizardState.fireball;
  };

  var saveArtifacts = function () {
    var artifactsElementList = artifactsElement.querySelectorAll('.setup-artifacts-cell');
    for (var i = 0; i < artifactsElementList.length; i++) {
      artifactsElementList[i].dataset.empty = artifactsElementList[i].children.length > 0;
    }
  };

  var resetArtifacts = function () {
    var artifactsElementList = artifactsElement.querySelectorAll('.setup-artifacts-cell');
    for (var i = 0; i < artifactsElementList.length; i++) {
      if (artifactsElementList[i].children.length > 0 && artifactsElementList[i].dataset.empty) {
        artifactsElementList[i].removeChild(artifactsElementList[i].children[0]);
      } else if (artifactsElementList[i].children.length === 0 && artifactsElementList[i].dataset.empty === false) {
        artifactsElementList[i].appendChild(draggedItem.cloneNode(true));
      }
    }
  };

  var setElementVisible = function (element, isVisible) {
    var className = 'hidden';
    element.classList.toggle(className, !isVisible);
  };

  var openSetupWindow = function () {
    setElementVisible(setup, true);
    window.dialog.saveStartCoords();
    saveArtifacts();

    submitSetup.addEventListener('keydown', onSubmitSetupEnterKeydown);
    closeSetup.addEventListener('keydown', onCloseSetupEnterKeydown);
    document.addEventListener('keydown', onSetupEscKeydown);
    submitSetup.addEventListener('click', onSubmitSetupClick);
    closeSetup.addEventListener('click', onCloseSetupClick);

    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireball.addEventListener('click', onWizardFireballClick);
  };

  var closeSetupWindow = function () {
    window.dialog.setStartPositionWindow();
    setElementVisible(setup, false);

    submitSetup.removeEventListener('keydown', onSubmitSetupEnterKeydown);
    closeSetup.removeEventListener('keydown', onCloseSetupEnterKeydown);
    document.removeEventListener('keydown', onSetupEscKeydown);
    submitSetup.removeEventListener('click', onSubmitSetupClick);
    closeSetup.removeEventListener('click', onCloseSetupClick);


    wizardCoat.removeEventListener('click', onWizardCoatClick);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardFireball.removeEventListener('click', onWizardFireballClick);
  };

  var onSetupEscKeydown = function (evt) {
    if (window.checkKey.isEsc(evt)) {
      onCloseSetupClick();
    }
  };

  var onCloseSetupEnterKeydown = function (evt) {
    if (window.checkKey.isEnter(evt)) {
      onCloseSetupClick();
    }
  };

  var onSubmitSetupEnterKeydown = function (evt) {
    if (window.checkKey.isEnter(evt)) {
      onSubmitSetupClick();
    }
  };

  var onOpenSetupKeydown = function (evt) {
    if (window.checkKey.isEnter(evt)) {
      onOpenSetupClick();
    }
  };


  var onSubmitSetupClick = function () {
    if (setupName.validity.valid) {
      saveWizardProperties();
      saveArtifacts();
      closeSetupWindow();
    }
  };

  var onOpenSetupClick = function () {
    openSetupWindow();
  };

  var onCloseSetupClick = function () {
    setupForm.reset();
    resetWizardProperties();
    resetArtifacts();
    closeSetupWindow();
  };

  var onWizardCoatClick = function () {
    window.colorizeElement(wizardCoat, window.data.coatColorList, fillElement);
  };

  var onWizardEyesClick = function () {
    window.colorizeElement(wizardEyes, window.data.eyesColorList, fillElement);
  };

  var onWizardFireballClick = function () {
    window.colorizeElement(wizardFireball, window.data.fireballColorList, changeElementBackground);
  };

  renderWizardsList(4);
  openSetup.addEventListener('click', onOpenSetupClick);
  openSetup.addEventListener('keydown', onOpenSetupKeydown);
  setElementVisible(setup.querySelector('.setup-similar'), true);
  window.dialog.setWindowDrag();

  var draggingFromStore = false;

  var isEmptyArtifactElement = function (target) {
    return !(target.childNodes.length > 0);
  };

  var isThisTag = function (element, tag) {
    return element.tagName.toLowerCase() === tag;
  };

  var onShowElementDragstart = function (evt) {
    if (isThisTag(evt.target, 'img')) {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style.outline = '2px dashed red';
      draggingFromStore = evt.target.parentNode.parentNode === shopElement;
    }
  };

  var onArtifactsElementDrop = function (evt) {
    if (isEmptyArtifactElement(evt.target) && isThisTag(evt.target, 'div')) {
      evt.target.style.backgroundColor = '';
      if (draggingFromStore) {
        evt.target.appendChild(draggedItem.cloneNode(true));
      } else {
        evt.target.appendChild(draggedItem);
      }
    }
    artifactsElement.style.outline = 'none';
  };

  var onArtifactsElementDragenter = function (evt) {
    if (isEmptyArtifactElement(evt.target) && isThisTag(evt.target, 'div')) {
      evt.target.style.backgroundColor = 'yellow';
      evt.preventDefault();
    }
  };

  var onArtifactsElementDragleave = function (evt) {
    if (isEmptyArtifactElement(evt.target) && isThisTag(evt.target, 'div')) {
      evt.target.style.backgroundColor = '';
      evt.preventDefault();
    }
  };

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
    artifactsElement.style.outline = 'none';
  });
})();
