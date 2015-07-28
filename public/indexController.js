angular.module('widget', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the main page
            .when('/', {
                templateUrl : './main.html',
                controller  : 'IndexController'
            })

            // route for the user page
            .when('/user', {
                templateUrl : './user.html',
                controller  : 'IndexController'
            })

            // route for the widget page
            .when('/widget', {
                templateUrl : './widget.html',
                controller  : 'IndexController'
            });

          //$locationProvider.html5Mode(true);
})
.controller('IndexController', function($scope, $http, $routeParams, $rootScope) {

  $scope.currentUser;
  $scope.showUsers = true;
  $scope.showOneUser = false;
  $scope.totalUsersArray = [];

  $scope.currentWidget;
  $scope.showWidgets = true;
  $scope.showOneWidget = false;
  $scope.totalWidgetsArray = [];

  $scope.makeCalls = function() {
    $http.get('http://spa.tglrw.com:4000/users')
    .success(function(data, status, headers, config) {
      $scope.totalUsersArray = data;
      $scope.totalUsersCount = $scope.totalUsersArray.length;
    })
    .error(function(data, status, headers, config) {
      console.log('theres been an error calling /users')
    })

    $http.get('http://spa.tglrw.com:4000/widgets')
    .success(function(data, status, headers, config) {
      $scope.totalWidgetsArray = data;
      $scope.totalWidgetsCount = $scope.totalWidgetsArray.length;
    })
    .error(function(data, status, headers, config) {
      console.log('theres been an error calling /widgets')
    })
  }

  $scope.makeCalls();

  $scope.goToUser = function(user) {
    $scope.currentUser = user;

    $scope.showUsers = !$scope.showUsers;
    $scope.showOneUser = !$scope.showOneUser;

    console.log('currentUser: ' + $scope.currentUser)
    console.log('showUsers: ' + $scope.showUsers)
    console.log('showOneUser: ' + $scope.showOneUser)
  }

  $scope.toggleWidget = function() {
    $scope.showWidgets = !$scope.showWidgets;
    $scope.showOneWidget = !$scope.showOneWidget;
  }

  $scope.getCurrentWidget = function(widget) {
    $scope.currentWidget = widget;
  }

  $scope.goToWidget = function(widget) {
    $scope.getCurrentWidget(widget);
    $scope.toggleWidget();
  }


  $scope.sendObject = {};
  $scope.sendObject.name = "";
  $scope.sendObject.color = "";
  $scope.sendObject.price  = "";
  $scope.sendObject.count  = 0;
  $scope.sendObject.properties  = false;

  $scope.sendObject.createWidget = function() {
    $http.post('http://spa.tglrw.com:4000/widgets', {
      "name":$scope.sendObject.name
      ,"color":$scope.sendObject.color
      ,"price":$scope.sendObject.price
      ,"inventory":$scope.sendObject.inventory
      ,"melts":$scope.sendObject.melts
    }).success(function(data, status, headers, config) {
      console.log('good!')
      $scope.totalWidgetsArray.push($scope.sendObject)
    }).error(function(data, status, headers, config) {
      console.log('bad!')
    })
  }

  $scope.editObject = {};
  $scope.editObject.id = "";
  $scope.editObject.name = "";
  $scope.editObject.color = "";
  $scope.editObject.price  = "";
  $scope.editObject.count  = 0;
  $scope.editObject.properties  = false;

  $scope.editObject.updateWidget = function() {
    $http.put('http://spa.tglrw.com:4000/widgets/' + $scope.editObject.id, {
      "name":$scope.editObject.name
      ,"color":$scope.editObject.color
      ,"price":$scope.editObject.price
      ,"inventory":$scope.editObject.inventory
      ,"melts":$scope.editObject.melts
    }).success(function(data, status, headers, config) {
      console.log('good!')
      $scope.totalWidgetsArray.splice($scope.editObject.id, 1, $scope.editObject);
      //$scope.$apply();
      //$scope.editObject = {};
    }).error(function(data, status, headers, config) {
      console.log('bad!')
    })
  }

})


