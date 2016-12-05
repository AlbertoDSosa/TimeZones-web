'use strict';

// Private functions


//Add and remove bars to barsZone


function removeBars (event) {
	

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
/*function moveBars () {

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



