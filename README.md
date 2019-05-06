# [ADDITIVE](https://www.additive-net.de/) DESIGN SYSTEM (ADS) 📦

![npm](https://img.shields.io/npm/v/@additive/ads.svg?style=for-the-badge)

A package for ADDITIVE to have a unique design system across multiple projects.
It is part of our new Corporate Design.

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Production](#production)

## Installation

```bash
$ npm install @additive/ads
```

## Usage

We have two packages; _ads_ and _adsm_. **ADSM** is smaller and just includes
some important parts, like the bootstrap grid, see more in
[scss/adsm.scss](scss/adsm.scss). **ADS** includes components and styles plus
the **ADSM** package.

To use one of them. Just import them via SCSS or load the CSS directly into your
page.

```scss
@import '@additive/ads/scss/ads';
// or for minimal
@import '@additive/ads/scss/adsm';
```

> CDN:
> [https://unpkg.com/@additive/ads@version/file](https://unpkg.com/@additive/ads)

## Development

```bash
$ npm install
$ npm start
```

## Production

```bash
$ npm run build
```
