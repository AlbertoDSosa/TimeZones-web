'use strict';

var moment = require('moment');
var $ = require('jquery');

function Time () {
    this.now = moment().format('HH:mm');
  }

  Time.prototype.incrementTime = function(time) {
    return moment(time, 'HH:mm').add(1, 'H').format('HH:mm');
  };

  Time.prototype.decrementTime = function(time) {
    return moment(time, 'HH:mm').subtract(1, 'H').format('HH:mm');
  };

  Time.prototype.incrementDay = function(date) {
    return moment(date, 'HH:mm').add(1, 'd').format('MMMM DD');
  };

  Time.prototype.decrementDay = function(date) {
    return moment(date, 'HH:mm').subtract(1, 'd').format('MMMM DD');
  };

  Time.prototype.printTime = function() {
    $('#your_time').html(this.now);
    $('#current_time').html(this.now);
  };

  module.exports = Time;