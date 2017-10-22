'use strict';
var logo = require('./logo');
/*
 * App config for production.
 */
module.exports = {
  environment: 'production',
  consoleMessage: logo,
  OAMBrowserUrl: 'https://map.openaerialmap.org',
  OAMCatalogApi: 'https://api.openaerialmap.org'
};

