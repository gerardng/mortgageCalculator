angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('doLogin function', $scope.loginData);


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Email',
      template: 'Under construction'
    });
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('mortgageCalculatorController', function($scope, $ionicPopup, data, $ionicScrollDelegate) {
  // service
  $scope.data = data;

  // initialize data
  $scope.data.monthlyPayments = 0; $scope.yearlyPayments = 0; $scope.totalInterestPaid = 0;
  $scope.totalPrincipalPaid = 0; $scope.loanValueRatio = 0; $scope.percentEquity = 0;
  $scope.numberOfPayments = 0; $scope.monthlyRate = 0; $scope.ROI = 0; $scope.trueROI = 0; $scope.capRate = 0;
  $scope.netOperatingIncome = 0; $scope.annualCashFlow = 0; $scope.trueProfit = 0;
  $scope.equityProfit = 0; $scope.brokerFee = 0; $scope.propertyTransferTax = 0;
  $scope.propertyValueCurrentMarket = 0; $scope.storedOneYearInterest = 0;
  $scope.storedOneYearInterest = 0; $scope.storedDownpayment = 0; $scope.storedHomePrice = 0;


  // Each time a view is loaded, retrieve stored values
  if (supports_html5_storage()) {
    $scope.storedOneYearPayments = parseInt(localStorage.getItem("oneYearPayments"));
    $scope.storedDownpayment = parseInt(localStorage.getItem("downpayment"));
    $scope.storedOneYearInterest = parseInt(localStorage.getItem("oneYearInterest"));
    $scope.storedHomePrice = parseInt(localStorage.getItem("homePrice"));
    $scope.storedTotalInterestPaid  = parseInt(localStorage.getItem("totalInterestPaid"));
    $scope.storedTotalPrincipalPaid  = parseInt(localStorage.getItem("totalPrincipalPaid"));
    $scope.storedFiveYearOutstandingBalance  = parseInt(localStorage.getItem("fiveYearOutstandingBalance"));
  }

  // Auto update percent downpayment when amount downpayment is changed
  $scope.newDownpayment = function() {
    $scope.percentDownpayment = $scope.downpayment / $scope.homePrice * 100;
    // store value in HTML5 local storage
    if (supports_html5_storage()) {
      localStorage.setItem("downpayment", $scope.downpayment);
    }
  };

  // Auto update amount downpayment when percent downpayment is changed
  $scope.newPercentDownpayment = function() {
    $scope.downpayment = $scope.homePrice * $scope.percentDownpayment / 100;
    if (supports_html5_storage()) {
      localStorage.setItem("downpayment", $scope.downpayment);
    }
  };

  // Toggle function/s to show more or less info
  $scope.extraInfoToggle1 = true;
  $scope.$watch('extraInfoToggle1', function($ionicScrollDelegate){
    $scope.extraInfoToggleText1 = $scope.extraInfoToggle1 ? 'More Info' : 'Less Info';
  });
  $scope.extraInfoToggle2 = true;
  $scope.$watch('extraInfoToggle2', function($ionicScrollDelegate){
    $scope.extraInfoToggleText2 = $scope.extraInfoToggle2 ? 'More Info' : 'Less Info';
  });
  $scope.extraInfoToggle3 = true;
  $scope.$watch('extraInfoToggle3', function($ionicScrollDelegate){
    $scope.extraInfoToggleText3 = $scope.extraInfoToggle3 ? 'More Info' : 'Less Info';
  });

  // scrolls to the bottom
  $scope.scrollMainToBottom = function() {
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
  };

  // PMT function + store values in local storage
  $scope.updateMonthlyPayments = function () {
    $scope.data.monthlyPayments = 0;
    $scope.oneYearPayments = 0;

    $scope.monthlyRate = $scope.interestRate / 1200;
    $scope.loanValueRatio = (1- ($scope.downpayment / $scope.homePrice));
    $scope.percentEquity = ($scope.downpayment / $scope.homePrice);
    $scope.numberOfPayments = ($scope.amortizationPeriod * 12);

    $scope.data.monthlyPayments = -(($scope.interestRate / 1200) * ($scope.homePrice - $scope.downpayment) *
    Math.pow((1 + $scope.interestRate / 1200), ($scope.amortizationPeriod * 12))
    / (1 - Math.pow((1 + $scope.interestRate / 1200), ($scope.amortizationPeriod * 12))));
    $scope.oneYearPayments = 12 * $scope.data.monthlyPayments;
    // store value in HTML5 local storage
    if (supports_html5_storage()) {
      localStorage.setItem("oneYearPayments", $scope.oneYearPayments);
      localStorage.setItem("downpayment", $scope.downpayment);
      localStorage.setItem("homePrice", $scope.homePrice);
    }
  };

  // IPMT function
  $scope.updateAmortizationTable = function () {
    $scope.currentMonthlyPayments = 0;
    $scope.currentMonthlyInterest = 0;
    $scope.currentPrincipalPaid = 0;
    $scope.oneYearInterest = 0;
    $scope.totalPaid = 0;
    $scope.totalPrincipalPaid = 0;
    $scope.totalInterestPaid = 0;
    // Iterate until the term (in months)
    for (var i = 0; i < ($scope.term * 12); i++) {
      // total monthly payment
      $scope.currentMonthlyPayments = -(($scope.interestRate / 1200) * ($scope.homePrice - $scope.downpayment) *
      Math.pow((1 + $scope.interestRate / 1200), ($scope.amortizationPeriod * 12))
      / (1 - Math.pow((1 + $scope.interestRate / 1200), ($scope.amortizationPeriod * 12))));
      // get monthly interest payment
      $scope.currentMonthlyInterest = ($scope.homePrice - $scope.downpayment - $scope.totalPrincipalPaid) * Math.pow(1 + $scope.interestRate / 1200, 1) *
        ($scope.interestRate / 1200) + $scope.currentMonthlyPayments * (Math.pow(1 + $scope.interestRate / 1200, 1) - 1);
      // get monthly principal payment
      $scope.currentPrincipalPaid = ($scope.currentMonthlyPayments - $scope.currentMonthlyInterest);
      // get one year interest payment
      if (i < 12) {
        $scope.oneYearInterest += $scope.currentMonthlyInterest;
      }
      // tally up the totals
      $scope.totalPrincipalPaid += $scope.currentPrincipalPaid;
      $scope.totalInterestPaid += $scope.currentMonthlyInterest;
      $scope.totalPaid += ($scope.totalPrincipalPaid + $scope.totalInterestPaid);
    }

    // get 5 year outstanding balance
    $scope.thisTotalPrincipalPaid = 0;
    $scope.fiveYearOutstandingBalance = 0;
    for (var j = 0; j <= 60; j++) {
      $scope.thisCurrentMonthlyPayments = -(($scope.interestRate / 1200) * ($scope.homePrice - $scope.downpayment) *
      Math.pow((1 + $scope.interestRate / 1200), ($scope.amortizationPeriod * 12))
      / (1 - Math.pow((1 + $scope.interestRate / 1200), ($scope.amortizationPeriod * 12))));
      // get monthly interest payment
      $scope.thisCurrentMonthlyInterest = ($scope.homePrice - $scope.downpayment - $scope.thisTotalPrincipalPaid) * Math.pow(1 + $scope.interestRate / 1200, 1) *
        ($scope.interestRate / 1200) + $scope.thisCurrentMonthlyPayments * (Math.pow(1 + $scope.interestRate / 1200, 1) - 1);
      // get monthly principal payment
      $scope.thisCurrentPrincipalPaid = ($scope.thisCurrentMonthlyPayments - $scope.thisCurrentMonthlyInterest);
      $scope.thisTotalPrincipalPaid += $scope.thisCurrentPrincipalPaid;
    }
    $scope.fiveYearOutstandingBalance = ($scope.homePrice - $scope.downpayment - $scope.thisTotalPrincipalPaid);

    // store values in HTML5 local storage
    if (supports_html5_storage()) {
      localStorage.setItem("oneYearInterest", $scope.oneYearInterest);
      localStorage.setItem("totalInterestPaid", $scope.totalInterestPaid);
      localStorage.setItem("totalPrincipalPaid", $scope.totalPrincipalPaid);
      localStorage.setItem("fiveYearOutstandingBalance", $scope.fiveYearOutstandingBalance);
    }
  };

  // retrieve values in HTML5 local storage
  $scope.updateStorageValues = function () {
    if (supports_html5_storage()) {
      $scope.storedOneYearPayments = parseInt(localStorage.getItem("oneYearPayments"));
      $scope.storedDownpayment = parseInt(localStorage.getItem("downpayment"));
      $scope.storedOneYearInterest = parseInt(localStorage.getItem("oneYearInterest"));
      $scope.storedHomePrice = parseInt(localStorage.getItem("homePrice"));
      $scope.storedTotalInterestPaid  = parseInt(localStorage.getItem("totalInterestPaid"));
      $scope.storedTotalPrincipalPaid  = parseInt(localStorage.getItem("totalPrincipalPaid"));
      $scope.storedFiveYearOutstandingBalance  = parseInt(localStorage.getItem("fiveYearOutstandingBalance"));
    }
    $scope.ROI = (($scope.annualRentalIncome - ($scope.monthlyManagementFee * 12 + $scope.annualPropertyTaxInsurance + $scope.utilities + $scope.monthlyStrataFee * 12)) - $scope.storedOneYearPayments) / $scope.storedDownpayment;
    $scope.trueROI = ($scope.annualRentalIncome - ($scope.monthlyManagementFee * 12 + $scope.annualPropertyTaxInsurance + $scope.utilities + $scope.monthlyStrataFee * 12) - $scope.storedOneYearInterest) / $scope.storedDownpayment;
    $scope.capRate = ($scope.annualRentalIncome - ($scope.monthlyManagementFee * 12 + $scope.annualPropertyTaxInsurance + $scope.utilities + $scope.monthlyStrataFee * 12)) / $scope.storedHomePrice;
  };

  //investment property logic
  $scope.updateInvestmentPropertyValues = function () {
    $scope.netOperatingIncome = $scope.annualRentalIncome - (($scope.monthlyManagementFee * 12) + $scope.annualPropertyTaxInsurance + $scope.utilities + ($scope.monthlyStrataFee * 12));
    $scope.annualCashFlow = ($scope.annualRentalIncome - (($scope.monthlyManagementFee * 12) + $scope.annualPropertyTaxInsurance + $scope.utilities + ($scope.monthlyStrataFee * 12))) - $scope.storedOneYearPayments;
  };


  // update dropdown value logic
  $scope.updatePropertySaleValues = function () {
    $scope.propertyValueCurrentMarket = $scope.storedHomePrice * Math.pow(($scope.selectedPropertyValue), $scope.yearsHeld);
    $scope.brokerFee = (100000 * 0.07)+($scope.propertyValueCurrentMarket - 100000) * 0.011625;
    $scope.propertyTransferTax = (($scope.storedHomePrice - 200000 ) * 0.02 + 2000);
    $scope.totalExpense = $scope.marketing + $scope.interestExpense + $scope.monthlyStrataFee * 12 + $scope.renovations
      + $scope.homeInspectionFee + $scope.appraisalFee + $scope.notaryFeeOnPurchase + $scope.notaryFeeOnSale
      + $scope.mortgagePrePaymentCharges + $scope.propertyTransferTax + $scope.otherExpenses;

    $scope.trueProfit = (($scope.propertyValueCurrentMarket - $scope.storedDownpayment - $scope.storedFiveYearOutstandingBalance
    - $scope.totalExpense - $scope.brokerFee - $scope.storedTotalInterestPaid) / $scope.storedDownpayment);
    $scope.equityProfit = (($scope.propertyValueCurrentMarket - $scope.brokerFee - $scope.totalExpense - $scope.storedHomePrice) / $scope.storedHomePrice);
  };

  // Drop down logic function/s
  $scope.selectedPropertyValue = 0;
  $scope.selectedBrokerFee = 0;
  $scope.marketOptions = [
    {label: "None", value: 1.00},
    {label: "Low Risk (+1%)", value: 1.01},
    {label: "Medium Risk (+2.5%)", value: 1.025},
    {label: "Optimistic (+5%)", value: 1.05}
  ];

  // An alert dialog
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Home Price',
      template: 'Home Price is original price of the house you are about to purchase'
    });
  };

})// end of controller

