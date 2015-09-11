angular.module('IonSky.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, DataService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  

  $scope.menuItems = DataService.getMenuItems();

  // Form data for the login modal
  $scope.loginData = {};

})

.controller('PlaylistsCtrl', function ($scope, DataService, $stateParams) {
  
  $scope.data = DataService.getCategory($stateParams.cat);

  $scope.doRefresh = function () {
    $scope.data = DataService.getCategory($stateParams.cat);
    $scope.$broadcast('scroll.refreshComplete');
  };
  
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});
