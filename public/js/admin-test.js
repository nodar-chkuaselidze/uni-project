var addTestApp = angular.module('addTestApp', []);

addTestApp.controller('addTestCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.test = {
    subject   : '',
    maxScore  : 0,
    questions : []
  };

  $scope.$watch('test.questions', function (newVal) {
    $scope.test.maxScore = $scope.test.questions.reduce(function (prev, curr) {
      return prev + +curr.rightAnswer;
    }, 0);
  }, true);

  $scope.addCase = function () {
    $scope.test.questions.push({
      question : '',
      answers  : [ { correct : false,  text : '' } ],
      rightAnswer : 1,
      wrongAnswer : 0
    });
  };

  $scope.removeCase   = function (listItemIndex) {
    $scope.test.questions.splice(listItemIndex, 1);
  };

  $scope.removeAnswer = function (listItemIndex, answerIndex) {
    $scope.test.questions[listItemIndex].answers.splice(answerIndex, 1);
  };

  $scope.saveTest = function () {
    var url = $scope.test._id ? '/api/v1/update-test' : '/api/v1/add-test';

    $http.post(url, $scope.test)
      .success(function (data, status) {
        window.location.reload();
      })
      .error(function (data, status) {
        console.log(data, status);
      });
  };

  $scope.addCase();
}]);
