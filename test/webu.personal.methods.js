var chai = require('chai');
var assert = chai.assert;
var Webu = require('../index.js');
var webu = new Webu();
var u    = require('./helpers/test.utils.js');

describe('webu.personal', function() {
    describe('methods', function() {
        u.propertyExists(webu.personal, 'listAccounts');
        u.methodExists(  webu.personal, 'newAccount');
        u.methodExists(  webu.personal, 'unlockAccount');
    });
});
