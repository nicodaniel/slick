angular.module('app').directive('channelStatus', function() {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			element.bind("click", function() {
				console.log("clicked");
				scope.isClicked = !scope.isClicked;
				scope.$apply();
			});
			scope.$watch('isClicked', function(newValue, oldValue) {
				var el = document.getElementById("btn-circle");
					var angElement = angular.element(el);
				if (scope.isClicked) {
					element.css('background-color', '#FF8B00');
					angElement.addClass("btn-translateX");
				} else {
					element.css('background-color', '#2AB27B');
					var el = document.getElementById("btn");
					angElement.removeClass("btn-translateX");
				}
			});
		}
	};
});
