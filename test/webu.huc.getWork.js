var chai = require('chai');
var webu = require('../index');
var testMethod = require('./helpers/test.method.js');

var method = 'getWork';

var tests = [{
    args: [],
    formattedArgs: [],
    result: true,
    formattedResult: true,
    call: 'huc_'+ method
}];

testMethod.runTests('irc', method, tests);

