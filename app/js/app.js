let app = angular.module('SportApp', [
    'ui.router',
    'TrainingsController',
    'TrainingController',
    'TutorialsController',
    'ngMessages'
]);

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/helloToMyApp');

    $stateProvider.state('helloToMyApp', {
        url: '/helloToMyApp',
        template: '<div class="container">' +
            '<p><h3>This is an app about <b>trainings</b></h3></p>' +
            '<p><h4>My app will help you to have a <b>healthy</b> life</h4></p> </div>'
    });

    $stateProvider.state('Trainings', {
        url: '/Trainings',
        templateUrl: 'views/Trainings.html',
        controller: 'TrainingsController'
    });

    $stateProvider.state('Training', {
        url: '/Training/:id',
        templateUrl: 'views/Training.html',
        controller: 'TrainingController'
    });

    $stateProvider.state('Tutorials', {
        url: '/Tutorials/:id',
        templateUrl: 'views/Tutorials.html',
        controller: 'TutorialsController'
    });


}]);

app.directive('validLink', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(s, e, a, c) {
            e.on('keypress', () => {
                s.$apply(() => {
                    let v = e.val()
                    c.$setValidity('validLink', v.includes("www.youtube.com"));
                })
            })
        }
    }
})


app.directive('youtube', function($sce) {
    return {
        restrict: 'EA',
        scope: {
            src: '='
        },
        replace: true,
        template: '<div class="embed-responsive embed-responsive-16by9" style="height:400px; width:350px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{src | trusted}}" frameborder="0" allowfullscreen></iframe></div>',
    };
});
