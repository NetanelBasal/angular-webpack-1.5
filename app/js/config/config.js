// @ngInject
export default ($compileProvider) => {

  console.log('config');

  if( PRODUCTION ) {
    $compileProvider.debugInfoEnabled(false);
  }

}
