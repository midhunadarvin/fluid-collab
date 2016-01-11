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

  $scope.admin = [
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
  ];


  	 $scope.activity = [
      {
        what: 'Brunch this weekend?',
        who: 'Ali Conners',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Summer BBQ',
        who: 'to Alex, Scott, Jennifer',
        when: '3:08PM',
        notes: "Wish I could come out but I'm out of town this weekend"
      },
      {
        what: 'Oui Oui',
        who: 'Sandra Adams',
        when: '3:08PM',
        notes: "Do you have Paris recommendations? Have you ever been?"
      },
      {
        what: 'Birthday Gift',
        who: 'Trevor Hansen',
        when: '3:08PM',
        notes: "Have any ideas of what we should get Heidi for her birthday?"
      },
      {
        what: 'Recipe to try',
        who: 'Brian Holt',
        when: '3:08PM',
        notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
      },
    ];
	
}]);