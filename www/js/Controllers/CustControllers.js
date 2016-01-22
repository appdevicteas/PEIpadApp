angular.module('starter.Custcontrollers', ['ngCookies'])
.controller('custDetailCtrl', function ($scope, $stateParams, $state, $cookieStore, $http, $ionicPopup) {
    $scope.custDetailData = {};
    $scope.DelvSchdlData = [
       {  Name: "48 Hours" },
       { Name: "Next Day" } ,
       {  Name: "1 Week" },
        {  Name: "Monthly" }
    ];

    if ($stateParams.CustName) {
        $scope.custDetailData.CustDtlCode = $stateParams.CustCode;
        $scope.custDetailData.CustDtlName = $stateParams.CustName;
        $scope.custDetailData.CustDtlCodeName = $stateParams.CustCodeName;
        $scope.custDetailData.CustDtlChannel = $stateParams.ChannelName;
        $scope.custDetailData.CustDtlMainConact = $stateParams.CustMainConact;
        $scope.custDetailData.CustDtlBillAddr = $stateParams.CustBillAddr;
        $scope.custDetailData.CustDtlPhone = $stateParams.CustPhone;
        $scope.custDetailData.CustDtlEmail = $stateParams.CustEmail;
        $scope.custDetailData.CustDtlNote = $stateParams.CustNote;
        $scope.custDetailData.CustDtlLCM = $stateParams.CustLCM;
        $scope.custDetailData.CustDtlTerrCode = $stateParams.CustTerrCode;
        $scope.custDetailData.CustDtlTerrName = $stateParams.CustTerrName;
        $scope.custDetailData.CustDtlPGCode = $stateParams.CustPGCode;
        $scope.custDetailData.CustDtlPGName = $stateParams.CustPGName;
        $scope.custDetailData.CustDtlWHCode = $stateParams.CustWHCode;
        $scope.custDetailData.CustDtlWHName = $stateParams.CustWHName;
        $scope.custDetailData.CustDtlFrghtCode = $stateParams.CustFrghtCode;
        // $scope.custDetailData.CustDtlDelvSchdl = [{ Name: $stateParams.CustDelvSchdl }];


        $scope.custDetailData.CustDtlDelvSchdl = $stateParams.CustDelvSchdl;
        $scope.custDetailData.CustDtlPayTerm = $stateParams.CustPayTerm;
        $scope.custDetailData.CustDtlShipAddr = $stateParams.CustShipAddr;


    }

    $scope.save = function (custDetailData) {

        var UserId = $cookieStore.get('LoginUserId');
        var CountryID = $cookieStore.get('LoginCountryId');

        var Paramdata = {
            UserId: UserId,
            CountryId: CountryID,
            CUSTCODE : custDetailData.CustDtlCode,
            contact : custDetailData.CustDtlMainConact==null?"":custDetailData.CustDtlMainConact,
            billingaddress: custDetailData.billingaddress == null ? "" : custDetailData.billingaddress,
            phone: custDetailData.CustDtlPhone == null ? "" : custDetailData.CustDtlPhone,
            email: custDetailData.CustDtlEmail == null ? "" : custDetailData.CustDtlEmail,
            notes: custDetailData.CustDtlNote == null ? "" : custDetailData.CustDtlNote,
            lastComEngagement: custDetailData.CustDtlLCM == null ? "" : custDetailData.CustDtlLCM,
            freightcode: custDetailData.CustDtlFrghtCode == null ? "" : custDetailData.CustDtlFrghtCode,
            deliverySchedule: custDetailData.CustDtlDelvSchdl==null?"":custDetailData.CustDtlDelvSchdl,
            paymentAddress: custDetailData.CustDtlPayTerm==null?"":custDetailData.CustDtlPayTerm,
            shiptoAddress: custDetailData.CustDtlShipAddr==null?"":custDetailData.CustDtlShipAddr
    };

        $http.post('http://bpdemos.icteas.com/PEMobileAppApi/api/customers/PostCustomerData?id=' + JSON.stringify(Paramdata)).success(function (data, status, headers, config) {
        console.log("**** SUCCESS ****");
        console.log(status);
    })
        .error(function (data, status, headers, config) {
            console.log("**** ERROR ****");
            console.log(status);
        })



            .then(function (response) {



                var jsonData = response.data;

                
                if(jsonData=="")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Information',
                        template: 'Record saved successfully'
                    });
                }
                else
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error Occured!',
                        template: jsonData
                    });
                }



            });

};


    $scope.GetInActiveSKU = function (custDetailData) {



        $state.go('app.InActiveSKUSelect', {
            CustCode: custDetailData.CustDtlCode, CustName: custDetailData.CustDtlName
        });



    };

    $scope.GetProdData = function () {
        if ($stateParams.CustName) {

            var d = new Date();

            var x = -1;
            var CurrentDate = new Date();
            var date = CurrentDate.getDate();
            CurrentDate.setDate(1);
            CurrentDate.setMonth(CurrentDate.getMonth() + x);
            CurrentDate.setDate(date);



            var dtstartDate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
            var dtEndDate = CurrentDate.getDate() + '-' + (CurrentDate.getMonth() + 1) + '-' + CurrentDate.getFullYear();

            $state.go('app.activeProductByCustomer', { CustDtlCode: $scope.custDetailData.CustDtlCode, StartDate: dtstartDate, EndDate: dtEndDate });
        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Information',
                template: 'Please select customer'
            });


        }

    };

    $scope.GoBackSelectcustomer = function () {

        $state.go('app.customer');


    };

})
.controller('custSearchDetailCtrl', function ($scope, $http, $cookieStore, $state,$ionicLoading) {
    $scope.SerachcustLists = [];
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

    $http.get('http://bpdemos.icteas.com/PEMobileAppApi/api/customers/GetCustDtlForCustomer?id=' + JSON.stringify(Paramdata)).success(function (data, status, headers, config) {
        console.log("**** SUCCESS ****");
        console.log(status);
    })
        .error(function (data, status, headers, config) {
            console.log("**** ERROR ****");
            console.log(status);
        })



            .then(function (response) {

                //$scope.$watch("query.length", function (val) {
                //    if (val > 0) {
                $ionicLoading.hide();
                        var jsonData = response.data;

                        $scope.SerachcustLists = jsonData;
                //    }
                //});
            });



    $scope.GetCustDtlData = function (custList) {

        $state.go('app.CustomerDetails', {
            CustCode: custList.custcode,
            CustName: custList.custname,
            CustCodeName: custList.custCodeName,
            ChannelName: custList.channelname,
            CustMainConact: custList.contact,
            CustBillAddr: custList.billingaddress,
            CustPhone: custList.phone,
            CustEmail: custList.email,
            CustNote: custList.notes,
            CustLCM: custList.lastComEngagement,
            CustTerrCode: custList.territory4Code,
            CustTerrName: custList.territory4Name,
            CustPGCode: custList.pgcode,
            CustPGName: custList.pgname,
            CustWHCode: custList.whcode,
            CustWHName: custList.whname,
            CustFrghtCode: custList.freightcode,
            CustDelvSchdl: custList.deliverySchedule,
            CustPayTerm: custList.paymentAddress,
            CustShipAddr: custList.shiptoAddress
        });

    };

    

})
 .controller('InActiveSKUSelectCtrl', function ($scope, $state, $stateParams, $http, $filter, $ionicPopup) {

     $scope.custDetail = {};
     $scope.Startdate = {};
     $scope.EndDate = {};

     if ($stateParams.CustCode) {

         $scope.custDetail.CustCode = $stateParams.CustCode;

     }

     if ($stateParams.CustName) {

         $scope.custDetail.CustName = $stateParams.CustName;
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

     $scope.GetInActiveSKUData = function (custDetail) {
        

             var dtstartDate = $scope.dtStartDatePopup.inputDate.getDate() + '-' + ($scope.dtStartDatePopup.inputDate.getMonth() + 1) + '-' + $scope.dtStartDatePopup.inputDate.getFullYear();
             var dtEndDate = $scope.dtEndDatePopup.inputDate.getDate() + '-' + ($scope.dtEndDatePopup.inputDate.getMonth() + 1) + '-' + $scope.dtEndDatePopup.inputDate.getFullYear();

             $state.go('app.InActiveSKU', { CustCode:  $scope.custDetail.CustCode,CustName:  $scope.custDetail.CustName,  StartDate: dtstartDate,
                 EndDate: dtEndDate });
     };

 })

.controller('InActiveSKUCtrl', function ($scope, $http, $state, $stateParams, $cookieStore, $ionicLoading) {

    $scope.ProdLists = [];
    $scope.InActiveSKUList = [];

    $ionicLoading.show({
        template: '<img src="img/output_LoXQFP.gif">',
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    if ($stateParams.CustCode) {
        $scope.ProdLists.CustCode = $stateParams.CustCode;
        }
    if ($stateParams.CustName) {
        $scope.ProdLists.CustName = $stateParams.CustName;
    }

  
    var CountryID = $cookieStore.get('LoginCountryId');

    var data = {
        CUSTCODE: $stateParams.CustCode,
        CountryId: CountryID,
        StartDate: $stateParams.StartDate,
        EndDate: $stateParams.EndDate
    };

    var config = {
        params: data
    };

   
    $http.get('http://bpdemos.icteas.com/PEMobileAppApi/api/product/GetInActiveSKU?id=' + JSON.stringify(data)).success(function (data, status, headers, config) {
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

                    $scope.InActiveSKUList = jsonData;


                });



})
;