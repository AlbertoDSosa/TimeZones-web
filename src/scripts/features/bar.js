'use strict';

var $ = require('../lib/overlaps');
var template = require('../templates');
var line = require('./line');
var Time = require('./time');
var moment = require('moment-timezone');
var move = require('./move');
var Hammer = require('hammerjs');

var $moveZone = $('.moveZone');
var $zone = $('.barsZone');
var $infoZone = $('.infoBarsZone');
var content = document.querySelector('.content');
var hammer = new Hammer(content, {
  touchAction: 'pan-x'
});

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
  
  var barTime = $('.barTime').get(index);
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

function _activeBar () {

  var $line = $('#line');
  var $day = $('.day');
  var collides = $day.overlaps($line);
  var barsLength = $('.bars').length;
  var collidesLength = collides.targets.length;

  $('.barTime').each(function (index, element) {
    var time = $(element).text();
    var yourTagTime = $('#your_time').text();
    if(time === yourTagTime && collidesLength === barsLength){
      $day.removeClass('yourOnBar');
      $(collides.targets[index]).removeClass('onBar');
      $(collides.targets[index]).addClass('yourOnBar');
    } else if(time !== yourTagTime && collidesLength === barsLength){
      $day.removeClass('onBar');
      $(collides.targets).addClass('onBar');
    }
  });
}

var _resetPosition = function() {

  $('.barCity').each(function (index, element) {
    var city = $(element).text()
    var data = _setBarInfo(city);
    var date = $('.barDate').get(index);
    $(date).text(data.date);
    var time = $('.barTime').get(index);
    $(time).text(data.time);
    _setPosition(index);
    _activeBar()   
   
  });
};

var _resolvePosition = function(bar, position) {
  $(bar).css('left', position);
};

var _setPosition = function(index) {
  
  index = index || 0;
  var bar = $('.bars').get(index);
  var screenWidth = screen.width;
  var barsWidth = $('.bars').width();
  var halfWidth = (barsWidth / 2) - (screenWidth / 2);
  var dayWidth = $('.day').width();
  var hourWidth = dayWidth / 24;
  var minuteWidth = hourWidth / 60;

  var time = _getBarTime(index);

  var middlePosition = -halfWidth;
  var minutesWith = minuteWidth * time.minutes;
  var minutesPosition = (-minutesWith);

  var hourPosition,
      position;
  
  $moveZone.css('left', 0);

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
  
};

var add = function (event) {
  
  event.preventDefault();

  var $button = $(event.target);
  var city = _getCity($button);

  var data = _setBarInfo(city)

  _toggleButton('add', $button);

  $.when(_render($zone, template.bar))
    .then(function () {
      var time = new Time();
      _render($infoZone, template.barInfo, data);
      time.printTime();
      line.getDown();

      if($('.bars').length > 1){
        _resetPosition();
      }

      _setPosition();
      _activeBar();
      hammer.on('pan', move);
    })

};

var remove = function(event) {
  event.preventDefault();
  var $button = $(event.target);
  var city = _getCity($button);
  var bar = _getBar(city);
  var time = new Time();
  _toggleButton('remove', $button);

  $(bar.info).remove();
  $(bar.element).remove();

  time.printTime();
  line.getUp();
  _resetPosition();
  _activeBar();
};


module.exports = {
  add: add,
  remove: remove,
  activeBar: _activeBar,
  setBarInfo: _setBarInfo
}