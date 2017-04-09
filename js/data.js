'use strict';

window.data = (function () {
  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var createWizard = function (number) {
    return {
      name: firstNames[number] + ' ' + lastNames[number],
      coatColor: coatColors[number],
      eyesColor: eyesColors[number]
    };
  };

  var createWizards = function (number) {
    window.utils.shuffleArray(firstNames);
    window.utils.shuffleArray(lastNames);
    window.utils.shuffleArray(coatColors);
    window.utils.shuffleArray(eyesColors);

    var wizards = [];
    for (var i = 0; i < number; i++) {
      wizards[i] = createWizard(i);
    }
    return wizards;
  };

  var getRandomCoatColor = function () {
    return coatColors[window.utils.getRandom(0, coatColors.length)];
  };

  var getRandomEyesColor = function () {
    return eyesColors[window.utils.getRandom(0, eyesColors.length)];
  };

  var getRandomFireballColor = function () {
    return fireballColors[window.utils.getRandom(0, fireballColors.length)];
  };

  return {
    createWizards: createWizards,
    getRandomCoatColor: getRandomCoatColor,
    getRandomEyesColor: getRandomEyesColor,
    getRandomFireballColor: getRandomFireballColor
  };
})();
