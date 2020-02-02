# hotkey-chain

[![Build status](https://img.shields.io/travis/imcuttle/hotkey-chain/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/hotkey-chain)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/hotkey-chain.svg?style=flat-square)](https://codecov.io/github/imcuttle/hotkey-chain?branch=master)
[![NPM version](https://img.shields.io/npm/v/hotkey-chain.svg?style=flat-square)](https://www.npmjs.com/package/hotkey-chain)
[![NPM Downloads](https://img.shields.io/npm/dm/hotkey-chain.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/hotkey-chain)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> The easy way to create shortcut

## Installation

```bash
npm install hotkey-chain
# or use yarn
yarn add hotkey-chain
```

## Usage

```javascript
import HotKeyChain from 'hotkey-chain'

const handler = new HotKeyChain()
  .on('enter', (event, next) => {
    if (someCondition) {
      // do something
      return
    }
    // Run next `enter` handler
    next()
  })
  .on('enter', (event, next) => {
    if (someCondition2) {
      // do something
      return
    }
    next()
  }).handler

document.addEventListener('keydown', handler)
```

Or use `HotKeyChainManager` quickly.

```javascript
import { HotKeyChainManager } from 'hotkey-chain'

new HotKeyChainManager(document)
  .on('enter', (event, next) => {
    if (someCondition) {
      // do something
      return
    }
    next()
  })
  .on('enter', (event, next) => {
    if (someCondition2) {
      // do something
      return
    }
    next()
  })
  .start()
```

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:moyuyc95@gmail.com">moyuyc95@gmail.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟
