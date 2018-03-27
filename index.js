var Webu = require('./lib/webu');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Webu === 'undefined') {
    window.Webu = Webu;
}

module.exports = Webu;
