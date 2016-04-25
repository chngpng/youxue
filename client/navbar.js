Template.navbar.events({
  'click .js-add-pickup': function () {
    console.log('add offer is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#pickupModal').modal('show');
  },

  'click .js-add-stay': function () {
    console.log('add stay is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#stayModal').modal('show');
  },
})