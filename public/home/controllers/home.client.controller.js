angular.module('home')

.controller('HomeController', ['$scope',
							   'Authentication',
							   '$mdBottomSheet',
							   '$mdSidenav',
							   '$mdDialog',
							   function( $scope,Authentication,$mdBottomSheet,$mdSidenav,$mdDialog ) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';

	$scope.showListBottomSheet = function($event) {

	    $scope.alert = '';
	    $mdBottomSheet.show({
	      templateUrl: '/home/views/home.client.bottomsheet.html',
	      controller: 'HomeController',
	      targetEvent: $event
	    }).then(function(clickedItem) {
	      $scope.alert = clickedItem.name + ' clicked!';
	    });

  	};

  	$scope.items = [
	    { name: 'Share', icon: 'share' },
	    { name: 'Upload', icon: 'upload' },
	    { name: 'Copy', icon: 'copy' },
	    { name: 'Print this page', icon: 'print' },
  	];
  
  	$scope.listItemClick = function($index) {
	    var clickedItem = $scope.items[$index];
	    $mdBottomSheet.hide(clickedItem);
  	};
	
}]);