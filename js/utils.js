/**
 * Some utility functions
 *
 * @author Marvin Heilemann <marvin.heilemann@googlemail.com>
 * @version 0.0.1
 */

import * as helper from './helper.js';

/**
 * Get dark/light contrast of a rgb color.
 *
 * @param {rgb} string RGB color value
 *
 * @return {dark|light} Our contrast
 */
export function getContrastByColor(colorString) {
  const rgb = helper.validateColorString(colorString);
  if (!rgb) {
    return null;
  }

  const contrast = (rgb[1] * 299 + rgb[2] * 587 + rgb[3] * 114) / 1000;

  return contrast >= 174 ? 'dark' : 'light';
}

/**
 * Creates a simple unique id
 *
 * @return {text} unique text string
 */
export function makeId(length = 5, pre = 'X') {
  let id = pre;
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return id;
}

/**
 * Function that checks if we click outside something.
 *
 * @param {selector} element The element(s)
 * @param {callback} function Our callback
 *
 * @return {eventListener} Adds a event listener
 */
export function onClickOutside(selectors, callback) {
  const addListener = event => {
    let isInside = false;
    selectors.forEach(element => {
      if (element.contains(event.target)) {
        isInside = true;
      }
    });
    if (!isInside) {
      document.removeEventListener('click', addListener);
      callback();
    }
  };
  document.addEventListener('click', addListener);

  return addListener;
}

/**
 * Check if debug is enabled.
 *
 * @return {true|false}
 */
export function isDebug() {
  const debugByAttribute = document.querySelector('[debug]') !== null;
  const debugByMetaTag = document.querySelector('[name="debug"]');

  return debugByAttribute || (debugByMetaTag ? debugByMetaTag : false);
}

/**
 * Copy text to clipboard
 *
 * @see https://stackoverflow.com/a/30810322/4628787
 *
 * @param {string} text
 */
export function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return helper.fallbackCopyTextToClipboard(text);
  }

  navigator.clipboard.writeText(text).then(
    () => {
      console.log(`Copied '${text}' to clipboard asynchronously!`);
    },
    err => {
      console.error(err);
    }
  );
}
