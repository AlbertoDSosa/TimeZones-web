'use strict';

var $ = require('jquery');
var template = require('../templates');
var line = require('./line');
var Time = require('./time');
var moment = require('moment-timezone');

var list = [];
var $cover = $('.bar');
var $days = $('.bars');
var $day = $('.day');
var $off = $('.offBar');
var $on = $('.onBar');
var $date = $('.barDate');
var $time = $('.barTime');
var $moveZone = $('.moveZone');
var $zone = $('.barsZone');
var $infoZone = $('.infoBarsZone');

function _getCity ($el) {
  var city = $el
    .siblings('.cityInfo')
    .children('.cityName')
    .text();
  return city;
}
function _setBarInfo (city) {
  var data = {};
  $.each(template.zones, function (index, element) {
    if(city === element.city){
      var zone = moment.tz(element.zone);
      data.city = element.city;
      data.time = zone.format('HH:mm');
      data.date = zone.format('MMMM DD');
    }
  });

  return data;
}

var _render = function(place, template, data) {
  data = data || {};
  place.append(template(data));
};

function _getBar (city) {
  var bar = {};
  $('.barCity').each(function (index, element) {
    var cityBar = $(element).text();
    if(city === cityBar){
      bar.info = $('.barInfo')[index];
      bar.element = $('.bar')[index];
    }

  });
  return bar;
}

function _toggleButton (action, button) {
  if(action === 'add') {
    button
    .css('color', 'grey')
    .off('click', add);

    button
      .siblings('.removeCity')
      .on('click', remove)
      .css('color', '#7C092A')
  } else {
    button
      .css('color', 'grey')
      .off('click', remove);

    button
      .siblings('.addCity')
      .on('click', add)
      .css('color', '#36A5B0');
  }
}


var _getBarTime = function(index) {
  var barTime = $time.get(index);
  var barTimeText = $(barTime).text();
  var barTimeList = barTimeText.split(':');
  var hoursStr = barTimeList[0];
  var minutesStr = barTimeList[1];
  var time = {
    hour: Number(hoursStr),
    minutes: Number(minutesStr)
  };
  return time;
};

var _resetPosition = function() {
  $moveZone.css('left', 0);
};

var _resolvePosition = function(bar, position) {
  $(bar).css('left', position);
};


var add = function (event) {
  
  event.preventDefault();

  var $button = $(event.target);
  var city = _getCity($button);

  var data = _setBarInfo(city)

  _toggleButton('add', $button);

  $.when(_render($zone, template.bar))
    .then(function () {
      _render($infoZone, template.barInfo, data)
      line.getDown()
    });
};

var remove = function(event) {
  event.preventDefault();
  var $button = $(event.target);
  var city = _getCity($button);
  var bar = _getBar(city);
  
  _toggleButton('remove', $button);

  $(bar.info).remove();
  $(bar.element).remove();
  
};

var setPosition = function() {

  $info.each(function (index) {
    var bar = $days.get(index);
    var screenWidth = screen.width;
    var barsWidth = $days.width();
    var halfWidth = (barsWidth / 2) - (screenWidth / 2);
    var dayWidth = $day.width();
    var hourWidth = dayWidth / 24;
    var minuteWidth = hourWidth / 60;

    var time = _getBarTime(index);

    var middlePosition = -halfWidth;
    var minutesWith = minuteWidth * time.minutes;
    var minutesPosition = (-minutesWith);

    var hourPosition,
        position;

    _resetPosition();

    if(time.hour > 12){
      hourPosition = -(hourWidth * (time.hour - 12));
      position = middlePosition + hourPosition + minutesPosition;
      _resolvePosition(bar, position);
    } else if(time.hour < 12){
      hourPosition = hourWidth * (12 - time.hour);
      position = middlePosition + hourPosition + minutesPosition;
      _resolvePosition(bar, position);
    } else if(time.hour === 12){
      position = middlePosition + minutesPosition;
      _resolvePosition(bar, position);
    }
  });
};

module.exports = {
  add: add,
  remove: remove,
  setPosition: setPosition,
  zone: $zone
}