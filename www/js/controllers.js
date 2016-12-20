/**
 * Created by nagar on 11/9/2016.
 */
angular.module('starter.controllers',['ngResource','ngCordova'])

//*************************************//


  .run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(
          true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    //console.log("start time:" + $rootScope.startTime);
    //turning on bluetooth
    //********* USER PERMISSIONS *************
    //requesting user permissions for camera
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

    }

  })


  // LOGIN CONTROLLER


  .controller('LoginCtrl', function($scope, $state, $http, $window, $httpParamSerializerJQLike) {

    // $scope.data = {};
    $scope.pageClass = 'home';
    $scope.home = function() {
      console.log("home page !");
      $state.go('menu.home');
    }
    $scope.pageClass = 'login';
    $scope.login = function(email, password) {
      //console.log("inside login function");
      inside.getMethod();
      $scope.client=email;

      $scope.user1=email;
      $scope.pass1=password;
      console.log($scope.user1);
      console.log($scope.pass1);


      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//userdata?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',

        contentType: "application/json"
      }).success(function(response) {
        var list = response;
        var count=0;
        for (i = 0; i < list.length; i++) {


          if (list[i].email == email && list[i].password == password) {
            localStorage.setItem("name", list[i].name);
            localStorage.setItem("password", list[i].password);
            localStorage.setItem("id_user", list[i]._id.$oid);
            localStorage.setItem("email", list[i].email);
            localStorage.setItem("sid", list[i].studentid);
          //  alert("Login success");
            console.log("inside if loop");
            $state.go('menu.home');

          }
          else {
            //alert("Incorrect username/password");
            count++;

          }
        }
        if(count==list.length){
          document.getElementById('x').innerHTML = "Invalid Creditials! Please try again....";

        }
      })
    }
    $scope.loginadmin=function(){
      $state.go("admin");
    }
  })


  //end of login controller




  // register controller



  .controller('RegisterCtrl', function($scope, $state, $http,$ionicViewService, $ionicHistory,$window, $httpParamSerializerJQLike) {
    // $scope.data = {};
    $scope.pageClass = 'home';
    $scope.home = function() {
      console.log("home page !");
      $state.go('home');
    }
    $scope.pageClass = 'logout';
    $scope.logout = function() {

      console.log("logged out!");
      $state.go('login');
    }



    $scope.pageClass = 'register';
    $scope.register = function(name,studentid,email, password) {
      // $state.go('home');
      inside.postMethod();
      //console.log("inside register function");
      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//userdata?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',
        data: JSON.stringify({
          name: name,
          studentid:studentid,
          email: email,
          password: password

        }),
        contentType: "application/json"
      }).success(function() {

        $scope.name = "";
        $scope.studentid = "";
        $scope.email = "";
        $scope.password = "";

        alert("Thanks for registering with us  "+ name);
        $state.go('login');
        //$scope.msg ="User created successfully";
        //$window.location.href="index.html";
      })
    }
  })


// end of register


//MENU CONTROLLER

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])


  .controller('adminCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])





  //HOME CONTROLLER

  .controller('HomeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

      $scope.name=localStorage.getItem("name");

      console.log($scope.name);




    }])



  //FH Hall

  .controller('fhCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
    }])

  .controller('fhscheduleCtrl', function($scope, $state,$ionicPlatform,$http,$ionicViewService, $ionicHistory,$window, $httpParamSerializerJQLike) {




  $scope.checkvailability= function (date, choice) {


    date2=date.toString().substring(4,15);

    localStorage.setItem("date2", date2);
    localStorage.setItem("choice", choice);
    inside.getMethod();

    $http({
      method: 'GET',
      url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//timings?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',

      contentType: "application/json"
    }).success(function (response) {
      var list = response;

      var count = 0;
      for (i = 0; i < list.length; i++) {

        // console.log(list[i].date);
        console.log(date2);
        if (list[i].time==(choice) && list[i].date==(date2) && list[i].hall=="fh") {
          count++;
          // console.log(list[i].hall);


        }
        else {
          count = count;
        }
      }
      if (count == 0) {
        alert("slot available");
        $state.go("confirmfh");

      }
      else {
        alert("slot not available choose another time");
      }
      console.log("inside block1" + count);

    })


  }

       // $scope.checkvailability= function (dd,mm,year, choice) {
       //
       //   var date=dd+mm+year;
       //
       //   inside.getMethod();
       //   $http({
       //     method: 'GET',
       //     url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//timings?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',
       //
       //     contentType: "application/json"
       //   }).success(function (response) {
       //     var list = response;
       //     var donno = 0;
       //     var count = 0;
       //     for (i = 0; i < list.length; i++) {
       //       localStorage.setItem("date",date);
       //       localStorage.setItem("choice",choice);
       //       console.log(list[i].date);
       //       console.log(date);
       //       if (list[i].time==(choice) && list[i].date==(date) && list[i].hall=="fh") {
       //         count++;
       //         console.log(list[i].hall);
       //
       //
       //       }
       //       else {
       //         count = count;
       //       }
       //     }
       //     if (count == 0) {
       //       alert("slot available");
       //     }
       //     else {
       //       alert("slot not available");
       //     }
       //     console.log("inside block1" + count);
       //
       //   })
       //
       //
       // }


    })

  .controller('confirmfhCtrl', function($scope,$state,$http,$httpParamSerializerJQLike) {

    $scope.confirmslot = function () {

      $scope.date2 = localStorage.getItem("date2");

      $scope.choice = localStorage.getItem("choice");
      $scope.sid=localStorage.getItem("sid");


      inside.postMethod();


      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//timings?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',
        data: JSON.stringify({
          date: $scope.date2,
          time: $scope.choice,
          hall: "fh",
          studentid: $scope.sid
        }),
        contentType: "application/json"
      }).success(function () {
        $scope.date = "";

        $state.go('menu.home');

      })


    }
  })


