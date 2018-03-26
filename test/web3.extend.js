var chai = require('chai');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var Web3 = require('../lib/webu');
var webu = new Webu();


var tests = [{
    properties: [new webu._extend.Property({
        name: 'gasPrice',
        getter: 'huc_gasPrice',
        outputFormatter: webu._extend.formatters.outputBigNumberFormatter
    })]
},{
    methods: [new webu._extend.Method({
        name: 'getBalance',
        call: 'huc_getBalance',
        params: 2,
        inputFormatter: [web3._extend.utils.toAddress, webu._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: webu._extend.formatters.outputBigNumberFormatter
    })]
},{
    property: 'admin',
    properties: [new webu._extend.Property({
        name: 'gasPrice',
        getter: 'huc_gasPrice',
        outputFormatter: webu._extend.formatters.outputBigNumberFormatter
    })],
    methods: [new webu._extend.Method({
        name: 'getBalance',
        call: 'huc_getBalance',
        params: 2,
        inputFormatter: [web3._extend.utils.toAddress, webu._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: webu._extend.formatters.outputBigNumberFormatter
    })]
}];

describe('webu', function () {
    describe('_extend', function () {
        tests.forEach(function (test, index) {
            it('test no: ' + index, function () {
                webu._extend(test);


                if(test.properties)
                    test.properties.forEach(function(property){

                        var provider = new FakeHttpProvider();
                        webu.setProvider(provider);
                        provider.injectResult('');
                        provider.injectValidation(function (payload) {
                            assert.equal(payload.jsonrpc, '2.0');
                            assert.equal(payload.method, property.getter);
                        });

                        if(test.property) {
                            assert.isObject(web3[test.property][property.name]);
                            assert.isFunction(web3[test.property]['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);
                        } else {
                            assert.isObject(web3[property.name]);
                            assert.isFunction(web3['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);
                        }
                    });

                if(test.methods)
                    test.methods.forEach(function(property){
                        if(test.property)
                            assert.isFunction(web3[test.property][property.name]);
                        else
                            assert.isFunction(web3[property.name]);
                    });

            });
        });
    });
});

