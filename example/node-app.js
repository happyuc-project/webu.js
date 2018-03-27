#!/usr/bin/env node

var Webu = require('../index.js');
var webu = new Webu();

webu.setProvider(new webu.providers.HttpProvider('http://localhost:8545'));

var coinbase = webu.huc.coinbase;
console.log(coinbase);

var balance = webu.huc.getBalance(coinbase);
console.log(balance.toString(10));
