Template.uploadImage.events({
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
        else console.log(success);
      }
    );
  }
})