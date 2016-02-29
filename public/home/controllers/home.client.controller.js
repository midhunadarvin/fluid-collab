angular.module('home')
.controller('HomeController', [
                 '$log',
                 '$rootScope',
                 '$scope',
                 '$timeout',
                 '$location',
                 '$state',
							   'Authentication',
							   '$mdBottomSheet',
							   '$mdSidenav',
							   '$mdDialog',
                 'cloudinary',
                 'Upload',
                 'Projects',
							   function( $log,$rootScope,$scope,$timeout,$location,$state,Authentication,$mdBottomSheet,$mdSidenav,$mdDialog,cloudinary,$upload,Projects ) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
  $scope.authentication = Authentication;

  // Initialize Dashboard
  $scope.dashboardInit = function(){

      if(Authentication.user)                      // Check if Authentication service has a user logged in
        $scope.user = Authentication.user;        
      else
        $state.go('index.signin');                 // Go back to login page   

      $rootScope.spinner = {};
      $rootScope.spinner.active = false;                // Turn loading spinner off initially.
      $scope.listProjects();                       // For listing all available projects
      
  };

  $scope.addProjectDialogInit = function(){
      $rootScope.spinner.active = false;
      $scope.new_project = {};
  }; 

  // Save project to database
  $scope.addProject = function(new_project){

      function saveProject() {
          // Create a new Projects resource object
          // We pass the new_project scope object as params 
          var project = new Projects(new_project);    

          $log.log("Saving project : ");
          //Make post request to the server
          project.$save(
            // Success function     
            function(response) {                                   
              $log.info("Project saved successfully : \n" + angular.toJson(response));
              $rootScope.spinner.active = false;
              $mdDialog.hide(response.project);
            }, 
            // Failure function
            function(errorResponse) {                   
              $scope.error = errorResponse.data.message;
              $log.error("Project save unsuccessfull : \n" + errorResponse.data.message);
              $rootScope.spinner.active = false;
              $mdDialog.hide();
            }
          );
      }

      //Check if files are set in scope.
      if ($scope.file && !$scope.file.$error) {

          // show loading spinner
          $rootScope.spinner.active = true;

          // Uploading image file to cloudinary
          $log.log("Uploading file to cloudinary database.");
          $scope.file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'thumbnail',
              file: $scope.file
            }
          }).progress(function (e) {
              $scope.file.progress = Math.round((e.loaded * 100.0) / e.total);
              $log.log("Uploading... " + $scope.file.progress + "%");
          }).success(function (data, status, headers, config) {
              //data.context = {custom: {photo: $scope.title}};
              //file.result = data;
              $log.info("File upload completed.");
              $log.info("File upload response data : \n" + angular.toJson(data));

              // setting the thumbnail property as uploaded image url.
              new_project.thumbnail = data.url;
              saveProject();
              
          }).error(function (data, status, headers, config) {
              $scope.files[0].result = data;
          });
      }else{
          saveProject();
      }
  };

  $scope.uploadFiles = function(file){
      $scope.file = file;
      if (!$scope.files) return;
  };
  
  // Delete a project from database
  $scope.deleteProject = function(id){

      $log.info('Deleting project');
      Projects.remove({ projectId: id },
            // Success function     
            function(response) {                                   
               $log.info("Deleted Response :\n"+ angular.toJson(response));

                for (var i in $scope.projects) {
                  if ($scope.projects[i]._id === response._id) {
                      $scope.projects.splice(i, 1);
                      $timeout(function() {
                        $scope.$apply();  
                      },2000);
                  }
                }
            }, 
            // Failure function
            function(errorResponse) {                   
              
            }
      );
      /*if (project) {
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
      }*/
  };

  $scope.editProject = function(id){
      alert(id);
  }

  // Get the list of projects from database
  $scope.listProjects = function(){
      console.log("Listing projects");
      $scope.projects = Projects.query();
  };

  // Show dialog box for adding new project
  $scope.showAddDialog = function(ev) {
      $scope.new_project = {};
      $mdDialog.show({
        controller: 'HomeController',
        templateUrl: '/home/views/dialogs/home.dialog.addProject.html',
        targetEvent: ev,
      })
      .then(function(project) {

        $log.info("Saved project response : \n" + angular.toJson(project));

        if(project){
          $scope.projects.unshift(project);
          $timeout(function() {
            $scope.$apply();  
          },2000);
            
        }
          
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

  $scope.navigate = function(link) {
      $location.path(link);
  };

  $scope.menu = [
    {
      link : '/projects',
      title: 'List Projects',
      icon: 'dashboard'
    },
    {
      link : '/projects/create',
      title: 'Create Projects',
      icon: 'group'
    },
    {
      link : '',
      title: 'Messages',
      icon: 'message'
    }
  ];


	
}]);