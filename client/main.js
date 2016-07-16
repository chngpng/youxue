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
  this.render("footer", {
    to: "footer"
  });
});

Router.route('/pickups', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("pickups", {
    to: "main"
  });
  this.render("footer", {
    to: "footer"
  });
});

Router.route('/stays', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("stays", {
    to: "main"
  });
  this.render("footer", {
    to: "footer"
  });
});

Router.route('/eats', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("eats", {
    to: "main"
  });
  this.render("footer", {
    to: "footer"
  });
});

Router.route('/eatForm', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("eatForm", {
    to: "main"
  });
  this.render("footer", {
    to: "footer"
  });
});

Router.route('/eatEdit/:_id', function () {
  this.render("navbar", {
    to: "header"
  });
  var eat = Eats.findOne({
    _id: this.params._id
  });
  Session.set("eatEditId", this.params._id);
  console.log("_id = " + this.params._id);
  console.log("eat = " + eat);
  //this.render("messageItem", {
  //  to: "main",
  //  data: {
  //    conversation: conv
  //  }
  //});
  this.render("eatEdit", {
    to: "main",
    data: {
      eat: eat
    }
  });
  this.render("footer", {
    to: "footer"
  });
}, {
  name: 'eat.edit'
});

Router.route('/about', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("about", {
    to: "main"
  });
  this.render("footer", {
    to: "footer"
  });
});

Router.route('/upload', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("uploadImage", {
    to: "main"
  });
  this.render("footer", {
    to: "footer"
  });
});

Router.route('/posts', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("posts", {
    to: "main"
  });
  this.render("footer", {
    to: "footer"
  });
});

Router.route('/messages', function () {
  this.render("navbar", {
    to: "header"
  });
  this.render("messages", {
    to: "main"
  });
  this.render("footer", {
    to: "footer"
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
    data: {
      conversation: conv
    }
  });
  this.render("footer", {
    to: "footer"
  });
});