// Footer Controller
.controller('FooterCtrl', function($scope, $ionicPopover, $ionicPopup, data) {
  $scope.data = data;

  $scope.mortgageAboutAlert = function() {
    $ionicPopup.alert({
      title: 'Mortgage Calculator',
      template: 'Under construction'
    });
  };
  $scope.investmentPropertyAboutAlert = function() {
    $ionicPopup.alert({
      title: 'Investment Property Calculator',
      template: 'Under construction'
    });
  };
  $scope.psInvestmentAboutAlert = function() {
    $ionicPopup.alert({
      title: 'Investments Property Sale Calculator',
      template: 'Under construction'
    });
  };
  $scope.psResidenceAboutAlert = function() {
    $ionicPopup.alert({
      title: 'Principal Residence Property Sale Calculator',
      template: 'Under construction'
    });
  };
})

// service
.factory('data',function() {
  return {monthlyPayments: ''};
})

// percentage angular filter
.filter('percentage', ['$filter', function($filter) {
  return function(input, decimals) {
    return $filter('number')(input*100, decimals)+'%';
  };
}])

// real-time-currency directive
.directive('realTimeCurrency', function ($filter, $locale) {
  var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
  var toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');
  var trailingZerosRegex = new RegExp('\\' + decimalSep + '0+$');
  var filterFunc = function (value) {
    return $filter('currency')(value);
  };

  function getCaretPosition(input){
    if (!input) return 0;
    if (input.selectionStart !== undefined) {
      return input.selectionStart;
    } else if (document.selection) {
      // Curse you IE
      input.focus();
      var selection = document.selection.createRange();
      selection.moveStart('character', input.value ? -input.value.length : 0);
      return selection.text.length;
    }
    return 0;
  }

  function setCaretPosition(input, pos){
    if (!input) return 0;
    if (input.offsetWidth === 0 || input.offsetHeight === 0) {
      return; // Input's hidden
    }
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(pos, pos);
    }
    else if (input.createTextRange) {
      // Curse you IE
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function toNumber(currencyStr) {
    return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
  }

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function postLink(scope, elem, attrs, modelCtrl) {
      modelCtrl.$formatters.push(filterFunc);
      modelCtrl.$parsers.push(function (newViewValue) {
        var oldModelValue = modelCtrl.$modelValue;
        var newModelValue = toNumber(newViewValue);
        modelCtrl.$viewValue = filterFunc(newModelValue);
        var pos = getCaretPosition(elem[0]);
        elem.val(modelCtrl.$viewValue);
        var newPos = pos + modelCtrl.$viewValue.length -
          newViewValue.length;
        if ((oldModelValue === undefined) || isNaN(oldModelValue)) {
          newPos -= 3;
        }
        setCaretPosition(elem[0], newPos);
        return newModelValue;
      });
    }
  };
})

