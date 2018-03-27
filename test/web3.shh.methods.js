var chai = require('chai');
var assert = chai.assert;
var Webu = require('../index.js');
var webu = new Webu();
var u = require('./helpers/test.utils.js');

describe('webu.shh', function() {
    describe('methods', function() {
        u.methodExists(webu.shh, 'version');
        u.methodExists(webu.shh, 'info');
        u.methodExists(webu.shh, 'setMaxMessageSize');
        u.methodExists(webu.shh, 'setMinPoW');
        u.methodExists(webu.shh, 'markTrustedPeer');
        u.methodExists(webu.shh, 'newKeyPair');
        u.methodExists(webu.shh, 'addPrivateKey');
        u.methodExists(webu.shh, 'deleteKeyPair');
        u.methodExists(webu.shh, 'hasKeyPair');
        u.methodExists(webu.shh, 'getPublicKey');
        u.methodExists(webu.shh, 'getPrivateKey');
        u.methodExists(webu.shh, 'newSymKey');
        u.methodExists(webu.shh, 'addSymKey');
        u.methodExists(webu.shh, 'generateSymKeyFromPassword');
        u.methodExists(webu.shh, 'hasSymKey');
        u.methodExists(webu.shh, 'getSymKey');
        u.methodExists(webu.shh, 'deleteSymKey');
        u.methodExists(webu.shh, 'newMessageFilter');
        u.methodExists(webu.shh, 'post');

    });
});

