import {deltaE2000} from '../main';
import {createRgb} from '@paint-bucket/core';
import {createLab, rgbToLab} from '@paint-bucket/lab';

describe('deltaE2000', () => {

  test('calculates color difference', () => {
    expect(deltaE2000(rgbToLab(createRgb(0, 0, 0), createLab()), rgbToLab(createRgb(0, 0, 0), createLab()))).toBeCloseTo(0);
    expect(deltaE2000(rgbToLab(createRgb(0, 0, 0), createLab()), rgbToLab(createRgb(255, 255, 255), createLab()))).toBeCloseTo(100);

    // http://www2.ece.rochester.edu/~gsharma/ciede2000/dataNprograms/ciede2000testdata.txt
    expect(deltaE2000(createLab(50, 2.6772, -79.7751), createLab(50, 0, -82.7485))).toBeCloseTo(2.0425);
    expect(deltaE2000(createLab(50, 3.1571, -77.2803), createLab(50, 0, -82.7485))).toBeCloseTo(2.8615);
    expect(deltaE2000(createLab(50, 2.8361, -74.02), createLab(50, 0, -82.7485))).toBeCloseTo(3.4412);
    expect(deltaE2000(createLab(50, -1.3802, -84.2814), createLab(50, 0, -82.7485))).toBeCloseTo(1);
    expect(deltaE2000(createLab(50, -1.1848, -84.8006), createLab(50, 0, -82.7485))).toBeCloseTo(1);
    expect(deltaE2000(createLab(50, -0.9009, -85.5211), createLab(50, 0, -82.7485))).toBeCloseTo(1);
    expect(deltaE2000(createLab(50, 0, 0), createLab(50, -1, 2))).toBeCloseTo(2.3669);
    expect(deltaE2000(createLab(50, -1, 2), createLab(50, 0, 0))).toBeCloseTo(2.3669);
    expect(deltaE2000(createLab(50, 2.49, -0.001), createLab(50, -2.49, 0.0009))).toBeCloseTo(7.1792);
    expect(deltaE2000(createLab(50, 2.49, -0.001), createLab(50, -2.49, 0.001))).toBeCloseTo(7.1792);
    expect(deltaE2000(createLab(50, 2.49, -0.001), createLab(50, -2.49, 0.0011))).toBeCloseTo(7.2195);
    expect(deltaE2000(createLab(50, 2.49, -0.001), createLab(50, -2.49, 0.0012))).toBeCloseTo(7.2195);
    expect(deltaE2000(createLab(50, -0.001, 2.49), createLab(50, 0.0009, -2.49))).toBeCloseTo(4.8045);
    expect(deltaE2000(createLab(50, -0.001, 2.49), createLab(50, 0.001, -2.49))).toBeCloseTo(4.8045);
    expect(deltaE2000(createLab(50, -0.001, 2.49), createLab(50, 0.0011, -2.49))).toBeCloseTo(4.7461);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(50, 0, -2.5))).toBeCloseTo(4.3065);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(73, 25, -18))).toBeCloseTo(27.1492);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(61, -5, 29))).toBeCloseTo(22.8977);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(56, -27, -3))).toBeCloseTo(31.903);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(58, 24, 15))).toBeCloseTo(19.4535);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(50, 3.1736, 0.5854))).toBeCloseTo(1);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(50, 3.2972, 0))).toBeCloseTo(1);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(50, 1.8634, 0.5757))).toBeCloseTo(1);
    expect(deltaE2000(createLab(50, 2.5, 0), createLab(50, 3.2592, 0.335))).toBeCloseTo(1);
    expect(deltaE2000(createLab(60.2574, -34.0099, 36.2677), createLab(60.4626, -34.1751, 39.4387))).toBeCloseTo(1.2644);
    expect(deltaE2000(createLab(63.0109, -31.0961, -5.8663), createLab(62.8187, -29.7946, -4.0864))).toBeCloseTo(1.263);
    expect(deltaE2000(createLab(61.2901, 3.7196, -5.3901), createLab(61.4292, 2.248, -4.962))).toBeCloseTo(1.8731);
    expect(deltaE2000(createLab(35.0831, -44.1164, 3.7933), createLab(35.0232, -40.0716, 1.5901))).toBeCloseTo(1.8645);
    expect(deltaE2000(createLab(22.7233, 20.0904, -46.694), createLab(23.0331, 14.973, -42.5619))).toBeCloseTo(2.0373);
    expect(deltaE2000(createLab(36.4612, 47.858, 18.3852), createLab(36.2715, 50.5065, 21.2231))).toBeCloseTo(1.4146);
    expect(deltaE2000(createLab(90.8027, -2.0831, 1.441), createLab(91.1528, -1.6435, 0.0447))).toBeCloseTo(1.4441);
    expect(deltaE2000(createLab(90.9257, -0.5406, -0.9208), createLab(88.6381, -0.8985, -0.7239))).toBeCloseTo(1.5381);
    expect(deltaE2000(createLab(6.7747, -0.2908, -2.4247), createLab(5.8714, -0.0985, -2.2286))).toBeCloseTo(0.6377);
    expect(deltaE2000(createLab(2.0776, 0.0795, -1.135), createLab(0.9033, -0.0636, -0.5514))).toBeCloseTo(0.9082);
  });
});
