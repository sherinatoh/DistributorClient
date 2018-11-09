'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);

// Loading the Key File
function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
        result = xmlhttp.responseText;
        console.log("load key success")
    }
    console.log("File: " + result);
    return result;
}

loadFile("./view1/file.txt");
var picture = {};
picture.src = "";
console.log(picture);

// Decrypting the image
var data = new XMLHttpRequest();
// Put encrypted image URL inside
data.open('GET', 'http://server.com/pup.jpg.enc.b64', true);
data.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200) {
        var dec = CryptoJS.AES.decrypt(data.responseText, "password");
        var plain = CryptoJS.enc.Base64.stringify(dec);
        picture.src = "data:image/jpeg;base64," + plain;
        console.log(picture);
    }
};
data.send();