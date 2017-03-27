'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var getMax = function(arrayOfNumbers) {
  var max = arrayOfNumbers[0];
  for (var i = 1; i < arrayOfNumbers.length; i++) {
    max = Math.max(arrayOfNumbers[i], max);
  }
  return max;
};

var createCloud = function(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width / 2, y + 10);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width - 10, y + height / 2);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width / 2, y + height - 10);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + 10, y + height / 2);
  ctx.lineTo(x, y);
  ctx.fill();
  ctx.stroke();
};

window.renderStatistics = function(ctx, names, times) {
  createCloud(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  createCloud(ctx, 100, 10, 420, 270, 'rgb(255, 255, 255)');

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 64);

  for (var i = 0; i < names.length; i++) {
    var time = Math.round(times[i]);
    var maxTime = Math.round(getMax(times));
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = '16px PT Mono';
    var xCoordinate = 130 + 90 * i;
    ctx.fillText(names[i], xCoordinate, 265);
    ctx.fillText(time, xCoordinate, 87 + 150 * (1 - time / maxTime));

    var color = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(2, 14, 134, ' + (Math.random() + 0.1) + ')';
    ctx.fillStyle = color;
    ctx.fillRect(xCoordinate, 95 + 150 * (1 - time / maxTime), 40, 150 * time / maxTime);
  }
};
