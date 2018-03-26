var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index.js');
var webu = new Webu();
var u = require('./helpers/test.utils.js');

describe('webu.huc', function() {
    describe('methods', function() {
        u.methodExists(web3.huc, 'getBalance');
        u.methodExists(web3.huc, 'getStorageAt');
        u.methodExists(web3.huc, 'getTransactionCount');
        u.methodExists(web3.huc, 'getCode');
        u.methodExists(web3.huc, 'sendTransaction');
        u.methodExists(web3.huc, 'call');
        u.methodExists(web3.huc, 'getBlock');
        u.methodExists(web3.huc, 'getTransaction');
        u.methodExists(web3.huc, 'getUncle');
        u.methodExists(web3.huc, 'getCompilers');
        u.methodExists(web3.huc.compile, 'lll');
        u.methodExists(web3.huc.compile, 'solidity');
        u.methodExists(web3.huc.compile, 'serpent');
        u.methodExists(web3.huc, 'getBlockTransactionCount');
        u.methodExists(web3.huc, 'getBlockUncleCount');
        u.methodExists(web3.huc, 'filter');
        u.methodExists(web3.huc, 'contract');

        u.propertyExists(web3.huc, 'coinbase');
        u.propertyExists(web3.huc, 'mining');
        u.propertyExists(web3.huc, 'gasPrice');
        u.propertyExists(web3.huc, 'accounts');
        u.propertyExists(web3.huc, 'defaultBlock');
        u.propertyExists(web3.huc, 'blockNumber');
        u.propertyExists(web3.huc, 'protocolVersion');
    });
});

