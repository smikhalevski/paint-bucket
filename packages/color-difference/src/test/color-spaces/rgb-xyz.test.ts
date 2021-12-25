import {rgb} from '../../main/converters/rgb';
import {rgbToXyz} from '../../main/colors/rgb-xyz';
import {xyz} from '../../main/converters/xyz';
import {ColorSpace} from '../../main/color-types';

describe('rgbToXyz', () => {

  const tempXyz = xyz(0, 0, 0);

  test('converts RGB to XYZ', () => {
    expect(rgbToXyz(rgb(0, 0, 0), tempXyz)).toEqual({
      colorSpace: ColorSpace.XYZ,
      X: 0,
      Y: 0,
      Z: 0,
      a: 1,
    });

    expect(rgbToXyz(rgb(127, 127, 127), tempXyz)).toEqual({
      colorSpace: ColorSpace.XYZ,
      X: 20.172109030691124,
      Y: 21.223075741405523,
      Z: 23.108109328757162,
      a: 1,
    });

    expect(rgbToXyz(rgb(255, 0, 0), tempXyz)).toEqual({
      colorSpace: ColorSpace.XYZ,
      X: 41.246,
      Y: 21.267,
      Z: 1.933,
      a: 1,
    });
  });
});
