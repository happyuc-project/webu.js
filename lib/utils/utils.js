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
 * @file utils.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

/**
 * Utils
 *
 * @module utils
 */

/**
 * Utility functions
 *
 * @class [utils] utils
 * @constructor
 */


var BigNumber = require('bignumber.js');
var sha3 = require('./sha3.js');
var utf8 = require('utf8');

var unitMap = {
    'wei'  : '1',
    'kwei' : '1000',
    'mwei' : '1000000',
    'gwei' : '1000000000',
    'twei' : '1000000000000',
    'pwei' : '1000000000000000',
    'irc'  : '1000000000000000000',
    'kirc' : '1000000000000000000000',
    'girc' : '1000000000000000000000000',
    'tirc' : '1000000000000000000000000000',
    'pirc' : '1000000000000000000000000000000',
    'eirc' : '1000000000000000000000000000000000',
    'zirc' : '1000000000000000000000000000000000000',
    'yirc' : '1000000000000000000000000000000000000000',
    'nirc' : '1000000000000000000000000000000000000000000',
    'dirc' : '1000000000000000000000000000000000000000000000',
    'virc' : '1000000000000000000000000000000000000000000000000',
    'uirc' : '1000000000000000000000000000000000000000000000000000',
};

/**
 * Should be called to pad string to expected length
 *
 * @method padLeft
 * @param {String} string to be padded
 * @param chars
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
var padLeft = function(string, chars, sign) {
    return new Array(chars - string.length + 1).join(sign ? sign : '0') + string;
};

/**
 * Should be called to pad string to expected length
 *
 * @method padRight
 * @param {String} string to be padded
 * @param chars
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
var padRight = function(string, chars, sign) {
    return string + (new Array(chars - string.length + 1).join(sign ? sign : '0'));
};

/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method toUtf8
 * @returns {String} ascii string representation of hex value
 * @param hex
 */
var toUtf8 = function(hex) {
// Find termination
    var str = '';
    var i = 0, l = hex.length;
    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i += 2) {
        var code = parseInt(hex.substr(i, 2), 16);
        if (code === 0) break;
        str += String.fromCharCode(code);
    }

    return utf8.decode(str);
};

/**
 * Should be called to get ascii from it's hex representation
 *
 * @method toAscii
 * @returns {String} ascii string representation of hex value
 * @param hex
 */
var toAscii = function(hex) {
// Find termination
    var str = '';
    var i = 0, l = hex.length;
    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i += 2) {
        var code = parseInt(hex.substr(i, 2), 16);
        str += String.fromCharCode(code);
    }

    return str;
};

/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method fromUtf8
 * @param str
 * @param {String | Boolean} allowZero to convert code point zero to 00 instead of end of string
 * @returns {String} hex representation of input string
 */
var fromUtf8 = function(str, allowZero) {
    str = utf8.encode(str);
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (code === 0) {
            if (allowZero) {
                hex += '00';
            } else {
                break;
            }
        } else {
            var n = code.toString(16);
            hex += n.length < 2 ? '0' + n : n;
        }
    }

    return '0x' + hex;
};

/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method fromAscii
 * @returns {String} hex representation of input string
 * @param str
 */
var fromAscii = function(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        var n = code.toString(16);
        hex += n.length < 2 ? '0' + n : n;
    }

    return '0x' + hex;
};

/**
 * Should be used to create full function/event name from json abi
 *
 * @method transformToFullName
 * @return {String} full fnction/event name
 * @param json
 */
var transformToFullName = function(json) {
    if (json.name.indexOf('(') !== -1) {
        return json.name;
    }

    var typeName = json.inputs.map(function(i) {
        return i.type;
    }).join();
    return json.name + '(' + typeName + ')';
};

/**
 * Should be called to get display name of contract function
 *
 * @method extractDisplayName
 * @param {String} name of function/event
 * @returns {String} display name for function/event eg. multiply(uint256) -> multiply
 */
var extractDisplayName = function(name) {
    var stBracket = name.indexOf('(');
    var endBracket = name.indexOf(')');
    return (stBracket !== -1 && endBracket !== -1) ? name.substr(0, stBracket) : name;
};

/**
 * Should be called to get type name of contract function
 *
 * @method extractTypeName
 * @param {String} name of function/event
 * @returns {String} type name for function/event eg. multiply(uint256) -> uint256
 */
