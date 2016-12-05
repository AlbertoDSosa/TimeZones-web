'use strict';

var $ = require('jquery');


var $line = $('.line');
var initialHeight = 19;

function _getValues() {
	
	var barsHeight = $('.barsZone').height();
	var lineHeight = $line.height();
  var totalHeight = barsHeight + initialHeight;

  return {
  	lineHeight: lineHeight,
  	totalHeight: totalHeight
  }
}

function getUp () {
	var value = _getValues();

	if (value.lineHeight > initialHeight) {
		$line.css('height', value.totalHeight);
	}
}

function getDown () {
	var value = _getValues();

	if (value.lineHeight === initialHeight) {
		$line.css('height', initialHeight);
	}

	$line.css('height', value.totalHeight);
	
}

module.exports = {
	getUp: getUp,
	getDown: getDown
}