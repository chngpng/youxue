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
      else 
      {
        return {
          center: new google.maps.LatLng(40.7128, -74.0059),
          zoom: 10
        }
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
    var stay = Stays.findOne({
      _id: docId
    });
    var latLng = {
      lat: stay.address.geopoint[1],
      lng: stay.address.geopoint[0]
    };
    console.log(latLng);

    var map = GoogleMaps.maps.map.instance;
    var marker = new google.maps.Marker({
      position: latLng,
    });
    map.setCenter(marker.getPosition());
    map.setZoom(15);
  },

  'click .contact-author': function (e, template) {
    Session.set("stayAuthor", this.authorId);
    e.stopPropagation();

    $('#messageModal').modal('show');
  },

  'click #messageInputSend': function (e, template) {
    var msg = document.getElementById("messageInputBox").value;
    var author = Meteor.users.findOne({
      _id: Session.get("stayAuthor")
    });
    if (msg && author) {
      var existingConv = getConversation(Meteor.user()._id, Session.get("stayAuthor"));
      var conv;

      // Try to find an existing conversation for the two participants. If none exists, 
      // then create a new conversation.
      if (existingConv) {
        console.log("found existing conv");
        conv = existingConv;
      } else {
        console.log("creating new conv");
        conv = new Conversation().save();
        conv.addParticipant(author);
      }
      conv.sendMessage(msg);
      Session.delete('stayAuthor');
    }
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

// Finds an existing conversation for the two participants.
var getConversation = function (participant1, participant2) {
  return Meteor.conversations.findOne({
    $and: [{
      '_participants': participant1
    }, {
      '_participants': participant2
    }]
  })
}