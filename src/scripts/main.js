'use strict';

var $ = require('jquery');
var Menu = require('./features/menu');
var template = require('./templates');
var Time = require('./features/time');
var bar = require('./features/bar');
var line = require('./features/line');

$('#home').hide();

var menu = new Menu();
var time = new Time();

menu.active();
time.printTime();

$.when(menu.listCities()).then(function () {
	var addMenu = new Menu();
	addMenu.$buttomAdd
		.on('click', bar.add);
})

$('.addsClose').click(function () {
	$('.adds').fadeOut();
});


/*setInterval(function () {
  $('#home').fadeOut();
}, 2000);*/








