var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index.js');
var webu = new Webu();
var u = require('./helpers/test.utils.js');

describe('webu.db', function() {
    describe('methods', function() {
        u.methodExists(web3.db, 'putHex');
        u.methodExists(web3.db, 'getHex');
        u.methodExists(web3.db, 'putString');
        u.methodExists(web3.db, 'getString');
    });
});