// percent directive
.directive("percent", function ($filter, $locale, $window) {
  var p = function (viewValue) {
    if (viewValue == '') {
      return 0;
    }
    var value = stringToNumber(viewValue);
    return value;
  };

  var stringToNumber = function (value) {
    if (angular.isNumber(parseFloat(value))) {
      if (value.indexOf(',') > 0) {
        var number = angular.copy(value) + '';
        number = number.replaceAll($locale.NUMBER_FORMATS.GROUP_SEP, '');
        number = number.replaceAll($locale.NUMBER_FORMATS.DECIMAL_SEP, '.');
        number = parseFloat(number);
        if (isNaN(number)) {
          return 0;
        } else {
          return number;
        }
      } else {
        return value;
      }
    } else {
      var number = angular.copy(value) + '';
      number = number.replaceAll($locale.NUMBER_FORMATS.GROUP_SEP, '');
      number = number.replaceAll($locale.NUMBER_FORMATS.DECIMAL_SEP, '.');
      number = parseFloat(number);
      if (isNaN(number)) {
        return 0;
      } else {
        return number;
      }
    }
  };

  var f = function (modelValue) {
    if (angular.isDefined(modelValue)) {
      return $filter('number')(modelValue, 0) + '%';
    }
  };

  return {
    require: 'ngModel',
    link: function(scope, ele, attr, ctrl){
      ctrl.$parsers.unshift(p);
      ctrl.$formatters.unshift(f);
      ele.on('blur', function () {
        if (angular.isDefined(ctrl.$modelValue)) {
          ele.val($filter('number')(ctrl.$modelValue, 0) + ' %');
        }
      });
      /*
       ele.on('click', function () {
       if (!$window.getSelection().toString()) {
       this.setSelectionRange(0, this.value.length)
       }
       });
       */
    }
  };
})

// input-clear directive
.directive('inputClear', function() {
  return {
    restrict: 'A',
    compile: function (element, attrs) {
      var color = attrs.inputClear;
      var style = color ? "color:" + color + ";" : "";
      var action = attrs.ngModel + " = ''";
      element.after(
        '<md-button class="animate-show md-icon-button md-accent"' + 'ng-show="' + attrs.ngModel + '" ng-click="' + action + '"' + 'style="position: relative; top: 0px; right:.5px; margin: 13px 0px;">' + '<div style="' + style + '">x</div>' + '</md-button>');
    }
  };
})

; //end of the line
