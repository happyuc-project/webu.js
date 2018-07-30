#!/usr/bin/env node

var Webu = require('../index.js');
var webu = new Webu();

webu.setProvider(new webu.providers.HttpProvider('http://localhost:8545'));

var coinbase = webu.irc.coinbase;
console.log(coinbase);

var balance = webu.irc.getBalance(coinbase);
console.log(balance.toString(10));
