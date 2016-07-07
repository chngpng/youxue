Template.about.events({

'click .js-add-file': function () {
    console.log('upload file is clicked');

    var file1 = document.getElementById('fileID1').files[0];

console.log(file1.name);
file1.name="ZNewFile1";
console.log(file1.name);

    AzureFile.upload(file1,"uploadFile",{},function(error,success){
                                                                    if (error) console.log(err);
                                                                    else console.log(success);
                                                                  }
                );
    }
});