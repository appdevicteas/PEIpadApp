angular.module('starter.controllers', ['ngCookies'])

    .controller('AppCtrl', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
        $scope.username = AuthService.username();

        $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
            var alertPopup = $ionicPopup.alert({
                title: 'Unauthorized!',
                template: 'You are not allowed to access this resource.'
            });
        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
            AuthService.logout();
            $state.go('login');
            var alertPopup = $ionicPopup.alert({
                title: 'Session Lost!',
                template: 'Sorry, You have to login again.'
            });
        });

        $scope.setCurrentUsername = function (name) {
            $scope.username = name;
        };
    })
.controller('LoginCtrl', ['$scope', '$state', '$http', 'AuthService', '$cookieStore', '$ionicPopup', function ($scope, $state, $http, AuthService, $cookieStore, $ionicPopup) {

    $scope.data = {};
    $scope.LoginData = [];
    var url = '';
    $scope.UserId = $cookieStore.get('LoginUserId');
    $scope.CountryData = [
        { ID: "1", Name: "Austrailia" },
        { ID: "2", Name: "MiddleEast" }
    ];



    $scope.logout = function () {
        AuthService.logout();
        $state.go("login");
    };

    $scope.login = function (data) {
        if (!angular.isDefined(data.username) || !angular.isDefined(data.password) || data.username.trim() == "" || data.password.trim() == "") {
            alert("Enter both user name and password");
            return;
        }


        var Paramdata = {
            USER_ID: data.username,
            COUNTRY_ID: data.CountryId.ID,
            PASSWORD: data.password
        };

        $http.get('http://bpdemos.icteas.com/PEMobileAppApi/api/users?id=' + JSON.stringify(Paramdata)).success(function (data, status, headers, config) {
            console.log("**** SUCCESS ****");
            console.log(status);
        })
            .error(function (data, status, headers, config) {
                console.log("**** ERROR ****");
                console.log(status);
            })


                .then(function (response) {

                    var jsonData = response.data;

                    $scope.LoginData = jsonData;

                    if ($scope.LoginData[0].isvalid == 'Y') {


                        AuthService.login(data.username, data.password, data.CountryId.ID, $scope.LoginData[0].token).then(function (authenticated) {
                            $state.go('app.home', {}, { reload: true });
                            $scope.setCurrentUsername(data.username);
                        }, function (err) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Login failed!',
                                template: 'Please check your credentials!'
                            });
                        });
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Login failed!',
                            template: LoginData[0].MESSAGE_LOGIN
                        }
                        )
                    }
                });



    };



}])




    .controller('PlaylistsCtrl', function ($scope, $http) {
        $scope.playlists = [];
        $http({

            url: 'http://turfviewdebug.icteas.com/PricingWebService/MobileAppService.svc/GetPlayList/',
            method: 'GET'

        }).success(function (data, status, headers, config) {
            console.log("**** SUCCESS ****");
            console.log(status);
        })
        .error(function (data, status, headers, config) {
            console.log("**** ERROR ****");
            console.log(status);
        })


            .then(function (response) {



                var jsonData = response.data.GetPlayListResult;

                $scope.playlists = jsonData;

                //var jsonKeys = Object.keys(jsonData);

                //for (var i = 0; i < jsonKeys.length; i++) {
                //    var jsonSingle = jsonData[jsonKeys[i]];
                //    playlists.push(jsonSingle);
                //}



                //$scope.playlists = response.data.GetPlayList;
            });

    })



.controller('HomeCtrl', function ($scope, $ionicSideMenuDelegate, $cookieStore) {

    $scope.UserId = $cookieStore.get('LoginUserId');


    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

})


.controller('reportsCtrl', function ($scope) {


    $scope.UserId = $cookieStore.get('LoginUserId');


    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

})

