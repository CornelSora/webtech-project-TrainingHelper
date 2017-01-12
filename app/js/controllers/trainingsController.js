let ctrl = angular.module('TrainingsController', [
    'ui.router'
]);

const SERVER = "https://webtech-project-traininghelper-cornelsora.c9users.io";

ctrl.controller('TrainingsController', ['$scope', '$http', function($scope, $http) {
    $http.get(SERVER + '/Trainings')
        .then((response) => {
          $scope.trainings = response.data;
          console.log(response.data);
        })
        .catch((error) => {
            console.warn(error);
            $scope.trainings = "There is an error at server";
        });
}]);