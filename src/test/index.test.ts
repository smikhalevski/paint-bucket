import { Color } from '../main';

describe('color', () => {
  test('returns color by X11 name', () => {
    expect(Color.parse('blue').rgb()).toEqual([0, 0, 255, 1]);
  });
});

describe('rgb', () => {
  test('returns RGBa components', () => {
    expect(Color.parse('#abc').rgb()).toEqual([170, 187, 204, 1]);
  });
});

describe('getDeltaE', () => {
  test('returns getDeltaE', () => {
    expect(Color.parse('#aaa').deltaE(0xaa_bb_cc)).toBeCloseTo(12.9222);
  });
});

describe('monochromatic palette', () => {
  test('returns getDeltaE', () => {
    expect(Color.parse('#f00').complement().css()).toBe('#00ffff');
  });
});
