/**
 * razorNAFF Web Components application, bootstrapping to <main-app></main-app> element
 * @param name The name of the element to bootstrap too
 * @param private The object holding all properties for app (stops issues with binding loss on repeats in rivets), change this name if you wish
 * @function ready When the app is ready to rock, this is your main place for doing cool stuff
 */
naff.registerApplication({
	name: 'main-app',

	private: {
		route: 'partial-one',
		selected: {},
		content: 'Some binded content from main app!!'
	},

	created: function()
	{
		console.log('app created!!');
	},

	ready: function()
	{
		console.log('ready to rock!!');
	},

	location: function(newLoc, oldLoc)
	{
		console.log('location changed!!');

		this.private.route = newLoc.route || 'partial-one';
		this.private.selected = {};
		this.private.selected[newLoc.route] = true;
	},

	setRoute: function(event, route)
	{
		naff.setLocation({route: route});
	}
});
