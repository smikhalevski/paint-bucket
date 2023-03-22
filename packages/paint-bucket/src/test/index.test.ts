import { color } from '../main';

describe('color', () => {
  test('returns color by X11 name', () => {
    expect(color('blue').rgb()).toEqual([0, 0, 255, 1]);
  });
});

describe('rgb', () => {
  test('returns RGBa components', () => {
    expect(color('#abc').rgb()).toEqual([170, 187, 204, 1]);
  });
});

describe('deltaE', () => {
  test('returns deltaE', () => {
    expect(color('#aaa').deltaE(0xaa_bb_cc)).toBeCloseTo(12.9222);
  });
});

describe('monochromatic palette', () => {
  test('returns deltaE', () => {
    expect(color('#f00').complement().css()).toBe('#00ffff');
  });
});
