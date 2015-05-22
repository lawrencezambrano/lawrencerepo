angular.module('MyWishlist').controller('PurchasedController', function($scope, $filter, purchased) {

	$scope.GetPurchasedItems = function() {
		$scope.returnedPurchasedData = purchased.getItems();
		$scope.copyOfOriginal = purchased.getItems();
		$scope.CalculateTotalSpent();
	};

	$scope.PerformSearch = function() {

		var searchParameter = "";
		var temporalArray = $scope.copyOfOriginal;
		var newArray = [];

		if ($scope.txtSearch != undefined && $scope.txtSearch != "") {
			searchParameter = $scope.txtSearch;
			searchParameter = searchParameter.toUpperCase();

			for (var i = 0; i < temporalArray.length; i++) {

				var originalNameUpperCase = temporalArray[i].name.toUpperCase();
				if (originalNameUpperCase.indexOf(searchParameter) != -1) {
					newArray.push(temporalArray[i]);
				}
			}
			$scope.returnedPurchasedData = newArray;
		}
		else {
			$scope.returnedPurchasedData = $scope.copyOfOriginal;	
		}
		$scope.CalculateTotalSpent();
	};

	$scope.CalculateTotalSpent = function() {
		var tmpSpentMoney = 0;
		for (i = 0; i <= $scope.returnedPurchasedData.length - 1; i++) {
			tmpSpentMoney = tmpSpentMoney + parseInt($scope.returnedPurchasedData[i].price);
		}
		$scope.totalSpent = tmpSpentMoney;
	};

	$scope.GetPurchasedItems();
});