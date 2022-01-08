import {color} from '../main';

describe('rgb', () => {

  test('returns RGBa components', () => {
    expect(color('#abc').rgb()).toEqual([170, 187, 204, 1]);
  });
});

describe('deltaE', () => {

  test('returns deltaE', () => {
    expect(color('#aaa').deltaE(0xAA_BB_CC)).toBeCloseTo(12.9222);
  });
});
