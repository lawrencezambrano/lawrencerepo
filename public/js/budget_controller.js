angular.module('MyWishlist').controller('BudgetController', function($scope, budget) {

	$scope.SaveBudget = function() {
		if (isNaN($scope.aBudget)) {
			alert("Budget must be a number");
		}
		else {
			budget.push($scope.aBudget);
			alert("Budget successfully set!");
		}
	};

});