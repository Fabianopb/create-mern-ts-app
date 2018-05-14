# API skeleton

[![Codeship](https://img.shields.io/codeship/ead92960-4dc1-0135-5d12-0a7961bd3964.svg)](https://app.codeship.com/projects/233308)
[![Coveralls](https://img.shields.io/coveralls/anthillsolutions/api-skel.svg)](https://coveralls.io/github/anthillsolutions/api-skel?branch=master)
[![Gemnasium](https://img.shields.io/gemnasium/anthillsolutions/api-skel.svg)](https://gemnasium.com/github.com/anthillsolutions/api-skel)
[![label](https://img.shields.io/github/issues/anthillsolutions/api-skel.svg)](https://github.com/anthillsolutions/api-skel/issues)
[![license](https://img.shields.io/github/license/anthillsolutions/api-skel.svg)](https://github.com/anthillsolutions/api-skel/blob/master/LICENSE)

Webpack + Typescript + Express + Jest + Chai

## How to use API skeleton

### Install

```
$ yarn
```

A post install script will transpile Typescript code into javascript. Transpiled code can be found at `./dist/server.js`.

### Tests

```
$ yarn test
```

### Send coverage to coveralls

```
$ COVERALLS_REPO_TOKEN=XXXX yarn test-ci
```

You need to add your coveralls repository token, otherwise it will fail.

### Run

```
$ yarn start
```

This will launch the server as is.

```
$ yarn pm2
```

This will launch the server with pm2 instead.

## Description

A small Express application written in [Typescript](https://www.typescriptlang.org/) and set with [Webpack](https://webpack.github.io/). Tests are done with [Jest](https://facebook.github.io/jest/) + [Mocha](https://mochajs.org/)/[Chai](http://chaijs.com/).

You can find the demo app running at: 
https://api-skel.herokuapp.com/.

## Authors

- Pierre Repetto-Andipatin <mailto:pierre@anthillsolutions.ch>

## License

MIT
