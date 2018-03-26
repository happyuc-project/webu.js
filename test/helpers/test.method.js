var chai = require('chai');
var assert = chai.assert;
var Webu = require('../../index');

var FakeHttpProvider = require('./FakeHttpProvider');
var clone = function (object) { return JSON.parse(JSON.stringify(object)); };

var runTests = function (obj, method, tests) {

    var testName = obj ? 'webu.' + obj : 'web';

    describe(testName, function () {
        describe(method, function () {
            tests.forEach(function (test, index) {
                it('sync test: ' + index, function () {

                    // given
                    var provider = new FakeHttpProvider();
                    var webu = new Webu(provider);
                    provider.injectResult(test.result);
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, test.call);
                        assert.deepEqual(payload.params, test.formattedArgs);
                    });

                    var args = clone(test.args)

                    // when
                    if (obj) {
                        var result = webu[obj][method].apply(webu[obj], args);
                    } else {
                        var result = webu[method].apply(webu, args);
                    }
                    // when
                    //var result = (obj)
                        //? webu[obj][method].apply(null, test.args.slice(0))
                        //: webu[method].apply(null, test.args.slice(0));

                    // then
                    assert.deepEqual(test.formattedResult, result);
                });

                it('async test: ' + index, function (done) {

                    // given
                    var provider = new FakeHttpProvider();
                    var webu = new Webu(provider);
                    provider.injectResult(test.result);
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, test.call);
                        assert.deepEqual(payload.params, test.formattedArgs);
                    });

                    var args = clone(test.args);

                    // add callback
                    args.push(function (err, result) {
                        assert.deepEqual(test.formattedResult, result);
                        done();
                    });

                    // when
                    if (obj) {
                        webu[obj][method].apply(webu[obj], args);
                    } else {
                        webu[method].apply(webu, args);
                    }
                });
            });
        });
    });

};

module.exports = {
    runTests: runTests
}

