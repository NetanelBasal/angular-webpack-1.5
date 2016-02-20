require('./_home.scss');

import HomeController from './home.controller.js';
import home from './home.component.js';

export default (app) => {
  app.controller('HomeController', HomeController);
  app.component('home', home);
}
