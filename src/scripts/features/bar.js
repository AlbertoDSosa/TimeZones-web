'use strict';

var $ = require('jquery');

function Bar () {

  this.$list = [];
  this.$cover = $('.bar');
  this.$days = $('.bars');
  this.$day = $('.day');
  this.$off = $('.offBar');
  this.$on = $('.onBar');
  this.$info = $('barInfo');
  this.$date = $('.barDate');
  this.$time = $('barTime');
  this.$moveZone = $('.moveZone');

}

Bar.prototype.getBarTime = function(index) {
  var barTime = this.$time.get(index);
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

Bar.prototype.setPosition = function() {
  var self = this;
  this.$info.each(function (index) {
    var bar = this.$days.get(index);
    var screenWidth = screen.width;
    var barsWidth = this.$days.width();
    var halfWidth = (barsWidth / 2) - (screenWidth / 2);
    var dayWidth = this.$day.width();
    var hourWidth = dayWidth / 24;
    var minuteWidth = hourWidth / 60;

    var time = this.getBarsTime(index);

    var middlePosition = -halfWidth;
    var minutesWith = minuteWidth * time.minutes;
    var minutesPosition = (-minutesWith);

    var hourPosition,
        position;

  this.resetPosition();

  if(time.hour > 12){
    hourPosition = -(hourWidth * (time.hour - 12));
    position = middlePosition + hourPosition + minutesPosition;
    self.resolvePosition(bar, position);
  } else if(time.hour < 12){
    hourPosition = hourWidth * (12 - time.hour);
    position = middlePosition + hourPosition + minutesPosition;
    self.resolvePosition(bar, position);
  } else if(time.hour === 12){
    position = middlePosition + minutesPosition;
    self.resolvePosition(bar, position);
  }
  });
};

Bar.prototype.resetPosition = function() {
  this.$moveZone.css('left', 0);
};

Bar.prototype.resolvePosition = function(bar, position) {
  $(bar).css('left', position);
};

module.exports = Bar;