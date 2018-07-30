var assert = require('assert');
var utils = require('../lib/utils/utils.js');

describe('lib/utils/utils', function () {
    describe('fromWei', function () {
        it('should return the correct value', function () {
            assert.equal(utils.fromWei(1000000000000000000000000000000000000,  'wei'),   '1000000000000000000000000000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'kwei'),   '1000000000000000000000000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'mwei'),   '1000000000000000000000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'gwei'),   '1000000000000000000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'twei'),   '1000000000000000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'pwei'),   '1000000000000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000,  'irc'),   '1000000000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'khuc'),   '1000000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'mhuc'),   '1000000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'ghuc'),   '1000000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'thuc'),   '1000000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'phuc'),   '1000');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'ehuc'),   '1');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'zhuc'),   '0.001');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'yhuc'),   '0.000001');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'nhuc'),   '0.000000001');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'dhuc'),   '0.000000000001');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'vhuc'),   '0.000000000000001');
            assert.equal(utils.fromWei(1000000000000000000000000000000000000, 'uhuc'),   '0.000000000000000001');
        });
    });
});
