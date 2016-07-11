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
  },

  'uploadFile': function (file, options) {
    var response;
    if (file === void 0) {
      throw new Meteor.Error(500, "Missing File", "", "");
    }
    var filename = options.filename;
    response = file.azureUpload(filename, "lebusspicstg", "InS00WKV6L/CDwX0FzqV5w4B2Hyph3gZFaLhdXgFD1uU7ew1AH0svubCVlpmA5xMCmC6lbikkQ4u5smBoiuaUw==", "pics");
    return console.log('response: ' + response);
  }
})