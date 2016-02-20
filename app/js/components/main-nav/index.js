require('./_main-nav.scss');

import MainNavController from './main-nav.controller';
import mainNavComponent from './main-nav.component';

export default (app) => {
  app.controller('MainNavController', MainNavController);
  app.component('mainNav', mainNavComponent);
}
