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
})

var pickupFormHook = {
  onSuccess: function (update, result) {
    if (result) {
      $('#pickupModal').modal('hide');
    }
  }
}
AutoForm.addHooks('pickupForm', pickupFormHook);