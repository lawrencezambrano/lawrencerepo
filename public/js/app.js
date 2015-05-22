var MyWishlist = angular.module('MyWishlist', ['ngRoute', 'ngStorage']);

MyWishlist.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/wishlist/', {
                templateUrl: 'partials/wishlist.html',
                controller: 'WishlistController'
            }).
            when('/purchased/', {
                templateUrl: 'partials/purchased.html',
                controller: 'PurchasedController'
            }).
            when('/budget/', {
                templateUrl: 'partials/budget.html',
                controller: 'BudgetController'
            }).
            otherwise({
                redirectTo: '/wishlist/'
            });
    }
]);

MyWishlist.factory('wishlist', function() {
    var items = [];
    var myWishlistService = {};
    
    myWishlistService.addItem = function(item) {
        items.push(item);
    };

    myWishlistService.updateItem = function(originalItem, modifiedItem) {
        var index = items.indexOf(originalItem);
        if (index > 0) {
            items.splice(index, 1);
            items.push(modifiedItem);          
        }
    };

    myWishlistService.removeItem = function(item) {
        var index = items.indexOf(item);
        items.splice(index, 1);
    };

    myWishlistService.getItems = function() {
        return items;
    };
    
    return myWishlistService;
});

MyWishlist.factory('purchased', function() {
    var items = [];
    var myPurchasedService = {};
    
    myPurchasedService.addItem = function(item) {
        items.push(item);
    };

    myPurchasedService.getItems = function() {
        return items;
    };
    
    return myPurchasedService;
});

MyWishlist.service('budget', function () {
    var budget = [];
    return {
        get: function () {
            return budget
        },
        push: function (newBudget) {
            budget.splice(0, 1);
            budget.push({
                value: newBudget
            });
        }
    };
});