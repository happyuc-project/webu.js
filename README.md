# Migration 0.13.0 -> 0.14.0

To migrate to this version, please follow the guide:

# Happyuc JavaScript API

[![Join the chat at https://gitter.im/happyuc-project/webu.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/happyuc-project/webu.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is the Happyuc compatible [JavaScript API](https://github.com/happyuc-project/wiki/wiki/JavaScript-API)
which implements the [Generic JSON RPC](https://github.com/happyuc-project/wiki/wiki/JSON-RPC) spec. It's available on npm as a node module, for bower and component as an embeddable js and as a meteor.js package.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Stories in Ready][waffle-image]][waffle-url]

You need to run a local Happyuc node to use this library.

[Documentation](https://github.com/happyuc-project/wiki/wiki/JavaScript-API)

## Installation

### Node.js

```bash
npm install webu
```

### Yarn

```bash
yarn add webu
```

### Meteor.js

```bash
meteor add happyuc-project:webu
```

### As Browser module
Bower

```bash
bower install webu
```

Component

```bash
component install happyuc-project/webu.js
```

* Include `webu.min.js` in your html file. (not required for the meteor package)

## Usage
Use the `webu` object directly from global namespace:

```js
console.log(webu); // {huc: .., shh: ...} // it's here!
```

Set a provider (HttpProvider)

```js
if (typeof webu !== 'undefined') {
  webu = new Webu(webu.currentProvider);
} else {
  // set the provider you want from Webu.providers
  webu = new Webu(new Webu.providers.HttpProvider("http://localhost:8545"));
}
```

Set a provider (HttpProvider using [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication))

```js
webu.setProvider(new webu.providers.HttpProvider('http://host.url', 0, BasicAuthUsername, BasicAuthPassword));
```

There you go, now you can use it:

```js
var coinbase = webu.huc.coinbase;
var balance = webu.huc.getBalance(coinbase);
```

You can find more examples in [`example`](https://github.com/happyuc-project/webu.js/tree/master/example) directory.


## Contribute!

### Requirements

* Node.js
* npm

### Building (gulp)

```bash
npm run-script build
```


### Testing (mocha)

```bash
npm test
```

### Community
 - [Gitter](https://gitter.im/happyuc-project/webu.js?source=orgpage)
 - [Forum](https://forum.happyuc-project.org/categories/happyuc-project-js)


### Other implementations
 - Python [Webu.py](https://github.com/happyuc-project/webu.py)
 - Haskell [hs-webu](https://github.com/airalab/hs-webu)
 - Java [webuj](https://github.com/webuj/webuj)
 - Scala [webuj-scala](https://github.com/mslinn/webuj-scala)
 - Purescript [purescript-webu](https://github.com/f-o-a-m/purescript-webu)
 - PHP [webu.php](https://github.com/sc0Vu/webu.php)


[npm-image]: https://badge.fury.io/js/webu.svg
[npm-url]: https://npmjs.org/package/webu
[travis-image]: https://travis-ci.org/happyuc-project/webu.js.svg
[travis-url]: https://travis-ci.org/happyuc-project/webu.js
[dep-image]: https://david-dm.org/happyuc-project/webu.js.svg
[dep-url]: https://david-dm.org/happyuc-project/webu.js
[dep-dev-image]: https://david-dm.org/happyuc-project/webu.js/dev-status.svg
[dep-dev-url]: https://david-dm.org/happyuc-project/webu.js#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/happyuc-project/webu.js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/happyuc-project/webu.js?branch=master
[waffle-image]: https://badge.waffle.io/happyuc-project/webu.js.svg?label=ready&title=Ready
[waffle-url]: https://waffle.io/happyuc-project/webu.js
