var addTestApp = angular.module('addTestApp', []);

addTestApp.controller('addTestCtrl', [ '$scope', '$http', function ($scope, $http) {
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

  $scope.addCase = function () {
    $scope.list.push({
      question : '',
      answers  : [ { correct : false,  text : '' } ],
      rightAnswer : 1,
      wrongAnswer : 0
    });
  };

  $scope.removeCase   = function (listItemIndex) {
    $scope.list.splice(listItemIndex, 1);
  };

  $scope.removeAnswer = function (listItemIndex, answerIndex) {
    $scope.list[listItemIndex].answers.splice(answerIndex, 1);
  };

  $scope.saveTest = function () {
    console.log(test);

    $http.post('/api/v1/add-test', test)
      .success(function (data, status) {
        console.log(data, status);
        window.location.reload();
      })
      .error(function (data, status) {
        console.log(data, status);
      });
  };

  $scope.addCase();
} ]);
