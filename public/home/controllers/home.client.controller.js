angular.module('home')
.controller('HomeController', ['$scope',
                 '$location',
							   'Authentication',
							   '$mdBottomSheet',
							   '$mdSidenav',
							   '$mdDialog',
							   function( $scope,$location,Authentication,$mdBottomSheet,$mdSidenav,$mdDialog ) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';

  $scope.dashboardInit = function(){
      $scope.user = Authentication.user;
  }
  // Bottom settings popup
	$scope.showListBottomSheet = function($event) {

	  $scope.alert = '';
	  $mdBottomSheet.show({
	      templateUrl: '/home/views/home.client.bottomsheet.html',
	      controller: 'HomeController',
	      targetEvent: $event
	  }).then(function(clickedItem) {
        if(clickedItem.link){
          $location.path(clickedItem.link);
        }
	  });

  };

  $scope.addProject = function(new_project){
      $mdDialog.hide(new_project);
  };

  $scope.showAdd = function(ev) {
      $mdDialog.show({
        controller: 'HomeController',
        templateUrl: '/home/views/dialogs/home.dialog.addProject.html',
        targetEvent: ev,
      })
      .then(function(project) {
        //$scope.alert = 'You said the information was "' + answer + '".';
        if(project)
          $scope.projects.unshift(project);
        //$scope.$apply();
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  // Bottomsheet menu items
  $scope.items = [
	    { name: 'Share', icon: 'share' },
	    { name: 'Upload', icon: 'upload' },
	    { name: 'Copy', icon: 'copy' },
      { name: 'Log out', link: '/signout',icon: 'logout' },
  ];
  
  $scope.listItemClick = function($index) {
	    var clickedItem = $scope.items[$index];
	    $mdBottomSheet.hide(clickedItem);
  };

  $scope.toggleSidenav = function(menuId) {
    	$mdSidenav(menuId).toggle();
  };

  $scope.menu = [
    {
      link : '',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link : '',
      title: 'Friends',
      icon: 'group'
    },
    {
      link : '',
      title: 'Messages',
      icon: 'message'
    }
  ];

  /*$scope.admin = [
    {
      link : '',
      title: 'Trash',
      icon: 'delete'
    },
    {
      link : 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'settings'
    }
  ];*/


  $scope.projects = [
      {
        title: 'Sample project 1',
        client: 'Max',
        time: '3:08PM',
        leader: "Midhun"
      },
      {
        title: 'Sample project 2',
        client: 'Vinay',
        time: '3:08PM',
        leader: "Midhun"
      },
      {
        title: 'Sample project 3',
        client: 'Lisa',
        time: '3:08PM',
        leader: "Midhun"
      },
      {
        title: 'Sample project 4',
        client: 'SomeClient',
        time: '3:08PM',
        leader: "Midhun"
      },
      {
        title: 'Sample project 5',
        client: 'SomeClient',
        time: '3:08PM',
        leader: "Midhun"
      }
  ];
	
}]);