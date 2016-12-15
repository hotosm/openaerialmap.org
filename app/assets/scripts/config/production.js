'use strict';
var logo = require('./logo');
/*
 * App config for production.
 */
module.exports = {
  environment: 'production',
  consoleMessage: logo,
  OAMBrowserUrl: 'https://beta.openaerialmap.org',
  OAMCatalogApi: 'https://api.openaerialmap.org'
};

