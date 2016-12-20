/**
 * Created by nagar on 11/10/2016.
 */


angular.module('starter.routes', ['ngResource'])




      .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider


          .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          })


          .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl'
          })




          .state('menu', {
            url: '/menu',
            templateUrl: 'templates/menu.html',
            controller: 'menuCtrl'
          })


          .state('menu.home', {
            url: '/home',
            views: {
              'side-menu21': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
              }
            }
          })



          .state('menu.about', {
            url: '/about',
            views: {
              'side-menu21': {
                templateUrl: 'templates/about.html',
                controller: 'AboutCtrl'
              }
            }
          })



          .state('admin', {
            url: '/admin',
            templateUrl: 'templates/admin.html',
            controller: 'adminCtrl'

          })


          .state('fh', {
            url: '/fh',
            templateUrl: 'templates/fh.html',
            controller: 'fhCtrl'

          })



          .state('fhschedule', {
            url: '/fhschedule',
            templateUrl: 'templates/fhschedule.html',
            controller: 'fhscheduleCtrl'

          })

          .state('confirmfh', {
            url: '/confirmfh',
            templateUrl: 'templates/confirmfh.html',
            controller: 'confirmfhCtrl'
          })




          .state('mnl', {
            url: '/mnl',
            templateUrl: 'templates/mnl.html',
            controller: 'mnlCtrl'

          })



          .state('mnlschedule', {
            url: '/mnlschedule',
            templateUrl: 'templates/mnlschedule.html',
            controller: 'mnlscheduleCtrl'

          })

          .state('confirmmnl', {
            url: '/confirmmnl',
            templateUrl: 'templates/confirmmnl.html',
            controller: 'confirmmnlCtrl'
          })




          .state('rh', {
            url: '/rh',
            templateUrl: 'templates/rh.html',
            controller: 'rhCtrl'

          })



          .state('rhschedule', {
            url: '/rhschedule',
            templateUrl: 'templates/rhschedule.html',
            controller: 'rhscheduleCtrl'

          })

          .state('confirmrh', {
            url: '/confirmrh',
            templateUrl: 'templates/confirmrh.html',
            controller: 'confirmrhCtrl'
          })


          .state('menu.update', {
            url: '/update',
            views: {
              'side-menu21': {
                templateUrl: 'templates/update.html',
                controller: 'UpdateCtrl'
              }
            }
          })

          .state('menu.maps', {
            url: '/maps',
            views: {
              'side-menu21': {
                templateUrl: 'templates/maps.html',
                controller: 'MapsCtrl'
              }
            }
          })

          .state('menu.bookings', {
            url: '/bookings',
            views: {
              'side-menu21': {
                templateUrl: 'templates/bookings.html',
                controller: 'bookingsCtrl'
              }
            }
          })





        $urlRouterProvider.otherwise('/login');
      });
