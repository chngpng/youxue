import {
  Meteor
}
from 'meteor/meteor';

Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  'getGoogleMapsApiKey': function () {
    var credentials = JSON.parse(Assets.getText("credentials.json"));
    return credentials.googleMapsApiKey;
  }
})