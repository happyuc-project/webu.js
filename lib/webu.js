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
 * @file webu.js
 * @authors:
 *   Jeffrey Wilcke <jeff@ethdev.com>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 *   Gav Wood <g@ethdev.com>
 * @date 2014
 */

var RequestManager = require('./webu/requestmanager');
var Iban = require('./webu/iban');
var Irc = require('./webu/methods/irc');
var DB = require('./webu/methods/db');
var Shh = require('./webu/methods/shh');
var Net = require('./webu/methods/net');
var Personal = require('./webu/methods/personal');
var Swarm = require('./webu/methods/swarm');
var Settings = require('./webu/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./webu/extend');
var Batch = require('./webu/batch');
var Property = require('./webu/property');
var HttpProvider = require('./webu/httpprovider');
var IpcProvider = require('./webu/ipcprovider');
var BigNumber = require('bignumber.js');

function Webu(provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.irc = new Irc(this);
    this.db  = new DB(this);
    this.shh = new Shh(this);
    this.net = new Net(this);
    this.personal = new Personal(this);
    this.bzz = new Swarm(this);
    this.settings = new Settings();
    this.version = {
        api: version.version,
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider : IpcProvider,
    };
    this._extend = extend(this);
    this._extend({
        properties: properties(),
    });
}

// expose providers on the class
Webu.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider,
};

Webu.prototype.setProvider = function(provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

Webu.prototype.reset = function(keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

Webu.prototype.BigNumber = BigNumber;
Webu.prototype.utils = utils;
Webu.prototype.toHex = utils.toHex;
Webu.prototype.toAscii = utils.toAscii;
Webu.prototype.toUtf8 = utils.toUtf8;
Webu.prototype.fromAscii = utils.fromAscii;
Webu.prototype.fromUtf8 = utils.fromUtf8;
Webu.prototype.toDecimal = utils.toDecimal;
Webu.prototype.fromDecimal = utils.fromDecimal;
Webu.prototype.toBigNumber = utils.toBigNumber;
Webu.prototype.toWei = utils.toWei;
Webu.prototype.fromWei = utils.fromWei;
Webu.prototype.isAddress = utils.isAddress;
Webu.prototype.isChecksumAddress = utils.isChecksumAddress;
Webu.prototype.toChecksumAddress = utils.toChecksumAddress;
Webu.prototype.isIBAN = utils.isIBAN;
Webu.prototype.padLeft = utils.padLeft;
Webu.prototype.padRight = utils.padRight;

Webu.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
Webu.prototype.fromICAP = function(icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function() {
    return [
        new Property({
            name: 'version.node',
            getter: 'webu_clientVersion',
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal,
        }),
        new Property({
            name: 'version.irchain',
            getter: 'irc_protocolVersion',
            inputFormatter: utils.toDecimal,
        }),
        new Property({
            name: 'version.whisper',
            getter: 'shh_version',
            inputFormatter: utils.toDecimal,
        }),
    ];
};

Webu.prototype.isConnected = function() {
    return (this.currentProvider && this.currentProvider.isConnected());
};

Webu.prototype.createBatch = function() {
    return new Batch(this);
};

module.exports = Webu;

