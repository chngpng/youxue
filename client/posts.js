Template.posts.helpers({
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

    getContentItemId(index) {
      return 'item' + index;
    }
})

Template.posts.events({
  'click #editEat': function (event, template) {
    console.log("edit eat clicked");
    var eatId = event.target.parentElement.getAttribute('doc-id');
    Router.go('eat.edit', {
      _id: eatId
    });
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
          console.log(success);
        }
      }
    );
  }
})