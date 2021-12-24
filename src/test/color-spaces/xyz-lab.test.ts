import {xyzToLab} from '../../main/colors/xyz-lab';
import {lab} from '../../main/converters/lab';
import {xyz} from '../../main/converters/xyz';
import {ColorSpace} from '../../main/color-types';

describe('xyzToLab', () => {

  const tempLab = lab(0, 0, 0);

  test('converts XYZ to LAB', () => {
    expect(xyzToLab(xyz(0, 0, 0), tempLab)).toEqual({
      colorSpace: ColorSpace.LAB,
      L: 0,
      A: 0,
      B: 0,
      a: 1,
    });

    expect(xyzToLab(xyz(0.5, 0.5, 0.5), tempLab)).toEqual({
      colorSpace: ColorSpace.LAB,
      L: 4.516459999999999,
      A: 1.0144720769724447,
      B: 0.6352866930558476,
      a: 1,
    });

    expect(xyzToLab(xyz(0.41246, 0.21267, 0.01933), tempLab)).toEqual({
      colorSpace: ColorSpace.LAB,
      L: 1.9210310964000001,
      A: 8.615681955736115,
      B: 3.035637343553538,
      a: 1,
    });
  });
});
