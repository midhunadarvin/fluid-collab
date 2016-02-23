angular.module('home')
.controller('HomeController', [
                 '$log',
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
							   function( $log,$scope,$timeout,$location,$state,Authentication,$mdBottomSheet,$mdSidenav,$mdDialog,cloudinary,$upload,Projects ) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
  $scope.authentication = Authentication;

  // Initialize Dashboard
  $scope.dashboardInit = function(){

      if(Authentication.user)                      // Check if Authentication service has a user logged in
        $scope.user = Authentication.user;        
      else
        $state.go('index.signin');                 // Go back to login page   

      $scope.listProjects();                       // For listing all available projects
      
  }

  $scope.addProjectDialogInit = function(){
      $scope.new_project = {};
  } 

  // Save project to database
  $scope.addProject = function(new_project){

      //Check if files are set in scope.
      if ($scope.files[0] && !$scope.files[0].$error) {

          // Uploading image file to cloudinary
          $log.log("Uploading file to cloudinary database.");
          $scope.files[0].upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'thumbnail',
              file: $scope.files[0]
            }
          }).progress(function (e) {
              $scope.files[0].progress = Math.round((e.loaded * 100.0) / e.total);
              $log.log("Uploading... " + $scope.files[0].progress + "%");
          }).success(function (data, status, headers, config) {
              //data.context = {custom: {photo: $scope.title}};
              //file.result = data;
              $log.info("File upload completed.");
              $log.info("File upload response data : \n" + angular.toJson(data));

              // setting the thumbnail property as uploaded image url.
              new_project.thumbnail = data.url;
              
              // Create a new Projects resource object
              // We pass the new_project scope object as params 
              var project = new Projects(new_project);    

              $log.log("Saving project : ");
              //Make post request to the server
              project.$save(
                // Success function     
                function(response) {                                   
                  $log.info("Project saved successfully : \n" + angular.toJson(response));
                  $mdDialog.hide(response.project);
                }, 
                // Failure function
                function(errorResponse) {                   
                  $scope.error = errorResponse.data.message;
                  $log.error("Project save unsuccessfull : \n" + errorResponse.data.message);
                  $mdDialog.hide();
                }
              );
              
          }).error(function (data, status, headers, config) {
              $scope.files[0].result = data;
          });
      }

      
  };

  $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;

      /*angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'thumbnail',
              file: file
            }
          }).progress(function (e) {
              file.progress = Math.round((e.loaded * 100.0) / e.total);
              //file.status = "Uploading... " + file.progress + "%";
              $log.info("Uploading... " + file.progress + "%");
          }).success(function (data, status, headers, config) {
              data.context = {custom: {photo: $scope.title}};
              file.result = data;
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });*/

  };
  
  // Delete a project from database
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
  }

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