angular.module('starter.Productcontrollers', ['ngCookies'])

.controller('SelectProductForEditCtrl', function ($scope, $http, $cookieStore, $state,$ionicLoading) {
    $scope.SerachprodLists = [];
    $scope.input = {};
    var UserId = $cookieStore.get('LoginUserId');
    var CountryID = $cookieStore.get('LoginCountryId');

    $ionicLoading.show({
        template: '<img src="img/output_LoXQFP.gif">',
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var data = {
       
        CountryId: CountryID,
        UserId: UserId
    };

    var config = {
        params: data
    };

   

     $http.get('http://bpdemos.icteas.com/PEMobileAppApi/api/product/GetAllProduct?id=' + JSON.stringify(data)).success(function (data, status, headers, config) {

   ////$http.get('http://localhost:53212/api/product/GetAllProduct?id=' + JSON.stringify(data)).success(function (data, status, headers, config) {
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

                $scope.SerachprodLists = jsonData;
            });

  

    $scope.GetProductDetail = function (prodList) {

        $state.go('app.ProductDetailEdit', {
            ProdCode: prodList.prodcode,
            ProdDesc: prodList.proddesc,
            ProdBrand: prodList.prodbrand,
            ProdVariant: prodList.prodvariant,
            ProdCatgry: prodList.prodcatgry,
            ProdBarCode: prodList.prodbarcode,
            ProdSize: prodList.prodsize,
            CartnQty: prodList.cartoonqty,
            UOM: prodList.uom,
            COGS: prodList.cogs,
            RRP: prodList.rrp,
            ListPrice: prodList.listprice,
            TargetPrice: prodList.targetprice,
            NHF: prodList.nhf
        });

    };


   

})


.controller('ProductDetailEditCtrl', function ($scope, $http, $cookieStore, $state, $stateParams,$ionicPopup) {
    $scope.prodDetails = [];
    $scope.ProdCatgryData = [
   { Name: "Passenger Car Oils" },
   { Name: "Synthetic Transmission Fluids" }
    ];

    var UserId = $cookieStore.get('LoginUserId');
    var CountryID = $cookieStore.get('LoginCountryId');

  


    if ($stateParams.ProdDesc) {
        $scope.prodDetails.ProdCode = $stateParams.ProdCode;
        $scope.prodDetails.ProdDesc = $stateParams.ProdDesc;
        $scope.prodDetails.ProdBrand = $stateParams.ProdBrand;
        $scope.prodDetails.ProdVariant = $stateParams.ProdVariant;
        $scope.prodDetails.ProdCatgry = $stateParams.ProdCatgry;
        $scope.prodDetails.ProdBarCode = $stateParams.ProdBarCode;
        $scope.prodDetails.ProdSize = $stateParams.ProdSize;
        $scope.prodDetails.CartnQty = $stateParams.CartnQty;
        $scope.prodDetails.UOM = $stateParams.UOM;
        $scope.prodDetails.COGS = $stateParams.COGS;
        $scope.prodDetails.RRP = $stateParams.RRP;
        $scope.prodDetails.ListPrice = $stateParams.ListPrice;
        $scope.prodDetails.TargetPrice = $stateParams.TargetPrice;
        $scope.prodDetails.NHF = $stateParams.NHF;
   
    }

    $scope.ProductUpdate = function (prodDetails) {


        var data = {
                        
            UserId: UserId,
            CountryId: CountryID,
            PRODCODE : $scope.prodDetails.ProdCode,
            PRODBRAND :  $scope.prodDetails.ProdBrand,
            PRODVARIANT : $scope.prodDetails.ProdVariant,
            PRODCATGRY : $scope.prodDetails.ProdCatgry,
            PRODBARCODE : $scope.prodDetails.ProdBarCode,
            PRODSIZE : $scope.prodDetails.ProdSize,
            CARTOONQTY: $scope.prodDetails.CartnQty,
            TARGETPRICE : $scope.prodDetails.TargetPrice

        };

        var config = {
           
            params: data
        };


        
        $http.post('http://localhost:53212/api/product/PostProductData?id=' + JSON.stringify(data)).success(function (data, status, headers, config) {
      //  $http.post('http://bpdemos.icteas.com/PEMobileAppApi/api/product/PostProductData?id=' + JSON.stringify(data)).success(function (data, status, headers, config) {
            console.log("**** SUCCESS ****");
            console.log(status);
            var alertPopup = $ionicPopup.alert({
                title: 'SUCCESS!',
                template: 'Product details updated successfully.'
            });
        })
            .error(function (data, status, headers, config) {
                console.log("**** ERROR ****");
                console.log(status);
                var alertPopup = $ionicPopup.alert({
                    title: 'ERROR!',
                    template: 'Unable to update Product details.'
                });
            });


               

    };
    $scope.GoBackSelectProduct = function () {

        $state.go('app.SelectProductForEdit');


    };



})
;