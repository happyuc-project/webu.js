/*
    This file is part of webu.js.

    webu.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    webu.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with webu.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file huc.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @author Fabian Vogelsteller <fabian@ethdev.com>
 * @date 2015
 */

'use strict';

var formatters = require('../formatters');
var utils = require('../../utils/utils');
var Method = require('../method');
var Property = require('../property');
var c = require('../../utils/config');
var Contract = require('../contract');
var watches = require('./watches');
var Filter = require('../filter');
var IsSyncing = require('../syncing');
var namereg = require('../namereg');
var Iban = require('../iban');
var transfer = require('../transfer');

var blockCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ?
        'huc_getBlockByHash' :
        'huc_getBlockByNumber';
};

var transactionFromBlockCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ?
        'huc_getTransactionByBlockHashAndIndex' :
        'huc_getTransactionByBlockNumberAndIndex';
};

var uncleCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ?
        'huc_getUncleByBlockHashAndIndex' :
        'huc_getUncleByBlockNumberAndIndex';
};

var getBlockTransactionCountCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ?
        'huc_getBlockTransactionCountByHash' :
        'huc_getBlockTransactionCountByNumber';
};

var uncleCountCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ?
        'huc_getUncleCountByHucBlockHash' :
        'huc_getUncleCountByBlockNumber';
};

function Huc(web3) {
    this._requestManager = webu._requestManager;

    var self = this;

    methods().forEach(function(method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });

    properties().forEach(function(p) {
        p.attachToObject(self);
        p.setRequestManager(self._requestManager);
    });

    this.iban = Iban;
    this.sendIBANTransaction = transfer.bind(null, this);
}

Object.defineProperty(Huc.prototype, 'defaultBlock', {
    get: function() {
        return c.defaultBlock;
    },
    set: function(val) {
        c.defaultBlock = val;
        return val;
    },
});

Object.defineProperty(Huc.prototype, 'defaultAccount', {
    get: function() {
        return c.defaultAccount;
    },
    set: function(val) {
        c.defaultAccount = val;
        return val;
    },
});

