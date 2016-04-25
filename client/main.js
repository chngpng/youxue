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
  console.log("you hit / ");
  this.render("navbar", {
    to: "header"
  });
  this.render("offerList", {
    to: "main"
  });
});

var pickupFormHook = {
  onSuccess: function (update, result) {
    if (result) {
      $('#pickupModal').modal('hide');
    }
  }
}
AutoForm.addHooks('pickupForm', pickupFormHook);
var stayFormHook = {
  onSuccess: function (update, result) {
    if (result) {
      $('#stayModal').modal('hide');
    }
  }
}
AutoForm.addHooks('stayForm', stayFormHook);