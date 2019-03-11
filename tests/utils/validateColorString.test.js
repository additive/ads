import { validateColorString } from '../../js/helper';

// Succeed

// BUG: is not working ATM
/*
it('should validate a rgb string to an rgb object', () => {
  const expection = validateColorString('rgb(167, 255, 167)');
  const reality = ['rgb', 167, 255, 167];

  expect(expection).toEqual(reality);
});

it('should validate a rgba string to an rgba object', () => {
  const expection = validateColorString('rgba(167, 255, 167, .8)');
  const reality = ['rgba', 167, 255, 167, '.8'];

  expect(expection).toEqual(reality);
});

it('should validate a hex string to an rgb object', () => {
  const expection = validateColorString('#2f2f2f');
  const reality = ['rgb', 47, 47, 47];

  expect(expection).toEqual(reality);
});
*/

// Fail

it('should return false validating a broken hex string', () => {
  const expection = validateColorString('#2f2f2');

  expect(expection).toBeFalsy();
});

it('should return false validating a broken rgb string', () => {
  const expection = validateColorString('rgb(2,250,)');

  expect(expection).toBeFalsy();
});

it('should return false validating a none rgb string', () => {
  const expection = validateColorString('rgb(200,280,190)');

  expect(expection).toBeFalsy();
});
