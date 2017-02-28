'use strict';




angular.module('app')
    .run(
        [          '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/app/dashboard-v1');
        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'tpl/app.html'
            })
            .state('app.dashboard-v1', {
                url: '/dashboard-v1',
                templateUrl: 'tpl/app_dashboard_v1.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['js/controllers/chart.js']);
                        }]
                }
            })
            .state('app.dashboard-v2', {
                url: '/dashboard-v2',
                templateUrl: 'tpl/app_dashboard_v2.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['js/controllers/chart.js']);
                        }]
                }
            })

            .state('app.table', {
                url: '/table',
                template: '<div ui-view></div>'
            })
            .state('app.info', {
                url: '/static',
                templateUrl: 'tpl/info.html'
            })
            .state('app.calendar', {
                url: '/calendar',
                templateUrl: 'tpl/app_calendar.html',
                // use resolve to load other dependences
                resolve: {
                    deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                            return uiLoad.load(
                                ['vendor/jquery/fullcalendar/fullcalendar.css',
                                    'vendor/jquery/fullcalendar/theme.css',
                                    'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                    'vendor/libs/moment.min.js',
                                    'vendor/jquery/fullcalendar/fullcalendar.min.js',
                                    'js/app/calendar/calendar.js']
                            ).then(
                                function(){
                                    return $ocLazyLoad.load('ui.calendar');
                                }
                            )
                        }]
                }
            })
            .state('app.mail', {
                abstract: true,
                url: '/mail',
                templateUrl: 'tpl/mail.html',
                // use resolve to load other dependences
                resolve: {
                    deps: ['uiLoad',
                        function( uiLoad ){
                            return uiLoad.load( ['js/app/mail/mail.js',
                                'js/app/mail/mail-service.js',
                                'vendor/libs/moment.min.js'] );
                        }]
                }
            })
            .state('app.mail.list', {
                url: '/inbox/{fold}',
                templateUrl: 'tpl/mail.list.html'
            })
            .state('app.mail.detail', {
                url: '/{mailId:[0-9]{1,4}}',
                templateUrl: 'tpl/mail.detail.html'
            })
            .state('app.mail.compose', {
                url: '/compose',
                templateUrl: 'tpl/mail.new.html'
            })
            .state('apps.contact', {
                url: '/contact',
                templateUrl: 'tpl/apps_contact.html',
                resolve: {
                    deps: ['uiLoad',
                        function( uiLoad ){
                            return uiLoad.load( ['js/app/contact/contact.js'] );
                        }]
                }
            })

    })