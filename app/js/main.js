
'use strict';

// Menus Dropdown

var $addZones   = $('.addZones'),
	$aboutUs    = $('.aboutUs'),
	$aboutModal = $('.aboutModal'),
	$addModal   = $('.addModal');


$addZones.on('click', function (event) {
	if($aboutModal.is(':visible')) {
		$aboutModal.fadeOut();
	}
	$addModal.toggle('slow');
	event.preventDefault();	
});

$aboutUs.on('click', function (event) {
	if($addModal.is(':visible')) {
		$addModal.fadeOut();
	}
	$aboutModal.toggle('slow');
	event.preventDefault();
});


//Globals



var TimeZones = {
	zones: [
		{
			zone: 'America/Los_Angeles',
			city: 'Los Angeles' 
		},
		{
			zone: 'America/Mexico_City',
			city: 'Mexico City'
		},
		{
			zone: 'America/Caracas',
			city: 'Caracas'
		},
		{
			zone: 'America/Sao_Paulo',
			city: 'Sao Paolo'
		},
		{
			zone: 'Europe/London',
			city: 'London'
		},
		{
			zone: 'Europe/Paris',
			city: 'Paris'
		},
		{
			zone: 'Europe/Moscow',
			city: 'Moscow'
		},
		{
			zone: 'Asia/Singapore',
			city: 'Singapore'
		},
		{
			zone: 'Asia/Tokyo',
			city: 'Tokyo'
		}
	]
};

function resolveTemplates($el, data) {
	var source   = $el.html(),
        template = Handlebars.compile(source),
        html     = template(data);
	return html;
}

var $city = $('#city_template');
var $addContent = $('.addContent');

var $currentBar  = $('#bar_template');
var $infoBar  = $('#infobar_template');
var $barsZone    = $('.barsZone');

var $line = $('.line');
var initialHeight = 19;
//Home animation

setInterval(function () {
	$('#home').fadeOut();
}, 4000);

//Storage

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

		printYourTime();
		printCurrentTime();
		lineDown();
		setPosition();
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
}

//Tags info
	
function printCurrentTime () {
	var currentTime = moment().format('HH:mm');
	$('#current_time').html(currentTime);
}		
 
function printYourTime () {
	var yourTime = moment().format('HH:mm');
	$('#your_time').html(yourTime);
}

printCurrentTime();
printYourTime();


//Add Cities List to Menu Dropdown