.controller('acticeProductCtrl', function ($scope, $state, $stateParams, $http, $filter, $ionicPopup) {

    $scope.custDetail = {};
    $scope.Startdate = {};
    $scope.EndDate = {};

    if ($stateParams.CustDtlName) {
        $scope.custDetail.CustDtlName = $stateParams.CustDtlName;
        $scope.custDetail.CustDtlCode = $stateParams.CustDtlCode;
    }

    //$scope.Startdate = new Date().toDateString();
    //$scope.EndDate = new Date().toDateString();



    var disabledDates = [
      new Date(1437719836326),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2013'), //Works with any valid Date formats like long format
      new Date("08-14-2013"), //Short format
      new Date(1439676000000), //UNIX format
      new Date(),
      new Date(2013, 10, 8)
    ];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    $scope.dtStartDate = {};
    $scope.dtStartDate.inputDate = new Date();
    $scope.dtEndDate = {};
    $scope.dtEndDate.inputDate = new Date();


    $scope.dtStartDatePopup = {
        titleLabel: 'Start Date', //Optional
        todayLabel: 'Today', //Optional
        closeLabel: 'Close', //Optional
        setLabel: 'Set', //Optional
        errorMsgLabel: 'Please select time.', //Optional
        setButtonType: 'button-assertive', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        templateType: 'popup', //Optional
        inputDate: $scope.dtStartDate.inputDate, //Optional
        mondayFirst: false, //Optional
        disabledDates: disabledDates, //Optional
        monthList: monthList, //Optional
        from: new Date(2013, 0, 1), //Optional
        callback: function (val) { //Optional
            dtStartDateCallbackPopup(val);
        }
    };



    var dtStartDateCallbackPopup = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dtStartDatePopup.inputDate = val;
            console.log('Selected date is : ', val)
        }
    };


    $scope.dtEndDatePopup = {
        titleLabel: 'End Date', //Optional
        todayLabel: 'Today', //Optional
        closeLabel: 'Close', //Optional
        setLabel: 'Set', //Optional
        errorMsgLabel: 'Please select time.', //Optional
        setButtonType: 'button-assertive', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        templateType: 'popup', //Optional
        inputDate: $scope.dtEndDate.inputDate, //Optional
        mondayFirst: false, //Optional
        disabledDates: disabledDates, //Optional
        monthList: monthList, //Optional
        from: new Date(2013, 0, 1), //Optional
        callback: function (val) { //Optional
            dtEndDateCallbackPopup(val);
        }
    };


    var dtEndDateCallbackPopup = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dtEndDatePopup.inputDate = val;
            console.log('Selected date is : ', val)
        }
    };


    //$scope.formats = ['dd/MM/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    //$scope.format = $scope.formats[0];

    $scope.GetProdData = function () {
        if ($stateParams.CustDtlName) {

            var dtstartDate = $scope.dtStartDatePopup.inputDate.getDate() + '-' + ($scope.dtStartDatePopup.inputDate.getMonth() + 1) + '-' + $scope.dtStartDatePopup.inputDate.getFullYear();
            var dtEndDate = $scope.dtEndDatePopup.inputDate.getDate() + '-' + ($scope.dtEndDatePopup.inputDate.getMonth() + 1) + '-' + $scope.dtEndDatePopup.inputDate.getFullYear();

            $state.go('app.activeProductByCustomer', { CustDtlCode: $scope.custDetail.CustDtlCode, StartDate: dtstartDate, EndDate: dtEndDate });
        }

    };

    //$scope.custList = {};  

    //$scope.custList=SeletctedCustlist.GetCustData();

})

.controller('customerCtrl', function ($scope) {

})

