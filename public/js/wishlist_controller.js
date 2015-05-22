angular.module('MyWishlist').controller('WishlistController', function($scope, wishlist, purchased, budget) {

	$scope.ValidateItem = function(action) {
		if (($scope.newWishlistItem.name == "" || $scope.newWishlistItem.name == undefined) || ($scope.newWishlistItem.description == "" || $scope.newWishlistItem.description == undefined) || ($scope.newWishlistItem.price == "" || $scope.newWishlistItem.price == undefined)) {
			alert("There are empty fields, please make sure you are adding all the required information.");
		}
		else {
			if (isNaN($scope.newWishlistItem.price)) {
				alert("Price field must be a number");
			}
			else{
				if (action == 1) {
					$scope.CreateItem();	
				}
				else {
					$scope.UpdateItem();
				}
			}
		}
	};

	$scope.CreateItem = function() {

		// Add the image in base64 format to the model
		$scope.MoveImagesToCanvas();

		// Add the current date to the model
		$scope.newWishlistItem.lastModifiedDate = new Date();

		// Add the new item
		wishlist.addItem($scope.newWishlistItem);

		// Receives the item from the service
		$scope.returnedWishlistData = wishlist.getItems();

		$scope.ResetView();
	};

	$scope.GetItemForEdition = function(itemForEdition) {
		$scope.newWishlistItem = itemForEdition;
		$scope.originalItem = itemForEdition;
		$("#divPreview").show("Slow");
		$scope.AddElement = false;
		$scope.UpdateElement = true;
	};

	$scope.UpdateItem = function() {
		// Add the image in base64 format to the model
		$scope.MoveImagesToCanvas();

		// Add the current date to the model
		$scope.newWishlistItem.lastModifiedDate = new Date();

		// Updates the existing item
		wishlist.updateItem($scope.originalItem, $scope.newWishlistItem);

		// Receives the item from the service
		$scope.returnedWishlistData = wishlist.getItems();

		$scope.ResetView();
	};

    $scope.MoveImagesToCanvas = function() {
        var image1 = document.querySelector("#uploadPreview1");

        var canvas1 = document.querySelector('#canvas');

        var ctx1 = canvas1.getContext('2d');

        ctx1.drawImage(image1, 0, 0, image1.width, image1.height);

        document.getElementById("canvas").src = canvas1.toDataURL('image/webp');
        var dataURL1 = canvas1.toDataURL("image/png");

        $scope.newWishlistItem.image = dataURL1;
    };

    $scope.MoveItemToPurchased = function(itemToBeMoved) {

    	var newBudgetAfterPurchase;

    	newBudgetAfterPurchase = parseInt($scope.currentBudget) - parseInt(itemToBeMoved.price);

    	if (newBudgetAfterPurchase < 0) {
    		alert("You don't have enough budget to purchase this item.");
    	}
    	else {
	    	purchased.addItem(itemToBeMoved);
	    	wishlist.removeItem(itemToBeMoved);
	    	budget.push(newBudgetAfterPurchase);
	    	$scope.currentBudget = newBudgetAfterPurchase;
    	}
    };

	$scope.LoadWishList = function() {
		// Get all the items from the wishlist service
		$scope.returnedWishlistData = wishlist.getItems();
		$scope.copyOfOriginal = wishlist.getItems();

		$scope.ResetView();
	};

	$scope.ResetView = function() {
		// Cleans the fields in the view
		$scope.newWishlistItem = {};

		// Hides the image preview
		$("#divPreview").hide("Slow");

		// Set a default image
		document.getElementById("uploadPreview1").src = "images/home/defaultimage.jpg";

		$scope.AddElement = true;
		$scope.UpdateElement = false;
	};

	$scope.LoadBudget = function() {
		var currentBudget = budget.get();
		
		if (currentBudget[0] != undefined) {
			$scope.currentBudget = currentBudget[0].value;
		}
		else {
			$scope.currentBudget = 0;
		}
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
			$scope.returnedWishlistData = newArray;
		}
		else {
			$scope.returnedWishlistData = $scope.copyOfOriginal;	
		}
	};

	$scope.ResetView();
	$scope.LoadWishList();
	$scope.LoadBudget();
    

    
});