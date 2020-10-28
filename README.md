# module-path-hook

[![Build status](https://img.shields.io/travis/imcuttle/module-path-hook/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/module-path-hook)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/module-path-hook.svg?style=flat-square)](https://codecov.io/github/imcuttle/module-path-hook?branch=master)
[![NPM version](https://img.shields.io/npm/v/module-path-hook.svg?style=flat-square)](https://www.npmjs.com/package/module-path-hook)
[![NPM Downloads](https://img.shields.io/npm/dm/module-path-hook.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/module-path-hook)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> Module path hook for Node.js require

## Installation

```bash
npm install module-path-hook
# or use yarn
yarn add module-path-hook
```

## Usage

```javascript
/**
  app/
    index.js
    foo.js
 */
require('module-path-hook/register')({
  // See webpack resolve: https://webpack.docschina.org/configuration/resolve/
  alias: {
    '@app': '/app/'
  }
})

require.resolve('@app') === '/app/index.js'
require.resolve('@app/foo') === '/app/foo.js'
```

## Related

- [require-resolve-hook](https://github.com/imcuttle/require-resolve-hook/) - Module to hook into the Node.js require and require.resolve function
- [require-fallback-middle](https://github.com/imcuttle/require-fallback-middle) - Module to fallback the Node.js require and require.resolve function

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

This library is written and maintained by imcuttle, <a href="mailto:imcuttle@163.com">imcuttle@163.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟
