angular.module('IonSky.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, DataService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.menuItems = DataService.getMenuItems();


})

.controller('PlaylistsCtrl', function ($scope, DataService, $stateParams, $rootScope) {

  function loadData(cat) {
    console.log('show');
    $rootScope.$emit('loading:show');
    return DataService.getCategory($stateParams.cat).then(function (data) {
      $scope.data = data;
      $rootScope.$emit('loading:hide');
    });
  }

  $scope.$on('$ionicView.beforeEnter', function () {
    loadData($stateParams.cat);
  });

})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});