var extractTypeName = function(name) {
    var stBracket = name.indexOf('(');
    var endBracket = name.indexOf(')');
    return (stBracket !== -1 && endBracket !== -1)
        ? name.substr(stBracket + 1, endBracket - stBracket - 1).replace(' ', '')
        : '';
};

/**
 * Converts value to it's decimal representation in string
 *
 * @method toDecimal
 * @return {String}
 * @param value
 */
var toDecimal = function(value) {
    return toBigNumber(value).toNumber();
};

/**
 * Converts value to it's hex representation
 *
 * @method fromDecimal
 * @return {String}
 * @param value
 */
var fromDecimal = function(value) {
    var number = toBigNumber(value);
    var result = number.toString(16);

    return number.lessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
};

/**
 * Auto converts any given value into it's hex representation.
 *
 * And even stringifys objects before.
 *
 * @method toHex
 * @return {String}
 * @param val
 */
var toHex = function(val) {
    /*jshint maxcomplexity: 8 */

    if (isBoolean(val))
        return fromDecimal(+val);

    if (isBigNumber(val))
        return fromDecimal(val);

    if (typeof val === 'object')
        return fromUtf8(JSON.stringify(val));

    // if its a negative number, pass it through fromDecimal
    if (isString(val)) {
        if (val.indexOf('-0x') === 0) {
            return fromDecimal(val);
        } else if (val.indexOf('0x') === 0) {
            return val;
        } else if (!isFinite(val)) {
            return fromUtf8(val, 1);
        }
    }

    return fromDecimal(val);
};

/**
 * Returns value of unit in Wei
 *
 * @method getValueOfUnit
 * @param {String} unit the unit to convert to, default irc
 * @returns {BigNumber} value of the unit (in Wei)
 * @throws error if the unit is not correct:w
 */
var getValueOfUnit = function(unit) {
    unit = unit ? unit.toLowerCase() : 'irc';
    var unitValue = unitMap[unit];
    if (unitValue === undefined) {
        throw new Error('This unit doesn\'t exists, please use the one of the following units' + JSON.stringify(unitMap, null, 2));
    }
    return new BigNumber(unitValue, 10);
};

/**
 * Takes a number of wei and converts it to any other irc unit.
 * @method fromWei
 * @param {Number|String} number can be a number, number string or a HEX of a decimal
 * @param {String} unit the unit to convert to, default irc
 * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
 */
