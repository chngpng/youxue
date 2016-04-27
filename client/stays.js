Template.stays.helpers({
  stays() {
      return Stays.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    }
})

Template.stays.events({
  'click .js-add-stay': function () {
    console.log('add stay is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#stayModal').modal('show');
  },
})

var stayFormHook = {
  onSuccess: function (update, result) {
    if (result) {
      $('#stayModal').modal('hide');
    }
  }
}
AutoForm.addHooks('stayForm', stayFormHook);