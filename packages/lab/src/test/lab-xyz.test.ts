import {createLab, xyzToLab} from '../main';
import {createXyz} from '@paint-bucket/xyz';

describe('xyzToLab', () => {

  test('converts XYZ to LAB', () => {
    expect(xyzToLab(createXyz(), createLab())).toEqual({
      type: 'lab',
      L: 0,
      A: 0,
      B: 0,
      a: 1,
    });

    expect(xyzToLab(createXyz(0.5, 0.5, 0.5), createLab())).toEqual({
      type: 'lab',
      L: 4.516459999999999,
      A: 1.0144720769724447,
      B: 0.6352866930558476,
      a: 1,
    });

    expect(xyzToLab(createXyz(0.41246, 0.21267, 0.01933), createLab())).toEqual({
      type: 'lab',
      L: 1.9210310964000001,
      A: 8.615681955736115,
      B: 3.035637343553538,
      a: 1,
    });
  });
});
