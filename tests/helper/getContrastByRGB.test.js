import { getContrastByColor } from '../../js/utils';

// Succeed

it('should return dark for any light rgb color', () => {
  const contrast = getContrastByColor('rgb(167, 255, 167)');

  expect(contrast).toBe('dark');
});

it('should return dark for any light rgba color', () => {
  const contrast = getContrastByColor('rgba(167, 255, 167, .8)');

  expect(contrast).toBe('dark');
});

it('should return light for any dark rgb color', () => {
  const contrast = getContrastByColor('rgb(132, 39, 39)');

  expect(contrast).toBe('light');
});

it('should return light for any dark rgba color', () => {
  const contrast = getContrastByColor('rgba(132, 39, 39, .8)');

  expect(contrast).toBe('light');
});

it('should return light for any dark hex color', () => {
  const contrast = getContrastByColor('#2d2d2d');

  expect(contrast).toBe('light');
});

// Fail

it('should fail because it is not a valid color', () => {
  const contrast = getContrastByColor('rgb(167, 255, )');

  expect(contrast).toBeNull();
});
