/* jshint ignore:start */
Package.describe({
  name: 'irchain-io:webu',
  version: '2.0.3',
  summary: 'IrChain JavaScript API, middleware to talk to a irchain node over RPC',
  git: 'https://github.com/irchain/webu.js',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "xmlhttprequest": "1.7.0"
});


Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');

  // api.use('3stack:bignumber@2.0.0', 'client');

  api.export(['Webu', 'BigNumber'], ['client', 'server']);

  api.addFiles('dist/webu.js', ['client', 'server']);
  api.addFiles('package-init.js', ['client', 'server']);
});

// Package.onTest(function(api) {
//   api.use('tinytest');
//   api.use('test');
//   api.addFiles('test-tests.js');
// });
/* jshint ignore:end */
