'use strict';
import config from './config';
import OAM from 'oam-design-system';

OAM.hello();

console.log.apply(console, config.consoleMessage);
console.log('Environment', config.environment);
