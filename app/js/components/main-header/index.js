require('./_main-header.scss');

import MainHeaderController from './main-header.controller.js';
import mainHeader from './main-header.component.js';

export default (app) => {
  app.controller('MainHeaderController', MainHeaderController);
  app.component('mainHeader', mainHeader);
}
