var chai = require('chai');
var assert = chai.assert;
var Webu = require('../index');
var webu = new Webu();

describe('webu.irc', function () {
    describe('defaultBlock', function () {
        it('should check if defaultBlock is set to proper value', function () {
            assert.equal(webu.irc.defaultBlock, 'latest');
        });
    });
});

