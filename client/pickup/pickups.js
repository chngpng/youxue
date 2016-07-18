Template.pickups.helpers({
  pickups() {
      return Pickups.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    }
})

Template.pickups.events({
  'click .js-add-pickup': function () {
    console.log('add offer is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#pickupModal').modal('show');
  },
  'change .uploadFile': function (event, template) {
    var files = event.target.files;
    var file = files[0];
    var filename = uuid.v4();
    console.log("filename = " + filename);
    var options = {};
    options.params = {
      filename: filename
    };
    AzureFile.upload(
      file, "uploadFile", options,
      function (error, success) {
        if (error) console.log(error);
        else console.log(success);
      }
    );
  }
})

var pickupFormHook = {
  onSuccess: function (update, result) {
    if (result) {
      $('#pickupModal').modal('hide');
    }
  }
}
AutoForm.addHooks('pickupForm', pickupFormHook);