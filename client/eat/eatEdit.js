Template.eatEdit.helpers({
  autoSaveMode: function () {
    return Session.get("autoSaveMode") ? true : false;
  },
  getEat: function () {
    var eatId = Eats.findOne(Session.get("eatEditId"))
    console.log(eatId);
    var eat = Eats.findOne(Session.get("eatEditId"))
    console.log(eat);
    return Eats.findOne(Session.get("eatEditId"));
  },
  formType: function () {
    if (Session.get("eatEditId")) {
      return "update";
    } else {
      return "disabled";
    }
  },
  disableButtons: function () {
    return !Session.get("eatEditId");
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
          console.log(imageFile);
          //var eat = Eats.findOne({
          //  "_id": parentId
          //});
          //if (itemIndex) {
          //  var items = eat.content;
          //  var item = items[itemIndex];
          //  item.image = imageFile;
          //  Eats.update({
          //    _id: parentId
          //  }, {
          //    $set: {
          //      content: items
          //    }
          //  });
          //} else {
          //  Eats.update({
          //    _id: parentId
          //  }, {
          //    $set: {
          //      image: imageFile
          //    }
          //  });
          //}
          //console.log(success);
        }
      }
    );
  }
})

Template.eatEdit.events({
  'click .clickable-row': function (event, template) {
    var redirectUrl = event.target.parentElement.getAttribute('data-href');
    window.location = redirectUrl;
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
        else {
          imageFile = "https://lebusspicstg.blob.core.windows.net/pics/" + filename;
          console.log(imageFile);
          var eatImage = document.getElementById('eatImage');
          eatImage.setAttribute('src', imageFile);
        }
      }
    );
  },
  'click #deleteFile': function (event, template) {
    console.log("delete clicked");
    var eatImage = document.getElementById('eatImage');
    eatImage.removeAttribute('src');
  },
  'click #eatSave': function (event, template) {
    event.preventDefault();
    var imageSrc = document.getElementById('eatImage').getAttribute('src');
    var eatTitle = document.getElementById('eatTitle').value;
    var eatDescription = document.getElementById('eatDescription').value;
    this.eat.image = imageSrc;
    this.eat.title = eatTitle;
    this.eat.description = eatDescription;
    Eats.update({
      _id: this.eat._id
    }, {
      $set: {
        image: this.eat.image,
        title: this.eat.title,
        description: this.eat.description
      }
    });
    Router.go('eat.edit', {
      _id: this.eat._id
    });
  },
  'click #eatCancel': function (event, template) {
    event.preventDefault();
    Router.go('eat.edit', {
      _id: this.eat._id
    });
  },
  'click #addEatItem': function (event, template) {
    console.log("add item clicked");
    var newIndex = this.eat.content ? this.eat.content.length : 0;
    var redirectUrl = this.eat._id ? '/eatEdit/' + this.eat._id + '/item/' + newIndex : '/newEat/item';

    var imageSrc = document.getElementById('eatImage').getAttribute('src');
    var eatTitle = document.getElementById('eatTitle').value;
    var eatDescription = document.getElementById('eatDescription').value;
    if (imageSrc) {
      this.eat.image = imageSrc;
    }
    if (eatTitle) {
      this.eat.title = eatTitle;
    }
    if (eatDescription) {
      this.eat.description = eatDescription;
    }

    Session.set("newEat", JSON.parse(JSON.stringify(this.eat)));
    //window.location = redirectUrl;
    Router.go('eatItem.new', {
      newEat: this.eat
    });
  }
})