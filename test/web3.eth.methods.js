var chai = require('chai');
var assert = chai.assert;
var Webu = require('../index.js');
var webu = new Webu();
var u = require('./helpers/test.utils.js');

describe('webu.huc', function() {
    describe('methods', function() {
        u.methodExists(webu.huc, 'getBalance');
        u.methodExists(webu.huc, 'getStorageAt');
        u.methodExists(webu.huc, 'getTransactionCount');
        u.methodExists(webu.huc, 'getCode');
        u.methodExists(webu.huc, 'sendTransaction');
        u.methodExists(webu.huc, 'call');
        u.methodExists(webu.huc, 'getBlock');
        u.methodExists(webu.huc, 'getTransaction');
        u.methodExists(webu.huc, 'getUncle');
        u.methodExists(webu.huc, 'getCompilers');
        u.methodExists(webu.huc.compile, 'lll');
        u.methodExists(webu.huc.compile, 'solidity');
        u.methodExists(webu.huc.compile, 'serpent');
        u.methodExists(webu.huc, 'getBlockTransactionCount');
        u.methodExists(webu.huc, 'getBlockUncleCount');
        u.methodExists(webu.huc, 'filter');
        u.methodExists(webu.huc, 'contract');

        u.propertyExists(webu.huc, 'coinbase');
        u.propertyExists(webu.huc, 'mining');
        u.propertyExists(webu.huc, 'gasPrice');
        u.propertyExists(webu.huc, 'accounts');
        u.propertyExists(webu.huc, 'defaultBlock');
        u.propertyExists(webu.huc, 'blockNumber');
        u.propertyExists(webu.huc, 'protocolVersion');
    });
});

