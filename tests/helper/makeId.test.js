import { makeId } from '../../js/utils';

// Succeed

it('should create an id with random characters', () => {
  const id = makeId();

  expect(id).toMatch(/([a-z0-9])+/i);
});

it('should create an id with a length of 8', () => {
  const length = 8;
  const preChar = 'T';
  const id = makeId(length, preChar);

  expect(id.length).toBe(length + preChar.length); // + pre character length
});

it('should create an id that starts with T', () => {
  const id = makeId(null, 'T');

  expect(id.startsWith('T')).toBeTruthy();
});
