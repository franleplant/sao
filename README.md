SAO [![Build Status](https://travis-ci.org/franleplant/sao.svg)](https://travis-ci.org/franleplant/sao)
====

Sistema de Administracion Odontologica (Odontologic Administration System)

## Intro

This is part of an academic work where small teams create applications from scratch
with a process greatly formal.

## Developing

```bash
# Install deps
npm install

# Watch to compile assets, run a static server and open a browser tab
npm start
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
