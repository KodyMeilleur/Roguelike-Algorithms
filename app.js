(function(){

	// define routes and their templates
	var $routes = {
		'foo': [
			{'template':'views/template1.html'}
		],
		'bar': [
			{'template':'views/template2.html'}
		],
		'home': [
			{'template':'views/template3.html'}
		]
	};

	init = function(){
		// count keys in routes
		var count = Object.keys($routes).length;

		// add anchor
		window.location.replace('#/home')

		$.each($routes,function(){
			var $route = this;

			// replace urls with HTML
			$.get($route[0].template,function(data){
				$route[0].template = data;
			})

			// wait until all promises finish, then navigate
			.success(function(){
				count--;
				if(count == 0)
					onNavigate();
			})
		})
	}

	onNavigate = function(event){
		var anchor;
		event ? anchor = event.hash.split('/')[1] : anchor = 'home';
		$("[custom-view]").html($routes[anchor][0].template);

	}
	init();
})();
