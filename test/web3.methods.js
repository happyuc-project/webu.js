var Webu = require('../index.js');
var webu = new Webu();
var u = require('./helpers/test.utils.js');

describe('webu', function() {
    describe('methods', function () {
        u.methodExists(webu, 'sha3');
        u.methodExists(webu, 'toAscii');
        u.methodExists(webu, 'fromAscii');
        u.methodExists(webu, 'toDecimal');
        u.methodExists(webu, 'fromDecimal');
        u.methodExists(webu, 'fromWei');
        u.methodExists(webu, 'toWei');
        u.methodExists(webu, 'toBigNumber');
        u.methodExists(webu, 'isAddress');
        u.methodExists(webu, 'setProvider');
        u.methodExists(webu, 'reset');

        u.propertyExists(webu, 'providers');
        u.propertyExists(webu, 'huc');
        u.propertyExists(webu, 'db');
        u.propertyExists(webu, 'shh');
    });
});

