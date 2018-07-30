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
/** @file config.js
 * @authors:
 *   Marek Kotewicz <marek@ethdev.com>
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
 * @class [utils] config
 * @constructor
 */


/// required to define IRC_BIGNUMBER_ROUNDING_MODE
var BigNumber = require('bignumber.js');

var IRC_UNITS = [
    'wei',
    'kwei',
    'mwei',
    'gwei',
    'twei',
    'pwei',
    'irc',
    'kirc',
    'mirc',
    'girc',
    'tirc',
    'pirc',
    'eirc',
    'zirc',
    'yirc',
    'nirc',
    'dirc',
    'virc',
    'uirc',
];

module.exports = {
    IRC_PADDING                : 32,
    IRC_SIGNATURE_LENGTH       : 4,
    IRC_UNITS                  : IRC_UNITS,
    IRC_BIGNUMBER_ROUNDING_MODE: {ROUNDING_MODE: BigNumber.ROUND_DOWN},
    IRC_POLLING_TIMEOUT        : 1000 / 2,
    defaultBlock               : 'latest',
    defaultAccount             : undefined,
};
