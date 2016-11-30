'use strict';

var $ = require('jquery');
var template = require('../templates');

function Menu () {
  this.$addZones   = $('.addZones');
  this.$aboutUs    = $('.aboutUs');
  this.$aboutModal = $('.aboutModal');
  this.$addModal   = $('.addModal');
  this.$addContent = $('.addContent');
}

Menu.prototype.active = function() {
  var self = this;
  this.$addZones.on('click', function (event) {
    event.preventDefault();
    if(self.$aboutModal.is(':visible')) {
      self.$aboutModal.fadeOut();
    }
    self.$addModal.toggle('slow');
  });

  this.$aboutUs.on('click', function (event) {
    event.preventDefault();
    if(self.$addModal.is(':visible')) {
      self.$addModal.fadeOut();
    }
    self.$aboutModal.toggle('slow');
  });
};

Menu.prototype.listCities = function() {
  var self = this;

  $.each(template.zones, function (index, value) {
    var html = template.city(value);
    self.$addContent.append(html);
  });
};

module.exports = Menu;