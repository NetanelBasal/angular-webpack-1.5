// @ngInject
export default ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) => {

  $urlMatcherFactoryProvider.strictMode(false);

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      template: "<home></home>"
    })

}
