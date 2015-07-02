SAO [![Build Status](https://travis-ci.org/franleplant/sao.svg)](https://travis-ci.org/franleplant/sao)
====

Sistema de Administracion Odontologica (Odontologic Administration System)

## Intro

This is part of an academic work where small teams create applications from scratch
with a mostly formal process that follows standard software life cycle.

This proyect is mostly a **prototype** since they were time constraints.
It also was my first experience with React and Flux, so, mostly the earlier chunks
are not as neat as I'd like them to be. Nevertheless this code has some nice patterns inside all the mess,
for example, the `Odontogram` component will be likely to be refactored into its own module and published to npm.

## Developing

```bash
# Install deps
npm install

# Watch to compile assets, run a static server and open a browser tab
npm start
```


## Selenium tests

Use [selenium-standalone](https://www.npmjs.com/package/selenium-standalone) package
to install and start selenium server.

After that, make sure that the site is compiled with `npm run build:js` and
after that start the localhost server with `npm run serve`.

After that, run the tests with

```sh
# start selenium
selenium-standalone start
# run tests
node selenium_tests/*
```


### Arg places 

There is a file called `./scripts/arg_data.csv'
that has been downloaded from
http://datospublicos.org/package/localidades-de-argentina

which contains all data of Argentinian Cities and Provincies and Postal Codes.

You can use `npm run util:argplaces` to parse it and create
`./scripts/arg_data.json`

### Obras Sociales

For now, there is a simple set of Obras Sociales, but a somewhat full set
can be downloaded from http://www.sssalud.gov.ar/index/index.php?cat=agsis&opc=listRnosc&tipo=100

The complete official list should also be available somewhere, if it's not the one linked above.