var fromWei = function(number, unit) {
    var returnValue = toBigNumber(number).dividedBy(getValueOfUnit(unit));
    return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

/**
 * Takes a number of a unit and converts it to wei.
 * @method toWei
 * @param {Number|String|BigNumber} number can be a number, number string or a HEX of a decimal
 * @param {String} unit the unit to convert from, default irc
 * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
 */
var toWei = function(number, unit) {
    var returnValue = toBigNumber(number).times(getValueOfUnit(unit));
    return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

/**
 * Takes an input and transforms it into an bignumber
 *
 * @method toBigNumber
 * @return {BigNumber} BigNumber
 * @param number
 */
var toBigNumber = function(number) {
    /*jshint maxcomplexity:5 */
    number = number || 0;
    if (isBigNumber(number))
        return number;

    if (isString(number) &&
        (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
        return new BigNumber(number.replace('0x', ''), 16);
    }
    return new BigNumber(number.toString(10), 10);
};

/**
 * Takes and input transforms it into bignumber and if it is negative value, into two's complement
 *
 * @method toTwosComplement
 * @return {BigNumber}
 * @param number
 */
var toTwosComplement = function(number) {
    var bigNumber = toBigNumber(number).round();
    if (bigNumber.lessThan(0)) {
        return new BigNumber('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16).plus(bigNumber).plus(1);
    }
    return bigNumber;
};

/**
 * Checks if the given string is strictly an address
 *
 * @method isStrictAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isStrictAddress = function(address) {
    return /^0x[0-9a-f]{40}$/i.test(address);
};

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isAddress = function(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) ||
        /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isChecksumAddress = function(address) {
    // Check each case
    address = address.replace('0x', '');
    var addressHash = sha3(address.toLowerCase());

    for (var i = 0; i < 40; i++) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

/**
 * Makes a checksum address
 *
 * @method toChecksumAddress
 * @param {String} address the given HEX adress
 * @return {String}
 */
var toChecksumAddress = function(address) {
    if (typeof address === 'undefined') return '';

    address = address.toLowerCase().replace('0x', '');
    var addressHash = sha3(address);
    var checksumAddress = '0x';

    for (var i = 0; i < address.length; i++) {
        // If ith character is 9 to f then make it uppercase
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += address[i].toUpperCase();
        } else {
            checksumAddress += address[i];
        }
    }
    return checksumAddress;
};

/**
 * Transforms given string to valid 20 bytes-length addres with 0x prefix
 *
 * @method toAddress
 * @param {String} address
 * @return {String} formatted address
 */
var toAddress = function(address) {
    if (isStrictAddress(address)) {
        return address;
    }

    if (/^[0-9a-f]{40}$/.test(address)) {
        return '0x' + address;
    }

    return '0x' + padLeft(toHex(address).substr(2), 40);
};

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @method isBigNumber
 * @return {Boolean}
 * @param object
 */
var isBigNumber = function(object) {
    return object instanceof BigNumber || (object && object.constructor && object.constructor.name === 'BigNumber');
};

/**
 * Returns true if object is string, otherwise false
 *
 * @method isString
 * @return {Boolean}
 * @param object
 */
var isString = function(object) {
    return typeof object === 'string' || (object && object.constructor && object.constructor.name === 'String');
};

/**
 * Returns true if object is function, otherwise false
 *
 * @method isFunction
 * @return {Boolean}
 * @param object
 */
var isFunction = function(object) {
    return typeof object === 'function';
};

/**
 * Returns true if object is Objet, otherwise false
 *
 * @method isObject
 * @return {Boolean}
 * @param object
 */
var isObject = function(object) {
    return object !== null && !(Array.isArray(object)) && typeof object === 'object';
};

/**
 * Returns true if object is boolean, otherwise false
 *
 * @method isBoolean
 * @return {Boolean}
 * @param object
 */
var isBoolean = function(object) {
    return typeof object === 'boolean';
};

/**
 * Returns true if object is array, otherwise false
 *
 * @method isArray
 * @return {Boolean}
 * @param object
 */
var isArray = function(object) {
    return Array.isArray(object);
};

/**
 * Returns true if given string is valid json object
 *
 * @method isJson
 * @return {Boolean}
 * @param str
 */
var isJson = function(str) {
    try {
        return !!JSON.parse(str);
    } catch (e) {
        return false;
    }
};

/**
 * Returns true if given string is a valid irchain block header bloom.
 *
 * @method isBloom
 * @return {Boolean}
 * @param bloom
 */
var isBloom = function(bloom) {
    if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
        return false;
    } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) ||
        /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
        return true;
    }
    return false;
};

/**
 * Returns true if given string is a valid log topic.
 *
 * @method isTopic
 * @return {Boolean}
 * @param topic
 */
var isTopic = function(topic) {
    if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
        return false;
    } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) ||
        /^(0x)?[0-9A-F]{64}$/.test(topic)) {
        return true;
    }
    return false;
};

module.exports = {
    padLeft            : padLeft,
    padRight           : padRight,
    toHex              : toHex,
    toDecimal          : toDecimal,
    fromDecimal        : fromDecimal,
    toUtf8             : toUtf8,
    toAscii            : toAscii,
    fromUtf8           : fromUtf8,
    fromAscii          : fromAscii,
    transformToFullName: transformToFullName,
    extractDisplayName : extractDisplayName,
    extractTypeName    : extractTypeName,
    toWei              : toWei,
    fromWei            : fromWei,
    toBigNumber        : toBigNumber,
    toTwosComplement   : toTwosComplement,
    toAddress          : toAddress,
    isBigNumber        : isBigNumber,
    isStrictAddress    : isStrictAddress,
    isAddress          : isAddress,
    isChecksumAddress  : isChecksumAddress,
    toChecksumAddress  : toChecksumAddress,
    isFunction         : isFunction,
    isString           : isString,
    isObject           : isObject,
    isBoolean          : isBoolean,
    isArray            : isArray,
    isJson             : isJson,
    isBloom            : isBloom,
    isTopic            : isTopic,
};
