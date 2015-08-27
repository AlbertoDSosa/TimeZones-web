(function ($) {
  'use strict';

  var moment = window.moment;

  function Menus () {
    this.$addZones   = $('.addZones');
    this.$aboutUs    = $('.aboutUs');
    this.$aboutModal = $('.aboutModal');
    this.$addModal   = $('.addModal');
  }

  Menus.prototype.active = function() {
    var self = this;
    this.$addZones.on('click', function (event) {
      event.preventDefault();
      if(self.$aboutModal.is(':visible')) {
        self.$aboutModal.fadeOut();
      }
      self.$addModal.toggle('slow');
    });

    this.$aboutUs.on('click', function (event) {
      event.preventDefault();
      if(self.$addModal.is(':visible')) {
        self.$addModal.fadeOut();
      }
      self.$aboutModal.toggle('slow');
    });
  };

  function Times () {
    this.now = moment().format('HH:mm');
  }

  Times.prototype.incrementTime = function(time) {
    return moment(time, 'HH:mm').add(10, 'm').format('HH:mm');
  };

  Times.prototype.decrementTime = function(time) {
    return moment(time, 'HH:mm').subtract(10, 'm').format('HH:mm');
  };

  Times.prototype.incrementDay = function(date) {
    return moment(date, 'HH:mm').add(1, 'd').format('MMMM DD');
  };

  Times.prototype.decrementDay = function(date) {
    return moment(date, 'HH:mm').subtract(1, 'd').format('MMMM DD');
  };

  Times.prototype.currentTime = function(time) {
    return moment(time, 'HH:mm').format('MMMM DD');
  };

  Times.prototype.printTime = function() {
    $('#your_time').html(this.now);
    $('#current_time').html(this.now);
  };

  function Bars () {

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

  Bars.prototype.getBarsTime = function(index) {
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

  Bars.prototype.setPosition = function() {

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

    if(time.hour > 12){
      hourPosition = -(hourWidth * (time.hour - 12));
      position = middlePosition + hourPosition + minutesPosition;
      this.resolvePosition(bar, position);
    } else if(time.hour < 12){
      hourPosition = hourWidth * (12 - time.hour);
      position = middlePosition + hourPosition + minutesPosition;
      this.resolvePosition(bar, position);
    } else if(time.hour === 12){
      position = middlePosition + minutesPosition;
      this.resolvePosition(bar, position);
    }

    });
  };

  Bars.prototype.resetPosition = function() {
    this.$moveZone.css('left', 0);
  };

  Bars.prototype.resolvePosition = function(bar, position) {
    $(bar).css('left', position);
  };


  window.Bars = Bars;
  window.Times = Times;
  window.Menus = Menus;

})(jQuery);
