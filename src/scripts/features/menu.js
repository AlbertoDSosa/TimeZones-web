'use strict';

var $ = require('jquery');

function Menu () {
  this.$addZones   = $('.addZones');
  this.$aboutUs    = $('.aboutUs');
  this.$aboutModal = $('.aboutModal');
  this.$addModal   = $('.addModal');
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

module.exports = Menu;