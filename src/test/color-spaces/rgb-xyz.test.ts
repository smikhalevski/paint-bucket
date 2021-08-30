import {blackRgb, rgb} from '../../main/color-spaces/rgb';
import {rgbToXyz} from '../../main/color-spaces/rgb-xyz';
import {xyz} from '../../main/color-spaces/xyz';

describe('rgbToXyz', () => {

  test('converts RGB to XYZ', () => {
    expect(rgbToXyz(blackRgb)).toBe(xyz(0, 0, 0));
    expect(rgbToXyz(rgb(127, 127, 127))).toBe(xyz(0.20172, 0.21223, 0.23108));
    expect(rgbToXyz(rgb(255, 0, 0))).toBe(xyz(0.41246, 0.21267, 0.01933));
  });
});
