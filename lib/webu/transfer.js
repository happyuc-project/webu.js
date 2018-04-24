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
 * @file transfer.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

var Iban = require('./iban');
var exchangeAbi = require('../contracts/SmartExchange.json');

/**
 * Should be used to make Iban transfer
 *
 * @method transfer
 * @param huc
 * @param {String} from
 * @param {String} to iban
 * @param {Value} value to be tranfered
 * @param {Function} callback, callback
 */
var transfer = function(huc, from, to, value, callback) {
    var iban = new Iban(to);
    if (!iban.isValid()) {
        throw new Error('invalid iban address');
    }

    if (iban.isDirect()) {
        return transferToAddress(huc, from, iban.address(), value, callback);
    }

    if (!callback) {
        var address = huc.icapNamereg().addr(iban.institution());
        return deposit(huc, from, address, value, iban.client());
    }

    huc.icapNamereg().addr(iban.institution(), function(err, address) {
        return deposit(huc, from, address, value, iban.client(), callback);
    });

};

/**
 * Should be used to transfer funds to certain address
 *
 * @method transferToAddress
 * @param huc
 * @param {String} from
 * @param {String} to
 * @param {Value} value to be tranfered
 * @param {Function} callback, callback
 */
var transferToAddress = function(huc, from, to, value, callback) {
    return huc.sendTransaction({
        address: to,
        from: from,
        value: value,
    }, callback);
};

/**
 * Should be used to deposit funds to generic Exchange contract (must implement deposit(bytes32) method!)
 *
 * @method deposit
 * @param huc
 * @param {String} from
 * @param {String} to
 * @param {Value} value to be transfered
 * @param {String} client unique identifier
 * @param {Function} callback, callback
 */
var deposit = function(huc, from, to, value, client, callback) {
    return huc.contract(exchangeAbi).at(to).deposit(client, {
        from: from,
        value: value,
    }, callback);
};

module.exports = transfer;

