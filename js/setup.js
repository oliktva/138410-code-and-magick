'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var setup = document.querySelector('.setup');
  var openSetup = document.querySelector('.setup-open-icon');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupName = setup.querySelector('.setup-user-name');
  var submitSetup = setup.querySelector('.setup-submit');
  var closeSetup = setup.querySelector('.setup-close');

  var wizardCoat = setup.querySelector('.setup-wizard-appearance .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard-appearance .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var wizardState = {
    coat: 'rgb(101, 137, 164)',
    eyes: 'black',
    fireball: '#ee4830'
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
    if (evt.keyCode === ESC_KEY_CODE) {
      onCloseSetupClick();
    }
  };

  var onCloseSetupEnterKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onCloseSetupClick();
    }
  };

  var onSubmitSetupEnterKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onSubmitSetupClick();
    }
  };

  var onOpenSetupKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onOpenSetupClick();
    }
  };


  var onSubmitSetupClick = function () {
    if (setupName.validity.valid) {
      saveWizardProperties();
      closeSetupWindow();
    }
  };

  var onOpenSetupClick = function () {
    openSetupWindow();
  };

  var onCloseSetupClick = function () {
    setupForm.reset();
    resetWizardProperties();
    closeSetupWindow();
  };

  var onWizardCoatClick = function () {
    wizardCoat.style.fill = window.data.getRandomCoatColor();
  };

  var onWizardEyesClick = function () {
    wizardEyes.style.fill = window.data.getRandomEyesColor();
  };

  var onWizardFireballClick = function () {
    wizardFireball.style.background = window.data.getRandomFireballColor();
  };

  window.render.renderWizardsList(4);
  openSetup.addEventListener('click', onOpenSetupClick);
  openSetup.addEventListener('keydown', onOpenSetupKeydown);
  setElementVisible(setup.querySelector('.setup-similar'), true);
})();
