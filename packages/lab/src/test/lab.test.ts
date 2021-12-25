import {createLab} from '../main';

describe('createLab', () => {

  test('creates LAB color', () => {
    expect(createLab(18, 52, 86)).toEqual({
      type: 'lab',
      L: 18,
      A: 52,
      B: 86,
      a: 1,
    });
  });

  test('creates LAB color with alpha', () => {
    expect(createLab(18, 52, 86, .5)).toEqual({
      type: 'lab',
      L: 18,
      A: 52,
      B: 86,
      a: .5,
    });
  });
});