//End of FH Hall


//Royal Hall

  .controller('rhCtrl', ['$scope', '$stateParams',

    function ($scope, $stateParams) {


    }])

  .controller('rhscheduleCtrl', function($scope, $state, $http,$ionicViewService, $ionicHistory,$window, $httpParamSerializerJQLike,$ionicPlatform,$cordovaDatePicker) {

//
// $scope.datePick = function() {
//   var options = {
//     date: new Date(),
//     mode: 'date', // or 'time'
//     minDate: new Date() - 10000,
//     allowOldDates: true,
//     allowFutureDates: false,
//     doneButtonLabel: 'DONE',
//     doneButtonColor: '#F2F3F4',
//     cancelButtonLabel: 'CANCEL',
//     cancelButtonColor: '#000000'
//   };
//
//
//   document.addEventListener("deviceready", function () {
//
//     $cordovaDatePicker.show(options).then(function (date) {
//       alert(date);
//     });
//   }, false);
//
// }


    $scope.checkvailability= function (date, choice) {


      date2=date.toString().substring(4,15);

      localStorage.setItem("date2", date2);
      localStorage.setItem("choice", choice);
      inside.getMethod();

      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//timings?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',

        contentType: "application/json"
      }).success(function (response) {
        var list = response;

        var count = 0;
        for (i = 0; i < list.length; i++) {

          // console.log(list[i].date);
          console.log(date2);
          if (list[i].time==(choice) && list[i].date==(date2) && list[i].hall=="rh") {
            count++;
            // console.log(list[i].hall);


          }
          else {
            count = count;
          }
        }
        if (count == 0) {
          alert("slot available");
          $state.go("confirmrh");

        }
        else {
          alert("slot not available");
        }
        console.log("inside block1" + count);

      })


    }

  })
  .controller('confirmrhCtrl', function($scope,$state,$http,$httpParamSerializerJQLike) {
    $scope.confirmslot = function () {

      $scope.date2 = localStorage.getItem("date2");

      $scope.choice = localStorage.getItem("choice");
      $scope.sid=localStorage.getItem("sid");


      inside.postMethod();


      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//timings?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',
        data: JSON.stringify({
          date: $scope.date2,
          time: $scope.choice,
          hall: "rh",
          studentid: $scope.sid
        }),
        contentType: "application/json"
      }).success(function () {
        $scope.date = "";

        $state.go('menu.home');

      })


    }
  })

//End Of Royal Hall


