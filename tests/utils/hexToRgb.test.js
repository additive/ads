import { hexToRgb } from '../../js/helper';

// Succeed

it('should convert a hex string to an rgb object', () => {
  const expection = hexToRgb('#2f2f2f');
  const reality = {'b': 47, 'g': 47, 'r': 47};

  expect(expection).toEqual(reality);
});

it('should convert a short hex string to an rgb object', () => {
  const expection = hexToRgb('#33d');
  const reality = {'b': 221, 'g': 51, 'r': 51};

  expect(expection).toEqual(reality);
});

it('should convert a short hex string without a hash to an rgb object', () => {
  const expection = hexToRgb('33d');
  const reality = {'b': 221, 'g': 51, 'r': 51};

  expect(expection).toEqual(reality);
});

// Fail

it('should fail convert a incorrect hex string', () => {
  const expection = hexToRgb('#33d2');

  expect(expection).toBeFalsy();
});
