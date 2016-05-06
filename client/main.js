Meteor.startup(function () {
  Meteor.call('getGoogleMapsApiKey', function (error, result) {
    if (error) {
      console.log(error);
    } else {
      GoogleMaps.load({
        key: result,
        libraries: 'places'
      });
    }
  });
});

// set up the iron router
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// 'home' page
Router.route('/', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("home", {
    to: "main"
  });
});

Router.route('/pickups', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("pickups", {
    to: "main"
  });
});

Router.route('/stays', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("stays", {
    to: "main"
  });
});

Router.route('/about', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("about", {
    to: "main"
  });
});

Router.route('/messages', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("messages", {
    to: "main"
  });
});

Router.route('/messages/:_id', function () {
  this.render("navbar", {
    to: "header"
  });
  var conv = Meteor.conversations.findOne({
    _id: this.params._id
  });
  console.log("_id = " + this.params._id);
  console.log("conv = " + conv);
  this.render("messageItem", {
    to: "main",
    data: conv
  });
});