var app = angular.module('app', ['ngRoute', 'ngYoutubeEmbed', 'metatags']);

app.config(function ($routeProvider, $locationProvider, MetaTagsProvider) {

    $locationProvider.html5Mode(true);

    MetaTagsProvider
        .when('/', {
            title: 'Uma Banda',
            description: 'Cool',
            fb_title: 'My title',
            fb_site_name: 'My site name',
            fb_url: 'www.blablabla.blabla',
            fb_description: 'Cool website',
            fb_type: 'Facebook type',
            fb_image: 'an_image.jpg'
        })

    $routeProvider

        .when('/', {
            templateUrl: 'views/principal.html',
            controller: 'PrincipaltCtrl',
        })

        .when('/bandas', {
            templateUrl: 'views/post.html',
            controller: 'BandaCtrl',
        })

        .when('/teste', {
            templateUrl: 'views/teste.html',
            controller: 'TesteCtrl',
        })

        .when('/publicacao/jwt', {
            templateUrl: 'views/jwt.html',
            controller: 'JwtCtrl',
        })

        .otherwise({
            redirectTo: '/'
        });
});


app.controller('BandaCtrl', function ($rootScope, $location, $http, $scope, $window) { 
    $http({
        method: 'GET',
        url: '/banda-do-dia'
    }).then((success) => {
        $scope.banda = success.data
        $scope.video_url = $scope.banda.video_url
        $rootScope.metatags = {
            title: $scope.banda.nome,
            description: $scope.banda.nome,
            keywords: "indie musica independente",
            fb_app_id: '1790601277919488',
            fb_image: $scope.banda.share_url
        }

    }, (error) => {
        alert(error)
    })

    $scope.Facebook = () => {
        $window.open("https://facebook.com/sharer/sharer.php?u=https://uma-banda.herokuapp.com/bandas", "_blank")
    }
});

app.controller('PrincipaltCtrl', function ($rootScope, $location, $http, $scope, $window) {
    $scope.Banda = () => {
        $location.path('/bandas')
    }
});

app.controller('TestetCtrl', function ($rootScope, $location, $http, $scope, $window) {
    $scope.Banda = () => {
        $location.path('/bandas')
    }
});

app.run(function (MetaTags) {
    MetaTags.initialize();
})