 Meteor.methods({
 
    'uploadFile': function(file) {
     /* Remember the method name must match the method name from the client call. The parameters passed from the client can be referenced by file.paramname */
    var response;
    
    var randomNum=Math.random().toString(36).substr(2, 9);
    var newFileName=randomNum+"_"+file.name;


    if (file === void 0) {
      throw new Meteor.Error(500, "Missing File", "", "");
    }
    response = file.azureUpload(newFileName, "lebusspicstg", "InS00WKV6L/CDwX0FzqV5w4B2Hyph3gZFaLhdXgFD1uU7ew1AH0svubCVlpmA5xMCmC6lbikkQ4u5smBoiuaUw==", "pics");
    return console.log(response); 
    /* Once file is completely uploaded you get a url in the response . 
    Remember the file is uploaded in chunks so this function will be triggered multiple times. 
    The response will contain the url parameter only if the file is completely uploaded */
  }

 });