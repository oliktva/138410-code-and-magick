'use strict';

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

var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardState = {
  coat: 'rgb(101, 137, 164)',
  eyes: 'black',
  fireball: '#ee4830'
};

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

var createWizard = function (number) {
  return {
    name: firstNames[number] + ' ' + lastNames[number],
    coatColor: coatColors[number],
    eyesColor: eyesColors[number]
  };
};

var createWizards = function (number) {
  shuffleArray(firstNames);
  shuffleArray(lastNames);
  shuffleArray(coatColors);
  shuffleArray(eyesColors);

  var wizards = [];
  for (var i = 0; i < number; i++) {
    wizards[i] = createWizard(i);
  }
  return wizards;
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
  var wizards = createWizards(number);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
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
  wizardCoat.style.fill = coatColors[getRandom(0, coatColors.length)];
};

var onWizardEyesClick = function () {
  wizardEyes.style.fill = eyesColors[getRandom(0, eyesColors.length)];
};

var onWizardFireballClick = function () {
  wizardFireball.style.background = fireballColors[getRandom(0, fireballColors.length)];
};

renderWizardsList(4);
setElementVisible(setup.querySelector('.setup-similar'), true);

openSetup.addEventListener('click', onOpenSetupClick);
openSetup.addEventListener('keydown', onOpenSetupKeydown);
