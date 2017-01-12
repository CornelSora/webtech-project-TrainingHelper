ctrl = angular.module('TrainingController', [
    'ui.router'
]);

ctrl.controller('TrainingController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
    let $constructor = () => {
        $http.get(SERVER + '/TrainingExercises' + '/' + $stateParams.id + '/Exercises')
        .then((response) => {
            $scope.trainingExercises = response.data;
            console.log(response.data);
        })
        .catch((error) => {
            console.warn(error);
            $scope.training = "There is an error at server";
        });
    }
    
    $constructor();
}]);
