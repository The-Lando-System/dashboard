(function() { 'use strict';

angular.module('dashboard')
.controller('UserMgmtController', UserMgmtController);

UserMgmtController.$inject = ['AuthService','UserFactory','MdlSnackbar','MdlDialog'];

function UserMgmtController(AuthService,UserFactory,MdlSnackbar,MdlDialog) {

	var vm = this;
	vm.headerMessage = "Manage Users";
	vm.userToDelete = {};
	vm.getUsers = getUsers;
	vm.deleteUser = deleteUser;
	vm.createOrEditUser = createOrEditUser;

	vm.openUserDialog = openUserDialog;
	vm.closeUserDialog = closeUserDialog;

	
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
		MdlDialog.confirm('Delete','Are you sure you want to delete this user?',
		function(confirmed){
			if (!confirmed){
				return;
			}
			vm.loading = true;
			UserFactory.delete(vm.userSession.token,user._id)
			.success(function(data){
				MdlSnackbar.success(data.message,2000);
				getUsers();
			})
			.error(function(data){
				MdlSnackbar.error(data.message,2000);
				vm.loading = false;
			});
		});
	};

	function createUser(user){
		vm.loading = true;
		UserFactory.create(vm.userSession.token,user)
		.success(function(data){
			MdlSnackbar.success(data.message,2000);
			getUsers();
			closeUserDialog();
		})
		.error(function(data){
			MdlSnackbar.error(data.message,2000);
			closeUserDialog();
			vm.loading = false;
		});
	};

	function updateUser(user){
		vm.loading = true;
		UserFactory.edit(vm.userSession.token,user._id,user)
		.success(function(data){
			MdlSnackbar.success(data.message,2000);
			getUsers();
			closeUserDialog();
		})
		.error(function(data){
			MdlSnackbar.error(data.message,2000);
			closeUserDialog();
			vm.loading = false;
		});
	};


  function openUserDialog(user){


  	if (vm.editMode && user){

  		vm.user = JSON.parse(JSON.stringify(user));
  		vm.user.password = '';
  		vm.userDialogTitle = 'Editing user ' + vm.user.username;

  		makeMdlInputsDirty();
  		makeMdlInputsValid();

  	} else {

  		vm.user = {};
  		vm.user.role = 'user';
  		vm.userDialogTitle = 'Creating new user';

  		makeMdlInputsClean();
  		makeMdlInputsValid();
  	}

  	MdlDialog.open('user');
  }

  function closeUserDialog(){
  	vm.user.email = ''; // No idea why I have to do this... wtf
  	MdlDialog.close('user');
  }

  function createOrEditUser(user){
  	
  	if (vm.editMode) {
  		updateUser(user);
  	} else {
  		createUser(user);
  	}

  }

  function makeMdlInputsDirty(){
  	var inputs = document.querySelectorAll('.mdl-textfield');
	for (var i=0; i<inputs.length; i++){
		inputs[i].classList.add('is-dirty');
	}
  }

  function makeMdlInputsClean(){
  	var inputs = document.querySelectorAll('.mdl-textfield');
	for (var i=0; i<inputs.length; i++){
		inputs[i].classList.remove('is-dirty');
	}
  }

  function makeMdlInputsValid(){
  	var inputs = document.querySelectorAll('.mdl-textfield');
	for (var i=0; i<inputs.length; i++){
		inputs[i].classList.remove('is-invalid');
	}
  }

  angular.element(document).ready(function () {
    componentHandler.upgradeAllRegistered();
    vm.userSession = AuthService.startUserSession();
    if (vm.userSession.user) {
      getUsers();
    }
  });

};

})();