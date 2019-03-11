/**
 * Some helpers for our JavaScript
 *
 * @author Marvin Heilemann <marvin.heilemann@googlemail.com>
 * @version 0.0.1
 */

import he from 'he';

const REGEX_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const REGEX_HEX_SHORT = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
const REGEX_RGB = /^(rgb)\((\d{1,2}|[1][0-9][0-9]|[2][0-5][0-5]),(\d{1,2}|[1][0-9][0-9]|[2][0-5][0-5]),(\d{1,2}|[1][0-9][0-9]|[2][0-5][0-5])\)$/; // eslint-disable-line max-len
const REGEX_RGBA = /^(rgba)\((\d{1,2}|[1][0-9][0-9]|[2][0-5][0-5]),(\d{1,2}|[1][0-9][0-9]|[2][0-5][0-5]),(\d{1,2}|[1][0-9][0-9]|[2][0-5][0-5]),\s?(1|0?\.\d+)\)$/; // eslint-disable-line max-len

/**
 * Validate a RGB or HEX color string
 *
 * @param {string} color hex or rgb(a) string
 *
 * @return {object} rgb(a) object splitted into it's parts
 */
export function validateColorString(colorString) {
  let color = colorString.replace(/ +/g, '');

  const result = hexToRgb(color);
  if (result) {
    color = `rgb(${result.r},${result.g},${result.b})`;
  }

  let rgb = color.match(REGEX_RGB);
  let rgba = color.match(REGEX_RGBA);
  let validColor = rgb ? rgb : rgba ? rgba : null;

  if (validColor) {
    validColor.shift(); // remove color string

    for (let i = 1; i <= 3; i++) {
      validColor[i] = parseInt(validColor[i]);
    }

    return validColor;
  }

  console.warn('Not a valid rgb(a)/hex string!', colorString);

  return false;
}

/**
 * HEX to RGB
 *
 * @param {string} hex hexadecimal string
 *
 * @return {object} RGB object splitted into it's parts
 */
export function hexToRgb(hex) {
  let out = null;

  if (REGEX_HEX.test(hex)) {
    const result = hex.match(REGEX_HEX);
    out = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  } else if (REGEX_HEX_SHORT.test(hex)) {
    const result = hex.match(REGEX_HEX_SHORT);
    out = {
      r: parseInt(`${result[1]}${result[1]}`, 16),
      g: parseInt(`${result[2]}${result[2]}`, 16),
      b: parseInt(`${result[3]}${result[3]}`, 16)
    };
  } else {
    console.warn('Not a valid hexadecimal string!', hex);

    return false;
  }

  return out;
}

/**
 * RGB to HEX
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 *
 * @return {string} hex value
 */
export function rgbToHex(r, g, b) {
  const rgbString = `rgb(${r},${g},${b})`;
  if (!REGEX_RGB.test(rgbString)) {
    console.warn('Not a valid RGB object!', rgbString);

    return false;
  }

  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * RGB component to HEX
 *
 * @param {string} component
 *
 * @return {string} hexadecimal part
 */
export function componentToHex(component) {
  const hex = component.toString(16);

  return hex.length == 1 ? '0' + hex : hex;
}

/**
 * Encode html
 *
 * @param {string}
 *
 * @return {string}
 */
export function htmlEncode(string) {
  return he.encode(string, {
    encodeEverything: false,
    useNamedReferences: true
  });
}

/**
 * Decode string
 *
 * @param {string}
 *
 * @return {string}
 */
export function htmlDecode(string) {
  return he.decode(string);
}

/**
 * Extend two objects
 *
 * @see https://stackoverflow.com/a/25877818/4628787
 *
 * @param {object} target
 * @param {...objects} sources
 *
 * @return {object}
 */
export function extend(target, ...sources) {
  return Object.assign(target, ...sources);
}

/**
 * Fallback for new clipboard API
 *
 * @param {string} text
 */
export function fallbackCopyTextToClipboard(text) {
  if (!document.queryCommandSupported && !document.queryCommandSupported('copy')) {
    return console.error('No queryCommand support for "copy"!');
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.cssText = 'position:fixed;left:-99999px;';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log(`Coping '${text}' to clipboard was ${msg}!`);
  } catch (err) {
    console.error(err);
  }

  document.body.removeChild(textArea);
}
