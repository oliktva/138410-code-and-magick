'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

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

var setElementVisible = function (element, isVisible) {
  var className = 'hidden';
  if (isVisible) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};

setElementVisible(userDialog, true);
renderWizardsList(4);
setElementVisible(userDialog.querySelector('.setup-similar'), true);
