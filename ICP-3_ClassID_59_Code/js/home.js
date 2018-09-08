/**
 * Created by user on 24/02/2016.
 */
var myapp = angular.module( 'homeModule', ['googleOauth','FacebookProvider'] );

myapp.config( function (TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!

    // Sorry about this way of getting a relative URL, powers that be.

    var baseUrl = document.URL.replace( '/home.html', '' );
    TokenProvider.extendConfig( {
        clientId: '202317690708-062ts2disvkoi7lfm6strp08updu3n45.apps.googleusercontent.com',
        redirectUri: baseUrl + '/home.html',  // allow lunching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    } );
} );
myapp.controller( 'homeController', function ($scope, $http,$rootScope,$log, $window, Token, Facebook,$http,$location) {
    $scope.accessToken = Token.get()
    //  https://api.edamam.com/diet?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free
    $scope.recipelist = new Array();
    $scope.venueList = new Array();
    $scope.mostRecentReview;
    $scope.servingInGms = "";
    $scope.calories = "";
    $scope.getInfo = function () {
        $http.get( 'https://api.nutritionix.com/v1_1/search/'+$scope.recipe+'?results=0:1&fields=*&appId=0abf79d6&appKey=bc9686ad9f22ec303b3d501e75573b76' ).success( function (data1) {
            console.log( data1 );
            $scope.servingInGms = data1.hits[0].fields.nf_serving_weight_grams;
            $scope.calories = data1.hits[0].fields.nf_calories;
        } )

    };

    $scope.speak = function () {
        var audio = document.getElementById("myAudio");
        audio.src = "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username=54a38e9e-9d67-43fc-9f66-9db60cb5dceb&password=ZKQ3rarFZzpt&text="+$scope.recipe;
        audio.play();
    };



    $rootScope.updateSession = function () {
        //reads the session variables if exist from php
        $rootScope.session = "hello";

    };

    $rootScope.updateSession();


    // button functions
    $scope.getLoginStatus = function () {
        Facebook.getLoginStatus();

    };

    $scope.login = function () {
        Facebook.login();
    };

    $scope.logout = function () {
        Facebook.logout();
        console.log("inside");
        $rootScope.facebook_id = "";
    };

    $scope.unsubscribe = function () {
        Facebook.unsubscribe();
    }


} );


