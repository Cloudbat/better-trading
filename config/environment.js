/* eslint-env node */

'use strict';

const PACKAGE = require('../package.json');

// eslint-disable-next-line complexity
module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'better-trading',
    podModulePrefix: 'better-trading/pods',
    environment,
    rootURL: '/',
    locationType: 'auto'
  };

  ENV.EmberENV = {
    LOG_VERSION: false,
    EXTEND_PROTOTYPES: false
  };

  ENV.APP = {
    version: PACKAGE.version
  };

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
