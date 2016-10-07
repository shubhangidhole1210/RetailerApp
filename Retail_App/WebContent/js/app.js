var retailApp = angular.module('retailApp', [ 'ngRoute' ])
retailApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).when('/signUp', {
		templateUrl : 'signUp.html',
		controller : 'signCtrl'
	}).when('/Electronics', {
		templateUrl : "Electronics.html"

	}).when('/Men', {
		templateUrl : "Men.html"

	}).otherwise({
		redirectTo : '/'
	});
});

retailApp.factory('displayLoginService', function() {

	var data = {
		isLoginVisible : false
	};

	return {
		isLoginVisible : function() {
			return data.isLoginVisible;
		},
		setIsLoginVisible : function(isLoginVisible) {
			data.isLoginVisible = isLoginVisible;
		}
	};
});

/*retailApp.directive('loading', function () {
 return {
 restrict: 'E',
 replace:true,
 template: '<div class="loading"><img src="../image/spinner.jpg" width="20" height="20" />LOADING...</div>',
 link: function ($scope, $element, $attr) {
 $scope.$watch('loading', function (val) {
 if (val)
 {
 $(element).show();
 }
 else
 {
 $(element).hide();
 }
 });
 }
 }
 })
 */
retailApp.controller('loginCtrl', function($scope, $location, $http, $timeout,
		displayLoginService,$rootScope) {
	$scope.test = 'test';
	//$scope.isLoginVisible = displayLoginService.isLoginVisible();
	$scope.showSpinner = false;
	$scope.cancelLogin = function(){
		$rootScope.isLoginVisible = false;
	};
	$scope.login = function() {
		$scope.showSpinner = true;
		var username = $scope.username;
		var password = $scope.password;
		$scope.errorMsg = '';
		if ($scope.username == 'admin' && $scope.password == 'admin') {
			$http.get("login.json").then(function(response) {

				/*$scope.loading = false;*/
				console.log((response.data.data.errorcode != '0000'));
				if (response.data.data.errorcode != '0000') {
					console.log("Error occurred!!!");
					$scope.errorMsg = response.data.data.message;

				} else {
					console.log("Login successful!!!");
					$location.path('/home');

				}
			});
			$http.get('/data.json').success(
					function(data, status, headers, config) {
						$timeout(function() {
							$scope.showSpinner = false;
						}, 3000);

					}).

			error(function(data, status, headers, config) {
				$timeout(function() {
					$scope.showSpinner = false;
				}, 3000);
			});
		} else {
			$scope.errorMsg= 'User Name Or Password may be wrong'
				document.getElementById("userName").className += " input-error";
			document.getElementById("Password").className += " input-error";
		}
		/* $scope.loading = true;*/

	};
	/*$scope.signUp=function()
	{
		$location.path('/SignUp')
	}*/

	$scope.hideMe = function() {
		$scope.show = true;
	}
});

retailApp.controller('displayLoginCtrl', function($scope, displayLoginService,$rootScope) {
	displayLoginService.setIsLoginVisible(false);
	$rootScope.isLoginVisible = false;
	$scope.displayLogin = function() {
		displayLoginService.setIsLoginVisible(true);
		$rootScope.isLoginVisible = true;
	}

});

retailApp.controller('signCtrl', function($scope) {

	$scope.submitForm = function() {

		if ($scope.userForm.$valid) {
			alert('user registraion sucessfully');
		} else {
			console.log("error occured");
		}
	};

});

retailApp.controller('searchCtrl', function($scope, $http) {
	$http.get("products.json").then(function(response) {
		$scope.searchInfo = response.data;
	});

});

retailApp.controller('cartCtrl', function($scope, $http) {
	$scope.cart = [];
	$http.get('products.json').success(function(response) {
		$scope.products = response.products
	});
	$scope.addCart = function(product) {
		var found = false;
		$scope.cart.forEach(function(item) {
			if (item.id == product.id) {
				item.quantity++;
				found = true;
			}
		});
		if (!found) {
			$scope.cart.push(angular.extend({
				quantity : 1
			}, product));
		}
	};
	$scope.getCartPrice = function() {
		var total = 0;
		$scope.cart.forEach(function(product) {
			total += product.price * product.quantity;
		});
		return total;
	};

	$scope.checkout = function() {
		$model.open({
			templateUrl : 'checkout.html',
			controller : 'checkoutCtrl',
			resolve : {
				totalAmount : $scope.getCartPrice
			}
		});
	};
});
retailApp.controller('CheckoutCtrl', function($scope, $totalAmount) {
	$scope.totalAmount = totalAmount;
	$scope.onSubmit = function() {
		$scope.processing = true;
	};
	$scope.stripeCallback = function(code, result) {
		$scpe.processing = false;
		$scope.hideAlerts();
		if (result.error) {
			$scope.stripeError = result.error.message;
		} else {
			$scope.stripeToken = result.id;
		}
	};
	$scope.hideAlerts = function() {
		$scope.stripeError = null;
		$scope.stripeToken = null;
	};

});

/* retailApp.controller('signCtrl', function($scope) {
   
        $scope.submitForm = function() {

            
            if ($scope.userForm.$valid) {
                alert('user registraion sucessfully');
            }

        };

    });*/