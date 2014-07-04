var addTestApp = angular.module('addTestApp', []);

addTestApp.controller('addTestCtrl', function ($scope) {
  var test = {
    subject  : '',
    maxScore : 0
  };

  $scope.test = test;
  $scope.list = [];

  test.list = $scope.list;

  $scope.$watch('list', function (newVal) {
    test.maxScore = $scope.list.reduce(function (prev, curr) {
      return prev + +curr.rightAnswer;
    }, 0);
  }, true);

  $scope.addTest = function () {
    $scope.list.push({
      question : '',
      answers  : [ { correct : false,  text : '' } ],
      rightAnswer : 1,
      wrongAnswer : 0
    });
  };

  $scope.saveTest = function () {
    console.log(test);
  };

  $scope.addTest();
});
