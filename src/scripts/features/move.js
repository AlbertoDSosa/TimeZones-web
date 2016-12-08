//Move Bars

var $ = require('../lib/overlaps');
var Time = require('./time');

function _resolveDates (collides, date, currentDate, selector, barDate) {
	var barCenter = '.bars .day:nth-child(2)';
	if($(collides).is('.bars .day:' + selector)){
		$(barDate).text(date);
	} else if($(collides).is(barCenter)){
		$(barDate).text(currentDate);
	}
}


function moveLeft (opt) {

  var yourTimeText = $('#your_time').text();
  var renderYourTime = opt.times.incrementTime(yourTimeText);
 

  $('.moveZone').css('left', opt.position.left + (-opt.distance));

  $('.barTime').each(function (index, element) {

 		var time = $(element).text();
  	var renderTime = opt.times.incrementTime(time);
  	var city = $($('.barCity')[index]).text();
  	var data = opt.bar.setBarInfo(city);
  
 		var args = [
 			opt.collides.targets[index],
 			opt.times.incrementDay(time),
 			data.date,
 			'last-child',
 			$('.barDate').get(index)
 		];

  	$(this).html(renderTime);

  	
		_resolveDates.apply(null, args);

  });

  $('#your_time').html(renderYourTime);

}

function moveRight (opt) {
		
  var yourTimeText = $('#your_time').text();
  var renderYourTime = opt.times.decrementTime(yourTimeText);

  $('.moveZone').css('left', opt.position.left + opt.distance);

  $('.barTime').each(function (index, element) {
 		var time = $(element).text();
  	var renderTime = opt.times.decrementTime(time);
  	var city = $($('.barCity')[index]).text();
  	var data = opt.bar.setBarInfo(city);
  	
 		var args = [
 			opt.collides.targets[index],
 			opt.times.decrementDay(time),
 			data.date,
 			'first-child',
 			$('.barDate').get(index)
 		];

  	$(this).html(renderTime);

  	_resolveDates.apply(null, args)

  });

  $('#your_time').html(renderYourTime);
}

function moveBars(event) {
	var times = new Time();
	var bar = require('./bar')
  var dayWidth = $('.day').width();
  var hourWidth = dayWidth / 24;
  var minuteWidth = hourWidth / 60;
	var distance = minuteWidth * 10;
	var position = $('.moveZone').position();
	var collides = $('.day').overlaps($('#line'));
	var options = {
		bar: bar,
		distance: distance,
		collides: collides,
		times: times,
		position: position
	} 

	if(event.additionalEvent === 'panleft'){

  	moveLeft(options);
		

	} else {

		moveRight(options);

	}

	bar.activeBar();
}

module.exports = moveBars;