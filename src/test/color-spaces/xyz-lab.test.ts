import {xyzToLab} from '../../main/color-spaces/xyz-lab';
import {lab} from '../../main/color-spaces/lab';
import {xyz} from '../../main/color-spaces/xyz';

describe('xyzToLab', () => {

  test('converts XYZ to LAB', () => {
    expect(xyzToLab(xyz(0, 0, 0))).toBe(lab(0, 0, 0));
    expect(xyzToLab(xyz(0.20172, 0.21223, 0.23108))).toBe(lab(53.1927, 0.0031, -0.0062));
    expect(xyzToLab(xyz(0.41246, 0.21267, 0.01933))).toBe(lab(53.1420, 79.7669, 69.1452));
  });
});
