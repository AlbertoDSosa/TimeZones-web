'use strict';

// Private functions

/*
var $addContent = $('.addContent');
var $barsZone    = $('.barsZone');

function resolveTemplates($el, data) {
	var source   = $el.html(),
      template = Handlebars.compile(source),
      html     = template(data);
	return html;
}*/

/*function resolveCity ($el) {
	var city = $el
		.siblings('.cityInfo')
		.children('.cityName')
		.text();
	return city;
}*/

// Lines

/*
var $line = $('.line');
var initialHeight = 19;

function lineUp () {
	var barsHeight = $barsZone.height();
	var lineHeight = $line.height();
    var totalHeight = barsHeight + initialHeight;

	if (lineHeight > initialHeight) {
		$line.css('height', totalHeight);
	}
}

function lineDown () {
	var barsHeight = $barsZone.height();
	var lineHeight = $line.height();
	var totalHeight = barsHeight + initialHeight;

	if (lineHeight === initialHeight) {
		$line.css('height', initialHeight);
	}

	$line.css('height', totalHeight);
}*/

//Add and remove bars to barsZone

/*function addBars (event) {

	event.preventDefault();
	var $button = $(event.target);

  $button
  	.css('color', 'grey')
  	.off('click', addBars);

  $button
  	.siblings('.removeCity')
  	.on('click', removeBars)
  	.css('color', '#7C092A');

  $('.barInfo').each(function (index) {
  	var actualyCity = $($('.barCity')[index]).text();
  	var actualyZone;
  	$.each(TimeZones.zones, function (i, value) {
  		if(actualyCity === value.city){
  			actualyZone = value.zone;
  		}

  	});

  	$($('.barTime')[index]).html(moment().tz(actualyZone).format('HH:mm'));
  	$($('.barDate')[index]).html(moment().tz(actualyZone).format('MMMM DD'));

  });

	var city = resolveCity($button);
	var indexZones = $button.parent().index();
	var zone = TimeZones.zones[indexZones].zone;
	var time = moment().tz(zone).format('HH:mm');
	var date = moment().tz(zone).format('MMMM DD');

	var barData = {
		time: time,
		city: city,
		date: date
	};

	var barRender = $currentBar.html();
	var infoBarRender = resolveTemplates($infoBar, barData);

	$barsZone.append(barRender);
	$('.infoBarsZone').append(infoBarRender);

	lineDown();

	saveBars('add', city);

  times.printTime();
  bar.setPosition();
  overBar();
  moveBars();

}

function removeBars (event) {
	event.preventDefault();
	var $button = $(event.target);

	$button
		.siblings('.addCity')
		.on('click', addBars)
		.css('color', '#36A5B0');

	$button
		.css('color', 'grey')
		.off('click', removeBars);

	var city = resolveCity($button);
	var $barCity = $('.barCity');

	saveBars('remove', city);

	$barCity.each(function (index, element) {
		var barCity = $(element).text();
		if(city === barCity){

			$($('.bar')[index]).remove();
			$($('.barInfo')[index]).remove();
		}
	});


	lineUp();
}*/

//Add Cities List to Menu Dropdown


/*$.each(TimeZones.zones, function (index) {

	var zone = TimeZones.zones[index].zone;
	var timeZone = moment.tz(zone);
	var offSet = timeZone._offset;
	var offSetHr = offSet / 60;
	var offSetStr = offSetHr.toString();

	if (offSetStr.substring(0, 1) === '-') {
		TimeZones.zones[index].utc = offSetStr;
	} else {
		TimeZones.zones[index].utc = '+' + offSetStr;
	}

});


var cities = resolveTemplates($city, TimeZones);

$addContent.html(cities);

$('.addCity').on('click', addBars);

function barsStatus () {
	$('.barCity').each(function (index, element) {
		var cityBar = $(element).text();
		$('.cityName').each(function (i, el) {
			var cityAdd = $(el).text();
			if(cityBar === cityAdd){

				$($('.addCity')[i])
			    	.css('color', 'grey')
			    	.off('click', addBars);

		    $($('.removeCity')[i])
		    	.on('click', removeBars)
		    	.css('color', '#7C092A');
			}
		});
	});
}

barsStatus();*/

