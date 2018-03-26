var Web3 = require('./lib/webu');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Webu === 'undefined') {
    window.Web3 = Webu;
}

module.exports = Webu;
