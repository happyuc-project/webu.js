/* jshint ignore:start */

// Browser environment
if (typeof window !== 'undefined') {
    Webu = (typeof window.Webu !== 'undefined') ? window.Webu : require('webu');
    BigNumber = (typeof window.BigNumber !== 'undefined')
        ? window.BigNumber
        : require('bignumber.js');
}

// Node environment
if (typeof global !== 'undefined') {
    Webu = (typeof global.Webu !== 'undefined') ? global.Webu : require('webu');
    BigNumber = (typeof global.BigNumber !== 'undefined')
        ? global.BigNumber
        : require('bignumber.js');
}

/* jshint ignore:end */
