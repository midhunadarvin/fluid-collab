angular.module('home')
.controller('HomeController', [
                 '$log',
                 '$scope',
                 '$location',
                 '$state',
							   'Authentication',
							   '$mdBottomSheet',
							   '$mdSidenav',
							   '$mdDialog',
                 'Projects',
							   function( $log,$scope,$location,$state,Authentication,$mdBottomSheet,$mdSidenav,$mdDialog,Projects ) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';

  // Initialize Dashboard
  $scope.dashboardInit = function(){

      if(Authentication.user)
        $scope.user = Authentication.user;
      else
        $state.go('index.signin');

      $scope.listProjects();
      
  }

  // Save project to database
  $scope.addProject = function(new_project){

      console.log("Saving project :");

      var project = new Projects(new_project);

      project.$save(function(response) {
        console.log("Project saved successfully : " + response);
        new_project = response.project;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
        console.log("Project save unsuccessfull : " + errorResponse.data.message);
      });
      
      $mdDialog.hide(new_project);
  };

  $scope.deleteProject = function(){

      $log.info('Deleting project');
      if (project) {
          project.$remove(function() {
            for (var i in $scope.projects) {
              if ($scope.projects[i] === project) {
                $scope.projects.splice(i, 1);
              }
            }
          });
      } else {
          $scope.project.$remove(function() {
            $location.path('projects');
          });
      }
  }

  // Get the list of projects from database
  $scope.listProjects = function(){

      console.log("Listing projects :");

      $scope.projects = Projects.query();
      //$scope.$apply();
  };

  // Show dialog box for adding new project
  $scope.showAddDialog = function(ev) {
      $mdDialog.show({
        controller: 'HomeController',
        templateUrl: '/home/views/dialogs/home.dialog.addProject.html',
        targetEvent: ev,
      })
      .then(function(project) {
        if(project)
          $scope.projects.unshift(project);
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
  };

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
  
  // Hide dialog box
  $scope.hide = function() {
    $mdDialog.hide();
  };

  // Cancel dialog box
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


	
}]);