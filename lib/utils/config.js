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


/// required to define HUC_BIGNUMBER_ROUNDING_MODE
var BigNumber = require('bignumber.js');

var HUC_UNITS = [
    'wei',
    'kwei',
    'Mwei',
    'Gwei',
    'szabo',
    'finney',
    'femtohucer',
    'picohucer',
    'nanohucer',
    'microhucer',
    'millihucer',
    'nano',
    'micro',
    'milli',
    'hucer',
    'grand',
    'Mhucer',
    'Ghucer',
    'Thucer',
    'Phucer',
    'Ehucer',
    'Zhucer',
    'Yhucer',
    'Nhucer',
    'Dhucer',
    'Vhucer',
    'Uhucer',
];

module.exports = {
    HUC_PADDING: 32,
    HUC_SIGNATURE_LENGTH: 4,
    HUC_UNITS: HUC_UNITS,
    HUC_BIGNUMBER_ROUNDING_MODE: {ROUNDING_MODE: BigNumber.ROUND_DOWN},
    HUC_POLLING_TIMEOUT: 1000 / 2,
    defaultBlock: 'latest',
    defaultAccount: undefined,
};

