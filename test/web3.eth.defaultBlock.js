var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index');
var webu = new Webu();

describe('webu.huc', function () {
    describe('defaultBlock', function () {
        it('should check if defaultBlock is set to proper value', function () {
            assert.equal(web3.huc.defaultBlock, 'latest');
        });
    });
});

