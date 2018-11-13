'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $window) {

    // Open file
    /*
    function getFile(fileName) {
        console.log("here")
        fileReader.readAsText($scope.file, $scope)
            .then( function(result) {
                console.log(result)
            }
        )
    }
    */

    // Loading the Key File
    function loadFile(filePath) {
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status === 200) {
            result = xmlhttp.responseText;
        }
        return result;
    }

    var raw_key = loadFile("./view1/file.txt")
    var raw_encryptedImage = loadFile("./view1/encrypted.jpg");

    //console.log(raw_key)
    //console.log(raw_encryptedImage)

    var key = CryptoJS.enc.Base64.parse(raw_key)
    var decrypted_image = CryptoJS.AES.decrypt(raw_encryptedImage, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var ans =  CryptoJS.enc.Base64.stringify( decrypted_image )
    console.log("decrypted string is: " + ans)

    $scope.image = "data:image/png;base64, " + ans


    /* WORKING TEXT VERSION
    var key = CryptoJS.enc.Base64.parse("VnKai2TUASBcWOkHfIsXGg==")
    var decrypted = CryptoJS.AES.decrypt("MftmgRSZQb3jDk+hAaz98w==", key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var ans = decrypted.toString(CryptoJS.enc.Utf8)
    console.log("decrypted string is: " + ans)
    */

    /*
    var encrypt = CryptoJS.AES.encrypt("message", key)
    var ans = encrypt.toString()
    console.log(ans)
    var trydecrypt = CryptoJS.AES.decrypt(ans, key)
    var ans2 = trydecrypt.toString(CryptoJS.enc.Utf8)
    console.log(ans2)
    //console.log(decrypted)
    */

    //$scope.picture = "./view1/cup.jpg";
    $scope.picture = "data:image/png;base64, " + ans

    var window = angular.element($window);

    var showImage = function () {
        $scope.picture = "data:image/png;base64, " + ans
        //$scope.picture = "./view1/cup.jpg"; // todo: set decrypted image here
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

    /*
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
    */
});