var methods = function() {
    var getBalance = new Method({
        name: 'getBalance',
        call: 'huc_getBalance',
        params: 2,
        inputFormatter: [
            formatters.inputAddressFormatter,
            formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: formatters.outputBigNumberFormatter,
    });

    var getStorageAt = new Method({
        name: 'getStorageAt',
        call: 'huc_getStorageAt',
        params: 3,
        inputFormatter: [
            null,
            utils.toHex,
            formatters.inputDefaultBlockNumberFormatter],
    });

    var getCode = new Method({
        name: 'getCode',
        call: 'huc_getCode',
        params: 2,
        inputFormatter: [
            formatters.inputAddressFormatter,
            formatters.inputDefaultBlockNumberFormatter],
    });

    var getBlock = new Method({
        name: 'getBlock',
        call: blockCall,
        params: 2,
        inputFormatter: [
            formatters.inputBlockNumberFormatter, function(val) {
                return !!val;
            }],
        outputFormatter: formatters.outputBlockFormatter,
    });

    var getUncle = new Method({
        name: 'getUncle',
        call: uncleCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputBlockFormatter,

    });

    var getCompilers = new Method({
        name: 'getCompilers',
        call: 'huc_getCompilers',
        params: 0,
    });

    var getBlockTransactionCount = new Method({
        name: 'getBlockTransactionCount',
        call: getBlockTransactionCountCall,
        params: 1,
        inputFormatter: [formatters.inputBlockNumberFormatter],
        outputFormatter: utils.toDecimal,
    });

    var getBlockUncleCount = new Method({
        name: 'getBlockUncleCount',
        call: uncleCountCall,
        params: 1,
        inputFormatter: [formatters.inputBlockNumberFormatter],
        outputFormatter: utils.toDecimal,
    });

    var getTransaction = new Method({
        name: 'getTransaction',
        call: 'huc_getTransactionByHash',
        params: 1,
        outputFormatter: formatters.outputTransactionFormatter,
    });

    var getTransactionFromBlock = new Method({
        name: 'getTransactionFromBlock',
        call: transactionFromBlockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputTransactionFormatter,
    });

    var getTransactionReceipt = new Method({
        name: 'getTransactionReceipt',
        call: 'huc_getTransactionReceipt',
        params: 1,
        outputFormatter: formatters.outputTransactionReceiptFormatter,
    });

    var getTransactionCount = new Method({
        name: 'getTransactionCount',
        call: 'huc_getTransactionCount',
        params: 2,
        inputFormatter: [null, formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: utils.toDecimal,
    });

    var sendRawTransaction = new Method({
        name: 'sendRawTransaction',
        call: 'huc_sendRawTransaction',
        params: 1,
        inputFormatter: [null],
    });

    var sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'huc_sendTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter],
    });

    var signTransaction = new Method({
        name: 'signTransaction',
        call: 'huc_signTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter],
    });

    var sign = new Method({
        name: 'sign',
        call: 'huc_sign',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, null],
    });

    var call = new Method({
        name: 'call',
        call: 'huc_call',
        params: 2,
        inputFormatter: [
            formatters.inputCallFormatter,
            formatters.inputDefaultBlockNumberFormatter],
    });

    var estimateGas = new Method({
        name: 'estimateGas',
        call: 'huc_estimateGas',
        params: 1,
        inputFormatter: [formatters.inputCallFormatter],
        outputFormatter: utils.toDecimal,
    });

    var compileSolidity = new Method({
        name: 'compile.solidity',
        call: 'huc_compileSolidity',
        params: 1,
    });

    var compileLLL = new Method({
        name: 'compile.lll',
        call: 'huc_compileLLL',
        params: 1,
    });

    var compileSerpent = new Method({
        name: 'compile.serpent',
        call: 'huc_compileSerpent',
        params: 1,
    });

    var submitWork = new Method({
        name: 'submitWork',
        call: 'huc_submitWork',
        params: 3,
    });

    var getWork = new Method({
        name: 'getWork',
        call: 'huc_getWork',
        params: 0,
    });

    return [
        getBalance,
        getStorageAt,
        getCode,
        getBlock,
        getUncle,
        getCompilers,
        getBlockTransactionCount,
        getBlockUncleCount,
        getTransaction,
        getTransactionFromBlock,
        getTransactionReceipt,
        getTransactionCount,
        call,
        estimateGas,
        sendRawTransaction,
        signTransaction,
        sendTransaction,
        sign,
        compileSolidity,
        compileLLL,
        compileSerpent,
        submitWork,
        getWork,
    ];
};

var properties = function() {
    return [
        new Property({
            name: 'coinbase',
            getter: 'huc_coinbase',
        }),
        new Property({
            name: 'mining',
            getter: 'huc_mining',
        }),
        new Property({
            name: 'hashrate',
            getter: 'huc_hashrate',
            outputFormatter: utils.toDecimal,
        }),
        new Property({
            name: 'syncing',
            getter: 'huc_syncing',
            outputFormatter: formatters.outputSyncingFormatter,
        }),
        new Property({
            name: 'gasPrice',
            getter: 'huc_gasPrice',
            outputFormatter: formatters.outputBigNumberFormatter,
        }),
        new Property({
            name: 'accounts',
            getter: 'huc_accounts',
        }),
        new Property({
            name: 'blockNumber',
            getter: 'huc_blockNumber',
            outputFormatter: utils.toDecimal,
        }),
        new Property({
            name: 'protocolVersion',
            getter: 'huc_protocolVersion',
        }),
    ];
};

Huc.prototype.contract = function(abi) {
    var factory = new Contract(this, abi);
    return factory;
};

Huc.prototype.filter = function(
    options, callback, filterCreationErrorCallback) {
    return new Filter(options, 'huc', this._requestManager, watches.huc(),
        formatters.outputLogFormatter, callback, filterCreationErrorCallback);
};

Huc.prototype.namereg = function() {
    return this.contract(namereg.global.abi).at(namereg.global.address);
};

Huc.prototype.icapNamereg = function() {
    return this.contract(namereg.icap.abi).at(namereg.icap.address);
};

Huc.prototype.isSyncing = function(callback) {
    return new IsSyncing(this._requestManager, callback);
};

module.exports = Huc;
