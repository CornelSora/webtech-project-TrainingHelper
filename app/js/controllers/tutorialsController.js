ctrl = angular.module('TutorialsController', [
    'ui.router'
]);

ctrl.controller('TutorialsController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    let $constructor = () => {
        $http.get(SERVER + '/Exercises/')
            .then((response) => {
                $scope.exercises = response.data;
                $scope.selectExercise($stateParams.id);
            })
            .catch((error) => {
                console.warn(error);
            });
        $scope.selectExercise($stateParams.id);
    }

    $scope.selectExercise = (id) => {
        $http.get(SERVER + '/Exercises/' + id + '/Videos')
            .then((response) => {
                $scope.tutorials = response.data;
                $scope.selectedVid = [];
                $scope.exId = id;
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    $scope.addTutorial = (video, exId) => {
        video.url = video.url.replace("watch?v=", "embed/")
        $http.post(SERVER + '/Exercises/' + exId + '/Videos', video)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }
    $scope.selected = {}
    $scope.selectedEx = {}
    $scope.selectedVid = [];
    $scope.exId;
    $scope.getTemplate = (video) => {
        if (video.id === $scope.selected.id) {
            return 'edit'
        }
        else {
            return 'display'
        }
    }

    $scope.editVideo = (video) => {
        $scope.selected = angular.copy(video)
    }

    $scope.cancelEditing = () => {
        $scope.selected = {}
    }

    $scope.saveTutorial = (video) => {
        $http.put(SERVER + '/Exercises/' + $scope.exId + '/Videos/' + video.id, video)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            }).catch((error) => console.log(error))
    }

    $scope.deleteVideo = (tutorial) => {
        $http.delete(SERVER + '/Videos/' + tutorial.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.addSelectedVideo = function(trainingId) {
        for (var i = 0; i < $scope.tutorials.length; i++) {
            if ($scope.tutorials[i].id == trainingId) {
                $scope.selectedVid.push($scope.tutorials[i])
            }
        }
    }

    $scope.ShowAll = function() {
        $scope.selectedVid = [];
        for (var i = 0; i < $scope.tutorials.length; i++) {
            $scope.selectedVid.push($scope.tutorials[i])
        }
    }

    $constructor();
}]);
