'use strict';

var getMax = function (arrayOfNumbers) {
  var max = arrayOfNumbers[0];
  for (var i = 1; i < arrayOfNumbers.length; i++) {
    max = Math.max(arrayOfNumbers[i], max);
  }
  return max;
};

var renderCloud = function (ctx, x, y, color) {
  var width = 420;
  var height = 270;
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

var renderText = function (ctx, x, y, text) {
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

var renderRating = function (ctx, name, time, maxTime, index) {
  var ratio = (time / maxTime).toFixed(2);
  var xCoordinate = 130 + 90 * index;
  var opacity = (Math.random() + 0.1).toFixed(1);
  var color = name === 'Вы' ? 'rgb(255, 0, 0)' : 'rgba(2, 14, 134, ' + opacity + ')';

  renderText(ctx, xCoordinate, 265, name);
  renderText(ctx, xCoordinate, 87 + 150 * (1 - ratio), time);

  ctx.fillStyle = color;
  ctx.fillRect(xCoordinate, 95 + 150 * (1 - ratio), 40, 150 * ratio);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, 'rgb(255, 255, 255)');

  renderText(ctx, 120, 40, 'Ура, вы победили!');
  renderText(ctx, 120, 64, 'Список результатов:');

  var maxTime = Math.round(getMax(times));
  for (var i = 0; i < names.length; i++) {
    renderRating(ctx, names[i], Math.round(times[i]), maxTime, i);
  }
};
