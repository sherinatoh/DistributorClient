'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $window) {

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
    $scope.picture = "./view1/cup.jpg";

    var window = angular.element($window);

    var showImage = function () {
        $scope.picture = "./view1/cup.jpg"; // todo: set decrypted image here
    };

    var hideImage = function () {
        $scope.picture = "nothing"; // todo: set encrypted image here
    };

    window.on("focus", function() {
        console.log("focus in");
        $scope.$apply(showImage);
    });

    window.on("blur", function() {
        console.log("focus out");
        $scope.$apply(hideImage);
    });

    window.on("keydown", function() {
        console.log("key pressed");
        $scope.$apply(hideImage);
    });

    window.on("keyup", function() {
        console.log("key pressed");
        $scope.$apply(hideImage);
    });

    // Decrypting the image
    var data = new XMLHttpRequest();
    // Put encrypted image URL inside
    data.open('GET', 'http://server.com/pup.jpg.enc.b64', true);
    data.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200) {
            var dec = CryptoJS.AES.decrypt(data.responseText, "password");
            var plain = CryptoJS.enc.Base64.stringify(dec);
            $scope.picture = "data:image/jpeg;base64," + plain;
        }
    };
    data.send();
});

