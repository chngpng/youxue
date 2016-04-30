Template.stays.helpers({
  stays() {
      return Stays.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    },

    geolocationError: function () {
      var error = Geolocation.error();
      return error && error.message;
    },

    mapOptions: function () {
      var latLng = Geolocation.latLng();
      if (GoogleMaps.loaded() && latLng) {
        return {
          //center: new google.maps.LatLng(40.7128, -74.0059),
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: 10
        };
      }
    }
})

Template.stays.onCreated(function () {
  GoogleMaps.ready('map', function (map) {
    //var latLng = Geolocation.latLng();

    //var marker = new google.maps.Marker({
    //  position: new google.maps.LatLng(latLng.lat, latLng.lng),
    //  map: map.instance
    //});

    Stays.find().forEach(function (e) {
      var geopoint = e.address.geopoint;
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(geopoint[1], geopoint[0]),
        map: map.instance
      });
    });
  });
});

Template.stays.events({
  'click .js-add-stay': function () {
    console.log('add stay is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#stayModal').modal('show');
  },

  'click .stay-card': function (e) {
    console.log('stay card is clicked');
    var docId = e.currentTarget.getAttribute("doc_id");
    console.log(docId);
    var stay = Stays.findOne({
      _id: docId
    });
    console.log(stay);
    //if (!Meteor.user()) {
    //  alert("Log in to post offers.");
    //  return
    //}
    //$('#stayModal').modal('show');
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