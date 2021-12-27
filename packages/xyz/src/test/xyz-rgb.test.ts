import {createRgb} from '@paint-bucket/rgb';
import {createXyz, rgbToXyz, xyzToRgb} from '../main';

describe('rgbToXyz', () => {

  test('converts black RGB to XYZ', () => {
    expect(rgbToXyz(createRgb(), createXyz())).toEqual({
      X: 0,
      Y: 0,
      Z: 0,
      a: 1,
    });
  });

  test('converts white RGB to XYZ', () => {
    expect(rgbToXyz(createRgb(1, 1, 1), createXyz())).toEqual({
      X: 0.957193648065173,
      Y: 1,
      Z: 1,
      a: 1,
    });
  });

  test('converts RGB to XYZ', () => {
    expect(rgbToXyz(createRgb(0.12, 0.34, 0.56), createXyz())).toEqual({
      X: 0.08503830059487179,
      Y: 0.08882907988445782,
      Z: 0.25055894237353904,
      a: 1,
    });
  });
});

describe('xyzToRgb', () => {

  test('converts black XYZ to RGB', () => {
    expect(xyzToRgb(createXyz(), createRgb())).toEqual({
      R: 0,
      G: 0,
      B: 0,
      a: 1,
    });
  });

  test('converts white XYZ to RGB', () => {
    expect(xyzToRgb(createXyz(0.95, 1, 1), createRgb())).toEqual({
      R: 0.9681716276219697,
      G: 0.9985660798226489,
      B: 1,
      a: 1,
    });
  });

  test('converts XYZ to RGB', () => {
    const xyz = rgbToXyz(createRgb(0.12, 0.34, 0.56), createXyz());

    expect(xyzToRgb(xyz, createRgb())).toEqual({
      R: 0.11761383753289298,
      G: 0.3400000000000019,
      B: 0.5864821757099954,
      a: 1,
    });
  });
});
