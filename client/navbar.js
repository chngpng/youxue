Template.navbar.events({
  'click .js-add-pickup': function () {
    console.log('add offer is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#newOfferModal').modal('show');
  },

  'click .js-add-stay': function () {
    console.log('add stay is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#newStayModal').modal('show');
  },

  // Save button saves the new pickup offer. 
  'click #saveNewPickupButton': function () {
    console.log('saveNewPickupButton button is clicked');
    var airport = $('#offer-airport-select').val();
    var start_date = new Date($('#offer-start-date').val() + "T00:00:00");
    var end_date = new Date($('#offer-end-date').val() + "T00:00:00");

    var offer = {
      airport: airport,
      start_date: start_date,
      end_date: end_date,
      author: Meteor.userId()
    };

    console.log("construction complete");
    $('#newOfferModal').modal('hide');
    Pickups.insert(offer);
  },

  // Save button saves the new stay offer. 
  'click #saveNewStayButton': function () {
    console.log('saveNewStayButton button is clicked');

    var address1 = $("#stay-address1").val();
    var address2 = $("#stay-address2").val();
    var city = $("#stay-city").val();
    var state = $("#stay-state").val();
    var zip = $("#stay-zip").val();
    var start_date = new Date($('#stay-start-date').val() + "T00:00:00");
    var end_date = new Date($('#stay-end-date').val() + "T00:00:00");

    var stay = {
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      start_date: start_date,
      end_date: end_date,
      author: Meteor.userId()
    };
    console.log("stay construction complete");
    $('#newStayModal').modal('hide');
    Stays.insert(stay);
  },
})