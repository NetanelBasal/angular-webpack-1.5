require('../sass/style.scss');

import angular from 'angular';
import config from './config/config';
import routes from './config/routes';
import run from './config/run';
import modules from './config/modules';

import services from './services';

const hotJS = angular.module('hotJS', modules)
  .config(config)
  .config(routes)
  .run(run);

services(hotJS);


//modules
import mainNav from './components/main-nav';
import mainHeader from './components/main-header';
import home from './components/home';
import mainFooter from './components/main-footer';
import resourceBox from './components/resource-box';

mainNav(hotJS);
mainHeader(hotJS);
home(hotJS);
mainFooter(hotJS);
resourceBox(hotJS);
