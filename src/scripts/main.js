'use strict';

var $ = require('jquery');
var Menu = require('./features/menu');
var template = require('./templates')

$('#home').hide();

var menu = new Menu();

menu.active();
menu.listCities();

$('.addsClose').click(function () {
	$('.adds').fadeOut();
});

/*setInterval(function () {
  $('#home').fadeOut();
}, 2000);*/








