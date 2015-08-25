/**
 * razorNAFF Web Components application, bootstrapping to <main-app></main-app> element
 * @param name The name of the element to bootstrap too
 * @param private The object holding all properties for app (stops issues with binding loss on repeats in rivets), change this name if you wish
 * @function ready When the app is ready to rock, this is your main place for doing cool stuff
 */
naff.registerApplication({
	name: 'main-app',

	private: {
		menuItems: [{"route":"home","label":"Home","icon":"home"}],
		route: 'home',

		user: {},

		login: {username: null, password: null},
		register: {name: null, email: null, password: null, confirmPassword: null, human: 'Remove this text', error: true},
		reset: {email: null, password: null, confirmPassword: null, human: 'Remove this text', error: true},

		modal: {login: 0, register: 0, profile: 0, reset: 0},
		message: {toggle: 0, content: '', color: '', icon: ''}
	},

	created: function()
	{
		var scope = this;
		naff.request.token = naff.cookie.has('token') ? naff.cookie.get('token') : null;
		naff.request.get('rars/user/access').then(function(result)
		{
			scope.private.user = result.data;
			scope.private.modal.login = 0;
			scope.private.menuItems = [
				{"route":"home","label":"Home","icon":"home"},
				{"route":"one","label":"Page One","icon":"building"},
				{"route":"two","label":"Page Two","icon":"car"}
			];
		}).catch(function(result)
		{
			scope.private.user = {};
			naff.request.token = null;
			naff.cookie.remove('token');
		});
	},

	ready: function()
	{
		var loc = naff.getLocation();

		// check for activation
		if (loc.route == 'user-registration-activated')
		{
			this.private.message = {content: 'Your account is now activated, please log in', color: 'green', icon: 'info-circle'};
			this.private.message.toggle = 1;
			naff.setLocation({'route': 'home'});
		}

		// check for password reset
		if (loc.route == 'password-reset' && typeof loc.params.token !== 'undefined')
		{
			this.private.reset.token = loc.params.token;
			this.private.modal.reset = 1;
		}
	},

	location: function(newLoc, oldLoc)
	{
		this.private.route = newLoc.route || 'home';
	},

	setRoute: function(event, route)
	{
		naff.setLocation({route: route});
	},

	showLogin: function()
	{
		this.private.modal.login = 1;
		this.host.querySelector('.login-modal naff-input').scope.focus();
		this.private.login = {username: null, password: null};
	},

	login: function(event)
	{
		// check for key presses
		if (event.type == 'keypress' && event.keyCode != 13) return;

		var scope = this;
		naff.request.post('rars/user/access', this.private.login).then(function(result)
		{
			// create user and preload with some other data too for profile changes
		    scope.private.user = result.data;
			scope.private.modal.login = 0;
			scope.private.menuItems = [
				{"route":"home","label":"Home","icon":"home"},
				{"route":"one","label":"Page One","icon":"building"},
				{"route":"two","label":"Page Two","icon":"car"}
			];
			scope.private.message = {content: 'You are logged in', color: 'green', icon: 'info-circle'};
			scope.private.message.toggle = 1;

			var expires = new Date(Date.now() + 86400000); // cookie lasts 1 day
			naff.cookie.set('token', naff.request.token, expires);
		}).catch(function(result)
		{
		    scope.private.user = {};
			scope.private.message = {content: result.data.response, color: 'red', icon: 'exclamation-triangle'};
			scope.private.message.toggle = 1;
		});
	},

	passwordResetRequest: function(event)
	{
		var scope = this;
		naff.request.post('rars/user/reset', this.private.login).then(function(result)
		{
		    scope.private.message = {content: result.data, color: 'green', icon: 'info-circle'};
			scope.private.message.toggle = 1;
			scope.private.modal.login = 0;
		}).catch(function(result)
		{
			scope.private.message = {content: result.data.response, color: 'red', icon: 'exclamation-triangle'};
			scope.private.message.toggle = 1;
		});
	},

	passwordReset: function(event)
	{
		// check for key presses
		if (event.type == 'keypress' && event.keyCode != 13) return;

		var scope = this;
		naff.request.put('rars/user/reset', this.private.reset).then(function(result)
		{
			// create user and preload with some other data too for profile changes
		    scope.private.message = {content: result.data, color: 'green', icon: 'info-circle'};
			scope.private.message.toggle = 1;
		}).catch(function(result)
		{
			scope.private.message = {content: result.data.response, color: 'red', icon: 'exclamation-triangle'};
			scope.private.message.toggle = 1;
		});

		this.private.modal.reset = 0;
		this.private.reset = {email: null, password: null, confirmPassword: null, human: 'Remove this text', error: true};
		naff.setLocation({'route': 'home'});
	},

	logout: function()
	{
		this.private.message = {content: 'You are logged out', color: 'green', icon: 'info-circle'};
		this.private.message.toggle = 1;
		this.private.menuItems = [{"route":"home","label":"Home","icon":"home"}];
		this.private.user = {};
		naff.request.token = null;
		naff.cookie.remove('token');
		naff.setLocation({route: 'home'});
	},

	showRegister: function()
	{
		this.private.modal.register = 1;
		this.host.querySelector('.register-modal naff-input').scope.focus();
	},

	register: function(event)
	{
		if (event.type == 'keypress' && event.keyCode != 13) return;

		var scope = this;
		naff.request.post('rars/user/register', this.private.register).then(function(result)
		{
			scope.private.modal.register = 0;
			scope.private.register = {name: null, email: null, password: null, confirmPassword: null, human: 'Remove this text', error: true};
			scope.private.message = {content: result.data, color: 'green', icon: 'info-circle', toggle: 1};
		}).catch(function(result)
		{
			if (result.response.status == 401 || result.response.status == 406)
			{
				scope.private.modal.register = 0;
				scope.private.register = {name: null, email: null, password: null, confirmPassword: null, human: 'Remove this text', error: true};
			}
			scope.private.message = {content: result.data.response, color: 'red', icon: 'exclamation-triangle'};
			scope.private.message.toggle = 1;
		});
	},

	showProfile: function()
	{
		this.private.user.password = null;
		this.private.user.new_password = null;
		this.private.user.confirmNewPassword = null;
		this.private.user.error = true;
		this.private.user.safetyDelete = 0;
		this.private.user.safetyPassword = 0;
		this.private.user.delete = 0;
		this.private.modal.profile = 1;
	},

	profile: function(event)
	{
		var scope = this;
		naff.request.post('rars/user/profile', this.private.user).then(function(result)
		{
			scope.private.modal.profile = 0;
			scope.private.message = {content: result.data, color: 'green', icon: 'info-circle'};
			scope.private.message.toggle = 1;
			scope.private.user.password = null;
			scope.private.user.confirmPassword = null;
			scope.private.user.error = true;
		}).catch(function(result)
		{
			// did we delete
			if (result.response.status == 202)
			{
				scope.private.user = {};
				scope.private.modal.profile = 0;
				scope.private.message = {content: result.data, color: 'green', icon: 'info-circle'};
				setTimeout(function () { scope.logout(); }, 3500);
			}
			else scope.private.message = {content: result.data.response, color: 'red', icon: 'exclamation-triangle'};
			scope.private.message.toggle = 1;
		});
	},

	setConfirmPassword: function(event)
	{
		if (this.private.user.new_password === null || this.private.user.new_password.length < 1) this.private.user.newPasswordRequired = false;
		if (this.private.user.confirmNewPassword !== null && this.private.user.confirmNewPassword.length > 0) this.private.user.newPasswordRequired = false;
		this.private.user.newPasswordRequired = true;
	}
});
