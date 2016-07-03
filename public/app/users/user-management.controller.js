(function() { 'use strict';

angular.module('dashboard')
.controller('UserMgmtController', UserMgmtController);

UserMgmtController.$inject = ['AuthService','UserFactory','MdlSnackbar','MdlDialog','MdlUtils'];

function UserMgmtController(AuthService,UserFactory,MdlSnackbar,MdlDialog,MdlUtils) {

	var userVm = this;

	// Initialization ============================================

	userVm.getUsers = getUsers;
	userVm.deleteUser = deleteUser;
	userVm.createOrEditUser = createOrEditUser;
	userVm.openUserDialog = openUserDialog;
	userVm.closeUserDialog = closeUserDialog;

	initialize();

	function initialize(){
		componentHandler.upgradeAllRegistered();

		userVm.headerMessage = "Manage Users";
		userVm.userToDelete = {};
		userVm.loading = false;

    	userVm.userSession = AuthService.getUserSession();
	    if (userVm.userSession.user) {
	      getUsers();
	    }

	}

	// Interface Function Implementations ========================

	function getUsers(){
		userVm.loading = true;
		UserFactory.get(userVm.userSession.token)
		.success(function(data){
			userVm.users = data;
			userVm.loading = false;
		})
		.error(function(data){
			MdlSnackbar.error(data.message,2000);
			userVm.loading = false;
		});
	}

	function deleteUser(user){
		MdlDialog.confirm('Delete','Are you sure you want to delete this user?',
		function(confirmed){
			if (!confirmed){
				return;
			}
			userVm.loading = true;
			UserFactory.delete(userVm.userSession.token,user._id)
			.success(function(data){
				MdlSnackbar.success(data.message,2000);
				getUsers();
			})
			.error(function(data){
				MdlSnackbar.error(data.message,2000);
				userVm.loading = false;
			});
		});
	}

	function createOrEditUser(user){
	  	if (userVm.editMode) {
	  		updateUser(user);
	  	} else {
	  		createUser(user);
	  	}
	}

	function openUserDialog(user){

		if (userVm.editMode && user){

			userVm.user = JSON.parse(JSON.stringify(user));
			userVm.user.password = '';
			userVm.userDialogTitle = 'Editing user ' + userVm.user.username;

			MdlUtils.makeMdlInputsDirty();
			MdlUtils.makeMdlInputsValid();

		} else {

			userVm.user = {};
			userVm.user.role = 'user';
			userVm.userDialogTitle = 'Creating new user';

			MdlUtils.makeMdlInputsClean();
			MdlUtils.makeMdlInputsValid();
		}

		MdlDialog.open('user');
	}

	function closeUserDialog(){
		userVm.user.email = ''; // No idea why I have to do this... wtf
		MdlDialog.close('user');
	}

	// Helper Functions ==========================================

	function createUser(user){
		userVm.loading = true;
		UserFactory.create(userVm.userSession.token,user)
		.success(function(data){
			MdlSnackbar.success(data.message,2000);
			getUsers();
			closeUserDialog();
		})
		.error(function(data){
			MdlSnackbar.error(data.message,2000);
			closeUserDialog();
			userVm.loading = false;
		});
	};

	function updateUser(user){
		userVm.loading = true;
		UserFactory.edit(userVm.userSession.token,user._id,user)
		.success(function(data){
			MdlSnackbar.success(data.message,2000);
			getUsers();
			closeUserDialog();
		})
		.error(function(data){
			MdlSnackbar.error(data.message,2000);
			closeUserDialog();
			userVm.loading = false;
		});
	};


};

})();