.controller('activeProductByCustomerCtrl', function ($scope, $http, $state, $stateParams, $ionicLoading) {

    $scope.ProdLists = [];
    $scope.custDetail = [];

    $ionicLoading.show({
        template: '<img src="img/output_LoXQFP.gif">',
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    if ($stateParams.CustDtlCode) {
        $scope.custDetail.CustDtlCode = $stateParams.CustDtlCode;
        $scope.custDetail.StartDate = $stateParams.StartDate;
        $scope.custDetail.EndDate = $stateParams.EndDate;
        $scope.custDetail.Country = "1";
    }

    var Paramdata = {
        CountryId: $scope.custDetail.Country,
        CUSTCODE: $scope.custDetail.CustDtlCode,
        StartDate: $scope.custDetail.StartDate,
        EndDate: $scope.custDetail.EndDate,
    };

    $http.get('http://bpdemos.icteas.com/PEMobileAppApi/api/product/GetActiveProductByCustomer?id=' + JSON.stringify(Paramdata)).success(function (data, status, headers, config) {
        console.log("**** SUCCESS ****");
        console.log(status);
    })
        .error(function (data, status, headers, config) {
            console.log("**** ERROR ****");
            console.log(status);
        })



            .then(function (response) {


                $ionicLoading.hide();
                var jsonData = response.data;

                $scope.ProdLists = jsonData;
                
            });

})


.controller('productCtrl', function ($scope) {

})

.controller('pricingCtrl', function ($scope) {

})

.controller('OrderCtrl', function ($scope) {

})

.controller('SelectCustCtrl', function ($scope, $state, $http, $cookieStore,$ionicLoading) {

    $scope.custLists = [];
    $scope.input = {};

    $ionicLoading.show({
        template: '<img src="img/output_LoXQFP.gif">',
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var UserId = $cookieStore.get('LoginUserId');
    var CountryID = $cookieStore.get('LoginCountryId');

    var Paramdata = {
        USER_ID: UserId,
        COUNTRY_ID: CountryID
    };

    $http.get('http://bpdemos.icteas.com/PEMobileAppApi/api/customers/GetCustForActiveProduct?id=' + JSON.stringify(Paramdata)).success(function (data, status, headers, config) {
        console.log("**** SUCCESS ****");
        console.log(status);
    })
        .error(function (data, status, headers, config) {
            console.log("**** ERROR ****");
            console.log(status);
        })
            .then(function (response) {

                $ionicLoading.hide();

                var jsonData = response.data;

                $scope.custLists = jsonData;

            });




    //var arrData = {};
    //arrData.iOpe1 = "manpa0";
    //arrData.iOpe2 = "1";
    // $state.go('app.acticeProduct', { CustDtlName: custList.CUST_NAME_CODE, CustDtlCode: custList.CUST_CODE }, { reload: true });

    $scope.GetCustData = function (custList) {

        $state.go('app.acticeProduct', { CustDtlName: custList.custname, CustDtlCode: custList.custcode });

    };






})

.controller('inactiveCustCtrl', function ($scope, $state, $stateParams, $http, $filter) {

    $scope.custDetail = {};
    $scope.Startdate = {};
    $scope.EndDate = {};


    var disabledDates = [
         new Date(1437719836326),
         new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
         new Date('Wednesday, August 12, 2013'), //Works with any valid Date formats like long format
         new Date("08-14-2013"), //Short format
         new Date(1439676000000), //UNIX format
         new Date(),
         new Date(2013, 10, 8)
    ];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    $scope.dtStartDate = {};
    $scope.dtStartDate.inputDate = new Date();
    $scope.dtEndDate = {};
    $scope.dtEndDate.inputDate = new Date();


    $scope.dtStartDatePopup = {
        titleLabel: 'Start Date', //Optional
        todayLabel: 'Today', //Optional
        closeLabel: 'Close', //Optional
        setLabel: 'Set', //Optional
        errorMsgLabel: 'Please select time.', //Optional
        setButtonType: 'button-assertive', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        templateType: 'popup', //Optional
        inputDate: $scope.dtStartDate.inputDate, //Optional
        mondayFirst: false, //Optional
        disabledDates: disabledDates, //Optional
        monthList: monthList, //Optional
        from: new Date(2013, 0, 1), //Optional
        callback: function (val) { //Optional
            dtStartDateCallbackPopup(val);
        }
    };



    var dtStartDateCallbackPopup = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dtStartDatePopup.inputDate = val;
            console.log('Selected date is : ', val)
        }
    };


    $scope.dtEndDatePopup = {
        titleLabel: 'End Date', //Optional
        todayLabel: 'Today', //Optional
        closeLabel: 'Close', //Optional
        setLabel: 'Set', //Optional
        errorMsgLabel: 'Please select time.', //Optional
        setButtonType: 'button-assertive', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        templateType: 'popup', //Optional
        inputDate: $scope.dtEndDate.inputDate, //Optional
        mondayFirst: false, //Optional
        disabledDates: disabledDates, //Optional
        monthList: monthList, //Optional
        from: new Date(2013, 0, 1), //Optional
        callback: function (val) { //Optional
            dtEndDateCallbackPopup(val);
        }
    };

    $scope.custDetail.CustDtlCode = $stateParams.CustDtlCode;
    $scope.custDetail.CustDtlCode = $stateParams.CustDtlCode;

    var dtEndDateCallbackPopup = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dtEndDatePopup.inputDate = val;
            console.log('Selected date is : ', val)
        }
    };

    $scope.GetInActiveCustomerData = function () {


        var dtstartDate = $scope.dtStartDatePopup.inputDate.getDate() + '-' + ($scope.dtStartDatePopup.inputDate.getMonth() + 1) + '-' + $scope.dtStartDatePopup.inputDate.getFullYear();
            var dtEndDate = $scope.dtEndDatePopup.inputDate.getDate() + '-' + ($scope.dtEndDatePopup.inputDate.getMonth() + 1) + '-' + $scope.dtEndDatePopup.inputDate.getFullYear();
        $state.go('app.inactiveCustomerDetails', {        
            StartDate: dtstartDate,
            EndDate: dtEndDate
        });


    };

  

})


.controller('inactiveCustDtlCtrl', function ($scope, $http, $state, $stateParams, $cookieStore,$ionicLoading) {

        $scope.ProdLists = [];
        $scope.InActiveCustLists = [];
       
        $ionicLoading.show({
            template: '<img src="img/output_LoXQFP.gif">',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });


        var UserId = $cookieStore.get('LoginUserId');
        var CountryID = $cookieStore.get('LoginCountryId');
        var StrtDt = $stateParams.StartDate;
        var EndDt = $stateParams.EndDate;

    var data = {
        UserId: UserId,
        CountryId: CountryID,
        StartDate: StrtDt,
        EndDate: EndDt
    };

    var config = {
        params: data
    };

    $http.get('http://bpdemos.icteas.com/PEMobileAppApi/api/customers/Get?id=' + JSON.stringify(data)).success(function (data, status, headers, config) {
            console.log("**** SUCCESS ****");
            console.log(status);
        })
            .error(function (data, status, headers, config) {
                console.log("**** ERROR ****");
                console.log(status);
            })


                .then(function (response) {

                    $ionicLoading.hide();

                    var jsonData = response.data;

                    $scope.InActiveCustLists = jsonData;

                    
                });



})

   
;



