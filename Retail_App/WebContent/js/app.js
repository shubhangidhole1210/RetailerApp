var retailApp = angular.module('retailApp', [ 'ngRoute' ])
retailApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).when('/signUp', {
		templateUrl : 'signUp.html',
		controller : 'signController'
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
		if(!$scope.username && !$scope.password)
			{
			     $scope.errorMsg='Please Enter Usename and Password'
			     document.getElementById("userName").focus();
			}
		else if(!$scope.password)
		{
			$scope.errorMsg='Please Enter Password'
				 document.getElementById("Password").focus();
		}
		else if ($scope.username == 'admin' && $scope.password == 'admin') {
			$http.get("login.json").then(function(response) {

				/*console.log((response.data.data.errorcode != '0000'));*/
				if (response.data.data.errorcode != '0000') {
					console.log("Error occurred!!!");
					$scope.errorMsg = response.data.data.message;

				} else {
					console.log("Login successful!!!");
					$scope.cancelLogin();
					$location.path('/home');
					

				}
			});
		} else  {
			$scope.errorMsg= 'User Name Or Password may be wrong'
				document.getElementById("userName").className += " input-error";
			document.getElementById("Password").className += " input-error";
		}
		

	};
	 $scope.signUp = function()
     {
    	 $location.path('/signUp')
     }

	$scope.hideMe = function() {
		$scope.show = true;
	}
	$scope.resetLoginData=function()
	{
		$scope.username=null;
		$scope.password=null;
		$scope.errorMsg=null;
		document.getElementById("Password").className = document.getElementById("Password").className.replace(" input-error","");
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



/*retailApp.controller(carouselCtrl, function($scope)
		{
	      $scope.myInterval = 3000;
	      $scope.slides=
	    	  [

                    {
                    	image: 'image/Galaxy S5-latest-samsung-phones.jpg/400/200'
	                 },
	                 {
	                	 image: 'image/galaxy-alpha-unbox_1.jpg/400/200'
	                 }
	    	   ];
	
		});
*/
retailApp.controller('signCtrl', function($scope) {

	$scope.submitForm = function() {

		if ($scope.userForm.$valid) {
			alert('user registraion sucessfully');
		} else {
			console.log("error occured");
		}
	};

});

retailApp.controller('carouselCtrl',function($scope)
		{
		
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
	
	$http.get('sellingProducts.json').success(function(response) {
		$scope.sellingProducts = response.sellingProducts
	});
	
	$http.get('bestProduct.json').success(function(response) {
		$scope.bestProduct = response.bestProduct
	});
	
	$http.get('electronicProduct.json').success(function(response) {
		$scope.electronicProduct = response.electronicProduct
	});
	
	$http.get('discountProduct.json').success(function(response) {
		$scope.discountProduct = response.discountProduct
	});
	
	$http.get('offerProduct.json').success(function(response) {
		$scope.offerProduct = response.offerProduct
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
var timer1;
function scrollDiv(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 2);
}

var timer1;
function scrollBestProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 4);
}

var timer1;
function scrollHomeProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 6);
}

var timer1;
function scrollElecronicProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 8);
}

var timer1;
function scrollDiscountProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 8);
}

var timer1;
function scrollOfferProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 9);
}



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

/*retailApp.controller('signCtrl' ,function($scope,displayLoginService,$rootScope)
		{
	$scope.cancelSign = function(){
		$rootScope.isLoginVisible = false;
	};
		$scope.sign = function()
		{
			var mobileNumber = $scope.mobileNumber;
			$scope.errorMsg = '';
			if(!$scope.mobileNumber)
				{
				$scope.errorMsg='Please Enter valid Number'
				     document.getElementById("mobileNumber").focus(); 
				}
			else
				{
				document.getElementById("mobileNumber").className += " input-error";
				}
		}
			});



retailApp.controller('signCtrl',function($scope)
{
	})*/

retailApp.controller('signController',function($scope,$location)
		{
	        
	});