//MNL Library

  .controller('mnlCtrl', ['$scope', '$stateParams',

    function ($scope, $stateParams) {


    }])

  .controller('mnlscheduleCtrl', function($scope, $state, $http,$ionicViewService, $ionicHistory,$window, $httpParamSerializerJQLike,$ionicPlatform,$cordovaDatePicker) {



    $scope.checkvailability= function (date, choice) {


      date2=date.toString().substring(4,15);

      localStorage.setItem("date2", date2);
      localStorage.setItem("choice", choice);
      inside.getMethod();

      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//timings?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',

        contentType: "application/json"
      }).success(function (response) {
        var list = response;

        var count = 0;
        for (i = 0; i < list.length; i++) {

          // console.log(list[i].date);
          console.log(date2);
          if (list[i].time==(choice) && list[i].date==(date2) && list[i].hall=="mnl") {
            count++;
            // console.log(list[i].hall);


          }
          else {
            count = count;
          }
        }
        if (count == 0) {
          alert("slot available");
          $state.go("confirmmnl");

        }
        else {
          alert("slot not available choose another time");
        }
        console.log("inside block1" + count);

      })


    }
      })

  .controller('confirmmnlCtrl', function($scope,$state,$http,$httpParamSerializerJQLike) {

    $scope.confirmslot = function () {

      $scope.date2 = localStorage.getItem("date2");

      $scope.choice = localStorage.getItem("choice");
      $scope.sid=localStorage.getItem("sid");


      inside.postMethod();


      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//timings?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',
        data: JSON.stringify({
          date: $scope.date2,
          time: $scope.choice,
          hall: "mnl",
          studentid: $scope.sid
        }),
        contentType: "application/json"
      }).success(function () {
        $scope.date = "";

        $state.go('menu.home');

      })


    }
  })


//End Of MNL

.controller("UpdateCtrl", function($scope, $state, $http, $window, $httpParamSerializerJQLike) {
  $scope.pageClass = 'home';
  $scope.home = function() {
    console.log("home page !");
    $state.go('home');
  }
  $scope.pageClass = 'update';
  $scope.update = function(email, password) {

    // inside.putMethod(ch);

    var id = localStorage.getItem("id_user");
    //console.log("inside update function");
    $http({
      method: 'PUT',
      url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//userdata?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',
      data: JSON.stringify({

        "email": email,
        "password": password

      }),

      contentType: "application/json"


    }).success(function() {
      $scope.email = "";
      $scope.password = "";
      // $scope.email = "";
      alert("update successful");
      console.log("navigating to home page from update page");
      $state.go('menu.home');
    })
  }

})



.controller('MapsCtrl',function($scope, $state,  $ionicPlatform) {



  // ionic platform ready function
  $ionicPlatform.ready(function () {


    //displaying directions in external browser or google maps
    $scope.openDirections = function () {
      window.open('http://maps.google.com/maps?saddr=' + "&daddr=39.033743,-94.576425", '_system', 'location=yes');
    }; // end of open directions

    document.addEventListener('deviceready', function () {
      // cordova.plugins.email is now available
    }, false);


    //******** Beacon methods ************
    //window.plugin.backgroundMode.enable();
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

    }

  })
})

.controller('AboutCtrl', function($cordovaEmailComposer) {

  $cordovaEmailComposer.isAvailable().then(function() {
    // is available
  }, function () {
    // not available
  });

  var email = {
    to: 'max@mustermann.de',
    cc: 'erika@mustermann.de',
    bcc: ['john@doe.com', 'jane@doe.com'],
    attachments: [
      'file://img/logo.png',
      'res://icon.png',
      'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      'file://README.pdf'
    ],
    subject: 'Cordova Icons',
    body: 'How are you? Nice greetings from Leipzig',
    isHtml: true
  };

  $cordovaEmailComposer.open(email).then(null, function () {
    // user cancelled email
  });
})

.controller('bookingsCtrl', function($scope, $state, $http,$ionicViewService, $ionicHistory,$window, $httpParamSerializerJQLike,$ionicPlatform,$cordovaDatePicker) {

    $scope.getBooking= function () {
      $scope.sid = localStorage.getItem("sid");
      inside.getMethod();
      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/umkchallreservaton/collections//timings?apiKey=TyMceVeajhESTqinai_x0zrA6MCtM4PR',

        contentType: "application/json"
      }).success(function (response) {
        var list = response;
        var donno = 0;
        var count = 0;
        $scope.myHTML = "";
        for (i = 0; i < list.length; i++) {



          if (list[i].studentid == ($scope.sid)) {
            count++;
            console.log(list[i].date);
            console.log(list[i].time);
            // localStorage.setItem("date1", list[i].date);
            // localStorage.setItem("post1", list[i].time);

            var date1=list[i].date;
            var time1=list[i].time;

            $scope.myHTML +="Time : "+time1+" <br> "+"Date : " +date1 + " " + "<br><br>";



          }
          else {

            count = count;
          }
        }
        if (count == 0) {
          alert("no slots booked");
        }
        else {



        }
        console.log("inside block1" + count);

      })

    }
    $scope.videos = [];

    $scope.youtubeParams = {
      key: 'AIzaSyBg3LJIbYTZHMX6QfmP4ygowYa9HSTDsr8',
      type: 'video',
      maxResults: '5',
      part: 'id,snippet',
      q: 'power',
      order: 'date',

    }

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response) {
      angular.forEach(response.items, function (child) {
        // console.log(child);
      });

    })
  })
