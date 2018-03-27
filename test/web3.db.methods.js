var chai = require('chai');
var assert = chai.assert;
var Webu = require('../index.js');
var webu = new Webu();
var u = require('./helpers/test.utils.js');

describe('webu.db', function() {
    describe('methods', function() {
        u.methodExists(webu.db, 'putHex');
        u.methodExists(webu.db, 'getHex');
        u.methodExists(webu.db, 'putString');
        u.methodExists(webu.db, 'getString');
    });
});

