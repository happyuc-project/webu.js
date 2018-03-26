var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index.js');
var webu = new Webu();
var u = require('./helpers/test.utils.js');

describe('webu.net', function() {
    describe('methods', function() {
        u.propertyExists(web3.personal, 'listAccounts');
        u.methodExists(web3.personal, 'newAccount');
        u.methodExists(web3.personal, 'unlockAccount');
    });
});
