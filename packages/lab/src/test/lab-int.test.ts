import {createLab, intToLab, labToInt} from '../main';

describe('labToInt', () => {

  test('clamps bytes', () => {
    expect(labToInt(createLab(400, 52, 300, 100))).toBe(0xFF_B4_FF_FF_4);
  });
});

describe('intToLab', () => {

  test('symmetrical to packaging', () => {
    const lab1 = createLab();
    const lab2 = intToLab(labToInt(createLab(18, 52, 86, .2)), lab1);

    expect(lab2).toBe(lab1);
    expect(lab2).toEqual({
      type: 'lab',
      L: 18.03921568627451,
      A: 52,
      B: 86,
      a: 0.2,
    });
  });
});
