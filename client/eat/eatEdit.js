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
    updateEat(this.eat);
    maybeRemoveEat(this.eat);
    Router.go('posts');
  },
  'click #eatCancel': function (event, template) {
    event.preventDefault();
    maybeRemoveEat(this.eat);
    Router.go('posts');
  },
  'click #addEatItem': function (event, template) {
    console.log("add item clicked");
    var newIndex = this.eat.content.length;
    var redirectUrl = '/eatEdit/' + this.eat._id + '/item/' + newIndex;

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

    window.location = redirectUrl;
  }
})

function isPopulated(eat) {
  return (eat.content && eat.content.length > 0) || eat.title || eat.description;
}

function maybeRemoveEat(eat) {
  if (!isPopulated(eat)) {
    Eats.remove({
      _id: eat._id
    });
  }
}

function updateEat(eat) {
  Eats.update({
    _id: eat._id
  }, {
    $set: {
      image: eat.image,
      title: eat.title,
      description: eat.description
    }
  });
}