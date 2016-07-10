Template.about.events({

'click .js-add-file': function () {
    console.log('upload file is clicked');

    var file1 = document.getElementById('fileID1').files[0];

var randomNum=Math.random().toString(36).substr(2, 9);
var newName=randomNum+"_"+file1.name;

var options={};
options.params={newFileName:newName};

    AzureFile.upload(file1,"uploadFile",options,function(error,success){
                                                                    if (error) console.log(err);
                                                                    else console.log(success);
                                                                  }
                );
    }
});