var chai = require('chai');
var utils = require('../lib/utils/utils');
var assert = chai.assert;

describe('lib/utils/utils', function () {
    describe('toWei', function () {
        it('should return the correct value', function () {

            assert.equal(utils.toWei(1,  'wei'),   '1');
            assert.equal(utils.toWei(1, 'kwei'),   '1000');
            assert.equal(utils.toWei(1, 'mwei'),   '1000000');
            assert.equal(utils.toWei(1, 'gwei'),   '1000000000');
            assert.equal(utils.toWei(1, 'twei'),   '1000000000000');
            assert.equal(utils.toWei(1, 'pwei'),   '1000000000000000');
            assert.equal(utils.toWei(1,  'huc'),   '1000000000000000000');
            assert.equal(utils.toWei(1, 'khuc'),   '1000000000000000000000');
            assert.equal(utils.toWei(1, 'mhuc'),   '1000000000000000000000000');
            assert.equal(utils.toWei(1, 'ghuc'),   '1000000000000000000000000000');
            assert.equal(utils.toWei(1, 'thuc'),   '1000000000000000000000000000000');
            assert.equal(utils.toWei(1, 'phuc'),   '1000000000000000000000000000000000');
            assert.equal(utils.toWei(1, 'ehuc'),   '1000000000000000000000000000000000000');
            assert.equal(utils.toWei(1, 'zhuc'),   '1000000000000000000000000000000000000000');
            assert.equal(utils.toWei(1, 'yhuc'),   '1000000000000000000000000000000000000000000');
            assert.equal(utils.toWei(1, 'nhuc'),   '1000000000000000000000000000000000000000000000');
            assert.equal(utils.toWei(1, 'dhuc'),   '1000000000000000000000000000000000000000000000000');
            assert.equal(utils.toWei(1, 'vhuc'),   '1000000000000000000000000000000000000000000000000000');
            assert.equal(utils.toWei(1, 'uhuc'),   '1000000000000000000000000000000000000000000000000000000');

            // assert.equal(utils.toWei(1, 'kwei'),     utils.toWei(1,    'femtohucer'));
            // assert.equal(utils.toWei(1, 'szabo'),    utils.toWei(1,    'microhucer'));
            // assert.equal(utils.toWei(1, 'finney'),   utils.toWei(1,    'millihucer'));
            // assert.equal(utils.toWei(1, 'milli'),    utils.toWei(1,    'millihucer'));
            // assert.equal(utils.toWei(1, 'milli'),    utils.toWei(1000, 'micro'     ));

            assert.throws(function () { utils.toWei(1, 'hucer');}, Error);
        });
    });
});
