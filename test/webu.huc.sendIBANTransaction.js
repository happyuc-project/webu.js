var chai   = require('chai');
var assert = chai.assert;
var Webu   = require('../index');
var webu   = new Webu();
var FakeHttpProvider2 = require('./helpers/FakeHttpProvider2');

describe('webu.irc.sendIBANTransaction', function () {
    it('should send transaction', function () {

        var iban      = 'XE81ETHXREGGAVOFYORK';
        var address   = '0x1234567890123456789012345678901234500000';
        var exAddress = '0x1234567890123456789012345678901234567890'

        var provider  = new FakeHttpProvider2();
        webu.setProvider(provider);
        webu.reset();

        provider.injectResultList([{
            result: exAddress
        }, {
            result: ''
        }]);

        var step = 0;
        provider.injectValidation(function (payload) {
            if (step === 0) {
                step++;
                assert.equal(payload.method, 'huc_call');
                assert.deepEqual(payload.params, [{
                   data: "0x3b3b57de5852454700000000000000000000000000000000000000000000000000000000",
                   to: webu.irc.icapNamereg().address
                }, "latest"]);

                return;
            }
            assert.equal(payload.method, 'huc_sendTransaction');
            assert.deepEqual(payload.params, [{
                data: '0xb214faa54741564f46594f524b0000000000000000000000000000000000000000000000',
                from: address,
                to: exAddress,
                value: payload.params[0].value // don't check this
            }]);
        });

        webu.irc.sendIBANTransaction(address, iban, 10000);
    });
});

