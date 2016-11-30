'use strict';

var moment = require('moment');

function Time () {
    this.now = moment().format('HH:mm');
  }

  Time.prototype.incrementTime = function(time) {
    return moment(time, 'HH:mm').add(10, 'm').format('HH:mm');
  };

  Time.prototype.decrementTime = function(time) {
    return moment(time, 'HH:mm').subtract(10, 'm').format('HH:mm');
  };

  Time.prototype.incrementDay = function(date) {
    return moment(date, 'HH:mm').add(1, 'd').format('MMMM DD');
  };

  Time.prototype.decrementDay = function(date) {
    return moment(date, 'HH:mm').subtract(1, 'd').format('MMMM DD');
  };

  Time.prototype.currentTime = function(time) {
    return moment(time, 'HH:mm').format('MMMM DD');
  };

  Time.prototype.printTime = function() {
    $('#your_time').html(this.now);
    $('#current_time').html(this.now);
  };

  module.exports = Time;