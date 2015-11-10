angular.module('app').directive('channelStatus', function() {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			element.bind("click", function() {
				    scope.isClicked = !scope.isClicked;
				    scope.$apply();
			});
			scope.$watch('isClicked', function(newValue, oldValue) {
				if(scope.isClicked){
                    element.css('background-color', '#FF8B00');
				}else{
					element.css('background-color', '#2AB27B');
				}
            });   
		}
	};
});
