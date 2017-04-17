'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/code-and-magick/data';

  var setup = document.querySelector('.setup');
  var openSetup = document.querySelector('.setup-open-icon');
  var dialogHandle = setup.querySelector('.setup-user-pic');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupName = setup.querySelector('.setup-user-name');
  var submitSetup = setup.querySelector('.setup-submit');
  var closeSetup = setup.querySelector('.setup-close');

  var wizardCoat = setup.querySelector('.setup-wizard-appearance .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard-appearance .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var wizardState = {
    coat: 'rgb(101, 137, 164)',
    eyes: 'black',
    fireball: '#ee4830'
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizardsList = function (number) {
    window.load(URL, function (wizardsList) {
      var wizards = wizardsList;
      window.utils.shuffleArray(wizards);
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < number; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);
    });
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

  var setElementVisible = function (element, isVisible) {
    var className = 'hidden';
    element.classList.toggle(className, !isVisible);
  };

  var openSetupWindow = function () {
    setElementVisible(setup, true);
    window.draggable.saveStartCoords();
    window.shop.saveArtifactsState();

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
    setElementVisible(setup, false);
    window.draggable.setStartPositionWindow();

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


  var onSubmitSetupClick = function (evt) {
    evt.preventDefault();
    if (setupName.validity.valid) {
      saveWizardProperties();
      closeSetupWindow();
    }
  };

  var onOpenSetupClick = function () {
    openSetupWindow();
  };

  var onCloseSetupClick = function () {
    closeSetupWindow();
    setupForm.reset();
    resetWizardProperties();
    window.shop.resetArtifacts();
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
  window.draggable.setDraggable(setup, dialogHandle);
  window.shop.initShop();
})();