$.each(TimeZones.zones, function (index) {

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
	
barsStatus();

//Bars position

function setPosition () {

	$('.barInfo').each(function (index) {

		function strToInt (str) {
			return parseInt(str, 10);
		}

        var $barTime = $('.barTime');
        var $bars    = $('.bars');

        var bar = $bars.get(index);

	    function resolvePosition (position) {
	    	$(bar).css('left', position);
	    }


		// Get the times

		var barTime = $barTime.get(index);
		var barTimeText = $(barTime).text();
	    var barTimeList = barTimeText.split(':');
	    var hoursStr = barTimeList[0];
	    var minutesStr = barTimeList[1];
	    var hourInt = strToInt(hoursStr);
	    var minutesInt = strToInt(minutesStr);

	    // Get the dates

	    var barDate = $('.barDate').get(index);
	    var barDateText = $(barDate).text();
	    var barDateList = barDateText.split(' ');
	    var dayStr = barDateList[1];
	    var monthStr = barDateList[0];
	    var dayInt = strToInt(dayStr);
	    var monthNum = moment().month(monthStr).format('M');
	    var monthInt = strToInt(monthNum);

	    // Get current dates	
	    	
	    var	currentMonthStr = moment().format('M');
	    var	currentDayStr = moment().format('D');
	  

	    var currentMonth = strToInt(currentMonthStr);
	    var currentDay = strToInt(currentDayStr);
	    
	   

	    // Get all width

		var screenWidth = screen.width;
		var barsWidth = $bars.width();
		var halfWidth = (barsWidth / 2) - (screenWidth / 2);
	    var dayWidth = $('.day').width();
	    var hourWidth = dayWidth / 24;
	    var minuteWidth = hourWidth / 60;
		

		var middlePosition = -halfWidth;
		var nextDayMP = -(halfWidth + dayWidth);
		var lastDayMP = -(halfWidth - dayWidth);
		var minutesPosition = minuteWidth * minutesInt;


	    function resetPosition () {
	    	$('.moveZone').css('left', 0);
	    }

	    resetPosition();

		function resolveDayPosition () {
			if(hourInt > 12){
				return -(hourWidth * (hourInt - 12));
			} else if(hourInt < 12){
				return hourWidth * (12 - hourInt);
			} else if(hourInt === 12){
				return 0;
			}
		}

		var dayPosition = resolveDayPosition();

		if(monthInt === currentMonth && dayInt === currentDay){

			resolvePosition(middlePosition + dayPosition + (-minutesPosition));

		} else if(monthInt === currentMonth && dayInt < currentDay){

			resolvePosition(lastDayMP + dayPosition + (-minutesPosition));

		} else if(monthInt === currentMonth && dayInt > currentDay){

			resolvePosition(nextDayMP + dayPosition + (-minutesPosition));

		} else if(monthInt < currentMonth){

			resolvePosition(lastDayMP + dayPosition + (-minutesPosition));

		} else if(monthInt > currentMonth){

			resolvePosition(nextDayMP + dayPosition + (-minutesPosition));	
		}
		
	});
}


	
//Add and remove bars to barsZone



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
}

function resolveCity ($el) {
	var city = $el
		.siblings('.cityInfo')
		.children('.cityName')
		.text();
	return city;
}


function addBars (event) {

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

	$('.day').each(function (index, element) {
		$(element).attr('id', 'day-' + index);
	});

	lineDown();

	saveBars('add', city);

    printCurrentTime();
    printYourTime();
    setPosition();
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
}



//Active overlapping elements

function overBar () {

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
}


//Move Bars
function moveBars () {

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
	    var renderYourTime = moment(yourTimeText, 'HH:mm').subtract(10, 'm').format('HH:mm');
	    
	    var $line = $('#line');
		var $day = $('.day');
		var collides = $day.overlaps($line);

	    $('.moveZone').css('left', position.left + distance);
	    
	    $('.barTime').each(function (index, element) {
	   		var time = $(element).text();
	 
	    	var renderTime = moment(time, 'HH:mm').subtract(10, 'm').format('HH:mm');
	    	$(this).html(renderTime);

	    	if($(collides.targets[index]).is('.bars .day:first-child')){
	    		var renderDate = moment(time, 'HH:mm').subtract(1, 'd').format('MMMM DD');
	    		$($('.barDate')[index]).html(renderDate);
	    	} else if($(collides.targets[index]).is('.bars .day:nth-child(2)')){
	    		var renderDate = moment(time, 'HH:mm').format('MMMM DD');
	    		$($('.barDate')[index]).html(renderDate);
	    	}
	    });

	    $('#your_time').html(renderYourTime);

		overBar();
	}

	function moveLeft () {

	    var position = $('.moveZone').position();
	    var yourTimeText = $('#your_time').text();
	    var renderYourTime = moment(yourTimeText, 'HH:mm').add(10, 'm').format('HH:mm');
	    var $line = $('#line');
	    var $day = $('.day');
	    var collides = $day.overlaps($line);

	    $('.moveZone').css('left', position.left + (-distance));

	    $('.barTime').each(function (index, element) {
	    	
	   		var time = $(element).text();
	   		
	    	var renderTime = moment(time, 'HH:mm').add(10, 'm').format('HH:mm');
	    	$(this).html(renderTime);

	    	if($(collides.targets[index]).is('.bars .day:last-child')){
	    		var renderDate = moment(time, 'HH:mm').add(1, 'd').format('MMMM DD');
	    		$($('.barDate')[index]).html(renderDate);
	    	} else if($(collides.targets[index]).is('.bars .day:nth-child(2)')){
	    		var renderDate = moment(time, 'HH:mm').format('MMMM DD');
	    		$($('.barDate')[index]).html(renderDate);
	    	}


	    });
	    
	    $('#your_time').html(renderYourTime);

		overBar();
	}

	move.on('panright', moveRight);

	move.on('panleft', moveLeft);
}



//adds

$('.addsClose').click(function () {
	$('.adds').fadeOut();
});

//TODO