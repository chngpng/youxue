Template.eats.helpers({
  eats() {
      return Eats.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    },

    getTitle(eat) {
      var title = eat.content[0].title;
      eat.content.slice(1, 3).forEach(
        function (c) {
          title += ", ";
          title += c.title;
        }
      )
      return title;
    },

    eatToSubscribe() {
      return Session.get('eatToSubscribe');
    },

    eatToAddImage() {
      return Session.get('eatToAddImage');
    },

    getContentItemId(index) {
      return 'item' + index;
    }
})

Template.eats.events({
  'click .js-add-eat': function () {
    console.log('add offer is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#eatModal').modal('show');
  },
  'click .image-add-done': function () {
    $('#imageModal').modal('hide');
  },
  'click .subscribe': function (e, template) {
    //Session.set("stayAuthor", this.authorId);
    //e.stopPropagation();

    //subscribe(this, Meteor.userId());
    Session.set('eatToSubscribe', this);
    $('#subscribeModal').modal('show');
  },
  'click #submitSubscribe': function (e, template) {
    console.log('submit subscribe is clicked');
    var eat = Session.get('eatToSubscribe');
    var quantities = [];
    for (i = 0; i < eat.content.length; i++) {
      var itemId = 'item' + i;
      console.log($('#' + itemId)[0].value);
      quantities.push({
        title: eat.content[i].title,
        quantity: $('#' + itemId)[0].value
      });
    }
    var subscribeRecord = {
      "eatId": eat._id,
      "subscriberId": Meteor.userId(),
      "quantities": quantities
    };
    EatSubscriptions.insert(subscribeRecord);
    $('#subscribeModal').modal('hide');
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
    var parentId = event.target.getAttribute("parent-id");
    var itemIndex = event.target.getAttribute("item-index");
    AzureFile.upload(
      file, "uploadFile", options,
      function (error, success) {
        if (error) console.log(error);
        else {
          imageFile = "https://lebusspicstg.blob.core.windows.net/pics/" + filename;
          var eat = Eats.findOne({
            "_id": parentId
          });
          if (itemIndex) {
            var items = eat.content;
            var item = items[itemIndex];
            item.image = imageFile;
            Eats.update({
              _id: parentId
            }, {
              $set: {
                content: items
              }
            });
          } else {
            Eats.update({
              _id: parentId
            }, {
              $set: {
                image: imageFile
              }
            });
          }
          Session.set("eatToAddImage", Eats.findOne({
            "_id": parentId
          }));
          console.log(success);
        }
      }
    );
  }
})

var eatFormHook = {
  onSuccess: function (update, result) {
    if (result) {
      $('#eatModal').modal('hide');
      var eatToAddImage = Eats.findOne({
        "_id": result
      });
      Session.set("eatToAddImage", eatToAddImage);
      $('#imageModal').modal('show');
      console.log("eatForm hook invoked");
      Router.go('eat.edit', {
        _id: result
      });
      //Router.go('about');
    }
  }
}
AutoForm.addHooks('eatForm', eatFormHook);

var subscribe = function (eat, userId) {
  if (eat.authorId == userId) {
    alert("Cannot subscribe to your own post.");
    return;
  }
  console.log("about to subscribe");

  var quantities = [];
  eat.content.forEach(function (item) {
    quantities.push({
      title: item.title,
      quantity: 2
    });
  });

  var subscriptionId = EatSubscriptions.insert({
    eatId: eat._id,
    subscriberId: userId,
    quantities: quantities
  });

  subscriptions = eat.subscriptions || [];
  subscriptions.push(subscriptionId);
  Eats.update({
    _id: eat._id
  }, {
    $set: {
      subscriptions: subscriptions
    }
  });
}