Template.eatEditItem.events({
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
          var itemImage = document.getElementById('item-image');
          itemImage.setAttribute('src', imageFile);
        }
      }
    );
  },
  'click #deleteFile': function (event, template) {
    console.log("delete clicked");
    var itemImage = document.getElementById('item-image');
    itemImage.removeAttribute('src');
  },
  'click #itemSave': function (event, template) {
    event.preventDefault();
    var imageSrc = document.getElementById('item-image').getAttribute('src');
    var itemTitle = document.getElementById('itemTitle').value;
    var itemDescription = document.getElementById('itemDescription').value;
    var itemPrice = document.getElementById('itemPrice').value;
    if (!this.item) {
      this.item = {};
    }
    this.item.image = imageSrc;
    this.item.title = itemTitle;
    this.item.description = itemDescription;
    this.item.price = itemPrice;

    if (this.eat) {
      this.eat.content[this.itemId] = this.item;
      Eats.update({
        _id: this.eat._id
      }, {
        $set: {
          content: this.eat.content
        }
      });
      Router.go('eat.edit', {
        _id: this.eat._id
      });
    } else {
      var newEat = Session.get('newEat');
      if (!newEat.content) {
        newEat.content = [];
      }
      newEat.content.push(this.item);
      Session.set('newEat', newEat);
      Router.go('newEat');
    }
  },
  'click #itemCancel': function (event, template) {
    event.preventDefault();
    if (this.eat) {
      Router.go('eat.edit', {
        _id: this.eat._id
      });
    } else {
      Router.go('newEat');
    }
  }
})