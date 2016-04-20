import {
  Template
}
from 'meteor/templating';
import {
  ReactiveVar
}
from 'meteor/reactive-var';

import './main.html';

// set up the iron router
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// 'home' page
Router.route('/', function () {
  console.log("you hit / ");
  this.render("navbar", {
    to: "header"
  });
  this.render("offerList", {
    to: "main"
  });
  //this.render("docList", {to:"main"});  
});

Template.navbar.events({
  // Save button saves the current board into tsumego.
  'click .js-add-offer': function () {
    console.log('add offer is clicked');
    $('#newOfferModal').modal('show');
  },

  'click #saveNewOfferButton': function () {
    console.log('saveNewOfferButton button is clicked');
    var airport = $('#offer-airport-select').val();
    var start_date = new Date($('#offer-start-date').val() + "T00:00:00");
    var end_date = new Date($('#offer-end-date').val() + "T00:00:00");

    var offer = {
      airport: airport,
      start_date: start_date,
      end_date: end_date
    };

    console.log("construction complete");
    $('#newOfferModal').modal('hide');
    Offers.insert(offer);
  },
})

Template.offerList.helpers({
  offers() {
      return Offers.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    }
});

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button' (event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});