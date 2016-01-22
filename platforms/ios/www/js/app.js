// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.Custcontrollers',
 'starter.Productcontrollers','starter.services', 'ngCordova','ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    .state('app', {
            url: "/",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'LoginCtrl'
    })

            .state('app.home', {
                    url: 'app/home',
                    views: {
                    'menuContent': {
        templateUrl: "templates/Home.html",
            controller: 'HomeCtrl'
                    }
                }

                })


     .state('app.acticeProduct', {
                    url: 'app/ActiceProduct?CustDtlName&&CustDtlCode',
                    views: {
         'menuContent': {
        templateUrl: 'templates/acticeProduct.html',
                controller: 'acticeProductCtrl'
         }
     }

     })





    .state('app.customer', {
        url: 'app/Customer',
    views: {
            'menuContent': {
        templateUrl: 'templates/customer.html',
                        controller: 'customerCtrl'
            }
        }

        })





    .state('app.activeProductByCustomer', {
            url: 'app/ActiveProductByCustomer?CustDtlCode&&StartDate&&EndDate',
        views: {
            'menuContent': {
                    templateUrl: 'templates/activeProductByCustomer.html',
                    controller: 'activeProductByCustomerCtrl'
                    }
        }

        })

    .state('app.product', {
                        url: 'app/Product',
                            views: {
                'menuContent': {
        templateUrl: 'templates/product.html',
            controller: 'productCtrl'
            }
            }

            })

    .state('app.pricing', {
                    url: 'app/Pricing',
                    views: {
            'menuContent': {
        templateUrl: 'templates/pricing.html',
            controller: 'pricingCtrl'
            }
        }

        })

    .state('app.orders', {
                url: 'app/Orders',
                templateUrl: 'templates/Orders.html',
        controller: 'OrderCtrl'
    })

      .state('app.reports', {
              url: 'app/Reports',
          views: {
              'menuContent': {
        templateUrl: 'templates/reports.html'
        }
          }

          })

     .state('app.selectCustomer', {
             url: 'app/SelectCustomer',
         views: {
             'menuContent': {
        templateUrl: 'templates/SelectCustomer.html',
                     controller: 'SelectCustCtrl'
             }
         }

     })
    .state('app.inactiveCustomer', {
        url: 'app/inactiveCustomer',
        views: {
            'menuContent': {
                templateUrl: 'templates/inactiveCustomer.html',
                controller: 'inactiveCustCtrl'
            }
        }

    })

    .state('app.inactiveCustomerDetails', {
        url: 'app/inactiveCustomerDetails?StartDate&EndDate',
        views: {
            'menuContent': {
                templateUrl: 'templates/inactiveCustomerDetails.html',
                controller: 'inactiveCustDtlCtrl'
            }
        }
    })
    

    .state('app.CustomerDetails', {
        url: 'app/CustomerDetails?CustCode&CustName&CustCodeName&ChannelName&CustMainConact&CustBillAddr&CustPhone&CustEmail&CustNote&CustLCM&CustTerrCode&CustTerrName&CustPGCode&CustPGName&CustWHCode&CustWHName&CustFrghtCode&CustDelvSchdl&CustPayTerm&CustShipAddr',
            views: {
            'menuContent': {
                templateUrl: 'templates/CustomerEdit/CustomerDtlEdit.html',
        controller: 'custDetailCtrl'
            }
            }
    })
        .state('app.SearchCust', {
            url: 'app/SearchCust',
            views: {
            'menuContent' : {
                templateUrl: 'templates/CustomerEdit/SelectCustForCustDtl.html',
                controller: 'custSearchDetailCtrl'
            }
            }
        })

         .state('app.InActiveSKUSelect', {
             url: 'app/InActiveSKUSelect?CustCode&CustName',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/InActiveSKUSelect.html',
                     controller: 'InActiveSKUSelectCtrl'
                 }
             }
         })

     .state('app.InActiveSKU', {
         url: 'app/InActiveSKU?CustCode&CustName&StartDate&EndDate',
         views: {
             'menuContent': {
                 templateUrl: 'templates/InActiveSKU.html',
                 controller: 'InActiveSKUCtrl'
             }
         }
     })

    .state('app.SelectProductForEdit', {
        url: 'app/SelectProductForEdit',
        views: {
            'menuContent': {
                templateUrl: 'templates/Product/SelectProductForEdit.html',
                controller: 'SelectProductForEditCtrl'
            }
        }
    })
        .state('app.ProductDetailEdit', {
            url: 'app/ProductDetailEdit?ProdCode&ProdDesc&ProdBrand&ProdVariant&ProdCatgry&ProdBarCode&ProdSize&CartnQty&UOM&COGS&RRP&ListPrice&TargetPrice&NHF',
          //  url: 'app/ProductDetailEdit?ProdDesc',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Product/ProductDetailEdit.html',
                    controller: 'ProductDetailEditCtrl'
                }
            }
        })

    ;



 $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("app.home");
});

})
.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
 
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
 
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});