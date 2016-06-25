(function() { 'use strict';

angular.module('dashboard')
.controller('UserMgmtController', UserMgmtController);

UserMgmtController.$inject = ['$location','jwtHelper','AuthService','UserFactory','$scope','ConfirmDialogService','MdlSnackbar','MdlConfirm'];

function UserMgmtController($location,jwtHelper,AuthService,UserFactory,$scope,ConfirmDialogService,MdlSnackbar,MdlConfirm) {

	var vm = this;
	vm.headerMessage = "Manage Users";
	vm.newUser = { role: "user" };
	vm.editedUser = {};
	vm.userToDelete = {};
	vm.getUsers = getUsers;
	vm.deleteUser = deleteUser;
	vm.showNewUserModal = showNewUserModal;
	vm.hideNewUserModal = hideNewUserModal;
	vm.showEditUserModal = showEditUserModal;
	vm.hideEditUserModal = hideEditUserModal;
	vm.createUser = createUser;
	vm.updateUser = updateUser;

	vm.loading = false;


	function getUsers(){
		vm.loading = true;
		UserFactory.get(vm.userSession.token)
		.success(function(data){
			vm.users = data;
			vm.loading = false;
		})
		.error(function(data){
			MdlSnackbar.error(data.message,2000);
			vm.loading = false;
		});
	};


	function deleteUser(user){
		MdlConfirm.open('Delete','Are you sure you want to delete this user?',
		function(confirmed){
			if (!confirmed){
				return;
			}
			vm.loading = true;
			UserFactory.delete(vm.userSession.token,user._id)
			.success(function(data){
				MdlSnackbar.success(data.message,2000);
				getUsers();
				vm.loading = false;
			})
			.error(function(data){
				MdlSnackbar.error(data.message,2000);
				vm.loading = false;
			});
		});
	};

	function createUser(){
		vm.loading = true;
		UserFactory.create(vm.userSession.token,vm.newUser)
		.success(function(data){
			MdlSnackbar.success(data.message,2000);
			getUsers();
			vm.loading = false;
		})
		.error(function(data){
			MdlSnackbar.error(data.message,2000);
			vm.loading = false;
		});
		hideNewUserModal();
	};

	function updateUser(){
		vm.loading = true;
		UserFactory.edit(vm.userSession.token,vm.editedUser._id,vm.editedUser)
		.success(function(data){
			MdlSnackbar.success(data.message,2000);
			vm.loading = false;
		})
		.error(function(data){
			MdlSnackbar.error(data.message,2000);
			vm.loading = false;
		});
		hideEditUserModal();
	};

  function showNewUserModal(){
  	if(!vm.newUserDialog){
  		vm.newUserDialog = document.querySelector('#new-user-dialog');
  	}
  	vm.newUserDialog.showModal();
  };

  function hideNewUserModal(){
  	if(!vm.newUserDialog){
  		vm.newUserDialog = document.querySelector('#new-user-dialog');
  	}
  	vm.newUserDialog.close();
  	vm.newUser = { role: "user" };
  };

  function showEditUserModal(){
  	if(!vm.editUserDialog){
  		vm.editUserDialog = document.querySelector('#edit-user-dialog');
  	}
  	
  	vm.editUserDialog.showModal();
  };

  function hideEditUserModal(){
  	if(!vm.editUserDialog){
  		vm.editUserDialog = document.querySelector('#edit-user-dialog');
  	}
  	vm.editUserDialog.close();
  	vm.editedUser = {};
  };


	angular.element(document).ready(function () {
		componentHandler.upgradeAllRegistered();
		vm.userSession = AuthService.startUserSession();
		if (vm.userSession.user) {
			getUsers();
		} else {
			$location.path('login');
		}
	});

};

})();