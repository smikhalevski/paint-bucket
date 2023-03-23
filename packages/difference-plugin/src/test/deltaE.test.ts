import { RGB } from '@paint-bucket/core';
import { convertRGBToLAB, LAB } from '@paint-bucket/lab';
import { deltaE } from '../main/deltaE';

describe('deltaE', () => {
  const rgb = (R: number, G: number, B: number): RGB => [R / 255, G / 255, B / 255, 1];
  const lab = (L: number, A: number, B: number): LAB => [L / 255, (A / 127 + 1) / 2, (B / 127 + 1) / 2, 1];

  test('calculates color difference', () => {
    expect(
      deltaE(convertRGBToLAB(rgb(0, 0, 0), lab(0, 0, 0)), convertRGBToLAB(rgb(0, 0, 0), lab(0, 0, 0)))
    ).toBeCloseTo(0);
    expect(
      deltaE(convertRGBToLAB(rgb(0, 0, 0), lab(0, 0, 0)), convertRGBToLAB(rgb(255, 255, 255), lab(0, 0, 0)))
    ).toBeCloseTo(100);

    // http://www2.ece.rochester.edu/~gsharma/ciede2000/dataNprograms/ciede2000testdata.txt
    expect(deltaE(lab(50, 2.6772, -79.7751), lab(50, 0, -82.7485))).toBeCloseTo(2.0425, 4);
    expect(deltaE(lab(50, 3.1571, -77.2803), lab(50, 0, -82.7485))).toBeCloseTo(2.8615, 4);
    expect(deltaE(lab(50, 2.8361, -74.02), lab(50, 0, -82.7485))).toBeCloseTo(3.4412, 4);
    expect(deltaE(lab(50, -1.3802, -84.2814), lab(50, 0, -82.7485))).toBeCloseTo(1, 4);
    expect(deltaE(lab(50, -1.1848, -84.8006), lab(50, 0, -82.7485))).toBeCloseTo(1, 4);
    expect(deltaE(lab(50, -0.9009, -85.5211), lab(50, 0, -82.7485))).toBeCloseTo(1, 4);
    expect(deltaE(lab(50, 0, 0), lab(50, -1, 2))).toBeCloseTo(2.3669, 4);
    expect(deltaE(lab(50, -1, 2), lab(50, 0, 0))).toBeCloseTo(2.3669, 4);
    expect(deltaE(lab(50, 2.49, -0.001), lab(50, -2.49, 0.0009))).toBeCloseTo(7.1792, 4);
    // Floating point error
    expect(deltaE(lab(50, 2.49, -0.001), lab(50, -2.49, 0.001))).toBeCloseTo(7.1792, 1);
    expect(deltaE(lab(50, 2.49, -0.001), lab(50, -2.49, 0.0011))).toBeCloseTo(7.2195, 4);
    expect(deltaE(lab(50, 2.49, -0.001), lab(50, -2.49, 0.0012))).toBeCloseTo(7.2195, 4);
    expect(deltaE(lab(50, -0.001, 2.49), lab(50, 0.0009, -2.49))).toBeCloseTo(4.8045, 4);
    // Floating point error
    expect(deltaE(lab(50, -0.001, 2.49), lab(50, 0.001, -2.49))).toBeCloseTo(4.8045, 0);
    expect(deltaE(lab(50, -0.001, 2.49), lab(50, 0.0011, -2.49))).toBeCloseTo(4.7461, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(50, 0, -2.5))).toBeCloseTo(4.3065, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(73, 25, -18))).toBeCloseTo(27.1492, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(61, -5, 29))).toBeCloseTo(22.8977, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(56, -27, -3))).toBeCloseTo(31.903, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(58, 24, 15))).toBeCloseTo(19.4535, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(50, 3.1736, 0.5854))).toBeCloseTo(1, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(50, 3.2972, 0))).toBeCloseTo(1, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(50, 1.8634, 0.5757))).toBeCloseTo(1, 4);
    expect(deltaE(lab(50, 2.5, 0), lab(50, 3.2592, 0.335))).toBeCloseTo(1, 4);
    expect(deltaE(lab(60.2574, -34.0099, 36.2677), lab(60.4626, -34.1751, 39.4387))).toBeCloseTo(1.2644, 4);
    expect(deltaE(lab(63.0109, -31.0961, -5.8663), lab(62.8187, -29.7946, -4.0864))).toBeCloseTo(1.263, 4);
    expect(deltaE(lab(61.2901, 3.7196, -5.3901), lab(61.4292, 2.248, -4.962))).toBeCloseTo(1.8731, 4);
    expect(deltaE(lab(35.0831, -44.1164, 3.7933), lab(35.0232, -40.0716, 1.5901))).toBeCloseTo(1.8645, 4);
    expect(deltaE(lab(22.7233, 20.0904, -46.694), lab(23.0331, 14.973, -42.5619))).toBeCloseTo(2.0373, 4);
    expect(deltaE(lab(36.4612, 47.858, 18.3852), lab(36.2715, 50.5065, 21.2231))).toBeCloseTo(1.4146, 4);
    expect(deltaE(lab(90.8027, -2.0831, 1.441), lab(91.1528, -1.6435, 0.0447))).toBeCloseTo(1.4441, 4);
    expect(deltaE(lab(90.9257, -0.5406, -0.9208), lab(88.6381, -0.8985, -0.7239))).toBeCloseTo(1.5381, 4);
    expect(deltaE(lab(6.7747, -0.2908, -2.4247), lab(5.8714, -0.0985, -2.2286))).toBeCloseTo(0.6377, 4);
    expect(deltaE(lab(2.0776, 0.0795, -1.135), lab(0.9033, -0.0636, -0.5514))).toBeCloseTo(0.9082, 4);
  });
});
