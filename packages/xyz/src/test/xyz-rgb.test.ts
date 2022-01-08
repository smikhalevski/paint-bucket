import {rgbToXyz, xyzToRgb} from '../main/xyz-rgb';

describe('rgbToXyz', () => {

  test('converts black RGB to XYZ', () => {
    expect(rgbToXyz([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([
      0,
      0,
      0,
      1,
    ]);
  });

  test('converts white RGB to XYZ', () => {
    expect(rgbToXyz([1, 1, 1, 1], [0, 0, 0, 1])).toEqual([
      0.957193648065173,
      1,
      1,
      1,
    ]);
  });

  test('converts RGB to XYZ', () => {
    expect(rgbToXyz([0.12, 0.34, 0.56, 1], [0, 0, 0, 1])).toEqual([
      0.08503830059487179,
      0.08882907988445782,
      0.25055894237353904,
      1,
    ]);
  });
});

describe('xyzToRgb', () => {

  test('converts black XYZ to RGB', () => {
    expect(xyzToRgb([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([
      0,
      0,
      0,
      1,
    ]);
  });

  test('converts white XYZ to RGB', () => {
    expect(xyzToRgb([0.95, 1, 1, 1], [0, 0, 0, 1])).toEqual([
      0.9681716276219697,
      0.9985660798226489,
      1,
      1,
    ]);
  });

  test('converts XYZ to RGB', () => {
    const xyz = rgbToXyz([0.12, 0.34, 0.56, 1], [0, 0, 0, 1]);

    expect(xyzToRgb(xyz, [0, 0, 0, 1])).toEqual([
      0.11761383753289298,
      0.3400000000000019,
      0.5864821757099954,
      1,
    ]);
  });
});