// Storage

/*
	var bars = [];

	function saveBars (action, bar) {
		if(action === 'add'){
			bars.push(bar);
		} else if (action === 'remove') {
			var index = bars.indexOf(bar);
			bars.splice(index, 1);
		}

		localStorage.setItem('bars', JSON.stringify(bars));
	}

	function loadStorageBars () {

	var storageBars = JSON.parse(localStorage.getItem('bars'));

	$.each(storageBars, function (index, value) {
		$.each(TimeZones.zones ,function (i, val) {
			city = value;
			if (val.city === city) {
				indexZone = i;
			}
		});

		var city;
		var indexZone;
		var zone = TimeZones.zones[indexZone].zone;
		var time = moment().tz(zone).format('HH:mm');
		var date = moment().tz(zone).format('MMMM DD');
		var barData = {
			time: time,
			date: date,
			city: city
		};

		var renderStorageBars = resolveTemplates($infoBar, barData);
		var renderCurrentBars = $currentBar.html();

		$barsZone.append(renderCurrentBars);
		$('.infoBarsZone').append(renderStorageBars);

		times.printTime();
		lineDown();
		bar.setPosition();
		overBar();
		moveBars();
	});
}

if(localStorage.length > 0){
	loadStorageBars();
	$('.barCity').each(function (index, element) {
		var cityBar = $(element).text();
		bars.push(cityBar);
	});
}*/

//Active overlapping elements

/*function overBar () {

	var $line = $('#line');
	var $day = $('.day');
	var collides = $day.overlaps($line);
	var barsLength = $('.bar').length;
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
}*/

//Move Bars
f/*unction moveBars () {

	var content = document.querySelector('.content');
	var move = new Hammer(content, {
		touchAction: 'pan-x'
	});

    var dayWidth = $('.day').width();
    var hourWidth = dayWidth / 24;
    var minuteWidth = hourWidth / 60;
	var distance = minuteWidth * 10;

	function moveRight () {
		var position = $('.moveZone').position();
    var yourTimeText = $('#your_time').text();
    var renderYourTime = times.decrementTime(yourTimeText);

    var $line = $('#line');
		var $day = $('.day');
		var collides = $day.overlaps($line);

    $('.moveZone').css('left', position.left + distance);

    $('.barTime').each(function (index, element) {
   		var time = $(element).text();

    	var renderTime = times.decrementTime(time);
    	$(this).html(renderTime);

    	if($(collides.targets[index]).is('.bars .day:first-child')){
    		var renderDate = times.decrementDay(time);
    		$($('.barDate')[index]).html(renderDate);
    	} else if($(collides.targets[index]).is('.bars .day:nth-child(2)')){
    		var renderCurrentDate = times.currentTime(time);
    		$($('.barDate')[index]).html(renderCurrentDate);
    	}
    });

    $('#your_time').html(renderYourTime);

		overBar();
	}

	function moveLeft () {

	    var position = $('.moveZone').position();
	    var yourTimeText = $('#your_time').text();
	    var renderYourTime = times.incrementTime(yourTimeText);
	    var $line = $('#line');
	    var $day = $('.day');
	    var collides = $day.overlaps($line);

	    $('.moveZone').css('left', position.left + (-distance));

	    $('.barTime').each(function (index, element) {

	   		var time = $(element).text();

	    	var renderTime = times.incrementTime(time);
	    	$(this).html(renderTime);

	    	if($(collides.targets[index]).is('.bars .day:last-child')){
	    		var renderDate = times.incrementDay(time);
	    		$($('.barDate')[index]).html(renderDate);
	    	} else if($(collides.targets[index]).is('.bars .day:nth-child(2)')){
	    		var renderCurrentDate = times.currentTime(time);
	    		$($('.barDate')[index]).html(renderCurrentDate);
	    	}


	    });

	    $('#your_time').html(renderYourTime);

		overBar();
	}

	move.on('panright', moveRight);

	move.on('panleft', moveLeft);
}*/



//adds

/*$('.addsClose').click(function () {
	$('.adds').fadeOut();
});*/