'use strict';
var moment = require('moment-timezone');
var cities = require('./cities');
var city = require('./city.jade');
var bar = require('./bar.jade');
var barInfo = require('./bar-info.jade');
var $ = require('jquery');


$.each(cities.zones, function (index) {

  var zone = cities.zones[index].zone;
  var timeZone = moment.tz(zone);
  var offSet = timeZone._offset;
  var offSetHr = offSet / 60;
  var offSetStr = offSetHr.toString();

  if (offSetStr.substring(0, 1) === '-') {
    cities.zones[index].utc = offSetStr;
  } else {
    cities.zones[index].utc = '+' + offSetStr;
  }

});

module.exports = {
	zones: cities.zones,
	city: city,
	bar: bar,
	barInfo: barInfo
}


