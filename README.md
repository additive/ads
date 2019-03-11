# (WIP) ADDITIVE DESIGN SYSTEM (ADS) 📦

@hem TODO this

This package provides some default SCSS and JS files we are using in our
projects. It also contains several configuration files for linters and
formatters. Please use them both. If you need anything else or have ideas what
else can we place here, feel free to contribute and send us a merge request.

## Install

`npm install git+ssh://git@git.additive-net.de:additive/additive-design-system#master`

## Usage

### SCSS

Include this in your main [SCSS](https://sass-lang.com/) file:

```scss
@charset 'utf-8';

// ----------------------------
// ADDITIVE
@import "~additive/scss/additive";
```

> if you want to exclude bootstrap you can add a `-nobs` at the end of the last
> _additive_

### JS

Include this in your main
[ES6 JavaScript](https://medium.com/javascript-scene/how-to-learn-es6-47d9a1ac2620)
file to include our JS classes:

```js
import { getContrastByRGB, ... } from "./helper";
import Breakpoint from "./breakpoints";
import Modal from "./modal";
```
