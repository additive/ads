# [ADDITIVE](https://www.additive-net.de/) DESIGN SYSTEM (ADS) 📦

A package for ADDITIVE to have a unique design system across multiple projects.
It is part of our new Corporate Design.

## Usage

We have to packages _ads_ and _adsm_. ADSM is smaller and just includes some
important parts, like the bootstrap grid, see more in
[scss/adsm.scss](scss/adsm.scss). The normal version includes components and
styles plus the minimal package.

To use one of them. Just import them via SCSS or load the CSS directly into your
page.

```scss
@import '@additive/ads/scss/ads';
@import '@additive/ads/scss/adsm'; // minimal
```

> CDN: `"unpkg": "css/ads.min.css"`

## Installation

```bash
$ npm install
```

## Development

```bash
$ npm start
```

## Production

```bash
$ npm run build
```

## Todo

- [] ...
