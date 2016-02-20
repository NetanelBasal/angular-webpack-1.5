require('./_main-footer.scss');

import MainFooterController from './main-footer.controller.js';
import mainFooter from './main-footer.component.js';

export default (app) => {
  app.controller('MainFooterController', MainFooterController);
  app.component('mainFooter', mainFooter);
}
